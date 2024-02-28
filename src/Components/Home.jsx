import React ,{useEffect, useState} from 'react'
import { Todo } from './todo';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Editing } from './Editing';
import axios from 'axios';
import { Context } from '../context/Context';
import { Alltasks } from './Alltasks';
import { Header } from './Header';


export const Home = () => {

const [tasks,setTasks]=useState([]);
const [theme,setTheme]=useState('dark')
const uri ='http://127.0.0.1:4000';


async function getData(){
    const res= await axios.get(uri); 
    setTasks(res.data); // setting state using the response
}

useEffect(()=>{
    getData();
},[])

  return (
   
    <Context.Provider value={[tasks,setTasks,getData,theme,setTheme]}>   
    <div className={theme}> 
    <div className='flex h-full flex-col items-center bg-white text-black dark:bg-gray-900 dark:text-gray-100 '>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Todo/>} />
        <Route path='updatetask/:id' element={<Editing/>} />
        <Route path="/tasks" element={<Alltasks/>} />
      </Routes>
    </BrowserRouter>
    </div>
    </div>
    </Context.Provider>
    
  )
}
