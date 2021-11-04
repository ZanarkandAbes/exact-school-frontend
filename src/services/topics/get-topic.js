import axios from 'axios'

const getTopicService = (token, topicId) =>
  axios.get(`http://localhost:3003/exact-school/topics/${topicId}`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default getTopicService