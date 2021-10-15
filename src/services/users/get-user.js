import axios from 'axios'

const getUserService = (token, userId) =>
  axios.get(`http://localhost:3003/exact-school/users/${userId}`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default getUserService