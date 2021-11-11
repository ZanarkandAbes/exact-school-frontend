import './UserEditForm.css'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'

import { useParams } from 'react-router-dom'

import CustomSelect from '../../../components/CustomSelect/CustomSelect'

import updateUserService from '../../../services/users/update-user'
import getBadgesService from '../../../services/badges/get-badges'
import getUserService from '../../../services/users/get-user'

import userTypesEnum from '../../../common/enums/userTypes'

import formatDate from '../../../common/utils/formatDate'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'
import { useToasts } from 'react-toast-notifications'

import successMessagesEnum from '../../../common/enums/successMessages'
import errorMessagesEnum from '../../../common/enums/errorMessages'

const UserEditForm = props => {

  const historyContext = useHistory()
  const toastContext = useToasts()

  const { token } = useAuth()

  const [badges, setBadges] = useState([])

  const paramsContext = useParams()

  const getUserData = async () => {
    const userData = await getUserService(token, paramsContext.id)
    userData.badges = userData.badges.map(badge => ({ value: badge._id, label: badge.name }))
    userData.birthDay = formatDate(new Date(userData.birthDay))
    console.log('userData', userData)
    formik.setValues(userData)
  }

  const getBadgesData = async () => {
    const badgesData = await getBadgesService(token, { badgeType: '', name: '' })
    setBadges(badgesData)
  }

  useEffect(() => {
    getUserData()
    getBadgesData()
  }, [])

  const validate = values => {
    const errors = {}

    if (!values.email) errors.email = 'O campo de e-mail é obrigatório'
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

      values.badges = values.badges.map(badgeToFind => badges.find(badge => badge._id === badgeToFind.value))

      updateUserService(token, paramsContext.id, values).then(data => {
        if (data) {
          historyContext.push('/usuarios')
          toastContext.addToast(successMessagesEnum.UPDATE_USER, { appearance: 'success', autoDismiss: true })
        } else {
          toastContext.addToast(errorMessagesEnum.UPDATE_USER, { appearance: 'error', autoDismiss: true })
        }
      })
    }
  })

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

  return (
    <div className="user-edit-form-container">
      <form>
        <div className="user-edit-form-fields">
          <input
            name="email"
            id="email"
            type="email"
            onChange={formik.handleChange}
            className="user-edit-form-input"
            placeholder="Digite o E-mail"
            value={formik.values.email}
          />
          {formik.errors.email ? <div className="user-edit-form-errors">{formik.errors.email}</div> : null}
        </div>
        <div className="user-edit-form-fields">
          <input
            name="name"
            id="name"
            type="text"
            onChange={formik.handleChange}
            className="user-edit-form-input"
            placeholder="Digite o Nome"
            value={formik.values.name}
          />
          {formik.errors.name ? <div className="user-edit-form-errors">{formik.errors.name}</div> : null}
        </div>
        <div className="user-edit-form-fields">
          <input
            name="birthDay"
            id="birthDay"
            type="date"
            onChange={formik.handleChange}
            className="user-edit-form-input"
            placeholder="Digite a Data de Nascimento"
            value={formik.values.birthDay}
          />
          {formik.errors.birthDay ? <div className="user-edit-form-errors">{formik.errors.birthDay}</div> : null}
        </div>
        <div className="user-edit-form-fields">
          <CustomSelect
            options={userTypeSelectOptions}
            value={formik.values.userType}
            onChange={value => formik.setFieldValue('userType', value.value)}
            placeholder="Escolha um tipo de usuário"
            isMulti={false}
          />
          {formik.errors.userType ? <div className="user-edit-form-errors">{formik.errors.userType}</div> : null}
        </div>
        <div className="user-edit-form-fields">
          <CustomSelect
            options={badges.map(badge => ({ value: badge._id, label: badge.name }))}
            value={formik.values.badges}
            onChange={value => formik.setFieldValue('badges', value)}
            placeholder="Escolha a(s) medalha(s)"
            isMulti={true}
          />
        </div>
        <div className="user-edit-form-fields">
          <input
            name="totalCoins"
            id="totalCoins"
            type="number"
            onChange={formik.handleChange}
            className="user-edit-form-input"
            placeholder="Digite a quantidade de moedas"
            value={formik.values.totalCoins}
          />
        </div>
      </form>
      <div className="user-edit-form-buttons-container">
        <button className="user-edit-form-button-submit" type="button" onClick={() => {
          formik.handleSubmit()
        }}>
          Atualizar
        </button>
        <button className="user-edit-form-button-back" type="button" onClick={() => {
          historyContext.push('/usuarios')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default UserEditForm