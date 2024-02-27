import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const Editing = (id) => {
  const uri ='http://127.0.0.1:4000';
  const [task,setTask] = useState([]);
  const [updateTask,setUpdateTask] = useState('');

  async function handleUpdate(){
    console.log(id.id);
    await axios.put(`${uri}/updatetask/${id.id}`, {
      task:updateTask
    });
  }

  return (
    <div className='bg-gray-900 text-white flex flex-col items-center pt-20'>
      {
         task.map((item)=>{
          return (
            <div key={item.id}>
              <h3>Update Task </h3>
              <div className='bg-gray-500 w-72 p-3 rounded-lg'>
              
              <p>{item.task}</p>
            </div>
            </div>
          )
       })
      }
      {
        
          <div className='flex flex-col items-center mt-8'>
            <input type="text" value={updateTask} onChange={(e)=>setUpdateTask(e.target.value)}
            className='text-black rounded-lg mb-4 p-2' placeholder={task.task}/>
            <div>
            <button onClick={handleUpdate} className='bg-red-700 p-2 rounded-md'>Update</button>
            </div>
          </div>
         
      }
      
    </div>
  )
}
