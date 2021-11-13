import './QuizEditForm.css'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'

import { useParams } from 'react-router-dom'

import CustomSelect from '../../../components/CustomSelect/CustomSelect'
import CustomCreatableSelect from '../../../components/CustomCreatableSelect/CustomCreatableSelect'

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
    quizData.correctAnswer = quizData.answerOptions.filter(answerOption => answerOption.isCorrect ? answerOption.answerText : '')
    quizData.correctAnswer = quizData.correctAnswer[0].answerText
    quizData.answerOptions = quizData.answerOptions.map(answerOption => {

      if (answerOption.isCorrect) return null

      return { value: answerOption.answerText, label: answerOption.answerText }
    }).filter(answerOption => answerOption !== null)
    formik.setValues(quizData)
  }

  useEffect(() => {
    getQuizData()
  }, [])

  const answersOptions = [{}]

  const validate = values => {
    const errors = {}

    if (!values.description) errors.description = 'O campo de descrição é obrigatório'
    if (values.description.length < 1 || values.description.length > 500) errors.description = 'É necessário uma descrição entre no mínimo 1 e no máximo 500 caracteres'
    if (values.answerOptions.length > 3) errors.answerOptions = 'A quantidade de respostas incorretas deve ser no máximo 3'
    if (!values.answerOptions) errors.answerOptions = 'O campo de resposta(s) é obrigatório'
    if (!values.correctAnswer) errors.correctAnswer = 'O campo de resposta correta é obrigatório'
    if (!values.coins) errors.coins = 'O campo de moedas é obrigatório'
    if (!values.questionType) errors.questionType = 'O campo de tipo de pergunta é obrigatório'

    return errors
  }

  const formik = useFormik({
    initialValues: {
      description: '',
      questionType: '',
      correctAnswer: '',
      answerOptions: [],
      coins: 0,
    },
    validate,
    onSubmit: values => {

      let answerOptionsToSend = []

      answerOptionsToSend.push({ answerText: values.correctAnswer, isCorrect: true })

      values.answerOptions.forEach(answerOption => answerOptionsToSend.push({ answerText: answerOption.value, isCorrect: false }))

      values.answerOptions = answerOptionsToSend

      values.correctAnswer = undefined

      let newValues = {
        _id: values._id,
        description: values.description,
        questionType: values.questionType,
        answerOptions: values.answerOptions,
        coins: values.coins
      }

      values = newValues

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
          <CustomCreatableSelect
            options={answersOptions}
            value={formik.values.answerOptions}
            onChange={value => formik.setFieldValue('answerOptions', value)}
            placeholder="Digite as respostas incorretas"
            isMulti={true}
          />
          {formik.errors.answerOptions ? <div className="quiz-edit-form-errors">{formik.errors.answerOptions}</div> : null}
        </div>
        <div className="quiz-edit-form-fields">
          <input
            name="correctAnswer"
            id="correctAnswer"
            type="text"
            onChange={formik.handleChange}
            className="quiz-edit-form-input"
            placeholder="Digite a resposta correta"
            value={formik.values.correctAnswer}
          />
          {formik.errors.correctAnswer ? <div className="quiz-edit-form-errors">{formik.errors.correctAnswer}</div> : null}
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