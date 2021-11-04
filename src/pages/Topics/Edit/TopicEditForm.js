import './TopicEditForm.css'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'

import { useParams } from 'react-router-dom'

import CustomSelect from '../../../components/CustomSelect/CustomSelect'
import CustomCreatableSelect from '../../../components/CustomCreatableSelect/CustomCreatableSelect'

import updateTopicService from '../../../services/topics/update-topic'
import getTopicService from '../../../services/topics/get-topic'

import topicTypesEnum from '../../../common/enums/topicTypes'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'
import { useToasts } from 'react-toast-notifications'

import successMessagesEnum from '../../../common/enums/successMessages'
import errorMessagesEnum from '../../../common/enums/errorMessages'

const TopicEditForm = props => {

  const historyContext = useHistory()
  const toastContext = useToasts()

  const { token } = useAuth()

  const paramsContext = useParams()

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

  const getTopicData = async () => {
    const topicData = await getTopicService(token, paramsContext.id)
    topicData.tags = topicData.tags.map(tag => ({ value: tag, label: tag }))
    formik.setValues(topicData)
  }

  useEffect(() => {
    getTopicData()
  }, [])

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

      values.tags = values.tags.map(tag => tag.value)
      
      updateTopicService(token, paramsContext.id, values).then(data => {
        if (data) {
          historyContext.push('/topicos')
          toastContext.addToast(successMessagesEnum.UPDATE_TOPIC, { appearance: 'success', autoDismiss: true })
        } else {
          toastContext.addToast(errorMessagesEnum.UPDATE_TOPIC, { appearance: 'error', autoDismiss: true })
        }
      })

    }
  })

  return (
    <div className="topic-edit-form-container">
      <form>
        <div className="topic-edit-form-fields">
          <input
            name="title"
            id="title"
            type="text"
            onChange={formik.handleChange}
            className="topic-edit-form-input"
            placeholder="Digite o Título"
            value={formik.values.title}
          />
          {formik.errors.title ? <div className="topic-edit-form-errors">{formik.errors.title}</div> : null}
        </div>
        <div className="topic-edit-form-fields">
          <input
            name="description"
            id="description"
            type="text"
            onChange={formik.handleChange}
            className="topic-edit-form-input"
            placeholder="Digite a descrição"
            value={formik.values.description}
          />
          {formik.errors.description ? <div className="topic-edit-form-errors">{formik.errors.description}</div> : null}
        </div>
        <div className="topic-edit-form-fields">
          <CustomCreatableSelect
            options={tagSelectOptions}
            value={formik.values.tags}
            onChange={value => formik.setFieldValue('tags', value)}
            placeholder="Digite as tags"
            isMulti={true}
          />
        </div>
        <div className="topic-edit-form-fields">
          <CustomSelect
            options={topicTypeSelectOptions}
            value={formik.values.topicType}
            onChange={value => formik.setFieldValue('topicType', value.value)}
            placeholder="Escolha um tipo de tópico"
            isMulti={false}
          />
          {formik.errors.topicType ? <div className="topic-edit-form-errors">{formik.errors.topicType}</div> : null}
        </div>
      </form>
      <div className="topic-edit-form-buttons-container">
        <button className="topic-edit-form-button-submit" type="button" onClick={() => {
          formik.handleSubmit()
        }}>
          Atualizar
        </button>
        <button className="topic-edit-form-button-back" type="button" onClick={() => {
          historyContext.push('/topicos')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default TopicEditForm