const express = require("express");
const router = express.Router();
const axios = require("axios");
require('dotenv').config();

const {DOMAIN_NAME} = process.env

router.get('/', async (req, res) => {
    const {emp_id, datetime} = req.body;
    const reportURL = `${DOMAIN_NAME}/report`;
    try {
        // Find patient by citizenID
        let response = await axios.get(reportURL);
        const reports = response.data;
        const filteredData = reports.filter((item) => item.Employee_ID === parseInt(emp_id) && item.Report_Date === datetime);
        res.status(200).send(filteredData);

    } catch (error) {
        res.status(500).send('Failed to find duplicate datetime');
        throw error;
    }
});

module.exports = router;