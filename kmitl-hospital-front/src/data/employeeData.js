const domain = `${process.env.REACT_APP_SERVER_DOMAIN}`
async function getEmployeeData() {
    return fetch(`${domain}/doctor`)
      .then(response => response.json())
      .then(data => {
        // let employeeData = data.find(employee => employee.Employee_ID === id);
        let employeeData = [];
        for(let i=0; i<data.length; i++) {
            employeeData.push({
                id : data[i].Employee_ID,
                fname : data[i].Employee_name,
                lname : data[i].Employee_Lname,
                department : data[i].Department_name,
                image : data[i].Employee_Image,
                language : data[i].Employee_Lang              
            })
        }
        
        if (employeeData === undefined) {
          console.log("Doctor are not found")
          return undefined;
        }
  
        return employeeData
      })
      .catch(error => {
        console.error('Error:', error);
        return undefined;
      });
  }
  export { getEmployeeData };
  
