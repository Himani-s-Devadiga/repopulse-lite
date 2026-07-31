# 🚀 RepoPulse Lite

### AI-Powered GitHub Repository Analyzer

RepoPulse Lite is an AI-powered web application that analyzes GitHub repositories and provides insights about repository health, code quality, and improvement suggestions.

It combines GitHub API data with Large Language Models (LLMs) to generate intelligent repository analysis reports.

## 🌐 Live Demo

https://repopulse-lite-nndv.vercel.app

---

## ✨ Features

### 📊 Repository Health Analysis
- Fetches GitHub repository information
- Calculates repository health score
- Analyzes project structure and metrics

### 🤖 AI-Powered Reports
- Generates intelligent repository insights
- Provides:
  - Project overview
  - Code quality analysis
  - Strengths and weaknesses
  - Improvement recommendations
  - Security suggestions

### 🔍 Repository Analytics
- Repository metadata analysis
- Commit hygiene evaluation
- Developer-friendly insights

### 🧠 Multiple AI Provider Support
Supports different LLM providers:
- Groq
- OpenAI

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- TypeScript
- React
- Tailwind CSS

### Backend
- Next.js API Routes
- GitHub API integration

### Artificial Intelligence
- Groq API
- OpenAI API

### Deployment
- Vercel

---

## 📂 Project Structure

repopulse-lite/
│
├── app/
│ ├── api/
│ │ └── analyze/
│ │ └── route.ts
│ │
│ └── page.tsx
│
├── components/
│
├── lib/
│ ├── github.ts
│ ├── ai.ts
│ └── score.ts
│
├── public/
│
└── package.json



---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Himani-s-Devadiga/repopulse-lite.git
Navigate to the project:

Bash

cd repopulse-lite
Install dependencies:

Bash

npm install
Create .env.local file:

env

GITHUB_TOKEN=your_github_token

GROQ_API_KEY=your_groq_api_key

OPENAI_API_KEY=your_openai_api_key
Run the development server:

Bash

npm run dev
Open:


http://localhost:3000
🎯 How It Works
User enters a GitHub repository URL

Application fetches repository information using GitHub API

Repository metrics are calculated

AI model analyzes repository details

A detailed report is generated

📸 Screenshots
(Add application screenshots here)

🚀 Future Improvements
 Code vulnerability scanning

 Pull request analysis

 Contributor analytics

 AI code improvement suggestions

 Repository comparison feature

👩‍💻 Author
Himani S. Devadiga

Computer Science Engineering - Data Science

GitHub:
https://github.com/Himani-s-Devadiga

⭐ Support
If you like this project, consider giving it a star ⭐
