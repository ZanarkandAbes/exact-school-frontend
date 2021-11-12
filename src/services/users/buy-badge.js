import axios from 'axios'

const registerUserService = async (token, values, userId) =>
  await axios.post(`http://localhost:3003/exact-school/users/${userId}/create-user-badges`, values, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default registerUserService