import './Footer.css'
import React from 'react'

const Footer = props => {

  return (
    <nav className="nav-footer-container">
      <div className="div-footer-container">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 8px' }}>
          <p>Desenvolvido por Israel Fernandes Pereira</p>
        </div>
      </div>
    </nav>
  )
}

export default Footer