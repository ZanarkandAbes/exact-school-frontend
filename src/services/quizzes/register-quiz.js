import axios from 'axios'

const registerQuizService = async (token, values) =>
  await axios.post('http://localhost:3003/exact-school/quizzes/create', values, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default registerQuizService