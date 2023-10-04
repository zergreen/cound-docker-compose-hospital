const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all departments
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/department";
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData[0]['Department_ID'])
    return res.status(200).send(jsonData);
});

// Retrieve a specific department by ID
router.get("/:id", async (req,res) => {
    const departmentId = req.params.id;
    const url = "http://database.porapipat.me/api/department/" + departmentId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new department
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/department";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("Department created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("Department created Failed!");
      });
});

// Update department by ID
router.put("/:id", (req, res) => {
    const departmentId = req.params.id;
    const url = "http://database.porapipat.me/api/department/" + departmentId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("Department updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("Department updated Failed!");
      });
});

// Delete department by ID
router.delete("/:id", (req, res) => {
    const departmentId = req.params.id;
    const url = "http://database.porapipat.me/api/department/" + departmentId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("Department deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("Department deleted Failed!");
      });
});

module.exports = router;
