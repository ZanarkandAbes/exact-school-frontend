import axios from 'axios'

const updateQuizService = async (token, quizId, values) =>
  await axios.put(`http://localhost:3003/exact-school/quizzes/${quizId}/update`, values, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default updateQuizService