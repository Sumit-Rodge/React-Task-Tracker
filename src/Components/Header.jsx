import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'

export const Header = () => {
   const [tasks,setTasks,getData,theme,setTheme] = useContext(Context);
  return (
    <div className=' flex justify-between px-10  text-xl  py-4  w-full bg-gray-700 text-white font-mono'>
        <nav className='*:px-2 underline-offset-8'>
        <Link to='/' className='hover:underline'>Home</Link>
        <Link to='/tasks' className='hover:underline'>Tasks</Link>
        </nav>
        <button className='felx hover:text-2xl'
        onClick={()=>{
            theme === 'dark' ? setTheme('light') : setTheme('dark');
        }}>{theme === 'dark' ? '🌞' : '🌘'}</button>
    </div>
  )
}
