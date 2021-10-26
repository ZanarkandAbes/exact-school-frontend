import axios from 'axios'

const getUsersService = async (token, filters) =>
  await axios.get(`http://localhost:3003/exact-school/users?name=${filters.name}&email=${filters.email}`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })

export default getUsersService