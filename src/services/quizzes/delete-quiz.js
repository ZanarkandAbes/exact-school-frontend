import axios from 'axios'

const deleteQuizService = async (token, quizId) =>
  await axios.delete(`http://localhost:3003/exact-school/quizzes/${quizId}/delete`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default deleteQuizService