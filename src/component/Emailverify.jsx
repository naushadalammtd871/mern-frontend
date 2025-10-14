import axios from 'axios';
import { motion } from 'framer-motion'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';

const Emailverify = () => {

  axios.defaults.withCredentials = true;

  const inputRef = useRef([]);
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const {backendUrl, loggedin, userdata, getUserData} = useContext(AppContext);

  const handleinput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  }

  const handlekeyDown = (e, index) => {
    if(e.key === "Backspace" && e.target.value === '' && index > 0) {
      inputRef.current[index - 1].focus()
    }
  }

  const handlepaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if(inputRef.current[index]) {
        inputRef.current[index].value = char
      }
    })
  }


  const handleSubmit = async (e) => {

    setisLoading(true)

    setTimeout(() => {
      setisLoading(false);

    }, 4000)

    try {

      e.preventDefault();

      const otpArray = inputRef.current.map(e => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(backendUrl + "/api/auth/verify-email", {otp})
      if(data.success) {
        toast.success(data.message)
        getUserData();
        navigate("/")

      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    loggedin && userdata && userdata.isAccountVerified && navigate("/")
  }, [loggedin, userdata])
  


  return (
    <motion.div initial={{opacity: 0, y:40}} animate={{opacity: 1, y:0}} transition={{duration: 1}} className='flex items-center mt-40 sm:mt-35 justify-center'>
      <form onSubmit={handleSubmit} className='bg-[#ffffffd3] rounded-2xl p-8 w-96'>
        <p className='text-center text-blue-700 text-lg font-bold'>Email verify OTP</p>
        <p className='text-sm text-center text-[#333333] mt-3'>Enter 6-digit code sent to your email id.</p>

        <div className="flex justify-between items-center mt-6" onPaste={handlepaste}>
          {Array(6).fill(0).map((_, index) => (
            <input maxLength='1' required key={index} className='w-12 h-12 bg-[#333A5C] text-white font-bold text-center outline-[#500ea4] text-xl rounded-md' type="text" 

              ref={e => inputRef.current[index] = e}
              onInput={(e) => handleinput(e, index)}
              onKeyDown={(e) => handlekeyDown(e, index)}
            />
          ))}
        </div>

        <motion.button onClick={handleSubmit} disabled={isLoading} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className='text-lg font-bold bg-gradient-to-r w-full mt-8 py-1.5 text-center rounded-full from-blue-600 to-[#500ea4] text-[#ffffffde]'>{isLoading ? ("Verifying...") : ("Verify-email")}</motion.button>
      </form>
    </motion.div>
  )
}

export default Emailverify