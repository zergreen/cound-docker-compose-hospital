import { React, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookingContext } from "../function/BookingContext";
import axios from "axios";

function ConfirmBooking() {
  const { bookingData } = useContext(BookingContext);
  const location = useLocation();
  const {
    image,
    fname,
    lname,
    department,
    selectedDate,
    selectedTime,
    patientFname,
    patientLname,
    patientIDcard,
    patientID,
    patientSex,
    patientNation,
    patientTell,
    patientEmail,
    patientSymptom,
    patientWeight,
    patientTall,
    patientBloodType,
    patientPressure,
    patientHR,
    patientTemperature,
    reportURL
  } = location.state || {};
  const navigate = useNavigate();

  const domain = `${process.env.REACT_APP_SERVER_DOMAIN}`

  const handleBack = () => {
    navigate(-1);
  };

  // Create Report
  const handleSubmit = async (event) => {
    console.log('11');
    console.log('reportURL: ' + reportURL);
    // alert(`
    // image, ${image} \n
    // fname, ${fname} \n
    // lname,  ${lname} \n
    // department,  ${department} \n
    // selectedDate, ${selectedDate} \n
    // selectedTime, ${selectedTime} \n
    // patientFname, ${patientFname} \n
    // patientLname, ${patientLname} \n
    // patientIDcard, ${patientIDcard} \n
    // patientID, ${patientID} \n
    // patientSex, ${patientSex} \n
    // patientNation, ${patientNation} \n
    // patientTell, ${patientTell} \n
    // patientEmail, ${patientEmail} \n
    // patientSymptom, ${patientSymptom} \n
    // patientWeight, ${patientWeight} \n
    // patientTall, ${patientTall} \n
    // patientBloodType, ${patientBloodType} \n
    // patientPressure, ${patientPressure} \n
    // patientHR, ${patientHR} \n
    // patientTemperature, ${patientTemperature} \n
    // reportURL ${reportURL}
    // `)
    event.preventDefault();
    const apiAppoint = `${domain}/appointment/appoint`;
    const Swal = require('sweetalert2')

    // Create Report with no existed patient
    if (reportURL === `${domain}/appointment/`) {
      console.log('Create Patient and save into Report.')
      const patientData = {
        date: selectedDate,
        time: selectedTime,
        doctor: bookingData?.id,
        firstName: patientFname,
        lastName: patientLname,
        idCard: patientIDcard,
        id: patientID,
        sex: patientSex,
        nation: patientNation,
        tell: patientTell,
        email: patientEmail,
        symptom: patientSymptom,
        weight: patientWeight,
        tall: patientTall,
        bloodType: patientBloodType,
        pressure: patientPressure,
        hr: patientHR,
        temperature: patientTemperature,
      };
      // Create a patient and save detail of patient and appointment into Report table
      await axios.post(reportURL, patientData)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          throw error;
        });
      // Save appoinment into Appoint table
      await axios.post(apiAppoint, patientData)
        .then(function (response) {
          if (response.status === 200) {
            Swal.fire(
              "บันทึกเสร็จสิ้น!",
              "คลิกปุ่มเพื่อกลับหน้าหลัก!",
              "success"
            ).then((result) => {
              if (result.isConfirmed) {
                navigate("/home");
              }
            });
          }
        })
        .catch(function (error) {
          throw error;
        });
    } else if (reportURL === `${domain}/appointment/report`) {
      // Create Report with existed patient
      console.log('Save detail of appointment into Report table')
      const patientData = {
        id: patientID,
        doctor: bookingData?.id,
        date: selectedDate,
        time: selectedTime,
        weight: patientWeight,
        tall: patientTall,
        pressure: patientPressure,
        hr: patientHR,
        temperature: patientTemperature,
        symptom: patientSymptom,
      };
      // Save detail of appointment into Report table
      axios.post(reportURL, patientData)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          throw error;
        });
      // Save appoinment into Appoint table
      await axios.post(apiAppoint, patientData)
        .then(function (response) {
          if (response.status === 200) {
            Swal.fire(
              "บันทึกเสร็จสิ้น!",
              "คลิกปุ่มเพื่อกลับหน้าหลัก!",
              "success"
            ).then((result) => {
              if (result.isConfirmed) {
                navigate("/home");
              }
            });
          }
        })
        .catch(function (error) {
          throw error;
        });
    }
  };

  return (
    <div className='py-20 min-h-screen h-auto'>
      <div className="border-l-8 border-orange-600 pl-1.5 mb-9 ml-10 xl:ml-40">
        <h1 className="font-semibold text-4xl">ตรวจสอบข้อมูลการนัดหมายแพทย์</h1>
      </div>

      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <div className="w-4/5 xl:w-3/5 flex bg-white shadow-2xl rounded-xl overflow-hidden">
          <img className="h-full w-60" src={image} alt="doctorImage" />
          <div className="w-full bg-white py-5 px-5">
            <div className="mb-3">
              <p className=" font-bold text-xl text-gray-700 mb-1">{fname} {lname}</p>
              <p className=" text-lg text-gray-700">Department :</p>
              <p className=" font-bold text-lg text-gray-700">{department}</p>
            </div>
            <div className='mb-3'>
              <div className='border-l-4 border-orange-600 pl-1.5 '>
                <p className=" font-bold text-xl text-gray-700 mb-2">เลือกวันที่</p>
              </div>
              <p>{selectedDate}</p>
            </div>
            <div className='mb-3'>
              <div className='border-l-4 border-orange-600 pl-1.5 '>
                <p className=" font-bold text-xl text-gray-700 mb-2">เลือกเวลา</p>
              </div>
              <p>{selectedTime}</p>
            </div>
          </div>
        </div>
        <div className='w-4/5 xl:w-3/5 flex bg-white shadow-2xl rounded-xl overflow-hidden mt-11 flex-col p-8 '>
          <p className=' font-normal font-bold text-3xl'>ข้อมูลผู้ป่วย</p>
          <div className='xl:px-24 mt-6'>
            <div className='flex flex-col items-center '>
              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      ชื่อ{" "}
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="text"
                    value={patientFname}
                    readOnly
                  />
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      นามสกุล
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="text"
                    value={patientLname}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex w-full justify-between pb-2">
                <div className="w-full">
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      รหัสบัตรประชาชน, Passport
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="number"
                    value={patientIDcard}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex w-full justify-between pb-2">
                <div className="w-full">
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      เลขประจำตัวผู้ป่วย (HN)
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="number"
                    value={patientID}
                    readOnly
                  />
                </div>
              </div>

              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      เพศ
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <select
                    className="border border-gray-400 rounded-lg h-9 focus:outline-none w-full"
                    value={patientSex}
                    readOnly
                  >
                    <option value={patientSex}>{patientSex}</option>
                  </select>
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      สัญชาติ
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="text"
                    value={patientNation}
                    readOnly
                  />
                </div>
              </div>

              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      เบอรโทร
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="tel"
                    value={patientTell}
                    readOnly
                  />
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      อีเมล
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="email"
                    value={patientEmail}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex w-full justify-between pb-2">
                <div className="w-full">
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      อาการและปัญหา
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <textarea
                    className="border border-gray-400 rounded-lg p-2.5 focus:outline-none w-full"
                    value={patientSymptom}
                    readOnly
                  />
                </div>
              </div>

              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      น้ำหนัก
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="number"
                    step="0.01"
                    value={patientWeight}
                    readOnly
                  />
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      ส่วนสูง
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="number"
                    step="0.01"
                    value={patientTall}
                    readOnly
                  />
                </div>
              </div>

              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      หมู่โลหิต
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="text"
                    value={patientBloodType}
                    readOnly
                  />
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      ความดัน (มิลลิเมตรปรอท)
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="number"
                    step="0.01"
                    value={patientPressure}
                    readOnly
                  />
                </div>
              </div>

              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      HR (bpm)
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="number"
                    value={patientHR}
                    readOnly
                  />
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=" font-normal font-bold text-sm text-gray-400 ml-3.5">
                      อุณหภูมิ (เซลเซียส)
                    </label>
                    <label className=" font-normal font-bold text-sm text-red-600">
                      *
                    </label>
                  </p>
                  <input
                    className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full"
                    type="number"
                    step="0.01"
                    value={patientTemperature}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </form>
        <div className="flex justify-around w-full m-11">
          <button
            className="w-32 h-11  font-bold text-base py-1.5 rounded-lg text-white bg-orange-600"
            onClick={handleBack}
          >
            ย้อนกลับ
          </button>
          <button
            className="w-32 h-11  font-bold text-base py-1.5 rounded-lg text-white bg-orange-600"
            type="submit"
            onClick={handleSubmit}
          >
            บันทึก
          </button>
        </div>
    </div>
  );
}

export default ConfirmBooking;
