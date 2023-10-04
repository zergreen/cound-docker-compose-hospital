const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all nLabs
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/nLab";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific nLab by ID
router.get("/:id", async (req,res) => {
    const nLabId = req.params.id;
    const url = "http://database.porapipat.me/api/nLab/" + nLabId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new nLab
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/nLab";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("nLab created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("nLab created Failed!");
      });
});

// Update nLab by ID
router.put("/:id", (req, res) => {
    const nLabId = req.params.id;
    const url = "http://database.porapipat.me/api/nLab/" + nLabId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("nLab updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("nLab updated Failed!");
      });
});

// Delete nLab by ID
router.delete("/:id", (req, res) => {
    const nLabId = req.params.id;
    const url = "http://database.porapipat.me/api/nLab/" + nLabId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("nLab deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("nLab deleted Failed!");
      });
});

module.exports = router;
