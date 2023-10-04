const domain = `${process.env.REACT_APP_SERVER_DOMAIN}`
async function getReportData() {
    return fetch(`${domain}/auth/report`)
      .then(response => response.json())
      .then(data => {
        // console.table(data);
        // let reportData = data.find(employee => employee.Employee_ID === id);
        let reportData = [];
        for(let i=0; i<data.length; i++) {
            reportData.push({
              report_id : data[i].Report_ID,
              patient_id : data[i].Patient_ID,
              employee_id : data[i].Employee_ID,
              report_date : data[i].Report_Date,
              weight: data[i].weight,
              height: data[i].height,
              pressure: data[i].Pressure,
              bpm: data[i].BPM,
              temp: data[i].Temp,
              symptom: data[i].Symptom,  
              status: data[i].Status,  
              patient_name: data[i].Patient_Name,               
            })
        }
        
        if (reportData === undefined) {
          console.log("Doctor are not found")
          return undefined;
        }
  
        return reportData
      })
      .catch(error => {
        console.error('Error:', error);
        return undefined;
      });
  }

  
  export { getReportData };
  
