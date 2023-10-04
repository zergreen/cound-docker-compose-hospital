const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all packageDetails
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/packageDetail";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific packageDetail by ID
router.get("/:id", async (req,res) => {
    const packageDetailId = req.params.id;
    const url = "http://database.porapipat.me/api/packageDetail/" + packageDetailId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new packageDetail
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/packageDetail";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("packageDetail created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("packageDetail created Failed!");
      });
});

// Update packageDetail by ID
router.put("/:id", (req, res) => {
    const packageDetailId = req.params.id;
    const url = "http://database.porapipat.me/api/packageDetail/" + packageDetailId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("packageDetail updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("packageDetail updated Failed!");
      });
});

// Delete packageDetail by ID
router.delete("/:id", (req, res) => {
    const packageDetailId = req.params.id;
    const url = "http://database.porapipat.me/api/packageDetail/" + packageDetailId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("packageDetail deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("packageDetail deleted Failed!");
      });
});

module.exports = router;
