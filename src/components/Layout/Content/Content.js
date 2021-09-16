import './Content.css'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import About from '../../../pages/About/About'
import Home from '../../../pages/Home/Home'
import Param from '../../../pages/Param/Param'
import NotFound from '../../../pages/NotFound/NotFound'

const Content = props => {

  return (
    <main className="content-container">
      <Switch>
        <Route component={About} path="/about" />
        <Route component={Param} path="/param/:id" />
        <Route component={Home} exact path="/" />
        <Route component={NotFound} path="*" />
      </Switch>
    </main>
  )
}

export default Content
