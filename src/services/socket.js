import { io } from 'socket.io-client';

const socket = io('http://localhost:1337');

socket.on('productCreated', data => {
  console.log('Product created:', data);
});

socket.on('productUpdated', data => {
  console.log('Product updated:', data);
});

socket.on('productDeleted', data => {
  console.log('Product deleted:', data);
});

export default socket;
