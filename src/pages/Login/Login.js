import './Login.css'
import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import loginService from '../../services/users/login'
import { useAuth } from '../../providers/auth'
import { history } from '../../history'
import { useToasts } from 'react-toast-notifications'

const Login = () => {

  const toastContext = useToasts()

  // trocar authProvider por authContext

  const authProvider = useAuth()

  const handleSubmit = values => {
    loginService(values).then(data => {
      if (data) {
        history.push('/')
        authProvider.setToken(data.token)
        toastContext.addToast('Foi! kkkkkk', { appearance: 'success', autoDismiss: true })
      } else {
        toastContext.addToast('Deu ruim ! kkkkk', { appearance: 'error', autoDismiss: true })
      }
    })
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