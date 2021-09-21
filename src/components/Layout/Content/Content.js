import './Content.css'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../../../pages/Home/Home'
import About from '../../../pages/About/About'
import Users from '../../../pages/Users/Users'
import Param from '../../../pages/Param/Param'
import NotFound from '../../../pages/NotFound/NotFound'

const Content = props => {

  return (
    <main className="content-container">
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={About} exact path="/about" />
        <Route component={Param} exact path="/param/:id" />
        <Route component={Users} exact path="/usuarios" />
        <Route component={NotFound} path="*" />
      </Switch>
    </main>
  )
}

export default Content
