import React from 'react'
import{Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'


import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SignUpPage from './pages/SignUpPage'

function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route  index element={<HomePage />}/>
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    </Route>
  )
)

  return < RouterProvider router={router}/>
   
}

export default App
