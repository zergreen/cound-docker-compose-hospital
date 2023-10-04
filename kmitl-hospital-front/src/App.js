import React from 'react';
import 'tailwindcss/tailwind.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './function/BookingContext';

import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import Booking from './page/ฺBooking';
import InputBooking from './page/InputBooking';
import ConfirmBooking from './page/ConfirmBooking';
import Report from './page/Report';
import ReportById from './page/ReportById';
import Appoint from './page/Appoint';
import AppointEdit from './page/AppointEdit';
import Test from './page/Test';

import Navbar from './component/Navbar';
import Footer from './component/Footer';
import LoadingPage from './page/LoadingPage'

function App() {
  return (
    <BrowserRouter>
      <div className="font-kanit">
        <BookingProvider>
          <Routes>
            <Route
              index
              exact
              path="/"
              element={
                <>
                  {/* <Navbar /> */}
                  <Login />
                </>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <>
                  {/* <Navbar /> */}
                  <Register />
                </>
              }
            />
            <Route
              exact
              path="/home"
              element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="/booking"
              element={
                <>
                  <Navbar />
                  <Booking />
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="/inputbooking"
              element={
                <>
                  <Navbar />
                  <InputBooking />
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="/reportbyid/:id"
              element={
                <>
                  <Navbar />
                  <ReportById />
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="/report"
              element={
                <>
                  <Navbar />
                  <Report />
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="/confirmbooking"
              element={
                <>
                  <Navbar />
                  <ConfirmBooking />
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="/test"
              element={
                <>
                  <Navbar />
                  <Test />
                  <Footer />
                </>
              }
            />
             <Route
              exact
              path="/appoint"
              element={
                <>
                  <Navbar />
                  <Appoint />
                  <Footer />
                </>
              }
            />
             <Route
              exact
              path="/appoint-edit"
              element={
                <>
                  <Navbar />
                  <AppointEdit />
                  <Footer />
                </>
              }
            />
             <Route
              exact
              path="/loading"
              element={
                <>
                  <LoadingPage />
                </>
              }
            />
            
          </Routes>
        </BookingProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
