const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all departments
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/listProser";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific listProser by ID
router.get("/:id", async (req,res) => {
    const listProserId = req.params.id;
    const url = "http://database.porapipat.me/api/listProser/" + listProserId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new listProser
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/listProser";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("listProser created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("listProser created Failed!");
      });
});

// Update listProser by ID
router.put("/:id", (req, res) => {
    const listProserId = req.params.id;
    const url = "http://database.porapipat.me/api/listProser/" + listProserId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("listProser updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("listProser updated Failed!");
      });
});

// Delete listProser by ID
router.delete("/:id", (req, res) => {
    const listProserId = req.params.id;
    const url = "http://database.porapipat.me/api/listProser/" + listProserId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("listProser deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("listProser deleted Failed!");
      });
});

module.exports = router;
