import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Todo from './component/Todo'
import Login from './component/Login'
import Emailverify from './component/Emailverify'
import { ToastContainer, toast } from 'react-toastify';
import Forgotpassword from './component/Forgotpassword'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-9vw]'>
      <ToastContainer />
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/todo' element={<Todo />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/Email-verify' element={<Emailverify />}/>
          <Route path='/forgot-password' element={<Forgotpassword />}/>
        </Routes>
    </div>
  )
}

export default App