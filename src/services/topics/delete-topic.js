import axios from 'axios'

const deleteTopicService = async (token, topicId) =>
  await axios.delete(`http://localhost:3003/exact-school/topics/${topicId}/delete`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default deleteTopicService