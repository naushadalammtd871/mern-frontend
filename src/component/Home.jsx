import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Appcontext.jsx';
import { Mail, Lock, Loader } from 'lucide-react';


const Home = () => {
    const [isLoading, setisLoading] = useState(false)

    const handleclick = () => {
        setisLoading(true);
        navigate("/todo")

        setTimeout(() => {
            setisLoading(false)
        }, 30000)
    }

    const navigate = useNavigate();
    const {userdata} = useContext(AppContext);

  return (
    <div className='flex flex-col mt-20 gap-10 items-center justify-center'>
        <div className="h-[120px] w-[120px] rounded-full">
            <img className='h-full w-full object-cover' src="/product_3.png" alt="" />
        </div>
        <div className="">
            <p className='text-3xl text-indigo-400'>Hey {userdata ? userdata.name : "Developer"}!, hi</p>
        </div>
        <div className="flex items-center justify-center">
            <p className=' sm:text-xl text-center text-sm w-full sm:w-3/4 text-[#ffffffa1]'>Hi <span className='text-emerald-500'>{userdata ? userdata.name : "user"}</span>, you can add your daily task, this features is provided in this todo App but smethin condition, before signing, and provided varrious method you can add task and delete task and edit task.</p>
        </div>
        <div className="">
            <button disabled={isLoading} onClick={handleclick} className='bg-emerald-600 py-[8px] px-[25px] rounded-full text-lg sm:text-xl text-[#333333] font-bold'>{isLoading ? (<Loader className='mx-auto animate-spin w-8'/>) : ("Explore")}</button>
        </div>
    </div>
  )
}

export default Home