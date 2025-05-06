import React from 'react'
import{Route, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import CartProvider from './apiRequests/CartProvider'


import AuthProvider from './apiRequests/AuthProvider'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import Layout from './apiRequests/Layout'




function App() {


  return (
    <Routes>
    <Route element={<Layout />}>
    <Route  index element={<HomePage />}/>
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/cart" element={<CartPage />} />
    </Route>
    </Routes>
  )

  

   
}

export default App
