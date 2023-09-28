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
