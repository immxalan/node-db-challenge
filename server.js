const express = require("express");
const helmet = require ("helmet");
const CORS = require("cors");

const projectRouter = require("./project/projectRouter");
const taskRouter = require("./task/taskRouter");
const resourceRouter = require("./resource/resourceRouter");

const server=express();
server.use(helmet());
server.use(CORS());
server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/tasks", taskRouter);
server.use("/api/resources", resourceRouter)

server.get("/", (req, res) => {
    res.send(`<h1>Hello World</h1>`)
})
module.exports = server;