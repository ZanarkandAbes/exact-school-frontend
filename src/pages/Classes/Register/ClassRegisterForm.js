import './ClassRegisterForm.css'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'

import CustomSelect from '../../../components/CustomSelect/CustomSelect'

import registerClassService from '../../../services/classes/register-class'
import getQuizzesService from '../../../services/quizzes/get-quizzes'
import getTopicsService from '../../../services/topics/get-topics'

import classTypesEnum from '../../../common/enums/classTypes'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'
import { useToasts } from 'react-toast-notifications'

import successMessagesEnum from '../../../common/enums/successMessages'
import errorMessagesEnum from '../../../common/enums/errorMessages'

const ClassRegisterForm = props => {

  const historyContext = useHistory()
  const toastContext = useToasts()

  const { token, userData } = useAuth()

  const [quizzes, setQuizzes] = useState([])
  const [topics, setTopics] = useState([])

  const getQuizzesData = async () => {
    const quizzesData = await getQuizzesService(token, { quizType: '', description: '' })
    setQuizzes(quizzesData)
  }

  const getTopicsData = async () => {
    const topicsData = await getTopicsService(token, { topicType: '', title: '' })
    setTopics(topicsData)
  }

  useEffect(() => {
    getQuizzesData()
    getTopicsData()
  }, [])

  const classTypeSelectOptions = [
    {
      value: classTypesEnum.VIDEO,
      label: 'Vídeo'
    },
    {
      value: classTypesEnum.ARTICLE,
      label: 'Artigo'
    }
  ]

  const validate = values => {
    const errors = {}

    if (!values.title) errors.title = 'O campo de título é obrigatório'
    if (values.title.length < 1 || values.title.length > 100) errors.title = 'É necessário um título entre no mínimo 1 e no máximo 100 caracteres'
    if (!values.videoUrl) errors.videoUrl = 'O campo de link de vídeo (Youtube) é obrigatório'
    if (values.videoUrl.length < 1) errors.videoUrl = 'É necessário um link de vídeo (Youtube) com no mínimo 1 caracter'
    if (!values.classType) errors.classType = 'O campo de tipo de aula é obrigatório'

    return errors
  }

  const formik = useFormik({
    initialValues: {
      topicId: '',
      userId: '',
      title: '',
      videoUrl: '',
      classType: '',
      quizzes: []
    },
    validate,
    onSubmit: values => {

      values.userId = userData._id

      values.quizzes = values.quizzes.map(quizToFind => quizzes.find(quiz => quiz._id === quizToFind.value))

      registerClassService(token, values).then(data => {
        if (data) {
          historyContext.push('/aulas')
          toastContext.addToast(successMessagesEnum.REGISTER_CLASS, { appearance: 'success', autoDismiss: true })
        } else {
          toastContext.addToast(errorMessagesEnum.REGISTER_CLASS, { appearance: 'error', autoDismiss: true })
        }
      })
    }
  })

  return (
    <div className="class-register-form-container">
      <form>
        <div className="class-register-form-fields">
          <input
            name="title"
            id="title"
            type="text"
            onChange={formik.handleChange}
            className="class-register-form-input"
            placeholder="Digite o Título"
            value={formik.values.title}
          />
          {formik.errors.title ? <div className="class-register-form-errors">{formik.errors.title}</div> : null}
        </div>
        <div className="class-register-form-fields">
          <input
            name="videoUrl"
            id="videoUrl"
            type="text"
            onChange={formik.handleChange}
            className="class-register-form-input"
            placeholder="Digite o link do vídeo (Youtube)"
            value={formik.values.videoUrl}
          />
          {formik.errors.videoUrl ? <div className="class-register-form-errors">{formik.errors.videoUrl}</div> : null}
        </div>
        <div className="class-register-form-fields">
          <CustomSelect
            options={quizzes.map(quiz => ({ value: quiz._id, label: quiz.description }))}
            value={formik.values.quizzes}
            onChange={value => formik.setFieldValue('quizzes', value)}
            placeholder="Escolha a(s) pergunta(s)"
            isMulti={true}
          />
        </div>
        <div className="class-register-form-fields">
          <CustomSelect
            options={classTypeSelectOptions}
            value={formik.values.classType}
            onChange={value => formik.setFieldValue('classType', value.value)}
            placeholder="Escolha um tipo de aula"
            isMulti={false}
          />
          {formik.errors.classType ? <div className="class-register-form-errors">{formik.errors.classType}</div> : null}
        </div>
        <div className="class-register-form-fields">
          <CustomSelect
            options={topics.map(topic => ({ value: topic._id, label: topic.title }))}
            value={formik.values.topicId}
            onChange={value => formik.setFieldValue('topicId', value.value)}
            placeholder="Escolha um tópico"
            isMulti={false}
          />
        </div>
      </form>
      <div className="class-register-form-buttons-container">
        <button className="class-register-form-button-submit" type="button" onClick={() => {
          formik.handleSubmit()
        }}>
          Cadastrar
        </button>
        <button className="class-register-form-button-back" type="button" onClick={() => {
          historyContext.push('/aulas')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default ClassRegisterForm