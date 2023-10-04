import React, {useState} from "react";

import DateDropdown from "./DateDropdown";
import TimeSelector from "./TimeSelector";
import moment from "moment";

function DateTime(props) {

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [datetime, setDateTime] = useState("");

  const handleDateChange = (month, day, year) => {
    setSelectedMonth(month);
    setSelectedDay(day);
    setSelectedYear(year);

    // convertDateTime();

    // props.sendDataToParent(datetime)

   
    // props.sendDataToParent(data)
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time)
    console.log(`TIME: ${selectedTime}`)
    console.log(`DATE: ${formattedSelectedDate}`)

    // convertDateTime();

    // props.sendDataToParent(datetime)

    // props.sendDataToParent(data)
  };

  const formattedSelectedDate = selectedDay && selectedMonth && selectedYear
    ? new Date(
        selectedYear,
        selectedMonth - 1,
        selectedDay
      ).toLocaleDateString()
    : "";

  

  // const convertDateTime = () => {
  //  const inputDate = formattedSelectedDate + " " + selectedTime;
  //   const outputFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";

  //   // await new Promise(resolve => setTimeout(resolve, 2000));
  //   // // Code to execute after the delay
  //   // console.log('Delayed function');

  //   const formattedDate = moment
  //     .utc(inputDate, "DD/MM/YYYY H-mm")
  //     .startOf("hour")
  //     .format(outputFormat);

  //   // alert(formattedDate)
  //  setDateTime(formattedDate);
  // }

  const sendDataToParent = () => {
    // const data = [formattedSelectedDate, selectedTime]
    // props.sendDataToParent(data)

    // const originalDateString = formattedSelectedDate + " " + selectedTime;
    // const formattedDate = moment(originalDateString, "DD/MM/YYYY HH-mm")
    //   .startOf("hour")
    //   .format("YYYY-MM-DD HH:mm");

    // console.log(formattedDate); // Output: 2027-03-04 12:00


    // format date time for check report date is dulplicate
    // const outputFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
    // const formattedDate1 = moment
    //   .utc(originalDateString, "DD/MM/YYYY H-mm")
    //   .startOf("hour")
    //   .format(outputFormat);

      // props.sendDataToParent("helloworld")


      // const data = "helloworld"
      // const data = selectedTime;
      const data = formattedSelectedDate + " " + selectedTime
      props.sendDataToParent(data)
  }

  return (
    <div>
      <div className="mb-4">
              <div className="border-l-4 border-orange-600 pl-1.5 ">
                <p className="font-roboto font-bold text-xl text-gray-700 mb-3.5">
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
            <div className="mb-4">
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

            <button onClick={sendDataToParent}>SEND</button>

            <p>DATE: {formattedSelectedDate}</p>
            <p>TIME: {selectedTime}</p>

            <h1>AFTER FORMATDATE: {datetime}</h1>
    </div>
  );
}

export default DateTime;
