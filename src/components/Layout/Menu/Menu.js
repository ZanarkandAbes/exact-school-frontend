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
            <Link to="/param/123">Param #01</Link>
          </li>
          <li>
            <Link to="/param/cool">Param #02</Link>
          </li>
          <li>
            <Link to="/about">Sobre</Link>
          </li>
          <li>
            <Link to="/dont-exist">Não Existe</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Menu
