import './TopicRegisterForm.css'
import React from 'react'
import { useFormik } from 'formik'

import CustomSelect from '../../../components/CustomSelect/CustomSelect'
import CustomCreatableSelect from '../../../components/CustomCreatableSelect/CustomCreatableSelect'

import registerTopicService from '../../../services/topics/register-topic'

import topicTypesEnum from '../../../common/enums/topicTypes'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'
import { useToasts } from 'react-toast-notifications'

import successMessagesEnum from '../../../common/enums/successMessages'
import errorMessagesEnum from '../../../common/enums/errorMessages'

const TopicRegisterForm = props => {

  const historyContext = useHistory()
  const toastContext = useToasts()

  const { token, userData } = useAuth()

  const topicTypeSelectOptions = [
    {
      value: topicTypesEnum.DOUBT,
      label: 'Dúvida'
    },
    {
      value: topicTypesEnum.SUGGESTION,
      label: 'Sugestão'
    }
  ]

  const tagSelectOptions = [{}]

  const validate = values => {
    const errors = {}

    if (!values.title) errors.title = 'O campo de título é obrigatório'
    if (values.title.length < 1 || values.title.length > 100) errors.title = 'É necessário um título entre no mínimo 1 e no máximo 100 caracteres'
    if (!values.description) errors.description = 'O campo de descrição é obrigatório'
    if (values.description.length < 1 || values.description.length > 500) errors.description = 'É necessário uma descrição entre no mínimo 1 e no máximo 500 caracteres'
    if (!values.topicType) errors.topicType = 'O campo de tipo de tópico é obrigatório'

    return errors
  }

  const formik = useFormik({
    initialValues: {
      userId: '',
      title: '',
      description: '',
      tags: [],
      topicAnswers: [],
      topicType: ''
    },
    validate,
    onSubmit: values => {

      values.userId = userData._id

      values.tags = values.tags.map(tag => tag.value)

      registerTopicService(token, values).then(data => {
        if (data) {
          historyContext.push('/topicos')
          toastContext.addToast(successMessagesEnum.REGISTER_TOPIC, { appearance: 'success', autoDismiss: true })
        } else {
          toastContext.addToast(errorMessagesEnum.REGISTER_TOPIC, { appearance: 'error', autoDismiss: true })
        }
      })
    }
  })

  return (
    <div className="topic-register-form-container">
      <form>
        <div className="topic-register-form-fields">
          <input
            name="title"
            id="title"
            type="text"
            onChange={formik.handleChange}
            className="topic-register-form-input"
            placeholder="Digite o Título"
            value={formik.values.title}
          />
          {formik.errors.title ? <div className="topic-register-form-errors">{formik.errors.title}</div> : null}
        </div>
        <div className="topic-register-form-fields">
          <input
            name="description"
            id="description"
            type="text"
            onChange={formik.handleChange}
            className="topic-register-form-input"
            placeholder="Digite a descrição"
            value={formik.values.description}
          />
          {formik.errors.description ? <div className="topic-register-form-errors">{formik.errors.description}</div> : null}
        </div>
        <div className="topic-register-form-fields">
          <CustomCreatableSelect
            options={tagSelectOptions}
            value={formik.values.tags}
            onChange={value => formik.setFieldValue('tags', value)}
            placeholder="Digite as tags"
            isMulti={true}
          />
        </div>
        <div className="topic-register-form-fields">
          <CustomSelect
            options={topicTypeSelectOptions}
            value={formik.values.topicType}
            onChange={value => formik.setFieldValue('topicType', value.value)}
            placeholder="Escolha um tipo de tópico"
            isMulti={false}
          />
          {formik.errors.topicType ? <div className="topic-register-form-errors">{formik.errors.topicType}</div> : null}
        </div>
      </form>
      <div className="topic-register-form-buttons-container">
        <button className="topic-register-form-button-submit" type="button" onClick={() => {
          formik.handleSubmit()
        }}>
          Cadastrar
        </button>
        <button className="topic-register-form-button-back" type="button" onClick={() => {
          historyContext.push('/topicos')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default TopicRegisterForm