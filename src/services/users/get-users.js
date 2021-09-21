import axios from 'axios'

const getUsersService = (filters) => {
  axios.get(`http://localhost:3003/exact-school/users?name=${filters.name}&email=${filters.email}`)
    .then(response => {
      const { data } = response
      
      console.log(data)

    })
}

export default getUsersService