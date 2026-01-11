# Backend (Express + TypeScript)

API Endpoints

- POST /auth/login { username, password } => { token, role }
- POST /questions (student) { questionText } => { id, category?, answer?, status }
- GET /questions/:id => question
- POST /teacher/session/start (teacher)
- POST /teacher/session/end (teacher)
- GET /teacher/hard (teacher) => list hard questions
- POST /teacher/questions/:id/answer (teacher) { answer | dismiss }
- GET /analytics => basic counts

Env: copy .env.example to .env and set values

Seed: `npm run seed` creates two users and small FAQ
