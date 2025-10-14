import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Appcontext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate();

  const {userdata, backendUrl, setuserdata, setloggedin} = useContext(AppContext);

    axios.defaults.withCredentials = true

  const logout = async () => {
    try {

      const { data } = await axios.post(backendUrl + "/api/auth/logout")
      data.success && setloggedin(false)
      data.success && setuserdata(false)
      navigate("/")
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-between py-3 border-b border-b-[#ffffff8c]'>
        <div className="">
            <h1 className='text-2xl font-bold text-[#ffffffbc]'>Todo</h1>
        </div>
        <div className="">
          {
            userdata ? 
            <div className='w-8 h-8 flex group relative cursor-pointer items-center justify-center rounded-full font-extrabold text-[#333333] bg-emerald-600'>
              {userdata.name[0].toUpperCase()}
              <div className="absolute top-0 right-0 bg-white mt-8 cursor-pointer hidden group-hover:block z-10 text-[#333333] rounded">
                <ul>
                  <li onClick={logout} className='font-bold px-6 cursor-pointer hover:bg-gray-200 py-1'>Logout</li>
                </ul>
              </div>
            </div>
            :
            <button onClick={() => navigate("/login")} className='text-lg font-extrabold text-[#333333] bg-[#ffffffa1] py-[4px] px-[22px] rounded-full'>Sign</button>
          }
        </div>
    </div>
  )
}

export default Navbar