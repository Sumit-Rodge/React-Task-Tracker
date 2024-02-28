import React, { useContext , useState} from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import { Editing } from './Editing';
import { EditingContext } from '../context/EditingContext';

export const Alltasks = () => {

  const [tasks,setTask,getData] = useContext(Context);  
  const uri ='http://127.0.0.1:4000';
  const [taskEditing,setTaskEditing]=useState(false);
  const [taskId,setTaskId]=useState(0);

  async function removeTask(e){
    const taskid = e.target.id;
    await axios.delete(`${uri}/removetask/${taskid}`,{
        headers:{
            'Content-Type': 'application/json',
        }
    })
    getData();
}

async function handleStatus(e){
    await axios.put(`${uri}/update/${e.target.id}`,{
        headers:{
            'Content-Type': 'application/json',
        }
    });
    getData();
}

  return (
    <div className='relative w-full flex flex-col  items-center'>
    <div className="mt-10 ">
    <h1 className='text-3xl font-mono'>Manage Tasks</h1>    
    {
                tasks.map(task=>{
                    return <div key={task.id}>
                    <div className="flex bg-gray-500 text-gray-100 text-white m-4 w-96 rounded-lg justify-between items-center p-2" >
                        <div className='flex flex-row items-center'>
                            
                            <input type="checkbox" {...(task.status === true ? {checked:'true'} : {})}
                            id={task.id} onClick={handleStatus} className='mr-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-3xl'
                            /> 
                            <p {...(task.status === true ? {className:'line-through'}:{className:'text-lg'})}>{task.task}</p>
                        </div>
                        <div>
                        <button className="bg-green-900 mr-2 p-2 rounded-lg hover:bg-green-700 hover:text-white hover:font-bold" onClick={()=>{
                            setTaskEditing(true);
                            setTaskId(task.id);
                        }} id={task.id} >Edit</button>   
                        <button className="bg-red-900 p-2 rounded-lg hover:bg-red-400 hover:text-red-900 hover:font-bold" onClick={removeTask} id={task.id} >Remove</button>  
                        </div>  
                    </div>
                    </div>    
                })
            }
    </div>
        <EditingContext.Provider value={setTaskEditing}>
            {taskEditing?<Editing id={taskId} />:''}
        </EditingContext.Provider>
    </div>
    
  )
}
