import io, {Socket} from 'socket.io-client';

let socket: Socket;

function getSocket() {
    // Check if instance already exists
    if (!socket) {
        socket = io('http://localhost:3001');
        console.log('Creating new socket connection');
    }
    return socket;
}

export default getSocket;
