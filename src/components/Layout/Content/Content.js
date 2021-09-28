import './Content.css'
import React from 'react'

const Content = props => {

  return (
    <main className="content-container">
      {props.children}
    </main>
  )
}

export default Content
