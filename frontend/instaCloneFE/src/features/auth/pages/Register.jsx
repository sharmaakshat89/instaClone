import React, { useState } from 'react'
import '../styles/registerform.css'
import { Link } from 'react-router'
import axios from 'axios'


const Register = () => {
    const[username,setUsername]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        const res= await axios.post('http://localhost:3000/api/auth/register',{
            username,email,password
        },{withCredentials:true})
        console.log(res.data)
        
    }

  return (     <main >
        <div className="form-container">
            <h1>Register</h1>
            <form className='form' onSubmit={handleSubmit} action="">
                <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username' placeholder='enter username' />
                <input onInput={(e)=>{setEmail(e.target.value)}} type="email" name='email' placeholder='enter email' />
                <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="enter password" />
                <button type='submit'>Register</button>
            </form>
            <p>Already have an account ? <Link className='toggleAuthForm' to='/login'>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
