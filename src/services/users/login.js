import axios from 'axios'
import { history } from '../../history'

const loginService = (values) => {
  axios.post('http://localhost:3003/exact-school/login', values)
    .then(response => {
      const { data } = response

      if (data) {
        localStorage.setItem('app-token', data.token)
        history.push('/')
      }
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })
}

export default loginService