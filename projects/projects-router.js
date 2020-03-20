const express = require("express");

const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.find()
    .then(projects => {
      if (projects.length > 0) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ message: "Could not find projects" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error finding projects" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Projects.findById(id).then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "Could not find a project with that ID" });
    }
  });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  Projects.add(newProject)
    .then(project => {
      res.status(201).json({ message: "Project successfully added" });
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding project" });
    });
});

module.exports = router;
