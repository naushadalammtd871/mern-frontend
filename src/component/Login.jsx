import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Mail, Lock, Loader} from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from '../context/Appcontext.jsx'

const Login = () => {

    const navigate = useNavigate();
    const [currState, setcurrState] = useState('Sign Up')

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('');
    const [isLoading, setisLoading] = useState(false)

    const {setloggedin, getUserData, backendUrl} = useContext(AppContext);

  

    const submithandler = async (e) => {
        setisLoading(true)

        setTimeout(() => {
            setisLoading(false);
        }, 5000)

        try {

            e.preventDefault();
            axios.defaults.withCredentials = true

            if(currState === "Sign Up") {
                const {data} = await axios.post(backendUrl + "/api/auth/register", {name, email, password});
                if(data.success) {
                    navigate("/Email-verify")
                    getUserData();
                    setisLoading(true)
                }
                else{
                    toast.error(data.message);
                }
            }
            else{

                const {data} = await axios.post(backendUrl + "/api/auth/login", {email, password});
                if(data.success) {
                    setloggedin(true)
                    navigate("/")
                    getUserData();
                    setisLoading(true)
                }
                else{
                    toast.error(data.message);
                }

            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{duration: 1}} className='w-full mx-auto sm:mt-25 mt-25 sm:w-[400px] py-5 px-10 rounded-xl bg-[#ffffffbe]'>
        <div className="flex items-center justify-between">
            <h1 className='font text-xl bold text-blue-500'>{currState === "Sign Up" ? "Sign Up" : "Login"}</h1>
            <img onClick={() => navigate("/")} className='w-4' src="/cross_icon.png" alt="" />
        </div>

        <form onSubmit={submithandler}>
            <div className="flex mt-5 flex-col gap-3">
                {currState === "Sign Up" ? <input onChange={(e) => setname(e.target.value)} className='outline-[#500ea4] text-lg border rounded border-gray-400 py-1.5 pl-5 w-full' type="text" placeholder='full-name' required/>: ""}
                <input onChange={(e) => setemail(e.target.value)} className='outline-[#500ea4] text-lg border rounded border-gray-400 py-1.5 pl-5 w-full' type="email" placeholder='Enter E-mail' required/>
                <input onChange={(e) => setpassword(e.target.value)} className='outline-[#500ea4] text-lg border rounded border-gray-400 py-1.5 pl-5 w-full' type="password" placeholder='password' required/>
            </div>


            <p onClick={() => navigate("/forgot-password")} className='cursor-pointer sm:text-sm text-lg mt-3 font-bold text-blue-600'>forgot-password</p>
            {
                currState === "Sign Up" ? (
                    <motion.button onClick={submithandler} disabled={isLoading} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className='text-lg w-full mt-4 font-bold text-center py-1.5 rounded bg-linear-to-r from-blue-500 to-[#500ea4] text-[#ffffffde]'>{isLoading ? <Loader className='w-6 mx-auto animate-spin h-6' />: "SignUp"}</motion.button>
                ) : (
                    <motion.button onClick={submithandler} disabled={isLoading} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className='text-lg w-full mt-4 font-bold text-center py-1.5 rounded bg-linear-to-r from-blue-500 to-[#500ea4] text-[#ffffffde]'>{isLoading ? <Loader className='w-6 mx-auto animate-spin h-6' />: "Login"}</motion.button>
                )
            }

            <div className="mt-5">
                {currState === "Sign Up" ? (
                    <p className='sm:text-sm text-center font-bold text-lg text-[#222222]'>Already have an account? <span onClick={() => setcurrState("Login")} className='sm:text-sm text-[#500ea4] cursor-pointer text-lg font-bold'>Login</span></p>
                ) : (
                    <p className='sm:text-sm text-center font-bold text-lg text-[#222222]'>don't have an account? <span onClick={() => setcurrState("Sign Up")} className='sm:text-sm text-[#500ea4] cursor-pointer text-lg font-bold'>signUp</span></p>
                )}
            </div>
        </form>
        
    </motion.div>
  )
}

export default Login