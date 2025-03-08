// const express = require('express')
import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import socketHandler from './socketHandler.js'
const PORT = 3000
const app = express()

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


socketHandler(io);






server.listen(PORT,()=>{
    console.log('server is running on port 3000')
})