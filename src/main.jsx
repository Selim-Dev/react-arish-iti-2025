import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <App />
          </AuthProvider>
      </CartProvider>
    </BrowserRouter>
)
