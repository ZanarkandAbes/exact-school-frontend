import axios from 'axios'

const registerTopicService = async (token, values) =>
  await axios.post('http://localhost:3003/exact-school/topics/create', values, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default registerTopicService