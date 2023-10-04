import React, { useState, useEffect} from 'react';

function DateDropdown({ selectedDate, onDateChange }) {

  const currentDate = new Date();
  
  const curYear = currentDate.getFullYear('en');
  const curMonth = currentDate.getMonth() + 1; // Adding 1 to convert zero-based index to 1-12
  const curDay = currentDate.getDate();

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(curMonth);
  const [selectedYear, setSelectedYear] = useState(curYear);

  // useEffect(() => {
  //   getCurrent()
  // })

  // const getCurrent = () => {
  //   const currentYear = new Date().getFullYear();
  //   // setSelectedYear(new Date().getFullYear())
  //   console.log('9999');
  //   // setSelectedMonth(new Date().getMonth() + 1)
  //   // setSelectedDay(new Date().getDate())
  // }

  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const months = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฏาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear + index);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
    onDateChange(selectedMonth, event.target.value, selectedYear);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    onDateChange(event.target.value, selectedDay, selectedYear);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    onDateChange(selectedMonth, selectedDay, event.target.value);
  };

  return (
    <div>
      <select className="border border-gray-400 rounded-md h-8" value={selectedDay} onChange={handleDayChange}>
        <option className='border border-gray-400 rounded-lg' value="">วันที่</option>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select className="bg-white border border-gray-400 rounded-md mx-2 h-8" value={selectedMonth} onChange={handleMonthChange}>
        <option value="">เดือน</option>
        {months.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
      <select className="bg-white border border-gray-400 rounded-md h-8" value={selectedYear} onChange={handleYearChange}>
        <option value="">Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DateDropdown;
