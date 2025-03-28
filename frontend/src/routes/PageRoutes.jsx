import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '../components/Loading/Loading'


// Lazy loaded pages
const HomePage = React.lazy(() => import('../pages/HomePage'))
const Menu = React.lazy(() => import('../pages/MenuPage'))
const Orders = React.lazy(() => import('../pages/Orders'))
const OrderDetail = React.lazy(() => import('../pages/OrderDetail'))
const Table = React.lazy(() => import('../pages/TablePage'))
const TableDetail = React.lazy(() => import('../pages/TableDetail'))
const CartPage = React.lazy(() => import('../pages/CartPage'))

// Lazy loaded auth & profile
const Login = React.lazy(() => import('../Validate/Login'))
const Register = React.lazy(() => import('../Validate/Register'))
const Logout = React.lazy(() => import('../Validate/Logout'))
const UserProfile = React.lazy(() => import('../Validate/UserProfile'))

// Lazy loaded booking components
const Information = React.lazy(() => import('../components/Booking/Information'))
const TableBook = React.lazy(() => import('../components/Booking/TableBook'))
const Checkout = React.lazy(() => import('../components/Booking/Checkout'))
const Bookings = React.lazy(() => import('../components/Booking/Bookings'))


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

      {/* Cart Page*/}
      <Route path='cart' element={<CartPage/>} />

      {/* Booking Page*/}
      <Route path='information' element={<Information/>} />
      <Route path='tablebook' element={<TableBook/>} />
      <Route path='checkout' element={<Checkout/>} />
      <Route path='bookings' element={<Bookings/>} />


    </Routes>
    </React.Suspense>
  )
}

export default PageRoutes