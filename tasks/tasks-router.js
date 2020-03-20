const express = require("express");

const Tasks = require("./tasks-model");

const router = express.Router();

router.get("/", (req, res) => {
  Tasks.find()
    .then(tasks => {
      if (tasks.length > 0) {
        res.status(200).json(tasks);
      } else {
        res.status(404).json({ message: "Could not find any tasks" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error finding tasks" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Tasks.findById(id).then(task => {
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Could not find a task with that ID" });
    }
  });
});

router.post("/", (req, res) => {
  const newTask = req.body;
  Tasks.add(newTask)
    .then(task => {
      res.status(201).json({ message: "Task successfully added" });
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding task" });
    });
});

module.exports = router;
