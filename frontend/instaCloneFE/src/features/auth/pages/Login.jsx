import React, { useState } from 'react'
import '../styles/loginform.css'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const useNavigate=useNavigate()

const Login = () => {

    const {user, loading , handleLogin}=useAuth()

    const[username,setUsername]=useState('')
    //const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin(username,password)
        console.log('user logged in')
        navigate('/') 
    }

    if(loading){
        return (
            <main>
                <h1>LOADING....</h1>
            </main>
        )
    }

  return (
    <main >
        <div className="form-container">
            <h1>Login</h1>
            <form className='form' onSubmit={handleSubmit} action="">
                <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username' placeholder='enter username' />
                 <input onInput={(e)=>{setEmail(e.target.value)}} type="email" name='email' placeholder='enter email' />
                <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="enter password" />
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account ? <Link className='toggleAuthForm' to='/register'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
