import React from 'react';
import icon from '../assets/image/icon_kmitl_hos_footer.png'

const Footer = () => {
  return (
    <footer className="bg-orange-600 text-white flex">
      <div className="container bg-indigo-900 w-2/3 mx-auto text-center flex justify-between items-center">
        <p className='text-sm text-start ml-4'>Private Policy | Cookie Policy <br/>Copyright © 2023 Full Stack Team, Year 3., All right reserved for KMITL Hospital</p>
        <img className='h-max' src={icon} alt="icon_kmitl_hos"/>
      </div>
    </footer>
  );
};

export default Footer;
