from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
import os

try:
    import openai
    OPENAI_AVAILABLE = True
except Exception:
    OPENAI_AVAILABLE = False

app = FastAPI(title='Answer Engine')

class Q(BaseModel):
    question: str

@app.post('/answer')
async def answer(q: Q) -> Dict:
    text = q.question.strip()
    # Guard: do not answer 'hard' questions — caller must route
    if len(text) < 3:
        raise HTTPException(status_code=400, detail='empty question')

    # If OPENAI_API_KEY present, use it for better answers (optional)
    api_key = os.environ.get('OPENAI_API_KEY')
    if api_key and OPENAI_AVAILABLE:
        openai.api_key = api_key
        prompt = f"You are a helpful teacher. Explain the concept: {text}\nInclude a simple example and a short exercise. Be concise and use teaching style."
        try:
            res = openai.ChatCompletion.create(
                model=os.environ.get('OPENAI_MODEL','gpt-4o-mini'),
                messages=[{'role':'user','content':prompt}],
                max_tokens=400
            )
            content = res.choices[0].message.content
            return { 'answer': content }
        except Exception as e:
            print('OpenAI error', e)

    # Fallback: template-based explanation
    explanation = f"Conceptual explanation for: {text}\n\nSimple example:\n- Example: ... (explain a small example relevant to the question)\n\nPractice: Try to apply the idea to a small problem and compare results."
    return { 'answer': explanation }

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8001)
