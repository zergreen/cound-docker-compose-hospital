import React, { useState } from 'react';

function TimeSelector({ selectedTime, onTimeChange }) {
  const [selectedOption, setSelectedOption] = useState(selectedTime);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onTimeChange(option);
  };

  return (
    <div>
      <button className={`mr-2  font-bold text-base px-3 py-1.5 rounded-lg text-white bg-orange-300 mb-1.5  ${selectedOption === '9-10' ? 'bg-orange-600' : ''}`} onClick={() => handleOptionClick('9-10')}> 9.00 น. - 10.00 น. </button>
      <button className={`mr-2  font-bold text-base px-3 py-1.5 rounded-lg text-white bg-orange-300 mb-1.5  ${selectedOption === '11-12' ? 'bg-orange-600' : ''}`} onClick={() => handleOptionClick('11-12')}> 11.00 น. - 12.00 น. </button>
      <button className={`mr-2  font-bold text-base px-3 py-1.5 rounded-lg text-white bg-orange-300 mb-1.5  ${selectedOption === '17-18' ? 'bg-orange-600' : ''}`} onClick={() => handleOptionClick('17-18')}> 17.00 น. - 18.00 น. </button>
      <button className={`mr-2  font-bold text-base px-3 py-1.5 rounded-lg text-white bg-orange-300 mb-1.5  ${selectedOption === '19-20' ? 'bg-orange-600' : ''}`} onClick={() => handleOptionClick('19-20')}> 19.00 น. - 20.00 น. </button>
    </div>
  );
}

export default TimeSelector;
