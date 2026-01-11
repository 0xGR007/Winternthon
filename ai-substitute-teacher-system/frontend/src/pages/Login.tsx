import React, { useState } from 'react'
import axios from 'axios'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function submit(e: any){
    e.preventDefault()
    try{
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/auth/login`, { username, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      if (res.data.role === 'student') window.location.href = '/student'
      else window.location.href = '/teacher'
    }catch(err: any){
      setError(err?.response?.data?.error || 'login failed')
    }
  }

  return (
    <div style={{maxWidth:600, margin:'4rem auto'}}>
      <h2>Login</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={submit}>
        <input placeholder='username' value={username} onChange={e=>setUsername(e.target.value)} />
        <br/>
        <input type='password' placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} />
        <br/>
        <button>Login</button>
      </form>
    </div>
  )
}
