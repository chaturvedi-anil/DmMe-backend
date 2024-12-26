import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

interface User {
    socket: WebSocket,
    room: string
}

let allSocket: User[] = [];

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        
        //@ts-ignore
        const parseMessage = JSON.parse(message); 
        console.log("parseMessage : ", parseMessage);

        if (parseMessage.type === "join") {
            allSocket.push({
                socket, room: parseMessage.payload.roomId
            })

        }
        
    })
});