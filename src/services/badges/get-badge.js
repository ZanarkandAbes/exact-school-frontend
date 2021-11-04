import axios from 'axios'

const getBadgeService = (token, badgeId) =>
  axios.get(`http://localhost:3003/exact-school/badges/${badgeId}`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default getBadgeService