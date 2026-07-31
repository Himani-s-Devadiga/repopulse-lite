# 🚀 RepoPulse Lite

## AI-Powered GitHub Repository Analyzer

RepoPulse Lite is an AI-powered web application that analyzes GitHub repositories and generates intelligent insights about repository health, development activity, and code quality.

It uses GitHub API data with Large Language Models (LLMs) to create automated repository analysis reports.

---

## 🌐 Live Demo

https://repopulse-lite-nndv.vercel.app

---

Test Github links for the project:

#### https://github.com/facebook/react
#### https://github.com/vercel/next.js
#### https://github.com/scikit-learn/scikit-learn

----

## ✨ Features

### 📊 Repository Analysis
- Fetches GitHub repository details
- Calculates repository health score
- Analyzes project metrics and activity

### 🤖 AI-Powered Insights
- Generates repository summary
- Provides code quality suggestions
- Identifies improvement areas and risks

### 📈 Repository Analytics
- Stars and forks
- Contributors
- Issues
- Programming language
- License details
- Last updated activity

### 🧠 AI Provider Support
- Groq API
- OpenAI API

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 16
- React
- TypeScript
- Tailwind CSS

**Backend**
- Next.js API Routes
- GitHub REST API

**AI**
- Groq
- OpenAI-compatible LLM APIs

**Deployment**
- Vercel

---

## ⚙️ Setup

Clone the repository:

```bash
git clone https://github.com/Himani-s-Devadiga/repopulse-lite.git

Install dependencies:

Bash

npm install
Create .env.local:

env

GITHUB_TOKEN=your_github_token
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key
Run:

Bash

npm run dev
Open:
http://localhost:300


🔄 How It Works:

# User enters a GitHub repository URL

# GitHub API fetches repository information

# Repository metrics are calculated

# AI generates an executive analysis report

## Flowchart
                 User
                   │
                   ▼
      Enters GitHub Repository URL
                   │
                   ▼
          Next.js Frontend (React)
                   │
          Sends request to
       /api/analyze endpoint
                   │
                   ▼
          Next.js API Route
                   │
         Extract repository owner/name
                   │
                   ▼
         GitHub REST API Calls
                   │
     ┌─────────────┼─────────────┐
     ▼             ▼             ▼
 Repository    Contributors    Commits
 Details         Issues       Languages
     └─────────────┼─────────────┘
                   ▼
        Calculate Repository Metrics
         (Health Score Algorithm)
                   │
                   ▼
      Create structured prompt with
      repository statistics + metrics
                   │
                   ▼
      Groq / OpenAI Compatible API
                   │
            LLM generates
      Engineering Analysis Report
                   │
                   ▼
     API returns JSON response
                   │
                   ▼
       React renders dashboard

📂 Project Structure

app/
 ├── api/analyze/
 └── page.tsx

lib/
 ├── github.ts
 ├── ai.ts
 └── score.ts


🚀 Future Improvements:

# Commit complexity analysis

# Pull request insights

# Security scanning

# Repository comparison

👩‍💻 Author
Himani S. Devadiga
Computer Science Engineering - Data Science


