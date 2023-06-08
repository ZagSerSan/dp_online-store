import React from 'react'
import { Switch, Route } from 'react-router-dom'
// styles
import './app.css'
// components
import Header from './components/header'
import Home from './layouts/home'

function App() {
  return (<>
    <Header/>
    <Switch>
      <Route path='/' exact component={Home}></Route>
    </Switch>
  </>)
}

export default App
