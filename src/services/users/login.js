import axios from 'axios'

const loginService = (values) =>
  axios.post('http://localhost:3003/exact-school/login', values)
    .then(response => {
      const { data } = response

      console.log('data: ', data)

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default loginService