import React from 'react'
import {NavLink} from 'react-router-dom'
import {ShoppingCart, ChevronDown, Search, User} from 'lucide-react'
import {CartContext} from '../apiRequests/CartProvider'
import { useContext } from "react";


function ProductsNavbar({setSelectedCategory}) {
  const { cart } = useContext(CartContext);

// Calculate total quantity (in case items have quantities >1)
const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const [showCategories, setShowCategories] = React.useState(false)
    

  return (
    <nav className='bg-farmGreen py-4'>
    <div className='flex justify-between items-center bg-white h-16 rounded-full w-[80%] mx-auto px-7 shadow-lg'>
      <h1 className="font-bold text-2xl  text-farmGreen">FarmMate Agrovet</h1>
      <div className="relative  w-[40%]"> 
        <input 
        type ="text"
        placeholder = "Search Products ..."
        className = "px-2 w-full h-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-farmGreen"
        />
      </div>
        <ul className="flex items-center gap-6 font-semibold text-lg">
        <li className="hover:text-farmGreen"><NavLink to="/">Home</NavLink></li>
        <li className="relative">
            <button
            onClick={()=>setShowCategories((prevState)=> !prevState)}
            className="flex items-center gap-1 hover:text-farmGreen"
            >
            categories <ChevronDown size={18}/>
            </button>
            {showCategories && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                    <li  onClick={() => setSelectedCategory(null)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">All </li>
                    <li  onClick={() => setSelectedCategory('Pesticide')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Pesticides </li>
                    <li  onClick={() => setSelectedCategory('Fertilizer')}className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Fertilizers </li>
                    <li  onClick={() => setSelectedCategory('Equipment')}className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Farm Equipment </li>
                    <li onClick={() => setSelectedCategory('AnimalFeed')}className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Animal Feeds </li>
                    <li onClick={() => setSelectedCategory('Herbicide')}className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Herbicides </li>
                </ul>
            )}
        </li>
        <li className="relative"> 
        <NavLink to="/cart" className="flex items-center gap-1 hover:text-farmGreen " >
           <ShoppingCart size={24}/> 
           {cartItemCount > 0 && (
           <span className="absolute top-[-5px] right-[-8px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ">
            {cartItemCount}
            </span> 
  )}
            </NavLink></li>

        <li><NavLink to="/signup" className="hover:text-farmGreen">SignUp</NavLink></li>
        <li><NavLink to="/signin" className="hover:text-farmGreen"><User size={20}/></NavLink></li>
      </ul>
    </div>
    </nav>
  )
}

export default ProductsNavbar
