const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all inspections
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/inspectionDetail";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific inspection by ID
router.get("/:id", async (req,res) => {
    const inspectionId = req.params.id;
    const url = "http://database.porapipat.me/api/inspectionDetail/" + inspectionId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new inspection
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/inspectionDetail";
    console.log(Inspection_Name)
    axios({
      method: "post",
      url: url,
      data: req.body
    })
      .then((response) => {
        return res.status(201).send("inspectionDetail created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("inspectionDetail created Failed!");
      });
});

// Update inspection by ID
router.put("/:id", (req, res) => {
    const inspectionId = req.params.id;
    const url = "http://database.porapipat.me/api/inspectionDetail/" + inspectionId;
    axios({
      method: "put",
      url: url,
      data: req.body
    })
      .then((response) => {
        return res.status(200).send("inspectionDetail updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("inspectionDetail updated Failed!");
      });
});

// Delete inspection by ID
router.delete("/:id", (req, res) => {
    const inspectionId = req.params.id;
    const url = "http://database.porapipat.me/api/inspectionDetail/" + inspectionId;
    axios({
      method: "delete",
      url: url,
      data: req.body
    })
      .then((response) => {
        return res.status(200).send("inspectionDetail deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("inspectionDetail deleted Failed!");
      });
});

module.exports = router;
