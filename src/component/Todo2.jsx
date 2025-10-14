import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Todo2 = ({text, id,handleEdit, toggle, handleDelete, isCompleted}) => {
  return (
    <div className='flex items-center justify-between'>
        <div onClick={() => toggle(id)} className="flex mt-3 items-center gap-5">
            {
                isCompleted ? 

                <img className='h-4 w-4 object-cover' src="/tick.png" alt="" />
                : 
                <div className="h-4 min-w-4 rounded-full border"></div>
            }
            <p className={`${isCompleted ? "line-through" : ""} text-sm text-[#333333] font-bold`}>{text}</p>
        </div>
        <div className="flex items-center gap-8">
            <button onClick={() => handleEdit(id)} className='text-xl'><FaRegEdit /></button>
            <button onClick={() => handleDelete(id)} className='text-xl'><MdDelete /></button>
        </div>
    </div>
  )
}

export default Todo2