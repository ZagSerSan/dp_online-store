import React from 'react'
import { Switch, Route } from 'react-router-dom'
// styles
import './app.css'
// components
import Header from '././components/ui/header'
// --Routes
import Category from './layouts/category'
import Home from './layouts/home'
import ProductModal from './components/common/product/productModal'

function App() {
  return (<>
    <Header/>
    <Switch>
      <Route path='/' exact component={Home}></Route>
      <Route path='/category/:type?' exact component={Category}></Route>
    </Switch>
  </>)
}

export default App
