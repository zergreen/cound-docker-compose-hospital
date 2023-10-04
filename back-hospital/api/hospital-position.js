const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all positions
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/position";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific position by ID
router.get("/:id", async (req,res) => {
    const positionId = req.params.id;
    const url = "http://database.porapipat.me/api/position/" + positionId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new position
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/position";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("position created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("position created Failed!");
      });
});

// Update position by ID
router.put("/:id", (req, res) => {
    const positionId = req.params.id;
    const url = "http://database.porapipat.me/api/position/" + positionId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("position updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("position updated Failed!");
      });
});

// Delete position by ID
router.delete("/:id", (req, res) => {
    const positionId = req.params.id;
    const url = "http://database.porapipat.me/api/position/" + positionId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("position deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("position deleted Failed!");
      });
});

module.exports = router;
