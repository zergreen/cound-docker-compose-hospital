import { NavLink } from "react-router-dom";
import { renderDeleteReport } from '../function/DeleteAppoint';
function CardReport({ report }) {
  
  return (<>
      <div className="w-[480px] h-auto flex bg-white shadow-2xl rounded-xl overflow-hidden mt-11 flex-col p-8 ">
  {renderDeleteReport(report.report_id)}
          
    <NavLink to={`/reportbyid/${report.report_id}`} >
          <p className='font-normal font-bold text-3xl'>ข้อมูลผู้ป่วย</p>
          <div className='mt-4'>
            <div>
              {/* <p>Employee_ID : {report.employee_id}</p> */}
              <p>
                <label className='font-bold text-18 leading-22'>เลขประจำตัวผู้ป่วย / HN : </label>
                {report.patient_id}
              </p>
              <p>
                <label className='font-bold text-18 leading-22'>ชื่อ / Patient Name : </label>
                {report.patient_name} {report.patient_lname}
              </p>
              <p>
                <label className='font-bold text-18 leading-22'>เลขที่เอกสาร / Document No : </label>
                {report.report_id}
              </p>
              <p>
                <label className='font-bold text-18 leading-22'>วันที่ออกเอกสาร / Date : </label>
                {report.report_date}
              </p>
              <p>
                <label className='font-bold text-18 leading-22'>สถานะ / Status : </label>
                {report.status}
              </p>
            </div>
            <div className='flex flex-col items-center mt-2'>
              <div className='flex w-full justify-between pb-2'>
                <div className='w-full mr-2.5'>
                  <label className=' font-normal font-bold text-sm ml-3.5'>น้ำหนัก</label>
                  <p className="border border-orange-400 rounded-lg  p-1.5 focus:outline-none w-full h-auto min-h-[30px]">{report.weight}</p>
                </div>
                <div className='w-full ml-2.5'>
                  <label className=' font-normal font-bold text-sm ml-3.5'>ส่วนสูง</label>
                  <p className="border border-orange-400 rounded-lg  p-1.5 focus:outline-none w-full h-auto min-h-[30px]">{report.height}</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center '>
              <div className='flex w-full justify-between pb-2'>
                <div className='w-full mr-2.5'>
                  <label className=' font-normal font-bold text-sm ml-3.5'>ความดัน (มิลลิเมตรปรอท)</label>
                  <p className="border border-orange-400 rounded-lg  p-1.5 focus:outline-none w-full h-auto min-h-[30px]">{report.pressure}</p>
                </div>
                <div className='w-full ml-2.5'>
                  <label className=' font-normal font-bold text-sm ml-3.5'>HR (BPM)</label>
                  <p className="border border-orange-400 rounded-lg  p-1.5 focus:outline-none w-full h-auto min-h-[30px]">{report.bpm}</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center '>
              <div className='flex w-full justify-between pb-2'>
                <div className='w-1/2 mr-2.5'>
                  <label className=' font-normal font-bold text-sm ml-3.5'>อุณหภูมิ (เซลเซียส)</label>
                  <p className="border border-orange-400 rounded-lg  p-1.5 focus:outline-none w-full h-auto min-h-[30px]">{report.temp}</p>
                </div>
              </div>
            </div>
            <div className='flex w-full justify-between pb-2'>
                <div className='w-full'>
                  <label className=' font-normal font-bold text-sm ml-3.5'>อาการและปัญหา</label>
                  <p className="border border-orange-400 rounded-lg  p-1.5 focus:outline-none w-full h-auto min-h-[30px] min-h-[40px]">{report.symptom}</p>
                </div>
              </div>
          </div>
      {/* <img className="h-full w-52" src={null} alt="doctorImage" /> */}
    </NavLink>
    </div>
    </>
  );
}

export default CardReport;