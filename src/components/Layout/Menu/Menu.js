import './Menu.css'
import React from 'react'

import { Link } from 'react-router-dom'
import { useAuth } from '../../../providers/auth'

const Menu = props => {

  const authUserData = useAuth().userData

  const hasAccess = (route) => {
    if (authUserData.userType === 'TEACHER') {
      switch (route) {
        case '/usuarios':
          return false
        default:
          return true
      }
    } else if (authUserData.userType === 'STUDENT') {
      switch (route) {
        case '/usuarios':
          return false
        case '/questionarios':
          return false
        default:
          return true
      }
    }
    return true
  }

  return (
    <aside className="menu">
      <nav>
        <ul>
          <li className={hasAccess("/") ? "show" : "hide"}>
            <Link to="/">Início</Link>
          </li>
          <li className={hasAccess("/usuarios") ? "show" : "hide"}>
            <Link to="/usuarios">Usuários</Link>
          </li>
          <li className={hasAccess("/questionarios") ? "show" : "hide"}>
            <Link to="/questionarios">Questionários</Link>
          </li>
          <li className={hasAccess("/topicos") ? "show" : "hide"}>
            <Link to="/topicos">Tópicos</Link>
          </li>
          <li className={hasAccess("/aulas") ? "show" : "hide"}>
            <Link to="/aulas">Aulas</Link>
          </li>
          <li className={hasAccess("/medalhas") ? "show" : "hide"}>
            <Link to="/medalhas">Medalhas</Link>
          </li>
          <li className={hasAccess("/about") ? "show" : "hide"}>
            <Link to="/about">Sobre</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Menu
