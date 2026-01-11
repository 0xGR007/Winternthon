import React, { useState } from 'react'
import axios from 'axios'

export default function Student(){
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [status, setStatus] = useState('')

  async function ask(e:any){
    e.preventDefault()
    setStatus('Submitting...')
    setAnswer(null)
    try{
      const token = localStorage.getItem('token')
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/questions`, { questionText: question }, { headers: { Authorization: `Bearer ${token}` } })
      if (res.data.answer) {
        setAnswer(res.data.answer)
        setStatus('Answered')
      } else {
        setStatus(res.data.status || 'Queued')
      }
    }catch(err:any){
      setStatus(err?.response?.data?.error || 'error')
    }
  }

  return (
    <div style={{maxWidth:800, margin:'2rem auto'}}>
      <h3>Ask a Doubt (anonymous)</h3>
      <form onSubmit={ask}>
        <textarea rows={4} style={{width:'100%'}} value={question} onChange={e=>setQuestion(e.target.value)} />
        <br/>
        <button>Ask</button>
      </form>
      <div style={{marginTop:20}}>
        <strong>Status:</strong> {status}
        {answer && (
          <div style={{marginTop:10, padding:10, border:'1px solid #ddd'}}>
            <h4>AI Answer</h4>
            <pre>{answer}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
