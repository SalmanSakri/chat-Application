const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port= process.env.PORT||8033 ;


const users=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin" , message:` ${users[socket.id]} has joined`});
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat ${users[socket.id]} `})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    })

    socket.on('disconnect',()=>{
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
});


server.listen(port,()=>{
    console.log(`Working`);
    console.log(`server is start port number  http://localhost:${port}`);
})
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http");
// const socketIO = require("socket.io");
// const { Socket } = require("dgram");
// require("dotenv").config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// const port =process.env.PORT|| 8033;
// const server=http.createServer(app);
// const io = socketIO(server);

// const users=[{}];


// io.on("connection",(Socket)=>{

//     // console.log("new connections");

//     Socket.on('joined',({user})=>{
//         users[Socket.id]=user;
//         // console.log(`${user} has joined`);
//         Socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[Socket.id]} has joined`});
//         Socket.emit('welcom',{user:"Admin", massage:`Welcome to the Chat ${users[Socket.id]}`});
//     })

//     Socket.on("message",()=>{
//         io.emit('sendMessage',{user:users[id],message})
//     })

//     Socket.on('disconnect',()=>{
//         Socket.broadcast.emit("leave",{user:"Admin",message:`${users[Socket.id]} hsa left`})
//         // console.log('User letf')
//     })

// })


// app.get("/", (req, res) => {
//     res.json("server start")
// })

// server.listen(port, () => {
//     console.log(`server is start port number  http://localhost:${port}`);
// })