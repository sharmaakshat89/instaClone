import React, { useState } from 'react'
import '../styles/registerform.css'
import { Link } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'


const Register = () => {

    const {loading , handleRegister} = useAuth()
    const[username,setUsername]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        await handleRegister(username,email,password)
        
        navigate('/')

    }

    if (loading){
        return(<main>
            <h1>LOADING...</h1>
        </main>)
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
