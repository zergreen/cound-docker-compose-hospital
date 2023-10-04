const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all reports
router.get('/', (req, res) => {
    db.query('SELECT Report.*,Patient.Patient_Name,Patient.Patient_Citizen FROM Report JOIN Patient ON Report.Patient_ID = Patient.Patient_ID;', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve reports' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific report by ID
router.get('/:id', (req, res) => {
    const reportId = req.params.id;

    db.query(
        'SELECT Report.Report_ID,Report.Report_Date,Report.weight,Report.height,Report.Pressure,Report.BPM,Report.Temp,Report.Symptom,Report.Status,Employee.*,Patient.Patient_ID,Patient.Patient_Sex,Patient.Patient_Tel1,Patient.Patient_Tel2,Patient.Patient_Address,Patient.Patient_NRelative,Patient.Patient_name,Patient.Patient_lname,Patient.Patient_BD,Patient.Patient_Allergic,Patient.Patient_Disease,Patient.Patient_TelRelative,Patient.Patient_SignDate,Patient.Patient_National,Patient.Patient_Citizen,Patient.BG,Patient.Patient_Email,Department.Department_Name,Position.Position_Name FROM Report INNER JOIN Employee ON Report.Employee_ID = Employee.Employee_ID INNER JOIN Patient ON Report.Patient_ID = Patient.Patient_ID INNER JOIN Position ON Employee.Position_ID = Position.Position_ID INNER JOIN Department ON Employee.Department_ID = Department.Department_ID WHERE Report_ID = ?',
        [reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve report' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Report not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new report
router.post('/', (req, res) => {
    const { Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp, Symptom } = req.body;

    db.query(
        'INSERT INTO Report (Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp, Symptom) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp, Symptom],
        (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: `ERROR: Patient_ID: ${Patient_ID}, Employee_ID: ${Employee_ID}, Report_Date: ${Report_Date}, weight: ${weight}, height: ${height}, Pressure: ${Pressure}, BPM: ${BPM}, TEMP: ${Temp}, Symptom: ${Symptom}` });
            } else {
                res.status(201).json({ message: `Report created successfully xD -> Patient_ID: ${Patient_ID}, Employee_ID: ${Employee_ID}, Report_Date: ${Report_Date}, weight: ${weight}, height: ${height}, Pressure: ${Pressure}, BPM: ${BPM}, TEMP: ${Temp}, Symptom: ${Symptom}` });
            }
        }
    );
});

// Update a report
router.put('/:id', (req, res) => {
    const reportId = req.params.id;
    const { Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp, Symptom, Status } = req.body;

    db.query(
        'UPDATE Report SET Patient_ID = ?, Employee_ID = ?, Report_Date = ?, weight = ?, height = ?, Pressure = ?, BPM = ?, Temp = ?, Symptom = ?, Status = ? WHERE Report_ID = ?',
        [Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp, Symptom, Status, reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update report' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Report not found' });
            } else {
                res.status(200).json({ message: 'Report updated successfully' });
            }
        }
    );
});

// Delete a report
router.delete('/:id', (req, res) => {
    const reportId = req.params.id;

    db.query(
        'DELETE FROM Report WHERE Report_ID = ?',
        [reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete report' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Report not found' });
            } else {
                res.status(200).json({ message: 'Report deleted successfully' });
            }
        }
    );
});

module.exports = router;
