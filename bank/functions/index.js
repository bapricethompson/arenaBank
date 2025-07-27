const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Create an Express app
const app = express();

// Basic HTTP route (optional)
app.get("/", (req, res) => {
  res.send("WebSocket server is running");
});

// Create HTTP server from express app
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));

  ws.on("message", (data) => {
    console.log("Received:", data);
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start server on a port (e.g. 8080)
const PORT = process.env.PORT || 8600;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
