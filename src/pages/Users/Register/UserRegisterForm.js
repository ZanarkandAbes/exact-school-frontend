import './UserRegisterForm.css'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'

import CustomSelect from '../../../components/CustomSelect/CustomSelect'

import registerUserService from '../../../services/users/register-user'
import getBadgesService from '../../../services/badges/get-badges'

import { history } from '../../../history'

import userTypesEnum from '../../../common/enums/userType'

const UserRegisterForm = props => {

  const token = localStorage.getItem('app-token')
  const [badgesValues, setBadgesValues] = useState([])

  useEffect(() => {
    getBadgesService(token, { badgeType: '', name: '' }, setBadgesValues)
  }, [])

  const badgesSelectOptions = badgesValues.map(badge => ({ value: badge, label: badge.name }))

  const userTypeSelectOptions = [
    {
      value: userTypesEnum.ADMIN,
      label: 'Administrador'
    },
    {
      value: userTypesEnum.TEACHER,
      label: 'Professor'
    },
    {
      value: userTypesEnum.STUDENT,
      label: 'Estudante'
    }
  ]

  const validate = values => {
    const errors = {}

    if (!values.email) errors.email = 'O campo de e-mail é obrigatório'
    if (!values.password) errors.password = 'O campo de senha é obrigatório'
    if (values.password.length < 1 || values.password.length > 30) errors.password = 'É necessário uma senha entre no mínimo 1 e no máximo 30 caracteres'
    if (!values.name) errors.name = 'O campo de nome é obrigatório'
    if (values.name.length < 2 || values.name.length > 100) errors.name = 'É necessário um nome entre no mínimo 2 e no máximo 100 caracteres'
    if (!values.birthDay) errors.birthDay = 'O campo de data de nascimento é obrigatório'
    if (!values.userType) errors.userType = 'O campo de tipo de usuário é obrigatório'

    return errors
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      birthDay: '',
      userType: '',
      badges: [],
      totalCoins: 0
    },
    validate,
    onSubmit: values => {
      console.log(values)

      let badges = values.badges.map(badge => ({ ...badge.value }))
      values.badges = badges
      registerUserService(token, values)
    }
  })

  return (
    <div className="user-register-form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="user-register-form-fields">
          <input
            name="email"
            id="email"
            type="email"
            onChange={formik.handleChange}
            className="user-register-form-input"
            placeholder="Digite o E-mail"
            value={formik.values.email}
          />
          {formik.errors.email ? <div className="user-register-form-errors">{formik.errors.email}</div> : null}
        </div>
        <div className="user-register-form-fields">
          <input
            name="password"
            id="password"
            type="password"
            onChange={formik.handleChange}
            className="user-register-form-input"
            placeholder="Digite a Senha"
            value={formik.values.password}
          />
          {formik.errors.password ? <div className="user-register-form-errors">{formik.errors.password}</div> : null}
        </div>
        <div className="user-register-form-fields">
          <input
            name="name"
            id="name"
            type="text"
            onChange={formik.handleChange}
            className="user-register-form-input"
            placeholder="Digite o Nome"
            value={formik.values.name}
          />
          {formik.errors.name ? <div className="user-register-form-errors">{formik.errors.name}</div> : null}
        </div>
        <div className="user-register-form-fields">
          <input
            name="birthDay"
            id="birthDay"
            type="date"
            onChange={formik.handleChange}
            className="user-register-form-input"
            placeholder="Digite a Data de Nascimento"
            value={formik.values.birthDay}
          />
          {formik.errors.birthDay ? <div className="user-register-form-errors">{formik.errors.birthDay}</div> : null}
        </div>
        <div className="user-register-form-fields">
          <CustomSelect
            options={userTypeSelectOptions}
            value={formik.values.userType}
            onChange={value => formik.setFieldValue('userType', value.value)}
            placeholder="Escolha um tipo de usuário"
            isMulti={false}
          />
          {formik.errors.userType ? <div className="user-register-form-errors">{formik.errors.userType}</div> : null}
        </div>
        <div className="user-register-form-fields">
          <CustomSelect
            options={badgesSelectOptions}
            value={formik.values.badges}
            onChange={value => formik.setFieldValue('badges', value)}
            placeholder="Escolha a(s) medalha(s)"
            isMulti={true}
          />
        </div>
        <div className="user-register-form-fields">
          <input
            name="totalCoins"
            id="totalCoins"
            type="number"
            onChange={formik.handleChange}
            className="user-register-form-input"
            placeholder="Digite a quantidade de moedas"
            value={formik.values.totalCoins}
          />
        </div>
        <div className="user-register-form-buttons-container">
          <button className="user-register-form-button-submit" type="submit">Cadastrar</button>
          <button className="user-register-form-button-back" type="button">Voltar</button>
        </div>
      </form>
    </div>
  )
}

export default UserRegisterForm