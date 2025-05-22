# 📝 Todo Summary Assistant

A full-stack Todo Summary Assistant app where users can manage to-do tasks, summarize them using a real LLM (Cohere), and send that summary to a Slack channel using Slack Incoming Webhooks.

---

## 📌 Objective

- ✅ Create and manage to-do items
- ✅ Edit or delete tasks
- ✅ Generate an AI-powered summary of your to-dos
- ✅ Send the summary to a Slack channel

---

## 🧰 Tech Stack

| Layer       | Stack                                                  |
|------------|-------------------------------------------------------- |
| Frontend    | React (Vite, TailwindCSS, Framer Motion, Lucide Icons) |
| Backend     | Node.js with Express.js                                |
| Database    | Supabase (PostgreSQL)                                  |
| LLM API     | [Cohere AI](https://cohere.ai)                         |
| Slack       | Incoming Webhooks                                      |
| Hosting     | Frontend - Vercel / Backend - Render                   |

---


## 🖥️ Features

- Add new to-dos
- Edit existing ones
- Delete items
- View all to-dos
- Summarize tasks with one click using LLM
- Push that summary to Slack
- Smooth UI animations and real-time updates

---

## 🚀 Setup Instructions

```bash
git clone https://github.com/yourusername/todo-summary-assistant.git
cd todo-summary-assistant

```
## React Setup: 
- Create the frontend with Vite + React \
npm create vite@latest frontend -- --template react

- Go into the frontend folder \
cd frontend

- Install dependencies \
npm install

- Start the dev server \
npm run dev

## Tailwind Installation: 

- Install Tailwind CSS \
npm install -D tailwindcss@3 postcss autoprefixer \
npx tailwindcss init -p

- Configure your template paths \
Add the paths to all of your template files in your tailwind.config.js file. 

tailwind.config.js \
/** @type {import('tailwindcss').Config} */  
export default {  
  content: [  
    "./index.html",  
    "./src/**/*.{js,ts,jsx,tsx}",  
  ],    
  theme: {  
    extend: {},  
  },  
  plugins: [],  
}  

- Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.  

@tailwind base;  
@tailwind components;  
@tailwind utilities;  

## Backend setup: 

- cd backend

- Initialize a Node project  
npm init -y

 - Install needed dependencies  
npm install express cors axios dotenv

- Install dev dependency for live-reloading  
npm install -D nodemon


- Updating scripts in package.json  
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}

- Install Supabase Client  
npm install @supabase/supabase-js


- Set up environment variables  
.env.example

## Connect Supabase Database

- Create a Supabase Project  
Go to https://supabase.com

- Sign up / log in

- Click “New project”

- Fill in:

2. Name: todo-assistant

3. Password: (keep it safe)

4. Region: choose closest to you


### Create a Table for To-Dos
1. Go to “Table Editor” → “Create Table”

2. Table name: todos

3. Add the following columns:

- id: UUID, primary key (auto-generated)

- text: Text

- created_at: Timestamp (default: now())

- Click “Save”

### Get Supabase API Keys
- Go to Project Settings > API:

- Copy the URL (example: https://xyzcompany.supabase.co)

- Copy the anon public key

- Paste into the .env file
 
---
## Slack Webhook Setup
- Go to Slack API: Your Apps

- Create a new app or choose an existing one

- Go to Incoming Webhooks → Activate → Add New Webhook

- Choose a channel (e.g., #todo-summary)
- Copy the generated Webhook URL and paste it into your .env
- Slack Webhook URL : 
- 📌 Note: The app must be added to the selected Slack channel.

---
## 🧠 LLM Setup – Cohere
- Create a free account on Cohere

- Navigate to API Keys and copy your key

- Add the key to .env as CO_API_KEY

---
## Some results: 

### Case 1: Todo List items

1.Eat nutrition  
2.Listen Music  

 ✅ Todo Summary on Slack channel:  
1. Eat nutrition is to eat foods that provide the body with the nutrients it needs to stay healthy.
2. Listening to music is a form of entertainment and can also be used for relaxation or as a form of expression.  

### Case 2: Todo List items   

1. Solve leetcode problems  
2. watch movies  
3. Visiting Temple  


 ✅ Todo Summary on Slack channel:  
You've listed a variety of tasks, including watching movies, solving Leetcode problems, and visiting the Temple. It's difficult for me to infer a broader theme or purpose for these activities without more context or information.

---

## ✍️ Design & Architecture Decisions
- Kept code simple and minimal for clarity

- Used TailwindCSS + Framer Motion for smooth UI

- LLM used in real-time (no mocking or faking)

- Slack webhook integration for real channel comms

- Kept React logic stateful for to-do edits

- Server and frontend decoupled for easier deployment

---


## 🏁 Final Notes

- This project is part of a Full Stack Internship Assignment and demonstrates real-world integration of:

1.React UI

 2.Node.js backend

3.Cohere LLM

4.Slack API

5.Cloud-hosted DB (Supabase)


## ✨ Built with 💻 & ❤️

📬 Contact:
For queries or help, reach out to:
📧 anubhavjais021@gmail.com







