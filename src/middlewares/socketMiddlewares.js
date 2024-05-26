import { Server } from 'socket.io';
import http from 'node:http';

export default function configureSocketMiddlewares(app) {
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    app.set('io', io);
    console.log('Socket middleware configured');

    return server;
}
