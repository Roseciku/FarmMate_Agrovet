import { StrictMode } from 'react'
import { createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import AuthProvider from './apiRequests/AuthProvider.jsx'
import CartProvider from './apiRequests/AuthProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <CartProvider>
    <App />  
    </CartProvider>
    </AuthProvider>   
  </StrictMode>
)
