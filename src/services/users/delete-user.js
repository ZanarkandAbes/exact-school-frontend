import axios from 'axios'

const deleteUserService = async (token, userId) =>
  await axios.delete(`http://localhost:3003/exact-school/users/${userId}/delete`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default deleteUserService