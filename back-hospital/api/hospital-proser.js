const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all prosers
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/proser";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific proser by ID
router.get("/:id", async (req,res) => {
    const proserId = req.params.id;
    const url = "http://database.porapipat.me/api/proser/" + proserId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new proser
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/proser";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("proser created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("proser created Failed!");
      });
});

// Update proser by ID
router.put("/:id", (req, res) => {
    const proserId = req.params.id;
    const url = "http://database.porapipat.me/api/proser/" + proserId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("proser updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("proser updated Failed!");
      });
});

// Delete proser by ID
router.delete("/:id", (req, res) => {
    const proserId = req.params.id;
    const url = "http://database.porapipat.me/api/proser/" + proserId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("proser deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("proser deleted Failed!");
      });
});

module.exports = router;
