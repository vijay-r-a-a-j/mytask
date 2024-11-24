import React from 'react'
import Image from '../../assets/Peopleimg.jpg'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-wrap md:flex-nowrap px-5 md:px-10 lg:px-20 h-screen'>
        {/*Image section */}
        <div className='md:w-1/2 my-auto'>
            <img src={Image}/>
        </div>
        <div className='md:w-1/2 my-auto'>
           <div >
              <h1 className='text-5xl font-bold text-gray-800'>Welcome to Dashboard</h1>
              <p className='text-xl mt-5'>Here you can create employee list and <br/> 
                 store it in the database. You can also <br/>modify and delete the list.</p>
                    <button onClick={()=>navigate("/createemployee")} className='font-bold bg-gray-800 text-white 
                    rounded-lg px-5 py-2 mt-5 hover:bg-gray-700'>
                       Create Employee
                    </button>
           </div>
            
        </div>
    </div>
  )
}

export default Homepage