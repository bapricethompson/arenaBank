const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const rooms = {};
function broadcast(roomCode, data) {
  const room = rooms[roomCode];
  if (!room) return;
  for (const socket of Object.values(room.players)) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
    }
  }
}
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}
wss.on("connection", (socket) => {
  socket.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);
      const { type } = data;
      if (type === "host_create") {
        const roomCode = data.room;
        if (rooms[roomCode]) {
          socket.send(
            JSON.stringify({
              type: "error",
              message: "Room code already in use.",
            })
          );
          return;
        }
        rooms[roomCode] = {
          host: socket,
          players: {},
          leaderboard: {},
          roundTotal: 0,
          rollCount: 0,
          banked: new Set(),
          interval: null,
        };
        socket.isHost = true;
        socket.roomCode = roomCode;
        socket.username = "HOST";
        socket.send(JSON.stringify({ type: "room_created", room: roomCode }));
      } else if (type === "join") {
        const roomCode = data.room;
        const name = data.name?.trim();
        const room = rooms[roomCode];
        if (!room) {
          socket.send(
            JSON.stringify({ type: "error", message: "Room not found." })
          );
          return;
        }
        if (!name) {
          socket.send(
            JSON.stringify({ type: "error", message: "Name cannot be empty." })
          );
          return;
        }
        if (room.players[name]) {
          socket.send(
            JSON.stringify({
              type: "error",
              message: `Name '${name}' is already taken.`,
            })
          );
          return;
        }
        socket.username = name;
        socket.roomCode = roomCode;
        room.players[name] = socket;
        room.leaderboard[name] = 0;
        broadcast(roomCode, {
          type: "leaderboard_update",
          leaderboard: room.leaderboard,
        });
      } else if (type === "start_game") {
        const roomCode = socket.roomCode;
        const room = rooms[roomCode];
        if (!room || socket !== room.host) {
          socket.send(
            JSON.stringify({
              type: "error",
              message: "Only host can start the game.",
            })
          );
          return;
        }
        if (room.interval) clearInterval(room.interval);
        room.roundTotal = 0;
        room.rollCount = 0;
        room.banked.clear();
        room.interval = setInterval(() => {
          const d1 = rollDie();
          const d2 = rollDie();
          const sum = d1 + d2;
          room.rollCount++;
          let update = {
            d1,
            d2,
            sum,
            roundTotal: room.roundTotal,
            type: "roll",
          };
          if (room.rollCount <= 3) {
            if (sum === 7) {
              room.roundTotal += 70;
              update.message = "🧨 Early 7! +70 added.";
            } else if (d1 === d2) {
              room.roundTotal += d1;
              update.message = `🎁 Early double! +${d1} added.`;
            } else {
              room.roundTotal += sum;
            }
          } else {
            if (sum === 7) {
              update.message = "💥 Rolled a 7. Round total lost!";
              room.roundTotal = 0;
              clearInterval(room.interval);
              room.interval = null;
              room.banked.clear();
            } else if (d1 === d2) {
              room.roundTotal *= 2;
              update.message = `🔥 Doubles! Round total doubled to ${room.roundTotal}`;
            } else {
              room.roundTotal += sum;
            }
          }
          update.roundTotal = room.roundTotal;
          broadcast(roomCode, update);
        }, 4000);
      } else if (type === "bank") {
        const playerName = socket.username;
        const roomCode = socket.roomCode;
        const room = rooms[roomCode];
        if (!room || !room.players[playerName]) return;
        if (room.banked.has(playerName)) return;
        room.banked.add(playerName);
        room.leaderboard[playerName] += room.roundTotal;
        broadcast(roomCode, {
          type: "banked",
          name: playerName,
          newScore: room.leaderboard[playerName],
        });
        broadcast(roomCode, {
          type: "leaderboard_update",
          leaderboard: room.leaderboard,
        });
      }
    } catch (err) {
      console.error("Invalid message:", err);
      socket.send(
        JSON.stringify({ type: "error", message: "Malformed request." })
      );
    }
  });
  socket.on("close", () => {
    const roomCode = socket.roomCode;
    const name = socket.username;
    const room = rooms[roomCode];
    if (room && name && room.players[name]) {
      delete room.players[name];
      delete room.leaderboard[name];
      broadcast(roomCode, {
        type: "leaderboard_update",
        leaderboard: room.leaderboard,
      });
    }
  });
});
