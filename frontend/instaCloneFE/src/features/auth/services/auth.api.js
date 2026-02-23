import axios from 'axios'

const api=axios.create({
    baseURL:'http://localhost:3000/api/auth', //basically for links that are going to repeat in these API Calls
    withCredentials: true,                   // Allows the browser to automatically send cookies (which JS cannot access) back to the server for authentication.
})


export async function login(username,email){
    const response = await api.post('/login' , {username,password}) // as api enpoint has repeating link so used this

    return response.data
}


export async function register(username,email,password){
    const response = await api.post('/register' , {username,email,password}) // as api enpoint has repeating link so used this

    return response.data
}