import React, { createContext, useState } from 'react';

const BookingContext = createContext();

function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState(null);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export { BookingContext, BookingProvider };
