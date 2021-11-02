import axios from 'axios'

const getQuizService = (token, quizId) =>
  axios.get(`http://localhost:3003/exact-school/quizzes/${quizId}`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default getQuizService