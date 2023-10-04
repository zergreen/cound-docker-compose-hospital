const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all factors
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/factor";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific factor by ID
router.get("/:id", async (req,res) => {
    const factorId = req.params.id;
    const url = "http://database.porapipat.me/api/factor/" + factorId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new factor
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/factor";
    axios({
      method: "post",
      url: url,
      data: req.body
    })
      .then((response) => {
        return res.status(201).send("Factor created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("Factor created Failed!");
      });
});

// Update factor by ID
router.put("/:id", (req, res) => {
    const factorId = req.params.id;
    const url = "http://database.porapipat.me/api/factor/" + factorId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("Factor updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("Factor updated Failed!");
      });
});

// Delete factor by ID
router.delete("/:id", (req, res) => {
    const factorId = req.params.id;
    const url = "http://database.porapipat.me/api/factor/" + factorId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("Factor deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("Factor deleted Failed!");
      });
});

module.exports = router;
