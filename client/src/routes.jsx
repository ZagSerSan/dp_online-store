import React from 'react'
import { Navigate } from "react-router-dom"
// --Routes
import Category from './layouts/category'
import Home from './layouts/home'
// import ProductModal from './components/common/product/productModal'
import CategoryPage from "./components/pages/category"
import LoginPage from "./components/pages/auth/loginPage"
import RegisterPage from "./components/pages/auth/registerPage"
import Profile from "./components/pages/profile/profile"
import DeliveryPage from "./components/pages/delivery"
import AboutPage from "./components/pages/about"
import ContactPage from "./components/pages/contact"
import ItemPage from "./components/pages/item/itemPage"
import FavouritesPage from "./components/pages/favourites/favouritesPage"
import Cart from "./components/pages/cart/cart"
import AdminPage from "./components/pages/admin/adminPage"
import CreateUser from "./components/pages/admin/createAndEditPages/createUser"
import CreateProduct from "./components/pages/admin/createAndEditPages/createProduct"
import EditProduct from './components/pages/admin/createAndEditPages/editProduct'

const routes = [
  {path: '/', element: <Home/>},
  {path: 'favourites', element: <FavouritesPage />},
  {path: 'cart', element: <Cart />},
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
        ]
      },
      {
        path: 'edit-product',
        children: [
          {path: '', element: <AdminPage/>},
          {path: ':productId', element: <EditProduct/>},
        ]
      },
    ]
    // children: [
    //   {path: '', element: <AdminPage />},
    //   {path: 'create-user', element: <CreateUser/>},
    //   {path: 'create-product', element: <CreateProduct/>},
    //   {
    //     path: 'edit-product',
    //     children: [
    //       {path: '', element: <AdminPage/>},
    //       {path: ':productId', element: <EditProduct/>},
    //     ]
    //   },
    // ]
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
          {
            path: ':itemId', element: <ItemPage />
            // children: [
            //   {path: '', element: <ItemPage />},
            //   {path: 'edit', element: <EditProduct />},
            // ]
          },
        ]
      },
    ]
  },
  {
    path: 'delivery',
    element: <DeliveryPage />,
  },
  {
    path: 'about',
    element: <AboutPage/>,
  },
  {
    path: 'contacts',
    element: <ContactPage />,
  },
  {path: '*', element: <Navigate to='/'/>}
]

export default routes
