import React, { useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import he from 'he';

function InputBooking() {
    const location = useLocation();
    const {selectedDate, selectedTime, fname, lname, image, department ,patientData, existedCitizen, patientIDCitizen} = location.state || {};

    const [patientFname, setPatientFname] = useState(patientData.Patient_name);
    const [patientLname, setPatientLname] = useState(patientData.Patient_lname);
    const [patientIDcard, setPatientIDcard] = useState(patientIDCitizen);
    const [patientID, setPatientID] = useState(patientData.Patient_ID);
    const [patientSex, setPatientSex] = useState(patientData.Patient_Sex);
    const [patientNation, setPatientNation] = useState(patientData.Patient_National);
    const [patientTell, setPatientTell] = useState(patientData.Patient_Tel1);
    const [patientEmail, setPatientEmail] = useState(patientData.Patient_Email);
    const [patientSymptom, setPatientSymptom] = useState('');
    const [patientWeight, setPatientWeight] = useState('');
    const [patientTall, setPatientTall] = useState('');
    const [patientBloodType, setPatientBloodType] = useState(patientData.BG);
    const [patientPressure, setPatientPressure] = useState('');
    const [patientHR, setPatientHR] = useState('');
    const [patientTemperature, setPatientTemperature] = useState('');
    const domain = `${process.env.REACT_APP_SERVER_DOMAIN}`

  const handlePatientFname = (event) => {
    setPatientFname(event.target.value);
  };
  const handlePatientLname = (event) => {
    setPatientLname(event.target.value);
  };
  const handlePatientIDcard = (event) => {
    setPatientIDcard(event.target.value);
  };
  const handlePatientID = (event) => {
    setPatientID(event.target.value);
  };
  const handlePatientSex = (event) => {
    setPatientSex(event.target.value);
  };
  const handlePatientNation = (event) => {
    setPatientNation(event.target.value);
  };
  const handlePatientTell = (event) => {
    setPatientTell(event.target.value);
  };
  const handlePatientEmail = (event) => {
    setPatientEmail(event.target.value);
  };
  const handlePatientSymptom = (event) => {
    setPatientSymptom(event.target.value);
  };
  const handlePatientWeight = (event) => {
    setPatientWeight(event.target.value);
  };
  const handlePatientTall = (event) => {
    setPatientTall(event.target.value);
  };
  const handlePatientBloodType = (event) => {
    setPatientBloodType(event.target.value);
  };
  const handlePatientPressure = (event) => {
    setPatientPressure(event.target.value);
  };
  const handlePatientHR = (event) => {
    setPatientHR(event.target.value);
  };
  const handleTemperature = (event) => {
    setPatientTemperature(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let reportURL = '';
    // Check if there is ID card of patient from Booking file
    if (existedCitizen) {
      reportURL = `${domain}/appointment/report`;
    } else {
      reportURL = `${domain}/appointment/`;

    }
    navigate('/confirmbooking', {
      state: {
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
        patientWeight: he.encode(patientWeight),
        patientTall: he.encode(patientTall),
        patientBloodType,
        patientPressure,
        patientHR: he.encode(patientHR),
        patientTemperature: he.encode(patientTemperature),
        reportURL
        // Check existed patient [Not use]
        // patientCitizen: patientData.Patient_Citizen

        // he.encode() will make error and it
        // reflect route because it invalid syntax
      },
    });
  };

  const handleBack = () => {
    navigate('/booking');
  };

  return (
    <div className='py-20 min-h-screen h-auto'>
      <div className="border-l-8 border-orange-600 pl-1.5 mb-9 ml-10 xl:ml-40">
        <h1 className="font-semibold text-4xl">ข้อมูลการนัดหมายแพทย์</h1>
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
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>ชื่อ </label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="text" value={patientFname} onChange={handlePatientFname} required/>
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>นามสกุล</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="text" value={patientLname} onChange={handlePatientLname} required/>
                </div>
              </div>

              <div className='flex w-full justify-between pb-2'>
                <div className='w-full'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>รหัสบัตรประชาชน, Passport</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="number" value={patientIDcard} onChange={handlePatientIDcard} required/>
                </div>
              </div>

              <div className='flex w-full justify-between pb-2'>
                <div className='w-full'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>เลขประจำตัวผู้ป่วย (HN)</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="number" value={patientID} onChange={handlePatientID} required/>
                </div>
              </div>

              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>เพศ</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <select className="border border-gray-400 rounded-lg h-9 focus:outline-none w-full" value={patientSex} onChange={handlePatientSex} >
                        <option value="">เพศ</option>
                        <option value="ชาย">ชาย</option>
                        <option value="หญิง">หญิง</option>
                    </select>
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>สัญชาติ</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="text" value={patientNation} onChange={handlePatientNation} required/>
                </div>
              </div>
              
              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>เบอรโทร</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="tel" value={patientTell} onChange={handlePatientTell} required/>
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>อีเมล</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="email" value={patientEmail} onChange={handlePatientEmail} required/>
                </div>
              </div>

              <div className='flex w-full justify-between pb-2'>
                <div className='w-full'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>อาการและปัญหา</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <textarea className="border border-gray-400 rounded-lg p-2.5 focus:outline-none w-full" value={patientSymptom} onChange={handlePatientSymptom} required/>
                </div>
              </div>

              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>น้ำหนัก</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="number" step="0.01" value={patientWeight} onChange={handlePatientWeight} required/>
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>ส่วนสูง</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="number" step="0.01" value={patientTall} onChange={handlePatientTall} required/>
                </div>
              </div>

              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>หมู่โลหิต</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="text" value={patientBloodType} onChange={handlePatientBloodType} required/>
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>ความดัน (มิลลิเมตรปรอท)</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="number" step="0.01" value={patientPressure} onChange={handlePatientPressure} required/>
                </div>
              </div>

              <div className='flex flex-wrap md:flex-nowrap w-full justify-between pb-2'>
                <div className='w-full md:mr-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>HR (bpm)</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="number" value={patientHR} onChange={handlePatientHR} required/>
                </div>

                <div className='w-full md:ml-2.5'>
                  <p>
                    <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>อุณหภูมิ (เซลเซียส)</label>
                    <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                  </p>
                  <input className="border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full" type="number" step="0.01" value={patientTemperature} onChange={handleTemperature} required/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-around w-full m-11'>
          <button className="w-32 h-11  font-bold text-base py-1.5 rounded-lg text-white bg-orange-600" onClick={handleBack}>ย้อนกลับ</button>
          <button className="w-32 h-11  font-bold text-base py-1.5 rounded-lg text-white bg-orange-600" type="submit">ถัดไป</button>
        </div>
      </form>
        
    </div>
  );
}

export default InputBooking;
