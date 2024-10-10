import React from 'react'
import { Navigate } from "react-router-dom"
// --Routes
import Category from './layouts/category'
import Home from './layouts/home'
import CategoryPage from "./components/pages/category"
import LoginPage from "./components/pages/auth/loginPage"
import RegisterPage from "./components/pages/auth/registerPage"
import Profile from "./components/pages/profile/profile"
import ItemPage from "./components/pages/item/itemPage"
import FavouritesPage from "./components/pages/favourites/favouritesPage"
import AdminPage from "./components/pages/admin/adminPage"
import CreateUser from "./components/pages/admin/createAndEditPages/createUser"
import CreateProduct from "./components/pages/admin/createAndEditPages/createProduct"
import EditProduct from './components/pages/admin/createAndEditPages/editProduct.jsx'
import InformationPage from './components/pages/information/informationPage'
import CartPage from './components/pages/cart/cartPage'

const routes = [
  {path: '/', element: <Home/>},
  {path: 'favourites', element: <FavouritesPage />},
  {path: 'cart', element: <CartPage />},
  {
    path: 'profile',
    children: [
      {path: '', element: <Profile />},
      {path: ':userId', element: <Profile />},
    ]
  },
  {
    path: 'admin',
    children: [
      {path: '', element: <Navigate to='users'/>},
      {
        path: 'users',
        children: [
          {path: '', element: <AdminPage tabState='users'/>},
          {path: 'create-user', element: <CreateUser/>},
        ]
      },
      {
        path: 'products',
        children: [
          {path: '', element: <AdminPage tabState='products'/>},
          {path: 'create-product', element: <CreateProduct/>},
          {
            path: 'edit-product',
            children: [
              {path: '', element: <AdminPage tabState='products'/>},
              {path: ':productId', element: <EditProduct/>},
            ]
          }
        ]
      },
      {
        path: 'statistics',
        children: [
          {path: '', element: <AdminPage tabState='statistics'/>},
          // {path: 'create-user', element: <CreateUser/>},
        ]
      },
    ]
  },
  {
    path: 'auth',
    children: [
      {path: '', element: <Navigate to='login'/>},
      {path: 'login', element: <LoginPage/>},
      {path: 'register', element: <RegisterPage/>},
    ]
  },
  {
    path: 'category',
    children: [
      {path: '', element: <Category/>},
      {
        path: ":type",
        children: [
          {path: '', element: <CategoryPage />},
          {path: ':itemId', element: <ItemPage />},
        ]
      },
    ]
  },
  {
    path: 'information',
    element: <InformationPage />,
  },
  {path: '*', element: <Navigate to='/'/>}
]

export default routes
