import axios from 'axios'

const getClassesService = async (token, filters) =>
  await axios.get(`http://localhost:3003/exact-school/classes?classType=${filters.classType}&title=${filters.title}`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })

export default getClassesService