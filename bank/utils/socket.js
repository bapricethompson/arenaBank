// utils/socket.js

let socket = null;

export function initSocket() {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket("wss://bankwebsocket.onrender.com/");
  }
  return socket;
}

export function getSocket() {
  return socket;
}

export function closeSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
  socket = null;
}
