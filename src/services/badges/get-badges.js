import axios from 'axios'

const getBadgesService = (token, filters) =>
  axios.get(`http://localhost:3003/exact-school/badges?badgeType=${filters.badgeType}&name=${filters.name}`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default getBadgesService