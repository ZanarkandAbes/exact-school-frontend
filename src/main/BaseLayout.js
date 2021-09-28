import './BaseLayout.css'
import React from 'react'

import Header from '../components/Layout/Header/Header'
import Menu from '../components/Layout/Menu/Menu'
import Content from '../components/Layout/Content/Content'
import Footer from '../components/Layout/Footer/Footer'

import { BrowserRouter as Router } from 'react-router-dom'

const BaseLayout = props => {

  return (
    <div className="home-page-container">
      <Router>
        <div className="page-container">
          <div className="header-container">
            <Header />
          </div>
          <div className="page-content-container">
            <div className="sidebar-container">
              <Menu />
            </div>
            <div className="page-content">
              <Content>
                {props.children}
              </Content>
            </div>
          </div>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </Router>
    </div>
  )
}

export default BaseLayout