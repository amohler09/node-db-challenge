const express = require("express");

const projectsRouter = require("../projects/projects-router");
// const resourcesRouter = require("../resources/resources-router");
// const tasksRouter = require("../tasks/tasks-router");

const server = express();

server.use(express.json());

server.use("/api/projects", projectsRouter);

module.exports = server;
