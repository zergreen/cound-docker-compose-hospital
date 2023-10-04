const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all mainAction
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/mainAction";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific mainAction by ID
router.get("/:id", async (req,res) => {
    const mainId = req.params.id;
    const url = "http://database.porapipat.me/api/mainAction/" + mainId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new mainAction
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/mainAction";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("mainAction created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("mainAction created Failed!");
      });
});

// Update mainAction by ID
router.put("/:id", (req, res) => {
    const mainId = req.params.id;
    const url = "http://database.porapipat.me/api/mainAction/" + mainId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("mainAction updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("mainAction updated Failed!");
      });
});

// Delete mainAction by ID
router.delete("/:id", (req, res) => {
    const mainId = req.params.id;
    const url = "http://database.porapipat.me/api/mainAction/" + mainId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("mainAction deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("mainAction deleted Failed!");
      });
});

module.exports = router;
