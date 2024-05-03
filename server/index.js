const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const PORT = 5000;

const {Server} = require("socket.io");
const io = new Server(server, {
    cors: {
        origin : ["http://localhost:3000"],
    },
});

io.on("connection", (socket) => {
    console.log("クライアントと接続しました！")

    socket.on("send-message", (data) => {

        io.emit("received_message", data)
    })
    socket.on("disconnect", () => {
        console.log("クライアントと切断しました！");
    })
})
server.listen(PORT, () => {
    console.log("サーバー起動中");
})