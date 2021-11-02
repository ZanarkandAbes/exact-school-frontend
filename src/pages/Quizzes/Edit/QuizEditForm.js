import './QuizEditForm.css'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'

import { useParams } from 'react-router-dom'

import CustomSelect from '../../../components/CustomSelect/CustomSelect'

import updateQuizService from '../../../services/quizzes/update-quiz'
import getQuizService from '../../../services/quizzes/get-quiz'

import quizTypesEnum from '../../../common/enums/quizTypes'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'
import { useToasts } from 'react-toast-notifications'

import successMessagesEnum from '../../../common/enums/successMessages'
import errorMessagesEnum from '../../../common/enums/errorMessages'

const QuizEditForm = props => {

  const historyContext = useHistory()
  const toastContext = useToasts()

  const { token } = useAuth()

  const paramsContext = useParams()

  const quizTypeSelectOptions = [
    {
      value: quizTypesEnum.MULTIPLE_CHOICE,
      label: 'Múltipla Escolha'
    }
  ]

  const getQuizData = async () => {
    const quizData = await getQuizService(token, paramsContext.id)
    formik.setValues(quizData)
  }

  useEffect(() => {
    getQuizData()
  }, [])

  const validate = values => {
    const errors = {}

    if (!values.description) errors.description = 'O campo de descrição é obrigatório'
    if (values.description.length < 1 || values.description.length > 500) errors.description = 'É necessário uma descrição entre no mínimo 1 e no máximo 500 caracteres'
    if (!values.answer) errors.answer = 'O campo de resposta é obrigatório'
    if (!values.coins) errors.coins = 'O campo de moedas é obrigatório'
    if (!values.questionType) errors.questionType = 'O campo de tipo de pergunta é obrigatório'

    return errors
  }

  const formik = useFormik({
    initialValues: {
      description: '',
      questionType: '',
      answer: '',
      coins: 0,
    },
    validate,
    onSubmit: values => {
      
      updateQuizService(token, paramsContext.id, values).then(data => {
        if (data) {
          historyContext.push('/questionarios')
          toastContext.addToast(successMessagesEnum.UPDATE_QUIZ, { appearance: 'success', autoDismiss: true })
        } else {
          toastContext.addToast(errorMessagesEnum.UPDATE_QUIZ, { appearance: 'error', autoDismiss: true })
        }
      })

    }
  })

  return (
    <div className="quiz-edit-form-container">
      <form>
        <div className="quiz-edit-form-fields">
          <input
            name="description"
            id="description"
            type="text"
            onChange={formik.handleChange}
            className="quiz-edit-form-input"
            placeholder="Digite a descrição"
            value={formik.values.description}
          />
          {formik.errors.description ? <div className="quiz-edit-form-errors">{formik.errors.description}</div> : null}
        </div>
        <div className="quiz-edit-form-fields">
          <input
            name="answer"
            id="answer"
            type="text"
            onChange={formik.handleChange}
            className="quiz-edit-form-input"
            placeholder="Digite a resposta"
            value={formik.values.answer}
          />
          {formik.errors.answer ? <div className="quiz-edit-form-errors">{formik.errors.answer}</div> : null}
        </div>
        <div className="quiz-edit-form-fields">
          <input
            name="coins"
            id="coins"
            type="number"
            onChange={formik.handleChange}
            className="quiz-edit-form-input"
            placeholder="Digite a quantidade de moedas que a pergunta vale"
            value={formik.values.coins}
          />
          {formik.errors.coins ? <div className="quiz-edit-form-errors">{formik.errors.coins}</div> : null}
        </div>
        <div className="quiz-edit-form-fields">
          <CustomSelect
            options={quizTypeSelectOptions}
            value={formik.values.questionType}
            onChange={value => formik.setFieldValue('questionType', value.value)}
            placeholder="Escolha um tipo de pergunta"
            isMulti={false}
          />
          {formik.errors.questionType ? <div className="quiz-edit-form-errors">{formik.errors.questionType}</div> : null}
        </div>
      </form>
      <div className="quiz-edit-form-buttons-container">
        <button className="quiz-edit-form-button-submit" type="button" onClick={() => {
          formik.handleSubmit()
        }}>
          Atualizar
        </button>
        <button className="quiz-edit-form-button-back" type="button" onClick={() => {
          historyContext.push('/questionarios')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default QuizEditForm