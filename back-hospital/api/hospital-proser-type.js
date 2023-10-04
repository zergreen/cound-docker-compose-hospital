const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all proserTypes
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/proserType";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific proserType by ID
router.get("/:id", async (req,res) => {
    const proserTypeId = req.params.id;
    const url = "http://database.porapipat.me/api/proserType/" + proserTypeId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new proserType
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/proserType";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("proserType created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("proserType created Failed!");
      });
});

// Update proserType by ID
router.put("/:id", (req, res) => {
    const proserTypeId = req.params.id;
    const url = "http://database.porapipat.me/api/proserType/" + proserTypeId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("proserType updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("proserType updated Failed!");
      });
});

// Delete proserType by ID
router.delete("/:id", (req, res) => {
    const proserTypeId = req.params.id;
    const url = "http://database.porapipat.me/api/proserType/" + proserTypeId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("proserType deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("proserType deleted Failed!");
      });
});

module.exports = router;
