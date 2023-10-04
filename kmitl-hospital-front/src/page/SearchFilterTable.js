import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./tableStyles.css";
import ActionButtons from "../component/ActionButtons";

import DateDropdown from "../component/DateDropdown";
import TimeSelector from "../component/TimeSelector";
import formatThaiDateTime from "../function/formatThaiDateTime";
import { renderX } from "../function/DeleteAppoint";

const SearchFilterTable = ({ data }) => {
  const [searchName, setSearchName] = useState("");
  const [reportID, setreportID] = useState("");
  const [searchStatus, setSearchStatus] = useState("waited");
  const [searchDate, setSearchDate] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [sortOrder, setSortOrder] = useState("asc");
  const [patientName, setPatientName] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredData(data);
    filterData('', '', '', searchStatus, '');
  }, [data]);

  const handleNameSearchChange = (event) => {
    const value = event.target.value;
    setSearchName(value);
    filterData(value, patientName, reportID, searchStatus, searchDate);
  };

  const handlePatientNameSearchChange = (event) => {
    const value = event.target.value;
    setPatientName(value);
    filterData(searchName, value, reportID, searchStatus, searchDate);
  };

  const handleReportIdSearch = (event) => {
    const value = event.target.value;
    setreportID(value);
    filterData(searchName, patientName, value, searchStatus, searchDate);
  };

  const handleStatusSearchChange = (event) => {
    const value = event.target.value;
    setSearchStatus(value);
    filterData(searchName, patientName, reportID, value, searchDate);
  };

  const handleDateSearchChange = (event) => {
    const value = event.target.value;
    setSearchDate(value);
    filterData(searchName, patientName, reportID, searchStatus, value);
  };

  // const formattedSelectedDate =
  //   selectedDay && selectedMonth && selectedYear
  //     ? new Date(
  //         selectedYear,
  //         selectedMonth - 1,
  //         selectedDay
  //       ).toLocaleDateString()
  //     : "";

  const handleTimeChange = (time) => {
    setSelectedTime(time);

    clickToChange(time);
  };

  const handleDateChange = (month, day, year) => {
    setSelectedMonth(month);
    setSelectedDay(day);
    setSelectedYear(year);

    // console.log(day);
    // console.log(year);
    // console.log(month);

    const formattedSelectedDate =
      day && year && month
        ? new Date(year, month - 1, day).toLocaleDateString()
        : "";

    // console.log(formattedSelectedDate);

    // const greenDate = year + "-" + month + "-" + day;
    const outputFormat = "YYYY-MM-DD";
    const greenDate = moment
      .utc(formattedSelectedDate, "DD/MM/YYYY")
      .startOf("hour")
      .format(outputFormat);

    // console.log(greenDate);

    setSearchDate(greenDate);
    filterData(searchName, patientName, reportID, searchStatus, greenDate);
  };

  const clickToChange = async (time) => {
    const formattedSelectedDate =
      selectedDay && selectedMonth && selectedYear
        ? new Date(
            selectedYear,
            selectedMonth - 1,
            selectedDay
          ).toLocaleDateString()
        : "";

    const green = formattedSelectedDate + " " + time;

    const outputFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
    const formattedDate1 = moment
      .utc(green, "DD/MM/YYYY H-mm")
      .startOf("hour")
      .format(outputFormat);

    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = formattedDate1.match(regex);
    const result = match && match[1];

    setSearchDate(result);
    filterData(searchName, patientName, reportID, searchStatus, formattedDate1);
  };

  const filterData = (Employee_name, Patient_name, Report_ID, Status, date) => {
    const filteredResults = data.filter(
      (item) =>
        (item.Employee_name.toLowerCase().includes(
          Employee_name.toLowerCase()
        ) ||
          item.Employee_ID.toString().includes(Employee_name)) &&
        item.Report_ID.toString().includes(Report_ID) &&
        (item.Patient_name.toString().includes(Patient_name) ||
          item.Patient_lname.toString().includes(Patient_name) ||
          item.Patient_Citizen.toString().includes(Patient_name) ||
          item.Patient_ID.toString().includes(Patient_name)) &&
        (Status === "" || item.Status.toLowerCase() === Status.toLowerCase()) &&
        item.Report_Date.includes(date)
    );
    setFilteredData(filteredResults);
  };

  const handleStatusToChange = () => {
    const newStatus = sortOrder === "asc" ? "waited" : "canceled";
    filterData(searchName, patientName, reportID, newStatus, searchDate);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortByDate = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a.Report_Date);
      const dateB = new Date(b.Report_Date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const goreportbyid = (value) => {
    navigate("/reportbyid/" + value);
  };

  const clear = () => {
    setSearchName("");
    setreportID("");
    setSearchStatus("");
    setSearchDate("");
    setPatientName("");
    filterData("", "", "", "", "");
  };

  const renderReportDate = (status, report_date, report_id, emp_id, emp_name, patient_name) => {
    const formattedThaiDateTime = formatThaiDateTime(report_date);

    const goedit = () => {
      if (status !== "confirm") {
        console.log(status);
        navigate("/appoint-edit", {
          state: {
            id: report_id,
            status,
            date: report_date,
            emp_id,
            emp_name,
            patient_name
          },
        });
      }
    };

    if (status !== "confirm") {
      return (
        <button style={{ backgroundColor: "#FF8C00" }} onClick={() => goedit()}>
          &#9998;{formattedThaiDateTime}
        </button>
      );
    } else if ((status = "canceled")) {
      return (
        <button style={{ backgroundColor: "#7FFFD4" }}>
          &#10003;{formattedThaiDateTime}
        </button>
      );
    }
  };

  const renderStatus = (status) => {
    if (status === "waited") {
      return <p style={{ color: "#FFD700" }}>waited</p>;
    } else if (status === "canceled") {
      return <p style={{ color: "red" }}>canceled</p>;
    } else {
      return <p style={{ color: "green" }}>confirm</p>;
    }
  };

  const show = (value) => {
    setSearchName(value);
    filterData(value, patientName, reportID, searchStatus, searchDate);
  };

  const showPname = (value) => {
    setPatientName(value);
    filterData(searchName, value, reportID, searchStatus, searchDate);
  };

  const renderRadio = () => {
    return (
      <>
        {/* <label>
        <input
          type="radio"
          name="status"
          value=""
          checked={searchStatus === ""}
          onChange={handleStatusSearchChange}
        />
        All Status
      </label> */}

        <label>
          <input
            type="radio"
            name="status"
            value="waited"
            checked={searchStatus === "waited"}
            onChange={handleStatusSearchChange}
          />
          Waited
        </label>

        <label>
          <input
            type="radio"
            name="status"
            value="canceled"
            checked={searchStatus === "canceled"}
            onChange={handleStatusSearchChange}
          />
          Cancel
        </label>

        {/* <label>
        <input
          type="radio"
          name="status"
          value="confirm"
          checked={searchStatus === "confirm"}
          onChange={handleStatusSearchChange}
        />
        Confirm
      </label> */}
      </>
    );
  };

  return (
    <div className='pt-20 min-h-screen h-auto'>
      <div className="border-l-8 border-orange-600 pl-1.5 mb-9 ml-10 xl:ml-40">
        <h1 className="font-semibold text-4xl">ตารางนัดหมาย</h1>
      </div>
      
      <div className='flex flex-col items-center'>
        <div className='w-5/6 xl:w-4/6 bg-white shadow-2xl p-8 mb-11 rounded-xl overflow-hidden'>
          
          <div className="flex justify-end">
            <button onClick={clear} className="w-auto h-11  font-bold text-base py-1.5 rounded-lg text-white bg-orange-600">
              CLEAR-INPUT
            </button>
          </div>

          <div className="mb-4">
            <div className="border-l-4 border-orange-600 pl-1.5 ">
              <p className="font-roboto font-bold text-2xl text-gray-700 mb-2">
                เลือกวันที่
              </p>
            </div>
            <div className="flex justify-center">
              <DateDropdown className='ml-0'
                selectedDate={{
                  day: selectedDay,
                  month: selectedMonth,
                  year: selectedYear,
                }}
                onDateChange={handleDateChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="border-l-4 border-orange-600 pl-1.5 ">
              <p className="font-roboto font-bold text-2xl text-gray-700 mb-2">
                เลือกเวลา
              </p>
            </div>
            <div className="flex justify-center">
              <TimeSelector
                selectedTime={selectedTime}
                onTimeChange={handleTimeChange}
              />
            </div>
          </div>
        </div>

        <div className='w-5/6 xl:w-4/6 bg-white shadow-2xl p-8 mb-11 rounded-xl overflow-hidden flex flex-col items-center'>
          <div className='flex flex-col w-full gap-y-2'>
            <div className="flex gap-x-3 item-center">
              <p className="w-1/3 font-bold text-2xl text-gray-700 ">ค้นหาจากรายชื่อแพทย์</p>
              <input
              className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none  flex items-center"
              style={{ marginBottom: '0' }}
              type="text"
              placeholder="Search by Doctor Name or Doctor ID..."
              value={searchName}
              onChange={handleNameSearchChange}
            />
            </div>
            <div className="flex gap-x-3 item-center">
              <p className="w-1/3 font-bold text-2xl text-gray-700 ">ค้นหาจากรายชื่อผู้ป่วย</p>
              <input
                className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none  flex items-center"
                style={{ marginBottom: '0' }}
                type="text"
                placeholder="Search by Patiend Name or Citizen ID or Patient ID..."
                value={patientName}
                onChange={handlePatientNameSearchChange}
              />
            </div>
            <div className="flex gap-x-3 item-center">
              <p className="w-1/3 font-bold text-2xl text-gray-700 ">ค้นหาจากเลขที่เอกสาร</p>
              <input
                className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none  flex items-center"
                style={{ marginBottom: '0' }}
                type="text"
                placeholder="Search by Report ID..."
                value={reportID}
                onChange={handleReportIdSearch}
              />
            </div>
            <div className="flex gap-x-3 item-center">
              <p className="w-1/3 font-bold text-2xl text-gray-700 ">ค้นหาจากวันที่</p>
              <input
                className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none  flex items-center"
                style={{ marginBottom: '0' }}
                type="text"
                placeholder="Search by Date..."
                value={searchDate}
                onChange={handleDateSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full w-5/6 xl:w-4/6 mb-2 flex justify-start ">
          <select className="w-auto h-11 font-bold text-base p-1.5 ml-8 rounded-lg text-white bg-orange-600" value={searchStatus} onChange={handleStatusSearchChange}>
            <option className="bg-slate-50 text-black" value="">ดูสถานะทั้งหมด</option>
            <option className="bg-slate-50 text-black" value="waited">Waited</option>
            <option className="bg-slate-50 text-black" value="canceled">Cancel</option>
            <option className="bg-slate-50 text-black" value="confirm">Confirm</option>
          </select>
        </div>
        

        {/* {renderRadio()} */}
        
        <div className='w-full w-5/6 xl:w-4/6 max-h-96 bg-white shadow-2xl mb-11 rounded-xl overflow-hidden overflow-y-scroll'>
          <table className="border-collapse border border-orange-400 ">
            <thead className="sticky top-0 border border-orange-500">
              <tr>
                <td className="border border-orange-500 p-2 bg-orange-500 font-bold text-white text-center">ID</td>
                <th className="border border-orange-500 p-2 bg-orange-500 font-bold text-white text-center">Doctor_Name</th>
                <th className="border border-orange-500 p-2 bg-orange-500 font-bold text-white text-center">Patient_name</th>
                <th className="border border-orange-500 p-2 bg-orange-500 font-bold text-white text-center">Report_ID</th>
                <th className="border border-orange-500 p-2 bg-orange-500 font-bold text-white text-center">
                  {<button onClick={handleSortByDate}>Report_Date &#8661;</button>}
                </th>
                <th className="border border-orange-500 p-2 bg-orange-500 font-bold text-white text-center">
                  {<button onClick={handleStatusToChange}>Status &#8661;</button>}
                </th>
                <th className="border border-orange-500 p-2 bg-orange-500 font-bold text-white text-center">Symptom</th>
                <th className="border border-orange-500 p-2 bg-orange-500 font-bold text-white text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.Appoint_ID}>
                  <td className="border border-orange-500 p-2 text-center">{index + 1}</td>
                  <td className="border border-orange-500 p-2 text-center">
                    <button onClick={() => show(item.Employee_name)}>
                      Dr. {item.Employee_name} {item.Employee_Lname}
                    </button>
                  </td>
                  <td className="border border-orange-500 p-2 text-center">
                    <button onClick={() => showPname(item.Patient_name)}>
                      {item.Patient_name} {item.Patient_lname}
                    </button>
                  </td>
                  <td className="border border-orange-500 p-2 text-center">
                    <button onClick={() => goreportbyid(item.Report_ID)}>
                      {item.Report_ID}
                    </button>
                  </td>
                  <td className="border border-orange-500 p-2 text-center">
                    {renderReportDate(
                      item.Status,
                      item.Report_Date,
                      item.Report_ID,
                      item.Employee_ID,
                      item.Employee_name + " " + item.Employee_Lname,
                      item.Patient_name + " " + item.Patient_lname
                    )}
                  </td>
                  <td className="border border-orange-500 p-2 text-center">{renderStatus(item.Status)}</td>
                  <td className="border border-orange-500 p-2 text-center">{item.Symptom}</td>
                  <td className="border border-orange-500 p-2 text-center">
                    <ActionButtons
                      id={item.Report_ID}
                      name={item.Employee_name}
                      age={item.report_id}
                      status={item.Status}
                      date={item.Report_Date}
                    />
                     {renderX(item.Appoint_ID)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterTable;
