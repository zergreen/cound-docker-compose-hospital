import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import icon from '../assets/image/icon_kmitl_hospital.png'
import { getLogout } from '../function/AuthApi'

const Navbar = () => {
    const [currentPath, setCurrentPath] = useState('/');
    const location = useLocation();
  
    useEffect(() => {
      setCurrentPath(location.pathname);
    }, [location]);

    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/home');
    };
    const handleReport = () => {
        navigate('/report');
    };
    const handleAppoint = () => {
        navigate('/appoint');
    };

  return (
    <nav className='flex justify-around items-center h-20 h-20 w-full shadow-xl'>
        <img className='h-16' src={icon} alt="icon_kmitl_hos" onClick={handleHome}/>
        <div>
            <button className={`w-40 h-20 border-b-8 p-0 ${currentPath === '/home' ? 'border-orange-500' : 'border-orange-200'} mx-1.5`} onClick={handleHome}>
            <p className=' font-normal font-semibold text-xl'>ค้นหาแพทย์</p>
            </button>
            <button className={`w-40 h-20 border-b-8 p-0 ${currentPath === '/appoint' ? 'border-orange-500' : 'border-orange-200'} mx-1.5`} onClick={handleAppoint}>
            <p className=' font-normal font-semibold text-xl'>ตารางนัดหมาย</p>
            </button>
            <button className={`w-40 h-20 border-b-8 p-0 ${currentPath === '/report' ? 'border-orange-500' : 'border-orange-200'} mx-1.5`} onClick={handleReport}>
            <p className=' font-normal font-semibold text-xl'>ค้นหานัดหมาย</p>
            </button>
            <button className={`w-40 h-20 border-b-8 p-0 ${currentPath === '/' ? 'border-orange-500' : 'border-orange-200'} mx-1.5`} onClick={() => getLogout(navigate)}>
            <p className=' font-normal font-semibold text-xl'>ออกจากระบบ</p>
            </button>
        </div>
    </nav>
  );
}

export default Navbar;
