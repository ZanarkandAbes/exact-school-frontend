import axios from 'axios'

const getQuizzesService = async (token, filters) =>
  await axios.get(`http://localhost:3003/exact-school/quizzes?quizType=${filters.quizType}&description=${filters.description}`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default getQuizzesService