import './Content.css'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import About from '../../../pages/About'
import Home from '../../../pages/Home'
import Param from '../../../pages/Param'
import NotFound from '../../../pages/NotFound'

const Content = props => {

  return (
    <main className="content">
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/param/:id">
          <Param />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </main>
  )
}

export default Content
