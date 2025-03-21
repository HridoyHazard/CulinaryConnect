import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Loader from '../components/Loading/Loading'
import Login from '../Validate/Login'
import Register from '../Validate/Register'
import Logout from '../Validate/Logout'
import UserProfile from '../Validate/UserProfile'


// Lasy load to import the Pages
const Menu =React.lazy(()=>import('../pages/MenuPage'))
const Booking =React.lazy(()=>import('../pages/BookingPage'))
const Orders =React.lazy(()=>import('../pages/Orders'))
const OrderDetail =React.lazy(()=>import('../pages/OrderDetail'))
const Table =React.lazy(()=>import('../pages/TablePage'))
const TableDetail =React.lazy(()=>import('../pages/TableDetail'))


const PageRoutes = () => {
  return (
    <React.Suspense fallback={<Loader/>}>
    <Routes>
      {/* Home Page*/}
      <Route path='/' element={<HomePage/>} />
      <Route path='home' element={<HomePage/>} />
      {/* Menu Page*/}
      <Route path='menu' element={<Menu/>} />
      {/* Booking Page*/}
      <Route path='booking' element={<Booking/>} />
      {/* Order Page*/}
      <Route path='orders' element={<Orders/>} />
      <Route path='orders/:id' element={<OrderDetail/>} />
      {/* Table Page*/}
      <Route path='tables' element={<Table/>} />
      <Route path='tables/:id' element={<TableDetail/>} />

      {/* Authentication Page*/}
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Register/>} />
      <Route path='logout' element={<Logout/>} />

      {/* User Profile Page*/}
      <Route path='profile' element={<UserProfile/>} />


    </Routes>
    </React.Suspense>
  )
}

export default PageRoutes