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

router.post("/", (req, res) => {});

module.exports = router;
