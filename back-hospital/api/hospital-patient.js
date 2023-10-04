const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// Retrieve all patients
router.get("/", async (req,res) => {
    const url = "https://database.porapipat.me/api/patient/";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

// Retrieve a specific patient by ID
router.get("/:id", async (req,res) => {
    const patientIDCard = req.params.id;
    const findPatientByIdUrl = "http://database.porapipat.me/api/patient/" + patientIDCard;
    // Get Id Patient data By ID
    await axios.get(findPatientByIdUrl)
    .then(function (response) {
        console.log('Find patient by ID: ', response.data);
        patientID = response.data.Patient_ID;
        res.status(200).send(patientID);
    })
    .catch(function (error) {
        console.error("Fail to find patient by id");
        throw error;
    });
});

// Create a new patient
router.post("/", (req, res) => {
    const url = "http://database.porapipat.me/api/patient";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(201).send("patient created Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("patient created Failed!");
      });
});

// Update patient by ID
router.put("/:id", (req, res) => {
    const patientId = req.params.id;
    const url = "http://database.porapipat.me/api/patient/" + patientId;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("patient updated Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("patient updated Failed!");
      });
});

// Delete patient by ID
router.delete("/:id", (req, res) => {
    const patientId = req.params.id;
    const url = "http://database.porapipat.me/api/patient/" + patientId;
    axios({
      method: "delete",
      url: url,
      data: req.body,
    })
      .then((response) => {
        return res.status(200).send("patient deleted Successfully!");
      })
      .catch((err) => {
        return res.status(501).send("patient deleted Failed!");
      });
});

module.exports = router;
