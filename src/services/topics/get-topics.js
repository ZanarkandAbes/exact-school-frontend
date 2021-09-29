import axios from 'axios'

const getTopicsService = async (token, filters, setTopicData) => {

  await axios.get(`http://localhost:3003/exact-school/topics?topicType=${filters.topicType}&title=${filters.title}`, { params: { token: token } } )
    .then(response => {
      const { data } = response
      
      setTopicData(data)

      return data
    })
    .catch(err => {
      console.log('Error:')
      console.log(err)
    })
}

export default getTopicsService