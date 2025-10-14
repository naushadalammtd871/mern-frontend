import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from 'react-toastify'

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [loggedin, setloggedin] = useState(false);
    const [userdata, setuserdata] = useState(false);
    const backendUrl = ['https://mern-backend-chi-seven.vercel.app']

    axios.defaults.withCredentials = true;

    const isAuthenticated = async () => {

        try {

            const {data} = await axios.get(backendUrl + "/api/auth/is-Auth")
            if(data.success) {
                setloggedin(true);
                getUserData();
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
      isAuthenticated();
    }, [])
    

    const getUserData = async () => {
        try {

            const {data} = await axios.get(backendUrl + "/api/auth/userdata")
            data.success ? setuserdata(data.userData) : toast.error(data.message)
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const contextvalue = {
        loggedin, setloggedin,
        userdata, setuserdata, backendUrl,
        getUserData,
    }

    return (

        <AppContext.Provider value={contextvalue}>
            {props.children}
        </AppContext.Provider>
    )
}
