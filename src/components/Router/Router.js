import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Login from '../../pages/Login'
import UserRegisterForm from '../../pages/Users/Register/UserRegisterForm'
import UserEditForm from '../../pages/Users/Edit/UserEditForm'
import BadgeRegisterForm from '../../pages/Badges/Register/BadgeRegisterForm'
import QuizRegisterForm from '../../pages/Quizzes/Register/QuizRegisterForm'
import QuizEditForm from '../../pages/Quizzes/Edit/QuizEditForm'
import TopicRegisterForm from '../../pages/Topics/Register/TopicRegisterForm'
import ClassRegisterForm from '../../pages/Classes/Register/ClassRegisterForm'
import NotFound from '../../pages/NotFound/NotFound'

import BaseLayout from '../../main/BaseLayout'

import Home from '../../pages/Home/Home'
import About from '../../pages/About/About'
import Users from '../../pages/Users/Users'
import Quizzes from '../../pages/Quizzes/Quizzes'
import Topics from '../../pages/Topics/Topics'
import Classes from '../../pages/Classes/Classes'
import Badges from '../../pages/Badges/Badges'

import { history } from '../../history'
import { useAuth } from '../../providers/auth'

const hasAccess = (userType, route) => {
  if (userType === 'TEACHER') {
    switch (route) {
      case '/usuarios':
        return false
      case '/usuarios/cadastrar':
        return false
      case '/usuarios/atualizar/:id':
        return false
      case '/medalhas/cadastrar':
        return false
      default:
        return true
    }
  } else if (userType === 'STUDENT') {
    switch (route) {
      case '/usuarios':
        return false
      case '/usuarios/cadastrar':
        return false
      case '/usuarios/atualizar/:id':
        return false
      case '/medalhas/cadastrar':
        return false
      case '/aulas/cadastrar':
        return false
      case '/questionarios':
        return false
      case '/questionarios/cadastrar':
        return false
      case '/questionarios/editar':
        return false
      default:
        return true
    }
  }
  return true
}

const LoggedRoutes = ({ userType }) => (
  <BaseLayout>
    <Switch>
      {hasAccess(userType, '/about') && <Route component={About} exact path="/about" />}
      {hasAccess(userType, '/usuarios') && <Route component={Users} exact path="/usuarios" />}
      {hasAccess(userType, '/usuarios/cadastrar') && <Route component={UserRegisterForm} exact path="/usuarios/cadastrar" />}
      {hasAccess(userType, '/usuarios/atualizar/:id') && <Route component={UserEditForm} exact path="/usuarios/atualizar/:id" />}
      {hasAccess(userType, '/medalhas/cadastrar') && <Route component={BadgeRegisterForm} exact path="/medalhas/cadastrar" />}
      {hasAccess(userType, '/aulas/cadastrar') && <Route component={ClassRegisterForm} exact path="/aulas/cadastrar" />}
      {hasAccess(userType, '/questionarios/cadastrar') && <Route component={QuizRegisterForm} exact path="/questionarios/cadastrar" />}
      {hasAccess(userType, '/questionarios/atualizar/:id') && <Route component={QuizEditForm} exact path="/questionarios/atualizar/:id" />}
      {hasAccess(userType, '/topicos/cadastrar') && <Route component={TopicRegisterForm} exact path="/topicos/cadastrar" />}
      {hasAccess(userType, '/questionarios') && <Route component={Quizzes} exact path="/questionarios" />}
      {hasAccess(userType, '/topicos') && <Route component={Topics} exact path="/topicos" />}
      {hasAccess(userType, '/aulas') && <Route component={Classes} exact path="/aulas" />}
      {hasAccess(userType, '/medalhas') && <Route component={Badges} exact path="/medalhas" />}
      {hasAccess(userType, '/') && <Route component={Home} exact path="/" />}
      {hasAccess(userType, '*') && <Route component={NotFound} path="*" />}
      <Redirect to="/" from="*" />
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

  const { token, tokenLoaded, userData } = useAuth()

  if (!tokenLoaded) return (<></>)

  const isLogged = !!token

  const Routes = isLogged ? LoggedRoutes : LoginRoutes

  return (
    <BrowserRouter history={history}>
      <Routes userType={userData?.userType} />
    </BrowserRouter>
  )
}

export default Router