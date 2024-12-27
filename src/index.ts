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

        if (parseMessage.type === "join") {
            
            allSocket.push({
                socket, room: parseMessage.payload.roomId
            })

        }

        if(parseMessage.type === "chat") {
            const currentUserRoom = allSocket.find((x) => x.socket === socket)?.room;

            allSocket.map((user) => {
                if(user.room === currentUserRoom){
                    user.socket.send(parseMessage.payload.message);
                } 
            });
            
        }   
        
    })
});