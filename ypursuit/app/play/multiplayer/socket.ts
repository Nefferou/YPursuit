import io, {Socket} from 'socket.io-client';

let socket: Socket;

function getSocket() {
    // Check if instance already exists
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as string);
        console.log('Creating new socket connection');
    }
    return socket;
}

export default getSocket;
