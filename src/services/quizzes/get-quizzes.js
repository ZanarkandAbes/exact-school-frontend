import axios from 'axios'

const getQuizzesService = async (token, filters, setQuizData) => {

  await axios.get(`http://localhost:3003/exact-school/quizzes?quizType=${filters.quizType}&description=${filters.description}`, { params: { token: token } } )
    .then(response => {
      const { data } = response
      
      setQuizData(data)

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })
}

export default getQuizzesService