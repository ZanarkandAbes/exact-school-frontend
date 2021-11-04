import axios from 'axios'

const updateTopicService = async (token, topicId, values) =>
  await axios.put(`http://localhost:3003/exact-school/topics/${topicId}/update`, values, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default updateTopicService