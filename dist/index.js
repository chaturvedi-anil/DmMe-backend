"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSocket = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        //@ts-ignore
        const parseMessage = JSON.parse(message);
        console.log("parseMessage : ", parseMessage);
        if (parseMessage.type === "join") {
            allSocket.push({
                socket, room: parseMessage.payload.roomId
            });
            console.log("allSocket : ", allSocket);
        }
    });
});
