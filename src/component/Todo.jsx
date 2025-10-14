import React, { useEffect, useState } from 'react'
import Todo2 from './Todo2'
import { motion } from 'framer-motion';

const Todo = () => {

  const [input, setinput] = useState('');
  const [todos, settodos] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [])

  const handleclick = () => {

    if(input === "") {
      return null;
    }

    settodos([...todos, {id: Date.now(), text: input, isCompleted: false}]);
    setinput("")
  }

  const handleDelete = (id) => {
    settodos(todos.filter((todo) => {
      return todo.id !== id;
    }))
  
  }

   const handleEdit = (id) => {
        let edit = todos.filter((item) => item.id === id);
        setinput(edit[0].text)

        let newtask = todos.filter((item) => item.id !== id)
        settodos(newtask)
    }

    const toggle = (id) => {
        settodos(todos.map((todo) => {
            if(todo.id === id) {
                return {...todo, isCompleted: !todo.isCompleted}
            }
            return todo;
       }))
    }

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])
    


  return (
    <div>
        <div className="flex flex-col mt-10 gap-5 items-center justify-center">
            <div className="">
              <motion.h1 initial={{opacity: 0, x: -500}} animate={{opacity: 1, x: 0}} transition={{duration: 2}} className='text-2xl sm:text-3xl font-bold text-[#ffffffe7]'>Add your daily task...</motion.h1>
            </div>
            <motion.div initial={{opacity: 0, y: 80}} animate={{opacity: 1, y: 0}} transition={{duration: 1}} className="py-5 px-2 sm:px-5 relative w-full mx-auto sm:w-2/3 bg-[#ffffffb2] rounded-2xl">
              <div className="border border-gray-400 rounded-full flex gap-2.5 sm:gap-5 items-center">
                <input onChange={(e) => setinput(e.target.value)} value={input} className='w-full bg-violet-200 rounded-full outline-[#500ea4] py-1.5 pl-5' type="text" placeholder='Add your task'/>
                <button onClick={handleclick} className='font-bold px-5 py-1.5 rounded-full bg-[#500ea4] text-white'>Add</button>
              </div>

              {todos.length === 0 && <div className='text-sm absolute mt-2 text-[#414141] '>please add task!</div>}

              <div className="mt-5">
                {
                  todos.map((item, index) => (
                    <Todo2 key={index} id={item.id} handleEdit={handleEdit} toggle={toggle} text={item.text} handleDelete={handleDelete} isCompleted={item.isCompleted}/>
                  ))
                }
              </div>
            </motion.div>
        </div>
    </div>
  )
}

export default Todo