import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Editing = () => {
  const {id} = useParams();
  const uri ='http://127.0.0.1:4000';
  const [task,setTask] = useState([]);
  const [updateTask,setUpdateTask] = useState('');

  const navigate = useNavigate();
  async function getData(e){
    const data = await axios.get(`http://127.0.0.1:4000/task/${id}`);
    setTask(data.data);
  }

  

  async function handleUpdate(){
    await axios.put(`${uri}/updatetask/${id}`, {
      task:updateTask
    });
  navigate('/')
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div className='bg-gray-900 text-white h-screen flex flex-col items-center pt-20'>
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
            <Link to='/' className='bg-green-700 p-3 rounded-md ml-2 '>Back</Link>
            </div>
          </div>
         
      }
      
    </div>
  )
}
