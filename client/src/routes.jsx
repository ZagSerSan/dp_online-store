import { Navigate } from "react-router-dom"
// --Routes
import Category from './layouts/category'
import Home from './layouts/home'
// import ProductModal from './components/common/product/productModal'
import CategoryPage from "./components/pages/categoryPage"
import LoginPage from "./components/pages/authPages/loginPage"
import RegisterPage from "./components/pages/authPages/registerPage"
import Profile from "./components/pages/profile/profile"

const routes = [
  {path: '/', element: <Home/>},
  {path: 'profile', element: <Profile />},
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
    element: <div className="my-container text-[40px]">delivery</div>,
  },
  {
    path: 'about',
    element: <div className="my-container text-[40px]">about</div>,
  },
  {
    path: 'contacts',
    element: <div className="my-container text-[40px]">contacts</div>,
  },
  {path: '*', element: <Navigate to='/'/>}
]

export default routes