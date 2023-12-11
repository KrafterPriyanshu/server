const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for messages from clients
  socket.on('message', (data) => {
    console.log(`Received message from ${data.username}: ${data.message}`);
    // Broadcast the message to all clients
    io.emit('message', { username: data.username, message: data.message });
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
