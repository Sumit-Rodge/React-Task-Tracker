import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import '../todo.css'
import { Editing } from './Editing';
import { Context } from '../context/Context';
import { EditingContext } from '../context/EditingContext';


export function Todo(){

    const [tasks,setTasks,getData] = useContext(Context);
    const uri ='http://127.0.0.1:4000';
    
    const [taskText,setTaskText]=useState('');
    const [taskError,setTaskError] = useState('');
    const [taskEditing,setTaskEditing]=useState(false);
    const [taskId,setTaskId]=useState(0);

    async function addData() {
        
        setTaskError('');
        if (taskText.trim() !== '') {
            try {
                await axios.post(`${uri}/addtask`, { "task": taskText.trim() }, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                getData();
                
              } catch (error) {
                console.error('Error adding task:', error);
                setTaskError('Error adding task. Please try again.'); // Set an error message on failure
            }
        } else {
            setTaskError('Enter Your Task First');
        }

    }

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

    useEffect(()=>{
        getData();
    },[])

    return (
        <div className=" flex flex-col items-center mt-10 w-fit h-fit border-black border rounded-3xl p-10 border-opacity-20 bg-gray-700 ">
            <div className='flex  mb-4 mt-10 '>
                <div className=''>
                <input type="text" onChange={(e)=>setTaskText(e.target.value)} 
                onKeyDown={(e)=>{ if(e.key === 'Enter')addData()}}
                value={taskText} placeholder='Enter Task' className='bg-gray-500 border border-gray-100 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50=' />
                {taskError ?( <p className="" style={{color:"red"}}>{taskError}</p>):''}
                </div>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-4 ml-2 " onClick={addData} >Add</button>
            </div>

            <div className="">
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
                        }} id={task.id}
                         >Edit</button>   
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
