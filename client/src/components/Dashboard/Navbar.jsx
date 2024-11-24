import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { AiFillSignal } from "react-icons/ai"
import { IoIosLogOut } from "react-icons/io"
import { LuMenu } from "react-icons/lu"
import { FaXmark } from "react-icons/fa6"


const Navbar = () => {
  
  const username = localStorage.getItem("username") || "Guest";
    const menuItems = [
        {
            name:"Home",
            link:"/dashboard"
        },
        {
            name:"Employee list",
            link:"/employeelist"
        }
    ]
     
    const[open,setOpen] = useState()

    const navigate = useNavigate();
  return (
    <div className='flex justify-between px-2 md:px-5 lg:px-20 py-5 md:py-3 bg-gray-800'>
     {/*Logo */}
     <div>
        <p className='flex gap-2 text-2xl text-slate-200 font-bold'>Logo<AiFillSignal className='my-auto' /></p>
     </div>
     {/*Menu */}
     <div className='my-auto  md:flex'>
        <ul className={`flex flex-col lg:flex-row gap-5 lg:gap-10  text-xl 
                            h-screen lg:h-auto mt-12 lg:mt-0 absolute lg:static left-0 top-2
                              text-white bg-gray-800
                                lg:text-white w-full py-10 lg:py-0 px-5 transition-all duration-500 ease-in
                                     ${open?"left-0":"left-[-800px] md:left-[-1000px]"}`}>
            {menuItems.map((item,index)=>(
               <li className='text-xl text-slate-50 hover:text-slate-300' key={index}><a href={item.link}>{item.name}</a></li>
            ))}
        </ul>
     </div>
     <div className='flex gap-2 md:gap-5'>
       <p className='text-xl font-bold text-white my-auto'>{username} -</p>
       <button onClick={()=>navigate("/")} className='flex bg-slate-200 text-xl 
       font-semibold px-2 lg:px-5 py-1 rounded-full
        my-auto gap-2'>
           <span className='hidden lg:flex'>Logout </span> <IoIosLogOut className='my-auto lg:mt-1' /> 
        </button>
        <button onClick={()=>setOpen(!open)} className='block my-auto lg:hidden '>{open ? <FaXmark className='w-8 h-8 text-white' />:<LuMenu className='w-8 h-8 text-white'/>}</button>
     </div>
    </div>
  )
}

export default Navbar