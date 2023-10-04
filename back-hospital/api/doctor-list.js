const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const axios = require("axios").default;
require('dotenv').config();

const {DOMAIN_NAME} = process.env

router.get("/", async (req,res) => {
    const url = `${DOMAIN_NAME}/employee/getemppos/Doctor`;
    const response = await fetch(url);
    const jsonData = await response.json();
    const filteredData = [];
    // const filteredData = jsonData.filter((employee) => employee.Position_ID === 1);
    for (let i = 0; i < jsonData.length; i++) {
        const { Employee_ID, Employee_name, Employee_Lname, Department_name, Employee_Image, Employee_Lang } = jsonData[i];
        filteredData.push({ Employee_ID, Employee_name, Employee_Lname, Department_name, Employee_Image, Employee_Lang });
    }
    // console.log(filteredData);
    return res.status(200).send(jsonData);
});

module.exports = router;