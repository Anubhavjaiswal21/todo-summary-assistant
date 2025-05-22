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

#. Set up environment variables
.env.example

Installing 

Slack Webhook Setup
Go to Slack API: Your Apps

Create a new app or choose an existing one

Go to Incoming Webhooks → Activate → Add New Webhook

Choose a channel (e.g., #todo-summary)
Copy the generated Webhook URL and paste it into your .env
Slack Webhook URL : 


📌 Note: The app must be added to the selected Slack channel.


🧠 LLM Setup – Cohere
Create a free account on Cohere

Navigate to API Keys and copy your key

Add the key to .env as CO_API_KEY


Some results: 

Case 1: Todo List items

1.Eat nutrition
2.Listen Music

Todo Summary:
1. Eat nutrition is to eat foods that provide the body with the nutrients it needs to stay healthy.
2. Listening to music is a form of entertainment and can also be used for relaxation or as a form of expression.

Case 2: Todo List items 

1. Solve leetcode problems
2. watch movies
3. Visiting Temple


Todo Summary:
You've listed a variety of tasks, including watching movies, solving Leetcode problems, and visiting the Temple. It's difficult for me to infer a broader theme or purpose for these activities without more context or information.


✍️ Design & Architecture Decisions
Kept code modular and minimal for clarity

Used TailwindCSS + Framer Motion for smooth UI

LLM used in real-time (no mocking or faking)

Slack webhook integration for real channel comms

Kept React logic stateful for to-do edits

Server and frontend decoupled for easier deployment




🏁 Final Notes
This project is part of a Full Stack Internship Assignment and demonstrates real-world integration of:

React UI

Node.js backend

Cohere LLM

Slack API

Cloud-hosted DB (Supabase)

✨ Built with 💻 & ❤️

📬 Contact
For queries or help, reach out to:
📧 anubhavjais021@gmail.com






