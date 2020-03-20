const express = require("express");

const Resources = require("./resources-model");

const router = express.Router();

router.get("/", (req, res) => {
  Resources.find()
    .then(resources => {
      if (resources.length > 0) {
        res.status(200).json(resources);
      } else {
        res.status(404).json({ message: "Could not find any resources" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error finding resources" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Resources.findById(id).then(resource => {
    if (resource) {
      res.status(200).json(resource);
    } else {
      res
        .status(404)
        .json({ message: "Could not find a resource with that ID" });
    }
  });
});

router.post("/", (req, res) => {
  const newResource = req.body;
  Resources.add(newResource)
    .then(resource => {
      res.status(201).json({ message: "Resource successfully added" });
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding resource" });
    });
});

module.exports = router;
