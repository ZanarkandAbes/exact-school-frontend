import axios from 'axios'

const deleteBadgeService = async (token, badgeId) =>
  await axios.delete(`http://localhost:3003/exact-school/badges/${badgeId}/delete`, { params: { token: token } })
    .then(response => {
      const { data } = response

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })


export default deleteBadgeService