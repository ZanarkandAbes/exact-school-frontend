import './Login.css'
import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'


import loginService from '../../services/login'

const Login = () => {

  const handleSubmit = values => {
    
    const token = loginService(values)

  }

  const validators = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(1).max(30).required()
  })


  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <p className="login-description">Preencha os campos para continuar</p>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validators}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field
              name="email"
              className="login-form-field"
            />
            <ErrorMessage
              component="span"
              name="email"
              className="login-form-error"
            />
          </div>
          <div className="login-form-group">
            <Field
              name="password"
              className="login-form-field"
            />
            <ErrorMessage
              component="span"
              name="password"
              className="login-form-error"
            />
          </div>
          <button className="login-form-button-submit" type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login