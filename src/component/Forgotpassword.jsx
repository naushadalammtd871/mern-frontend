import { motion } from 'framer-motion'
import React, { useContext, useRef, useState } from 'react'
import { Mail, Lock, Loader } from 'lucide-react'
import { AppContext } from '../context/Appcontext.jsx';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {

    const [isLoading, setisLoading] = useState(false)
    const [email, setemail] = useState('')
    const [newPassword, setnewPassword] = useState('');
    const [isEmailSent, setisEmailSent] = useState('')
    const [otp, setotp] = useState(0)
    const [isOtpSubmited, setisOtpSubmited] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef([]);

    const { backendUrl } = useContext(AppContext)
    axios.defaults.withCredentials = true;


    const submithandler = async (e) => {
        e.preventDefault()

        setisLoading(true);
        setTimeout(() => {
            setisLoading(false)
        }, 4000)

        try {

            const {data} = await axios.post(backendUrl + "/api/auth/reset-passwordotp", {email})
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && setisEmailSent(true)
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setisLoading(true);
        setTimeout(() => {
            setisLoading(false)
        }, 4000)

        const otpArray = inputRef.current.map(e => e.value)
        setotp(otpArray.join(''));
        setisOtpSubmited(true);
    }

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();

        setisLoading(true);
        setTimeout(() => {
            setisLoading(false)
        }, 4000)

        try {

            const {data} = await axios.post(backendUrl + "/api/auth/reset-password", {email, otp, newPassword})
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && navigate("/login")
            
        } catch (error) {
            toast.error(error.message);
        }
    }
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



  return (
    <div className='w-full h-[90vh] flex items-center justify-center'>

        {!isEmailSent && 
        <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{duration: 2}} className="p-8 w-96 rounded-2xl bg-[#ffffffd3]">
            <h1 className='text-2xl text-center font-bold text-emerald-600'>Reset-Password</h1>
            <p className='text-sm text-[#333333] mt-2 text-center'>Enter your register email address.</p>

            <form onSubmit={submithandler} action="">
                <input value={email} onChange={(e) => setemail(e.target.value)} className='w-full py-1.5 rounded outline-emerald-600 pl-5 border border-gray-400 mt-5' type="text" placeholder='Enter E-mail...' required/>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='w-full py-1.5 mx-auto bg-gradient-to-r mt-7 rounded-full text-lg font-bold text-[#ffffffe3] from-green-400 to-emerald-600'>{isLoading ? (<Loader className='w-6 h-6 animate-spin mx-auto'/>) : ("Submit")}</motion.button>
            </form>
        </motion.div>
        }

        {/* reset otp */}

        {!isOtpSubmited && isEmailSent &&

        <motion.form onSubmit={handleSubmit} initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} className='bg-[#ffffffd3] rounded-2xl p-8 w-96'>
            <p className='text-center text-emerald-600 text-lg font-bold'>Reset-password OTP</p>
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
    
            <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className='text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-600 w-full mt-8 py-1.5 text-center rounded-full text-[#ffffffde]'>{isLoading ? (<Loader className='animate-spin h-6 w-6 mx-auto'/>) : ("Submit")}</motion.button>
        </motion.form>
        }

        {/* newPassword */}

        {isOtpSubmited && isEmailSent &&

        <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{duration: 2}} className="p-8 w-96 rounded-2xl bg-[#ffffffd3]">
            <h1 className='text-2xl text-center font-bold text-emerald-600'>New-password</h1>
            <p className='text-sm text-[#333333] mt-2 text-center'>Enter the new password bellow</p>

            <form onSubmit={onSubmitNewPassword} action="">
                <input value={newPassword} onChange={(e) => setnewPassword(e.target.value)} className='w-full py-1.5 rounded outline-emerald-600 pl-5 border border-gray-400 mt-5' type="text" placeholder='newPassword...' required/>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='w-full py-1.5 mx-auto bg-gradient-to-r mt-7 rounded-full text-lg font-bold text-[#ffffffe3] from-green-400 to-emerald-600'>{isLoading ? (<Loader className='w-6 h-6 animate-spin mx-auto'/>) : ("Submit")}</motion.button>
            </form>
        </motion.div>
        }

    </div>
  )
}

export default Forgotpassword