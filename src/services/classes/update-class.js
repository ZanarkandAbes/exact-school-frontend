import axios from 'axios'

const updateClassService = async (token, classId, values) =>
  await axios.put(`http://localhost:3003/exact-school/classes/${classId}/update`, values, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default updateClassService