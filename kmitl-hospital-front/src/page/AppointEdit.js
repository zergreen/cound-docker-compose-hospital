import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DateDropdown from "../component/DateDropdown";
import TimeSelector from "../component/TimeSelector";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import formatThaiDateTime from "../function/formatThaiDateTime";

function AppointEdit() {
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedTime, setSelectedTime] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [oldDate, setOldDate] = useState("");
  const domain = `${process.env.REACT_APP_DB_DOMAIN}`

  const navigate = useNavigate();
  const location = useLocation();

  const { id, name, date, age, status, emp_id, emp_name, patient_name } = location.state || {};

  const shouldLog = useRef(true)
  useEffect(() => {
    if(shouldLog.current){
      shouldLog.current = false

      setOldDate(formatThaiDateTime(date))
      fetchReport()
    }
  }, [date]);

  const fetchReport = async () => {
    try {
      const response = await axios.get(domain+'/report');
      setJsonData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (month, day, year) => {
    setSelectedDate({ day, month, year });
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  // selectedDate.year will get => "2565" or "2023" base on interface

  const formattedSelectedDate =
    selectedDate.day && selectedDate.month && selectedDate.year
      ? new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).toLocaleDateString('en')
      : "";

  const handleSubmit = (event) => {
    event.preventDefault();

    

    const originalDateString = formattedSelectedDate + " " + selectedTime;
    const formattedDate = moment(originalDateString, "MM/DD/YYYY HH-mm")
      .startOf("hour")
      .format("YYYY-MM-DD HH:mm");
    // login date input!
    // alert(`originalDate: ${originalDateString} \nAfterFormat: ${formattedDate}`)

    const outputFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
    const formattedDate1 = moment
      .utc(originalDateString, "DD/MM/YYYY H-mm")
      .startOf("hour")
      .format(outputFormat);

    const filteredData = jsonData.filter((item) => item.Employee_ID === emp_id && item.Report_Date === formattedDate1);

    if (filteredData.length > 0) {
      alert("เวลาชน เลือกวันเวลาใหม่");
    } else {

      const data = new URLSearchParams({
        report_date: formattedDate,
        status: "waited",
      });

      axios
        .put(`${domain}/report-custom/update-report-date/${id}`, data.toString(), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire("Appoint!", "Your appoint has been complete.", "success").then((result) => {
              if (result.isConfirmed) {
                navigate("/appoint");
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire("Error!", "Cannot process to appoint", "error");
        })
        .finally(() => {
          // Common logic for both success and error cases
        });
    }
  };

  return (
    <div className='pt-20 min-h-screen h-auto'>
      <div className="border-l-8 border-orange-600 pl-1.5 mb-9 ml-10 xl:ml-40">
        <h1 className="font-semibold text-4xl">แก้ไขเวลานัดหมาย</h1>
      </div>
      
      <div className='flex flex-col items-center'>
        <div className='w-5/6 xl:w-4/6 bg-white shadow-2xl p-8 mb-11 rounded-xl overflow-hidden'>
          <div className="mb-4">
            <p className="w-full font-bold text-2xl text-gray-700">REPORT_ID : <label className="text-xl">{id}</label></p>
            <p className="w-full font-bold text-2xl text-gray-700">EMP_Name : <label className="text-xl">{emp_name}</label></p>
            <p className="w-full font-bold text-2xl text-gray-700">Patient_Name : <label className="text-xl">{patient_name}</label></p>
            <p className="w-full font-bold text-2xl text-gray-700">OLD DATETIME : <input className="text-xl text-gray-700 " style={{ marginBottom: '0', width:'fit-content', padding: '0' }} type="text" value={oldDate} readOnly /> </p>
            {/* <p>EMP_ID: {emp_id}</p> */}
          </div>
          <div className="mb-4">
            <div className="border-l-4 border-orange-600 pl-1.5 ">
              <p className="font-roboto font-bold text-2xl text-gray-700 mb-2">
                เลือกวันที่
              </p>
            </div>
            <div className="flex justify-center">
              <DateDropdown selectedDate={selectedDate} onDateChange={handleDateChange} />
            </div>
          </div>
          <div className="mb-4">
            <div className="border-l-4 border-orange-600 pl-1.5 ">
              <p className="font-roboto font-bold text-2xl text-gray-700 mb-2">
                เลือกเวลา
              </p>
            </div>
            <div className="flex justify-center">
              <TimeSelector selectedTime={selectedTime} onTimeChange={handleTimeChange} />
            </div>
          </div>
          <div className="flex justify-around mt-11">
            <button
              className="w-32 h-11 font-roboto font-bold text-base py-1.5 rounded-lg text-white bg-orange-600"
              onClick={() => navigate(-1)}
            >
              ย้อนกลับ
            </button>
            <button
              className="w-32 h-11 font-roboto font-bold text-base py-1.5 rounded-lg text-white bg-orange-600"
              onClick={handleSubmit}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointEdit;
