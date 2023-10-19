import React from 'react'
import { useRoutes } from "react-router-dom";
import './app.css'
// components
import routes from './routes'
import withRouter from './utils/withRouter';
import AppLoader from './components/ui/hoc/appLoader';
import Header from './components/ui/header'
import Footer from './components/ui/footer';

function App() {
  const elements = useRoutes(routes)

  return (
    <div className='app-wrapper'>
      <AppLoader>
        <Header/>
        {elements}
        <Footer/>
      </AppLoader>
    </div>
  )
}

const AppWithRoutes = withRouter(App)
export default AppWithRoutes
