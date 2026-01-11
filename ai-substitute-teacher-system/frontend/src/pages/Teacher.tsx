import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Teacher(){
  const [sessionActive, setSessionActive] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])

  async function fetchHard(){
    const token = localStorage.getItem('token')
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/teacher/hard`, { headers: { Authorization: `Bearer ${token}` } })
    setSessionActive(res.data.sessionActive)
    setQuestions(res.data.questions || [])
  }

  useEffect(()=>{ fetchHard() }, [])

  async function start(){
    const token = localStorage.getItem('token')
    await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/teacher/session/start`, {}, { headers: { Authorization: `Bearer ${token}` } })
    fetchHard()
  }
  async function end(){
    const token = localStorage.getItem('token')
    await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/teacher/session/end`, {}, { headers: { Authorization: `Bearer ${token}` } })
    fetchHard()
  }

  async function answer(id:string){
    const ans = prompt('Your answer:')
    if (!ans) return
    const token = localStorage.getItem('token')
    await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/teacher/questions/${id}/answer`, { answer: ans }, { headers: { Authorization: `Bearer ${token}` } })
    fetchHard()
  }

  async function dismiss(id:string){
    const token = localStorage.getItem('token')
    await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/teacher/questions/${id}/answer`, { dismiss: true }, { headers: { Authorization: `Bearer ${token}` } })
    fetchHard()
  }

  return (
    <div style={{maxWidth:900, margin:'2rem auto'}}>
      <h3>Teacher Dashboard</h3>
      <div>
        Session: {sessionActive ? 'Active' : 'Inactive'}
        <button onClick={start}>Start</button>
        <button onClick={end}>End</button>
      </div>
      <hr/>
      <h4>Hard Questions</h4>
      {questions.length === 0 && <div>No hard questions</div>}
      {questions.map(q=> (
        <div key={q._id} style={{border:'1px solid #eee', padding:10, marginTop:10}}>
          <div><strong>{q.questionText}</strong></div>
          <div>Created: {new Date(q.createdAt).toLocaleString()}</div>
          <div>
            <button onClick={()=>answer(q._id)}>Answer</button>
            <button onClick={()=>dismiss(q._id)}>Dismiss</button>
          </div>
        </div>
      ))}
    </div>
  )
}
