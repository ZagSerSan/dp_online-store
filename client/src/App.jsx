import React from 'react'
import { useRoutes } from "react-router-dom";
import './app.css'
// components
import Header from './components/ui/header'
import AppLoader from './components/ui/hoc/appLoader';
import routes from './routes'
import withRouter from './utils/withRouter';

function App() {
  const elements = useRoutes(routes)

  return (
    <>
      <AppLoader>
        <Header/>
        {elements}
      </AppLoader>
    </>
  )
}

const AppWithRoutes = withRouter(App)
export default AppWithRoutes
