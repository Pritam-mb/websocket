const http = require("http");
// import e from "express";
const e= require("express");
const path = require("path");
const {Server} = require("socket.io");

const app = e();
const server = http.createServer(app);
const io = new Server(server);
io.on("connection",(socket)=>{
    // console.log("A user connected:",socket.id);
    socket.on("user-message", (message) => { // listening for messages from clients
        // console.log("Received message from user:", message);
        io.emit("server-message", message); // broadcasting message to all connected clients
    });
});



app.use(e.static(path.resolve("./public")))


app.get("/",(req,res)=>{
    // res.send("WebSocket server is running");
    res.sendFile(path.resolve("./public/index.html"))
})
server.listen(8080, () => {
  console.log("WebSocket server is running on ws://localhost:8080");
});