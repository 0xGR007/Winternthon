from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
import re

app = FastAPI(title="Question Analyzer")

class Q(BaseModel):
    question: str

# Simple rule-based classifier with keyword heuristics + confidence
HARD_KEYWORDS = ['prove', 'derive', 'theorem', 'complex', 'advanced', 'research']
BASIC_KEYWORDS = ['what is', 'define', 'meaning', 'example', 'how to', 'why']
COMPLEX_KEYWORDS = ['explain', 'compare', 'difference', 'why does', 'how does']

@app.post('/analyze')
async def analyze(q: Q) -> Dict:
    text = q.question.lower().strip()

    # off-topic detection
    if len(re.findall(r"[a-zA-Z]", text)) < 3 or 'buy' in text or 'subscribe' in text:
        return { 'category': 'irrelevant', 'confidenceScore': 0.99 }

    score = 0.5
    for k in HARD_KEYWORDS:
        if k in text:
            score -= 0.3
    for k in BASIC_KEYWORDS:
        if k in text:
            score += 0.3
    for k in COMPLEX_KEYWORDS:
        if k in text:
            score += 0.1

    # rough mapping
    if score >= 0.8:
        return { 'category': 'basic', 'confidenceScore': round(score, 2) }
    if score >= 0.6:
        return { 'category': 'complex', 'confidenceScore': round(score, 2) }
    # low score -> hard
    return { 'category': 'hard', 'confidenceScore': round(score, 2) }

# For local testing
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
