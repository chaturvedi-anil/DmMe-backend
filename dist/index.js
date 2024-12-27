"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSocket = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        //@ts-ignore
        const parseMessage = JSON.parse(message);
        if (parseMessage.type === "join") {
            allSocket.push({
                socket, room: parseMessage.payload.roomId
            });
        }
        if (parseMessage.type === "chat") {
            const currentUserRoom = (_a = allSocket.find((x) => x.socket === socket)) === null || _a === void 0 ? void 0 : _a.room;
            allSocket.map((user) => {
                if (user.room === currentUserRoom) {
                    console.log("user.roomId : ", user.room);
                    console.log("parseMessage.payload.message : ", parseMessage.payload.message);
                    user.socket.send(parseMessage.payload.message);
                }
            });
        }
    });
});
