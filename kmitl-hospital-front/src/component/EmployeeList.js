import Card from "./card";
import { useEffect, useState } from "react";
import { getEmployeeData } from "../data/employeeData";

function EmployeeList() {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorDataFromServer();
  }, []);

  const getDoctorDataFromServer = () => {
    // const id = 3;
    getEmployeeData()
      .then((data) => {
        if (data) {
          setDoctorList(data);
        } else {
          setDoctorList([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setDoctorList([]);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap flex-col items-center justify-center lg:justify-between lg:flex-row w-[1006px]">
        {doctorList.map((employee, idx) => (
          <div className="w-fit drop-shadow-2xl rounded-xl" key={idx}>
            <Card employee={employee} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
