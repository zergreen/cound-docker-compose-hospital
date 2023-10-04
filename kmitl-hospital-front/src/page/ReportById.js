import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import formatThaiDateTime from "../function/formatThaiDateTime";
import { renderDeleteReport } from "../function/DeleteAppoint";

function ReportById() {
  const { id } = useParams();

  const [ReportList, setReportList] = useState([]);

  const divRef = React.createRef();

  const domain = `${process.env.REACT_APP_SERVER_DOMAIN}`;

  useEffect(() => {
    getReportDataFromServer(id);
  }, [id]);

  const getReportDataFromServer = (id) => {
    fetch(`${domain}/auth/report/` + id)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setReportList(result);
      })
      .catch((error) => console.log("error", error));
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleDownloadPDF = (report_id, pName, pLname) => {
    const element = divRef.current;
    const p_filename =
      report_id + "-" + pName + "-" + pLname + "-" + "เอกสารการนัดหมาย";
    console.log(p_filename);
    html2pdf()
      .set({
        filename: p_filename,
        margin: 10,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, logging: true },
      })
      .from(element)
      .save();
  };

  const formattedDateTime = ReportList.Report_Date
    ? formatThaiDateTime(ReportList.Report_Date)
    : "";

  const renderDeleteReportByID = ReportList.Report_ID
    ? renderDeleteReport(ReportList.Report_ID, navigate)
    : "";

  return (
    <div className="py-20 min-h-screen h-auto">
      <div className="border-l-8 border-orange-600 pl-1.5 ml-10 xl:ml-40">
        <h1 className="font-semibold text-4xl">การนัดหมายรายบุคคล</h1>
      </div>

      <div className="flex flex-col items-center" ref={divRef}>
        <div className="w-4/5 xl:w-3/5 flex bg-white shadow-2xl rounded-xl overflow-hidden mt-11 flex-col p-8 ">
          <div className="mb-4">
            {renderDeleteReportByID}
            <p className=" font-normal font-bold text-3xl">
              เลขที่เอกสาร / Document No : {ReportList.Report_ID}
            </p>
            <div className="mt-2 ml-3 md:ml-7">
              <p>
                <label className="font-bold text-lg leading-22">
                  เลขประจำตัวผู้ป่วย / HN :{" "}
                </label>
                <label className=" font-normal text-lg leading-27 text-gray-700 ">
                  {ReportList.Patient_ID}
                </label>
              </p>
              <p>
                <label className="font-bold text-lg leading-22">
                  เลขประจำตัวประชาขน / N-iD :{" "}
                </label>
                <label className=" font-normal text-lg leading-27 text-gray-700 ">
                  {ReportList.Patient_Citizen}
                </label>
              </p>
              <p>
                <label className="font-bold text-lg leading-22">
                  ชื่อ / Patient Name :{" "}
                </label>
                <label className=" font-normal text-lg leading-27 text-gray-700 ">
                  {ReportList.Patient_name} {ReportList.Patient_lname}
                </label>
              </p>
              <p>
                <label className="font-bold text-lg leading-22">
                  วันที่ออกเอกสาร / Date :{" "}
                </label>
                <label className=" font-normal text-lg leading-27 text-gray-700 ">
                  {formattedDateTime}
                </label>
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className=" font-normal text-gray-700 font-bold text-3xl ">
              ข้อมูลผู้ป่วย
            </p>
            <div className="xl:px-24">
              <div className="flex flex-col items-center ">
                <div className="flex flex-wrap md:flex-nowrap w-full justify-between pb-2">
                  <div className="w-full md:mr-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      e-mail
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.Patient_Email}
                    </p>
                  </div>

                  <div className="w-full md:ml-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      เบอร์โทรศัพท์
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.Patient_Tel1}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap w-full justify-between pb-2">
                  <div className="w-full md:mr-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      น้ำหนัก
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.weight}
                    </p>
                  </div>

                  <div className="w-full md:ml-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      ส่วนสูง
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.height}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap w-full justify-between pb-2">
                  <div className="w-full md:mr-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      เพศ
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.Patient_Sex}
                    </p>
                  </div>

                  <div className="w-full md:ml-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      หมู่โลหิต
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.BG}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap w-full justify-between pb-2">
                  <div className="w-full md:mr-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      ความดัน (มิลลิเมตรปรอท)
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.Pressure}
                    </p>
                  </div>

                  <div className="w-full md:ml-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      HR (BPM)
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.BPM}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap w-full justify-between pb-2">
                  <div className="w-1/2 md:mr-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      อุณหภูมิ (องศาเซลเซียส)
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.Temp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className=" font-normal text-gray-700 font-bold text-3xl ">
              ข้อมูลการวินิจฉัย
            </p>
            <div className="xl:px-24">
              <div className="flex flex-col items-center ">
                <div className="flex w-full justify-between pb-2">
                  <div className="w-full">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      อาการและปัญหา
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.Symptom}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap w-full justify-between pb-2">
                  <div className="w-full md:mr-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      แพทย์ผู้รักษา
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.Employee_name} {ReportList.Employee_Lname}
                    </p>
                  </div>

                  <div className="w-full md:ml-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      เบอร์โทรศัพท์
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.Employee_tel1}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap w-full justify-between pb-2">
                  <div className="w-full md:mr-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      แผนก
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.Department_ID}
                    </p>
                  </div>

                  <div className="w-full md:ml-2.5">
                    <label className=" font-normal text-lg leading-27 text-gray-700 ml-3.5">
                      ตำแหน่ง
                    </label>
                    <p className="border border-orange-400 rounded-lg py-1.5 px-2.5 focus:outline-none w-full flex items-center h-auto min-h-[38px]">
                      {ReportList.Position_ID}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around w-full my-11">
        <button
          className="w-32 h-11  font-bold text-base py-1.5 rounded-lg text-white bg-orange-600"
          onClick={handleBack}
        >
          ย้อนกลับ
        </button>
        {
          <button
            className="w-32 h-11  font-bold text-base py-1.5 rounded-lg text-white bg-orange-600"
            onClick={() =>
              handleDownloadPDF(
                ReportList.Report_ID,
                ReportList.Patient_name,
                ReportList.Patient_lname
              )
            }
          >
            พิมพ์ข้อมูล
          </button>
        }
      </div>

      {/* <div className="w-full bg-white p-9">
        <p> Employee_ID: {ReportList.Employee_ID}</p>
        <p> Employee_sex: {ReportList.Employee_sex}</p>
        <p> Employee_tel2: {ReportList.Employee_tel2}</p>
        <p> Employee_SP: {ReportList.Employee_SP}</p>
        <p> Position_ID: {ReportList.Position_ID}</p>
        <p> Department_ID: {ReportList.Department_ID}</p>
        <p> Employee_Lang: {ReportList.Employee_Lang}</p>
        <p> Employee_Image: {ReportList.Employee_Image}</p>
        <p> Patient_ID: {ReportList.Patient_ID}</p>
        <p> Patient_Tel2: {ReportList.Patient_Tel2}</p>
        <p> Patient_Address: {ReportList.Patient_Address}</p>
        <p> Patient_NRelative: {ReportList.Patient_NRelative}</p>
        <p> Patient_BD: {ReportList.Patient_BD}</p>
        <p> Patient_Allergic: {ReportList.Patient_Allergic}</p>
        <p> Patient_Disease: {ReportList.Patient_Disease}</p>
        <p> Patient_TelRelative: {ReportList.Patient_TelRelative}</p>
        <p> Patient_SignDate: {ReportList.Patient_SignDate}</p>
        <p> Patient_National: {ReportList.Patient_National}</p>
        <p> Patient_Citizen: {ReportList.Patient_Citizen}</p>
      </div> */}
    </div>
  );
}

export default ReportById;
