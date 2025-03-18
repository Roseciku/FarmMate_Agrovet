import React from 'react'
import { NavLink } from 'react-router-dom'



function Navbar() {
  return (
    <nav className='flex items-center justify-center bg-farmGreen'>
      <div className='flex justify-between bg-white items-center h-16 rounded-full w-[70%] mt-6 mb-6 px-7'>
        <h1 className='font-bold text-3xl'>FarmMate Agrovet</h1>
        <div >
          <ul className='flex gap-3 list-none font-semibold text-lg'>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink >About</NavLink></li>
          <li><NavLink>Contacts</NavLink></li>
          <li><NavLink to="/products">Shop</NavLink></li>
          <li><NavLink to="/signup">SignUp</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>  
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
