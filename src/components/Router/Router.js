import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Login from '../../pages/Login'
import UserRegisterForm from '../../pages/Users/Register/UserRegisterForm'
import NotFound from '../../pages/NotFound/NotFound'

import BaseLayout from '../../main/BaseLayout'

import Home from '../../pages/Home/Home'
import About from '../../pages/About/About'
import Param from '../../pages/Param/Param'
import Users from '../../pages/Users/Users'
import Quizzes from '../../pages/Quizzes/Quizzes'
import Topics from '../../pages/Topics/Topics'
import Classes from '../../pages/Classes/Classes'
import Badges from '../../pages/Badges/Badges'

import { history } from '../../history'
import { useAuth } from '../../providers/auth'

const LoggedRoutes = () => (
  <BaseLayout>
    <Switch>
      <Route component={About} exact path="/about" />
      <Route component={Param} exact path="/param/:id" />
      <Route component={Users} exact path="/usuarios" />
      <Route component={UserRegisterForm} exact path="/usuarios/cadastrar" />
      <Route component={Quizzes} exact path="/questionarios" />
      <Route component={Topics} exact path="/topicos" />
      <Route component={Classes} exact path="/aulas" />
      <Route component={Badges} exact path="/medalhas" />
      <Route component={Home} exact path="/" />
      <Route component={NotFound} path="*" />
    </Switch>
  </BaseLayout>
)

const LoginRoutes = () => (
  <Switch>
    <Route component={Login} exact path="/login" />
    <Redirect to="/login" from="*" />
  </Switch>
)

const Router = () => {

  const authProvider = useAuth()

  if (!authProvider.tokenLoaded) return (<></>)

  const isLogged = !!authProvider.token

  const Routes = isLogged ? LoggedRoutes : LoginRoutes

  return (
    <BrowserRouter history={history}>
      <Routes />
    </BrowserRouter>
  )
}

export default Router