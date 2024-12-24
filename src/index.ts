import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

let userCount = 0;
let allSocket: WebSocket[] = [];

wss.on("connection", (websocket) => {
    allSocket.push(websocket);
    userCount += 1;

    websocket.on("message", (message) => {
        console.log(`message received ${message.toString()} from user`);

        for (let i = 0; i < allSocket.length; i++) {
            const s = allSocket[i];
            s.send(message.toString() + ": Sent from the server");
        }

    })
});