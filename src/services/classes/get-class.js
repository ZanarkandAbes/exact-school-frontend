import axios from 'axios'

const getClassService = (token, classId) =>
  axios.get(`http://localhost:3003/exact-school/classes/${classId}`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default getClassService