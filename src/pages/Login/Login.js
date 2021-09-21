import './Login.css'
import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import loginService from '../../services/users/login'

const Login = () => {

  const handleSubmit = values => {
    loginService(values)
  }

  const validators = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(1).max(30).required()
  })


  return (
    <div className="login-container">
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validators}
      >
        <Form className="login-form">
          <h1 className="login-title">Exact School</h1>
          <h1 className="login-title">Login</h1>
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
              type="password"
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