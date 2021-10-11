import './BadgeRegisterForm.css'
import React from 'react'
import { useFormik } from 'formik'

import CustomSelect from '../../../components/CustomSelect/CustomSelect'

import registerBadgeService from '../../../services/badges/register-badge'

import badgeTypesEnum from '../../../common/enums/badgeTypes'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'
import { useToasts } from 'react-toast-notifications'

import successMessagesEnum from '../../../common/enums/successMessages'
import errorMessagesEnum from '../../../common/enums/errorMessages'

const BadgeRegisterForm = props => {

  const historyContext = useHistory()
  const toastContext = useToasts()

  const { token } = useAuth()

  const badgeTypeSelectOptions = [
    {
      value: badgeTypesEnum.ACHIEVEMENT,
      label: 'Conquista'
    }
  ]

  const validate = values => {
    const errors = {}

    if (!values.name) errors.name = 'O campo de nome é obrigatório'
    if (values.name.length < 1 || values.name.length > 100) errors.name = 'É necessário um nome entre no mínimo 1 e no máximo 100 caracteres'
    if (!values.price) errors.price = 'O campo de preço é obrigatório'
    if (!values.badgeType) errors.badgeType = 'O campo de tipo de medalha é obrigatório'

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      badgeType: ''
    },
    validate,
    onSubmit: values => {
      // setar o loading (controlar estado)
      registerBadgeService(token, values).then(data => {
        if (data) {
          historyContext.push('/medalhas')
          toastContext.addToast(successMessagesEnum.REGISTER_BADGE, { appearance: 'success', autoDismiss: true })
        } else {
          toastContext.addToast(errorMessagesEnum.REGISTER_BADGE, { appearance: 'error', autoDismiss: true })
        }
      })

    }
  })

  return (
    <div className="badge-register-form-container">
      <form>
        <div className="badge-register-form-fields">
          <input
            name="name"
            id="name"
            type="text"
            onChange={formik.handleChange}
            className="badge-register-form-input"
            placeholder="Digite o Nome"
            value={formik.values.name}
          />
          {formik.errors.name ? <div className="badge-register-form-errors">{formik.errors.name}</div> : null}
        </div>
        <div className="badge-register-form-fields">
          <input
            name="price"
            id="price"
            type="number"
            onChange={formik.handleChange}
            className="badge-register-form-input"
            placeholder="Digite a quantidade de moedas que a medalha custa"
            value={formik.values.price}
          />
          {formik.errors.price ? <div className="quiz-register-form-errors">{formik.errors.price}</div> : null}
        </div>
        <div className="badge-register-form-fields">
          <CustomSelect
            options={badgeTypeSelectOptions}
            value={formik.values.badgeType}
            onChange={value => formik.setFieldValue('badgeType', value.value)}
            placeholder="Escolha um tipo de medalha"
            isMulti={false}
          />
          {formik.errors.badgeType ? <div className="badge-register-form-errors">{formik.errors.badgeType}</div> : null}
        </div>
      </form>
      <div className="badge-register-form-buttons-container">
        <button className="badge-register-form-button-submit" type="button" onClick={() => {
          formik.handleSubmit()
        }}>
          Cadastrar
        </button>
        <button className="badge-register-form-button-back" type="button" onClick={() => {
          historyContext.push('/medalhas')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default BadgeRegisterForm