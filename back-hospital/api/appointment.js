const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const moment = require("moment");
require("dotenv").config();

const { DOMAIN_NAME } = process.env;

// Find patient by ID card or citizen ID
router.get("/checkPatient/:id", async (req, res) => {
  const IDCard = req.params.id;
  let patientID = undefined;
  const findPatientByCitizenUrl = `${DOMAIN_NAME}/patient/getidbycitizen/${IDCard}`;

  await axios
    .get(findPatientByCitizenUrl)
    .then((response) => {
      console.log(response.status);
      console.log("Find patient by IDCard: ", response.data);
      patientID = response.data.Patient_ID;
      console.log("Patient ID: ", patientID);
    //   return res.status(200).send({ data: patientID });
      if (response.status === 200) {
        console.log(77777777777);
        // get patient data if status is 200
          getPatientData(patientID, res);
      }
    })
    .catch((error) => {
      // console.log(response.status);
      console.log("Fail to find patient by IDCard");
      res.status(501).send({ message: "Fail to find patient by IDCard" });
    });

  // const findPatientByIdUrl = `${DOMAIN_NAME}/patient/${patientID}`;
  // await axios.get(findPatientByIdUrl)
  //     .then((response) => {
  //         console.log('Find patient by ID only: ', response.data);
  //         const patientData = response.data;
  //         res.status(200).send(patientData);
  //     })
  //     .catch((error) => {
  //         res.status(500).send({message: "Fail to find patient by id"});
  //     });
});

async function getPatientData(patientID , res) {
  const findPatientByIdUrl = `${DOMAIN_NAME}/patient/${patientID}`;
  await axios
    .get(findPatientByIdUrl)
    .then((response) => {
      console.log("Find patient by ID only: ", response.data);
      const patientData = response.data;
      res.status(200).send(patientData);
    })
    .catch((error) => {
      res.status(501).send({ message: "Fail to find patient by id" });
    });
}

/* Create a new patient then save detail of appointment into Report table
    and save into Appoint table.*/
router.post("/", async (req, res) => {
  const {
    date,
    time,
    doctor,
    firstName,
    lastName,
    idCard,
    id,
    sex,
    nation,
    tell,
    email,
    symptom,
    weight,
    tall,
    bloodType,
    pressure,
    hr,
    temperature,
  } = req.body;
  let patientID = "";

  const appointmentTime = time.split("-")[0];
  const inputDate = date + " " + appointmentTime;
  // const inputDate = '3/3/2021 11-12';
  const outputFormat = "YYYY-MM-DD HH:mm:ss";
  const convertedDate = moment(inputDate, "D/M/YYYY HH").format(outputFormat);

  const createPatientUrl = `${DOMAIN_NAME}/patient/`;
  const findPatientByIdUrl = `${DOMAIN_NAME}/patient/getidbycitizen/${idCard}`;
  const ReportUrl = `${DOMAIN_NAME}/report`;
  const patientData = {
    Patient_ID: id,
    Patient_name: firstName,
    Patient_lname: lastName,
    Patient_Citizen: idCard,
    Patient_Sex: sex,
    BG: bloodType,
    Patient_National: nation,
    Patient_Tel1: tell,
    Patient_Email: email,
  };
  // Create Patient
  await axios
    .post(createPatientUrl, patientData)
    .then((response) => {
      console.log("Create patient: ", response.data);
    })
    .catch((error) => {
      console.error("Failed to create a patient");
      throw error;
    });
  // Get Id Patient data By ID
  await axios
    .get(findPatientByIdUrl)
    .then(function (response) {
      console.log("Find patient by ID: ", response.data);
      patientID = response.data.Patient_ID;
    })
    .catch(function (error) {
      console.error("Fail to find patient by id");
      throw error;
    });
  // Create Report
  const report = {
    Patient_ID: patientID,
    Employee_ID: doctor,
    Report_Date: convertedDate,
    weight: weight,
    height: tall,
    Pressure: pressure,
    BPM: hr,
    Temp: temperature,
    Symptom: symptom,
  };
  // Save report into Report table
  await axios
    .post(ReportUrl, report)
    .then((response) => {
      console.log("Save appoint: ", response.data);
      res
        .status(200)
        .send("Report Created Successfully with no existed patient.");
    })
    .catch((error) => {
      res
        .status(500)
        .send("Fail to create Report backend  with no existed patient");
      throw error;
    });
});

// Save detail of appointment into Report table in case of there is a specific patient
router.post("/report", async (req, res) => {
  const {
    date,
    time,
    doctor,
    firstName,
    lastName,
    idCard,
    id,
    sex,
    nation,
    tell,
    email,
    symptom,
    weight,
    tall,
    bloodType,
    pressure,
    hr,
    temperature,
  } = req.body;
  const reportUrl = `${DOMAIN_NAME}/report`;

  const appointmentTime = time.split("-")[0];
  const inputDate = date + " " + appointmentTime;
  // const inputDate = '3/3/2021 11-12';
  const outputFormat = "YYYY-MM-DD HH:mm:ss";
  const convertedDate = moment(inputDate, "D/M/YYYY HH").format(outputFormat);

  const report = {
    Patient_ID: id,
    Employee_ID: doctor,
    Report_Date: convertedDate,
    weight: weight,
    height: tall,
    Pressure: pressure,
    BPM: hr,
    Temp: temperature,
    Symptom: symptom,
  };
  //Create report
  await axios
    .post(reportUrl, report)
    .then((response) => {
      console.log("Save to report: ", response.data);
      res.status(200).send("Successfully create report with existed patient.");
    })
    .catch((error) => {
      res
        .status(500)
        .send("Failed to create Report backend with existed patient");
      throw error;
    });
});

// Save appointment into Apopint table
router.post("/appoint", async (req, res) => {
  const {
    date,
    time,
    doctor,
    firstName,
    lastName,
    idCard,
    id,
    sex,
    nation,
    tell,
    email,
    symptom,
    weight,
    tall,
    bloodType,
    pressure,
    hr,
    temperature,
  } = req.body;
  const appointUrl = `${DOMAIN_NAME}/appoint`;
  const reportUrl = `${DOMAIN_NAME}/report`;
  let reportID = "";

  //Get last report ID
  await axios
    .get(reportUrl)
    .then((response) => {
      const lastReport = response.data[response.data.length - 1];
      console.log("Last report: ", lastReport);
      reportID = lastReport.Report_ID;
    })
    .catch((error) => {
      console.error("Fail to create report with existed patient");
      throw error;
    });

  const appoint = {
    Employee_ID: doctor,
    Patient_ID: id,
    Report_ID: reportID,
  };
  // Create appoint
  await axios
    .post(appointUrl, appoint)
    .then((response) => {
      console.log("Appoint: ", appoint);
      console.log("Appointment is created Successfully", response.data);
      res.status(200).send("Appointment is created Successfully.");
    })
    .catch((error) => {
      res.status(500).send("Failed to create Appointment backend");
      throw error;
    });
});

module.exports = router;
