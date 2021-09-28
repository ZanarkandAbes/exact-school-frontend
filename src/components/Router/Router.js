import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Login from '../../pages/Login'
import Register from '../../pages/Users/Register'
import NotFound from '../../pages/NotFound/NotFound'

import PrivateRoute from '../PrivateRoute/PrivateRoute'

import BaseLayout from '../../main/BaseLayout'

import Home from '../../pages/Home/Home'
import About from '../../pages/About/About'
import Param from '../../pages/Param/Param'
import Users from '../../pages/Users/Users'

import { history } from '../../history'
import { useAuth } from '../../providers/auth'

const LoggedRoutes = () => (
  <BaseLayout>
    <Switch>
      <Route component={Register} exact path="/cadastrar-usuario" />
      <Route component={About} exact path="/about" />
      <Route component={Param} exact path="/param/:id" />
      <Route component={Users} exact path="/usuarios" />
      <Route component={Home} exact path="/" />
      {/* <Route component={NotFound} path="*" /> */}
    </Switch>
  </BaseLayout>
)

const LoginRoutes = () => (
  <Switch>
    <Route component={Login} exact path="/login" />
    {/* <Route component={NotFound} path="*" /> */}
    <Redirect to="/login" from="*" />
  </Switch>
)

const Router = () => {

  const authProvider = useAuth()

  if (!authProvider.tokenLoaded) return (<></>)

  const isLogged = !!authProvider.token

  console.log(authProvider.token)

  const Routes = isLogged ? LoggedRoutes : LoginRoutes

  return (
    <BrowserRouter history={history}>
      <Routes />
    </BrowserRouter>
  )
}

export default Router