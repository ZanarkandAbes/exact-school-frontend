import './AppAdminLTE.css'
import React from 'react'

import Header from '../components/Layout/Header/Header'
import Menu from '../components/Layout/Menu/Menu'
import Content from '../components/Layout/Content/Content'

import { BrowserRouter as Router } from 'react-router-dom'

const AppAdminLTE = props => {

  return (
    <div className="app-admin-lte">
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
              <Content />
            </div>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default AppAdminLTE