const express=require('express')
const app=express()
const http=require('http')
const {Server}=require("socket.io")
const cors=require("cors")
app.use(cors())
const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
})
io.on("connection",(socket)=>
{
    console.log(`User Connected :${socket.id}`)
    socket.on("send_message",(data)=>
    {
        socket.broadcast.emit("receive_message",data)
    });
})
app.get("/get",(req,res)=>
{
    res.send("data sent")
    res.end()
})
const port = 3000;
server.listen(port||process.env.PORT, function () {
    console.log("server stated");
});