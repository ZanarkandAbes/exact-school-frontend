import { Route, Switch, Router } from 'react-router-dom'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'

import BaseLayout from '../../main/BaseLayout'

import { history } from '../../history'

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route component={Login} exact path="/login" />
      <Route component={Register} exact path="register-user" />
      <Route component={BaseLayout} exact path="/" />
    </Switch>
  </Router>
)

export default Routes