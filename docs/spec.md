# RepoPulse Lite Architecture Specification

## 1. Project Objective

RepoPulse Lite is an AI-powered GitHub repository analyzer that provides repository health insights, commit quality analysis, and AI-generated executive reports.

The system accepts a public GitHub repository URL, analyzes repository activity, calculates health metrics, and generates recommendations using an Open LLM API.

---

# 2. System Architecture

## Frontend Layer

Technology:
- Next.js 16
- React
- TypeScript
- Tailwind CSS

Responsibilities:
- Accept GitHub repository URL
- Select AI provider
- Display repository analytics
- Display AI generated reports

---

## Backend Layer

Technology:
- Next.js API Routes

Responsibilities:
- Validate repository input
- Communicate with GitHub API
- Calculate repository metrics
- Generate AI reports

---

## External Services

### GitHub REST API

Used for:
- Repository information
- Commit history
- Repository metadata


### LLM Providers

Supported:
- Groq
- OpenAI-compatible APIs

Used for:
- Executive summaries
- Repository recommendations

---

# 3. Core Modules

## Repository Analyzer

Input:
GitHub repository URL

Output:
- Repository information
- Health metrics


## Commit Complexity Analyzer

Analyzes recent commits.

Classification:

### Tier 1 - Low Complexity

Conditions:
- Less than 50 lines changed
- Documentation updates


### Tier 2 - Medium Complexity

Conditions:
- 50-250 lines changed
- Less than 5 modified files


### Tier 3 - High Complexity

Conditions:
- More than 250 lines changed
- More than 5 modified files


## AI Report Generator

Generates:
- Development momentum summary
- Risk analysis
- Commit hygiene insights


---

# 4. Security Design

Implemented:

- Environment variable based API keys
- Input validation
- GitHub API error handling
- LLM error handling


---

# 5. Deployment

Platform:
Vercel

Production:
https://repopulse-lite-nndv.vercel.app