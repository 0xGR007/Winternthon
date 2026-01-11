# Development README

## Prerequisites

- Node.js (>= 18)
- Python 3.10+
- MongoDB running locally

## Backend

cd backend

- npm install
- copy `.env.example` to `.env` and set values
- npm run seed (creates teacher1/student1 and two FAQs)
- npm run dev

Auth: teacher1 / teacherpass, student1 / studentpass

## AI Services

Each is a small FastAPI app

cd ai-services/question-analyzer

- python -m venv .venv
- .venv\Scripts\activate (Windows)
- pip install -r requirements.txt
- uvicorn main:app --reload --port 8000

cd ai-services/answer-engine

- python -m venv .venv
- .venv\Scripts\activate
- pip install -r requirements.txt
- uvicorn main:app --reload --port 8001

(Optional) set OPENAI_API_KEY in env to enable richer answers in the answer-engine

## Frontend

cd frontend

- npm install
- npm run dev

Open http://localhost:5173

## Flow

- Login as student and ask a question
- Backend calls analyzer, then answer engine or FAQ or routes to teacher
- Teachers can view & answer hard questions

## Notes

- The AI services are intentionally simple and replaceable by production models
- Add more secure user management and session handling for production
