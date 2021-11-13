import './QuizRegisterForm.css'
import React from 'react'
import { useFormik } from 'formik'

import CustomSelect from '../../../components/CustomSelect/CustomSelect'
import CustomCreatableSelect from '../../../components/CustomCreatableSelect/CustomCreatableSelect'

import registerQuizService from '../../../services/quizzes/register-quiz'

import quizTypesEnum from '../../../common/enums/quizTypes'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'
import { useToasts } from 'react-toast-notifications'

import successMessagesEnum from '../../../common/enums/successMessages'
import errorMessagesEnum from '../../../common/enums/errorMessages'

const QuizRegisterForm = props => {

  const historyContext = useHistory()
  const toastContext = useToasts()

  const { token } = useAuth()

  const quizTypeSelectOptions = [
    {
      value: quizTypesEnum.MULTIPLE_CHOICE,
      label: 'Múltipla Escolha'
    }
  ]

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
        description: values.description,
        questionType: values.questionType,
        answerOptions: values.answerOptions,
        coins: values.coins
      }

      values = newValues

      registerQuizService(token, values).then(data => {
        if (data) {
          historyContext.push('/questionarios')
          toastContext.addToast(successMessagesEnum.REGISTER_QUIZ, { appearance: 'success', autoDismiss: true })
        } else {
          toastContext.addToast(errorMessagesEnum.REGISTER_QUIZ, { appearance: 'error', autoDismiss: true })
        }
      })
    }
  })

  return (
    <div className="quiz-register-form-container">
      <form>
        <div className="quiz-register-form-fields">
          <input
            name="description"
            id="description"
            type="text"
            onChange={formik.handleChange}
            className="quiz-register-form-input"
            placeholder="Digite a descrição"
            value={formik.values.description}
          />
          {formik.errors.description ? <div className="quiz-register-form-errors">{formik.errors.description}</div> : null}
        </div>
        <div className="quiz-register-form-fields">
          <CustomCreatableSelect
            options={answersOptions}
            value={formik.values.answerOptions}
            onChange={value => formik.setFieldValue('answerOptions', value)}
            placeholder="Digite as respostas incorretas"
            isMulti={true}
          />
          {formik.errors.answerOptions ? <div className="quiz-register-form-errors">{formik.errors.answerOptions}</div> : null}
        </div>
        <div className="quiz-register-form-fields">
          <input
            name="correctAnswer"
            id="correctAnswer"
            type="text"
            onChange={formik.handleChange}
            className="quiz-register-form-input"
            placeholder="Digite a resposta correta"
            value={formik.values.correctAnswer}
          />
          {formik.errors.correctAnswer ? <div className="quiz-register-form-errors">{formik.errors.correctAnswer}</div> : null}
        </div>
        <div className="quiz-register-form-fields">
          <input
            name="coins"
            id="coins"
            type="number"
            onChange={formik.handleChange}
            className="quiz-register-form-input"
            placeholder="Digite a quantidade de moedas que a pergunta vale"
            value={formik.values.coins}
          />
          {formik.errors.coins ? <div className="quiz-register-form-errors">{formik.errors.coins}</div> : null}
        </div>
        <div className="quiz-register-form-fields">
          <CustomSelect
            options={quizTypeSelectOptions}
            value={formik.values.questionType}
            onChange={value => formik.setFieldValue('questionType', value.value)}
            placeholder="Escolha um tipo de pergunta"
            isMulti={false}
          />
          {formik.errors.questionType ? <div className="quiz-register-form-errors">{formik.errors.questionType}</div> : null}
        </div>
      </form>
      <div className="quiz-register-form-buttons-container">
        <button className="quiz-register-form-button-submit" type="button" onClick={() => {
          formik.handleSubmit()
        }}>
          Cadastrar
        </button>
        <button className="quiz-register-form-button-back" type="button" onClick={() => {
          historyContext.push('/questionarios')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default QuizRegisterForm