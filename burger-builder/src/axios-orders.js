import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://react-my-burger-a7cb9.firebaseio.com'
})


export default instance
