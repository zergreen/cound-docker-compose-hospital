const express = require("express");
const router = express.Router();

const axios = require("axios").default;

const verify = require("../function/verifyToken");

router.put('/', async (req, res) => {
    console.log('hello');
    const {report_date, emp_id} = req.body
    const url = "https://database.porapipat.me/api/report";
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    const filteredData = await jsonData.filter((item) => item.Employee_ID === emp_id && item.Report_Date === report_date);

    console.log(filteredData);
    if(filteredData.length > 0){
        return res.status(200).send({"status": 'cannot appoint because it\'s can match '})
    }else {
        return res.status(203).send({"status": `report_date: ${report_date} - emp_id: ${emp_id}`})
        
    }
})

router.get('/report-can-appoint', async (req, res) => {
    return res.send('welcome : checkdateanddoctoridcanbook')
})

// Retrieve all packageDetails
router.get("/appoint", verify, async (req,res) => {
    const url = "http://database.porapipat.me/api/appoint";
    const response = await fetch(url);
    const jsonData = await response.json();
    return res.status(200).send(jsonData);
});

module.exports = router;