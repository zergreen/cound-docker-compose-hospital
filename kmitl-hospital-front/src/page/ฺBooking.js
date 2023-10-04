import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../function/BookingContext";
import { checkExistedPatient } from "../function/CheckExistedPatient";
import DateDropdown from "../component/DateDropdown";
import TimeSelector from "../component/TimeSelector";
import he from "he";
import moment from "moment";

function Booking() {
  const navigate = useNavigate();
  const { bookingData } = useContext(BookingContext);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientIDcard, setPatientIDcard] = useState("");
  const [jsonData, setJsonData] = useState([]);

  const [tempYear, setTempYear] = useState("");
  const domain = `${process.env.REACT_APP_DB_DOMAIN}`

  useEffect(() => {fetchReport()},[])

  const fetchReport = async () => {
    const response = await fetch(domain+'/report');
    const temp = await response.json();
    setJsonData(temp)
  }

  const handleDateChange = (month, day, year) => {
    setSelectedMonth(month);
    setSelectedDay(day);
    setSelectedYear(year);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handlePatientIDcard = (event) => {
    setPatientIDcard(event.target.value);
  };

  const checkDatetimeis = async () => {
    // alert(`DATE: ${formattedSelectedDate} \n TIME: ${selectedTime}`)
    const inputDate = formattedSelectedDate + " " + selectedTime;
    const outputFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
    const formattedDate = moment
      .utc(inputDate, "DD/MM/YYYY H-mm")
      .startOf("hour")
      .format(outputFormat);
    // alert(`FORMATDATE: ${formattedDate}`)

    // const response = await fetch("https://database.porapipat.me/api/report");
    // const jsonData = await response.json();

    // console.log('34');
    // console.log(formattedDate)
    // console.log(jsonData);

    const foundObject = jsonData.find(item => item.Report_Date === formattedDate);
    console.log(foundObject);
    const foundEmpid = jsonData.find(item => item.Employee_ID === bookingData.id);
    if(foundObject && foundEmpid){
      return false
    }
    return true
  };

  const handleSubmit = async () => {
    const status = await checkDatetimeis();

    // await new Promise(resolve => setTimeout(resolve, 1000));
    
    // alert('Status: '+status);
    if(status){
      checkExistedPatient(patientIDcard).then((patientData) => {
      if(patientData === undefined) {
        navigate('/inputbooking', {
          state: {
            selectedDate: formattedSelectedDate,
            selectedTime,
            fname: bookingData?.fname,
            lname: bookingData?.lname,
            image: bookingData?.image,
            department: bookingData?.department,
            patientIDCitizen: he.encode(patientIDcard),
            patientData: {
              Patient_name: null,
              Patient_lname: null,
              Patient_Citizen: null,
              Patient_ID: null,
              Patient_Sex: null,
              Patient_National: null,
              Patient_Tel1: null,
              Patient_Email: null,
              BG: null,
            },
            existedCitizen: false,
          },
        });
      } else {
        navigate('/inputbooking', {
          state: {
            selectedDate: formattedSelectedDate,
            selectedTime,
            fname: bookingData?.fname,
            lname: bookingData?.lname,
            image: bookingData?.image,
            department: bookingData?.department,
            patientIDCitizen: he.encode(patientIDcard),
            patientData: patientData,
            existedCitizen: true,
          },
        });
      }
    })
    } else {
      alert('เวลาชน จองใหม่นะ')
    }
  };

  const handleBack = () => {
    navigate("/home");
  };

  const formattedSelectedDate =
    selectedDay && selectedMonth && selectedYear
      ? new Date(
          selectedYear,
          selectedMonth - 1,
          selectedDay
        ).toLocaleDateString()
      : "";

  return (
    <div className="py-20 min-h-screen h-auto">
      <div className="border-l-8 border-orange-600 pl-1.5 mb-9 ml-10 xl:ml-40 ">
        <h1 className="font-semibold text-4xl">นัดหมายแพทย์</h1>
      </div>

      <div className="flex justify-center">
        <div className="w-[360px] sm:w-4/5 xl:w-7/12 flex flex-col bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="flex justify-center sm:justify-normal">
            <img
              className="h-full w-[260px] sm:w-60"
              src={bookingData?.image}
              alt="doctorImage"
            />
            <div className="hidden sm:block py-5 px-5">
              <div className="mb-4">
                <p className="font-roboto font-bold text-xl text-gray-700 mb-1">
                  {bookingData?.fname} {bookingData?.lname}
                </p>
                <p className="font-roboto text-lg text-gray-700">Department :</p>
                <p className="font-roboto font-bold text-lg text-gray-700">
                  {bookingData?.department}
                </p>
              </div>
              <div className="mb-4">
                <div className="border-l-4 border-orange-600 pl-1.5 ">
                  <p className="font-roboto font-bold text-xl text-gray-700 mb-2">
                    เลือกวันที่
                  </p>
                </div>
                <div className="pl-3">
                  <DateDropdown
                    selectedDate={{
                      day: selectedDay,
                      month: selectedMonth,
                      year: selectedYear,
                    }}
                    onDateChange={handleDateChange}
                  />
                </div>
              </div>
              <div className="hidden lg:block mb-4">
                <div className=" border-l-4 border-orange-600 pl-1.5 ">
                  <p className="font-roboto font-bold text-xl text-gray-700 mb-2">
                    เลือกเวลา
                  </p>
                </div>
                <div className="pl-3">
                  <TimeSelector
                    selectedTime={selectedTime}
                    onTimeChange={handleTimeChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white py-5 px-5">
            <div className="sm:hidden">
              <div className="mb-4">
                <p className="font-roboto font-bold text-xl text-gray-700 mb-1">
                  {bookingData?.fname} {bookingData?.lname}
                </p>
                <p className="font-roboto text-lg text-gray-700">Department :</p>
                <p className="font-roboto font-bold text-lg text-gray-700">
                  {bookingData?.department}
                </p>
              </div>
              <div className="mb-4">
                <div className="border-l-4 border-orange-600 pl-1.5 ">
                  <p className="font-roboto font-bold text-xl text-gray-700 mb-2">
                    เลือกวันที่
                  </p>
                </div>
                <DateDropdown
                  selectedDate={{
                    day: selectedDay,
                    month: selectedMonth,
                    year: selectedYear,
                  }}
                  onDateChange={handleDateChange}
                />
              </div>
              <div className="hidden lg:block mb-4">
                <div className=" border-l-4 border-orange-600 pl-1.5 ">
                  <p className="font-roboto font-bold text-xl text-gray-700 mb-2">
                    เลือกเวลา
                  </p>
                </div>
                <TimeSelector
                  selectedTime={selectedTime}
                  onTimeChange={handleTimeChange}
                />
              </div>
            </div>
            <div className="lg:hidden mb-4">
              <div className="border-l-4 border-orange-600 pl-1.5 ">
                <p className="font-roboto font-bold text-xl text-gray-700 mb-3.5">
                  เลือกเวลา
                </p>
              </div>
              <TimeSelector
                selectedTime={selectedTime}
                onTimeChange={handleTimeChange}
              />
            </div>

            <div className="w-full">
              <div className="border-l-4 border-orange-600 pl-1.5 ">
                <p className="font-roboto font-bold text-xl text-gray-700 mb-3.5">
                  รหัสบัตรประชาชน, Passport
                </p>
              </div>
              <input
                className="w-3/4 border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-3/4"
                type="number"
                value={patientIDcard}
                onChange={handlePatientIDcard}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around mt-11">
        <button
          className="w-32 h-11 font-roboto font-bold text-base py-1.5 rounded-lg text-white bg-orange-600"
          onClick={handleBack}
        >
          ย้อนกลับ
        </button>
        <button
          className="w-32 h-11 font-roboto font-bold text-base py-1.5 rounded-lg text-white bg-orange-600"
          onClick={handleSubmit}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}

export default Booking;
