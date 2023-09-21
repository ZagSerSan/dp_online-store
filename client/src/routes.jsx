import { Navigate } from "react-router-dom"
// --Routes
import Category from './layouts/category'
import Home from './layouts/home'
import ProductModal from './components/common/product/productModal'
import CategoryPage from "./components/pages/categoryPage"
import LoginPage from "./components/pages/authPages/loginPage"
import RegisterPage from "./components/pages/authPages/registerPage"

const routes = [
  {path: '/', element: <Home/>},
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
      {path: ":type", element: <CategoryPage />},
    ]
  },
  {
    path: 'delivery',
    element: <h1>delivery /</h1>,
  },
  {
    path: 'about',
    element: <h1>about /</h1>,
  },
  {
    path: 'contacts',
    element: <h1>contacts /</h1>,
  },
  {path: '*', element: <Navigate to='/'/>}
]

export default routes
