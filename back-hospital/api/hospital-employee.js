const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all employees
router.get("/", async (req,res) => {
    const url = "http://database.porapipat.me/api/employee";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific employee by ID
router.get("/:id", async (req,res) => {
    const employeeId = req.params.id;
    const url = "http://database.porapipat.me/api/employee/" + employeeId;
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Create a new employee
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/employee";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("Employee created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("Employee created Failed!");
      });
});

// Update employee by ID
router.put("/:id", (req, res) => {
    const employeeId = req.params.id;
    const url = "http://database.porapipat.me/api/employee/" + employeeId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("Employee updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("Employee updated Failed!");
      });
});

// Delete employee by ID
router.delete("/:id", (req, res) => {
    const employeeId = req.params.id;
    const url = "http://database.porapipat.me/api/employee/" + employeeId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("Employee deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("Employee deleted Failed!");
      });
});

module.exports = router;
