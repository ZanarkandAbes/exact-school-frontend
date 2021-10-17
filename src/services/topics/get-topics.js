import axios from 'axios'

const getTopicsService = async (token, filters) =>
  await axios.get(`http://localhost:3003/exact-school/topics?topicType=${filters.topicType}&title=${filters.title}`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default getTopicsService