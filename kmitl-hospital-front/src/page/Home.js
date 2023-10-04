import React, { useEffect } from 'react';
import EmployeeList from "../component/EmployeeList";
import { getProfile } from '../function/AuthApi'
// import { getRefreshToken } from "../function/AuthApi";

function Home() {

  // useEffect(() => {
  //   // getRefreshToken(600000)
  //   setInterval(() => {
  //     console.log('useEffect: Home.js');
  //   }, 60000);
  //     // console.log('helloworld');
  // }, []);
  
  return (
    <div className='flex flex-col min-h-screen h-auto pt-20'>
      <div className="border-l-8 border-orange-600 pl-1.5 mb-9 ml-10 xl:ml-40">
        <h1 className="font-semibold text-4xl">ค้นหาแพทย์</h1>
        <button onClick={getProfile}>PROFILE</button> &nbsp;
      </div>
      <EmployeeList/>
    </div>
  );
}

export default Home;
