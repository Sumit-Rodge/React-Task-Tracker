import React, { useEffect, useState ,useContext } from 'react'
import axios from 'axios';
import { Context } from '../context/Context';
import { EditingContext } from '../context/EditingContext';

export const Editing = (id) => {
  const uri ='http://127.0.0.1:4000';
  const [task,setTask] = useState([]);
  const [tasks,setTasks,getData] = useContext(Context);

  const setTaskEditing = useContext(EditingContext);
  const initailTask=tasks.filter((task)=>task.id == id.id);

  const [updateTask,setUpdateTask] = useState(initailTask[0].task);

  async function handleUpdate(){
    console.log(id.id);
    await axios.put(`${uri}/updatetask/${id.id}`, {
      task:updateTask
    });
    getData();
    setTaskEditing(false);
  }

  return (
    <div className='editing text-white flex flex-col 
      bg-black absolute  w-full h-full bg-opacity-60 rounded-3xl'>
      {
          <div className='flex flex-col items-center 
          justify-center bg-gray-900 w-1/4 h-1/4 m-auto rounded-2xl'>
            <input type="text" value={updateTask} 
            onChange={(e)=>setUpdateTask(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key == 'Enter'){
                handleUpdate();
              }
            }}
            className='text-black rounded-lg mb-4 p-2' />
            <div className='*:mx-1'>
            <button onClick={handleUpdate} className='bg-red-700 p-2 rounded-md'>Update</button>
            <button onClick={()=>setTaskEditing(false)} className='bg-green-700 p-2 rounded-md'>Cancle</button>
            </div>
          </div>
         
      }
      
    </div>
  )
}
