import './Menu.css'
import React from 'react'

import { Link } from 'react-router-dom'

const Menu = props => {

  return (
    <aside className="menu">
      <nav>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/usuarios">Usuários</Link>
          </li>
          <li>
            <Link to="/questionarios">Questionários</Link>
          </li>
          <li>
            <Link to="/topicos">Tópicos</Link>
          </li>
          <li>
            <Link to="/aulas">Aulas</Link>
          </li>
          <li>
            <Link to="/medalhas">Medalhas</Link>
          </li>
          <li>
            <Link to="/about">Sobre</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Menu
