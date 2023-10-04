import { useEffect, useState } from "react";
import { getReportData } from "../data/reportData";
import CardReport from "./cardReport";

function ReportList() {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    getReportDataFromServer();
  }, []);

  const getReportDataFromServer = () => {
    getReportData()
      .then((data) => {
        if (data) {
          setReportList(data);
        } else {
          setReportList([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setReportList([]);
      });
  };

  const filteredReports = reportList.filter((report) => {
    if (select === "id") {
      return String(report.patient_id).includes(search);
    } else if (select === "name") {
      return report.patient_name.toLowerCase().includes(search.toLowerCase());
    } else if (select === "status") {
      return report.status.toLowerCase().includes(search.toLowerCase());
    } else {
      return true;
    }
  });
  

  const renderedReports = filteredReports.map((report, idx) => (
    <div className="w-fit drop-shadow-2xl rounded-xl" key={idx}>
      <CardReport report={report} />
    </div>
  ));

  return (
    <div className="flex justify-center">
      <div className="w-[1006px]">
        <div className='w-full mr-2.5'>
          <div className='flex bg-white shadow-2xl rounded-xl overflow-hidden mt-9 flex-col p-8 '>
            <p className=' font-normal font-bold text-3xl'>ค้นหาการนัดหมายแพทย์</p>
            <div className="flex flex-col items-center">
              <div className="my-5 w-4/5 lg:w-3/5">
                <p>
                  <label className=' font-normal font-bold text-sm text-gray-400 ml-3.5'>Search</label>
                  <label className=' font-normal font-bold text-sm text-red-600'>*</label>
                </p>
                <div className="flex items-center border border-gray-400 rounded-lg h-9 p-2.5 focus:outline-none w-full h-auto">
                  {select === "id" && (
                    <input
                      style={{ padding: 0, marginBottom: 0 }}
                      className="flex-grow border-none outline-none"
                      type="text"
                      placeholder="Patient ID"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  )}
                  {select === "name" && (
                    <input
                      style={{ padding: 0, marginBottom: 0 }}
                      className="flex-grow border-none outline-none"
                      type="text"
                      placeholder="Patient Name"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  )}
                  {select === "status" && (
                    <input
                      style={{ padding: 0, marginBottom: 0 }}
                      className="flex-grow border-none outline-none"
                      type="text"
                      placeholder="Patient Status"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  )}
                  <select
                    style={{ padding: 0, marginBottom: 0 }}
                    className="border-none outline-none flex-grow pr-2"
                    value={select}
                    onChange={(event) => setSelect(event.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="id">Select by ID</option>
                    <option value="name">Select by Name</option>
                    <option value="status">Select by Status</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
          

        <div  className="flex flex-wrap justify-between">
          {renderedReports}
        </div>
        
      </div>
    </div>
  );
}

export default ReportList;
