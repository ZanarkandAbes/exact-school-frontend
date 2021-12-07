import './Header.css'
import React from 'react'
import { NavLink } from 'react-router-dom'

import Image from '../../Image/Image'

import logoImagePath from '../../../assets/images/final_fantasy_x_logo_2.jfif'
import profileImagePath from '../../../assets/images/final_fantasy_x_logo.jfif'
import { useAuth } from '../../../providers/auth'

const Header = props => {

  const authContext = useAuth()

  return (
    <nav className="nav-header-container">
      <div className="div-header-container">
        <div className="div-logo-svg-container">
          {/* <Image image={logoImagePath} className="div-logo-svg-container" /> */}
          <h1 className="h1-title-container">Exact School</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 8px' }}>
          {/* <NavLink to='/#profile_exact_school'><Image image={profileImagePath} className="div-logo-svg-container" /></NavLink> */}
          {/* <h1 className="h1-title-container">Perfil</h1> */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 8px' }}>
            <button className="button-header" onClick={authContext.logout}>Sair</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header