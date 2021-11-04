import axios from 'axios'

const updateBadgeService = async (token, badgeId, values) =>
  await axios.put(`http://localhost:3003/exact-school/badges/${badgeId}/update`, values, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default updateBadgeService