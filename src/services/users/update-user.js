import axios from 'axios'

const updateUserService = async (token, userId, values) =>
  await axios.put(`http://localhost:3003/exact-school/users/${userId}/update`, values, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default updateUserService