import { Route, Switch, Router } from 'react-router-dom'

import Login from '../../pages/Login'
import Register from '../../pages/Users/Register'
import NotFound from '../../pages/NotFound/NotFound'

import PrivateRoute from '../PrivateRoute/PrivateRoute'

import BaseLayout from '../../main/BaseLayout'

import { history } from '../../history'

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route component={Login} exact path="/login" />
      <Route component={Register} exact path="/cadastrar-usuario" />
      <PrivateRoute component={BaseLayout} exact path="/" />
      <PrivateRoute component={NotFound} path="*" />
    </Switch>
  </Router>
)

export default Routes