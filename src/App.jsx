import './App.css'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import About from './pages/About'
import AboutCompany from './pages/AboutCompany'
import AboutPeople from './pages/AboutPeople'
import Product from './pages/Product'
import TestParent from './components/TestParent'
import ProductsList from './pages/Products'
import Home from './pages/Home'
import HomePagination from './pages/HomePagination'
import HomeCustomHooks from './pages/HomeCustomHooks'
import { useState } from 'react'
import CartPage from './pages/CartPage'
import ProtectedRoute from './components/ProtectedRoute'
import Admin from './pages/Admin'
import Login from './pages/Login'
import AdminRefactor from './pages/AdminRefactor'
import AdminLayout from './components/admin/AdminLayout'
import KeysDemo from './pages/KeysDemo'
import UseStateCartDemo from './pages/ReducerBefore'
import UseReducerCartDemoAfter from './pages/ReducerAfter'
import PerformanceDemo from './pages/Performance'
import MemoExample from './pages/Memo'
import UseMemo from './pages/UseMemo'
import UseCallback from './pages/UseCallback'

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => [...prevItems, product]);
  };
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <>
      <Navbar cartItems={cartItems} />
      {/* <TestParent /> */}
      <Routes>
        <Route path='/' element={<Home addToCart={addToCart} />} />
        <Route path='/pagination' element={<HomePagination />} />
        <Route path='/customhooks' element={<HomeCustomHooks />} />
        <Route path='/keys' element={<KeysDemo />} />
        <Route path='/performance' element={<PerformanceDemo />} />
        <Route path='/usecallback' element={<UseCallback />} />
        <Route path='/usememo' element={<UseMemo />} />
        <Route path='/memo' element={<MemoExample />} />
        <Route path='/reducer-before' element={<UseStateCartDemo />} />
        <Route path='/reducer-after' element={<UseReducerCartDemoAfter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={
          <CartPage cartItems={cartItems} removeFromCart={removeFromCart} />
        } />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout>
                <AdminRefactor />       {/* existing page becomes the “main” slot */}
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />}>
          <Route path="company" element={<AboutCompany />} />
          <Route path="people" element={<AboutPeople />} />
        </Route>
        <Route path="/products" element={<ProductsList />} />
        <Route path='/products/:id' element={<Product />} />

      </Routes>

    </>
  )
}

export default App
