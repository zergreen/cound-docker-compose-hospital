const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all treatments
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/treatment";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific treatment by ID
router.get("/:id", async (req,res) => {
    const treatmentId = req.params.id;
    const url = "http://database.porapipat.me/api/treatment/" + treatmentId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new treatment
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/treatment";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("treatment created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("treatment created Failed!");
      });
});

// Update treatment by ID
router.put("/:id", (req, res) => {
    const treatmentId = req.params.id;
    const url = "http://database.porapipat.me/api/treatment/" + treatmentId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("treatment updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("treatment updated Failed!");
      });
});

// Delete treatment by ID
router.delete("/:id", (req, res) => {
    const treatmentId = req.params.id;
    const url = "http://database.porapipat.me/api/treatment/" + treatmentId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("treatment deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("treatment deleted Failed!");
      });
});

module.exports = router;
