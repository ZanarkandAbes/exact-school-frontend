import axios from 'axios'

const deleteClassService = async (token, classId) =>
  await axios.delete(`http://localhost:3003/exact-school/classes/${classId}/delete`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default deleteClassService