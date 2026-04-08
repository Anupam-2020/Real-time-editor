import { Server, Socket } from 'socket.io';


const documents: Record<string, string> = {};

export const initSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("User connected:", socket.id);

        socket.on('join-document', (docId: string) => {
            socket.join(docId);

            const content = documents[docId] || "";
            socket.emit("load-document", content);

            console.log(`User ${socket.id} joined ${docId}`);
        });

        socket.on('send-changes', ({ docId, content}) => {
            documents[docId] = content;

            console.log(content);

            socket.to(docId).emit("receive-changes", content);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

