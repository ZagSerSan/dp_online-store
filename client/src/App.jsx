import React from 'react'
import { useRoutes } from "react-router-dom";
import './app.css'
import Header from './components/ui/header'
import routes from './routes'
// components
import withRouter from './utils/withRouter';

function App() {
const elements = useRoutes(routes)

  return (<>
    <Header/>
    {elements}
    <div>footer</div>
  </>)
}

const AppWithRoutes = withRouter(App)
export default AppWithRoutes
