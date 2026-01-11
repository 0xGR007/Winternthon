# WIN6 – The Substitute Teacher  
### AI-Assisted Question Handling System using MERN

## 📌 Overview
Online classrooms often suffer from teacher overload when multiple student questions arrive simultaneously. Simple doubts consume valuable class time, while complex conceptual questions may be delayed or overlooked.

This project proposes an **AI-assisted question handling system** that analyzes, categorizes, and prioritizes student questions in real time. The system uses **AI for question understanding** and **rule-based logic for decision-making**, ensuring effective classroom interaction without replacing the teacher.

---

## 🎯 Problem Statement
Teachers receive a large volume of student questions during live sessions. Without intelligent prioritization:
- Teachers become overloaded
- Repetitive questions waste time
- Complex doubts go unanswered
- Student engagement decreases

The goal is to **reduce teacher cognitive load** while maintaining interactive, student-centered learning.

---

## 💡 Solution Approach
The system integrates **AI-based Natural Language Processing** with the **MERN stack** to:
- Classify questions by difficulty
- Auto-answer basic, repetitive doubts
- Prioritize conceptual questions for teachers
- Maintain human control over final decisions

AI acts as a **supporting substitute**, not a replacement instructor.

---

## 🔁 Workflow
1. Student submits a question via the frontend
2. Backend (Express + TypeScript) receives the question
3. AI (LLM API) analyzes question difficulty and suggests a response
4. Rule-based logic decides:
   - Auto-answer (basic, high-confidence)
   - Forward to teacher (conceptual/advanced)
5. Question lifecycle is stored in MongoDB
6. Teacher dashboard displays prioritized questions

---

## 🧠 AI Usage
- **Type:** External LLM API (e.g., OpenAI)
- **Purpose:**
  - Difficulty classification
  - Response suggestion for basic questions
- **Control:**  
  Final decision logic is system-controlled, not AI-controlled.

> AI assists the system; teachers retain instructional authority.

---

## 🛠️ Tech Stack
- **Frontend:** React.js + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB
- **AI Integration:** LLM API (OpenAI / Gemini – replaceable)

## ✅ Conclusion
This project demonstrates how an AI-assisted system can effectively support online classrooms by reducing teacher overload and improving student interaction. By using AI strictly for question analysis and response suggestion, and retaining system-controlled decision logic, the solution ensures reliability, scalability, and human-led teaching. The integration of AI with the MERN stack enables real-time question prioritization, faster resolution of basic doubts, and focused attention on complex conceptual learning.

---

## 👥 Team Members – Hydra
- **Balasurya G** (WIN25611)  
- **Bhavan K** (WIN25610)  
- **Lalith Kumar J** (WIN25612)  
- **Siva Balan G** (WIN25344)

---
