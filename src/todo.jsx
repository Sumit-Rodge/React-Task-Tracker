import 'axios'
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../src/todo.css'
export function Todo(){


    const uri ='http://127.0.0.1:4000';

    const [taskText,setTaskText]=useState('')
    const [taskError,setTaskError] = useState('');
    const [tasks,setTasks]=useState([]);

    async function getData(){
        const res= await axios.get(uri); 
        setTasks(res.data); // setting state using the response
    }
    
    
    async function addData() {
        
        setTaskError('');
        if (taskText.trim() !== '') {
            try {
                const res = await axios.post(`${uri}/addtask`, { "task": taskText.trim() }, {
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

    useEffect(()=>{
        getData();
    },[])

   
    return (
        <div className="parent">
            <div className='input-div'>
                <div className='task-input-parent'>
                <input type="text" onChange={(e)=>setTaskText(e.target.value)} value={taskText} placeholder='Enter Task' className='task-input'/>
                {taskError ?( <p className="" style={{color:"red"}}>{taskError}</p>):''}
                </div>
                <button className="add-btn btn" onClick={addData} >Add</button>
            </div>

            <div className="tasks-div">
            {
                tasks.map(t=>{
                    return <div className="task-div" key={t.id}>
                        <p>{t.task}</p>
                        <button className="remove-btn btn" onClick={removeTask} id={t.id} >remove</button>
                    </div>
                })
            }
            </div>
        </div>
    )
}
