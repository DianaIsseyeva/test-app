import { io } from 'socket.io-client';

// Connect to the WebSocket server
const socket = io('http://localhost:1337');

// Handle events
socket.on('productCreated', data => {
  console.log('Product created:', data);
  // Update state or perform other actions
});

socket.on('productUpdated', data => {
  console.log('Product updated:', data);
  // Update state or perform other actions
});

socket.on('productDeleted', data => {
  console.log('Product deleted:', data);
  // Update state or perform other actions
});

export default socket;
