import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const postRegistration = user => api.post("/users/registration", user)
export const postLogin = user => api.post("/users/login", user)


const apis = {
    postRegistration,
    postLogin,
}

export default apis