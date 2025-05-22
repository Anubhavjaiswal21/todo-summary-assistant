require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { CohereClient } = require("cohere-ai");
const fetch = require("node-fetch"); // for Slack webhook

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Cohere setup
console.log("CO_API_KEY:", process.env.CO_API_KEY ? "✅ Found" : "❌ Not Found");
const cohere = new CohereClient({ token: process.env.CO_API_KEY });

app.get('/',(req,res)=>{
    res.send({
        activeState:true,
        error:false,
    })
})
// Add todo
app.post("/todos", async (req, res) => {
  const { text } = req.body;
  const { data, error } = await supabase.from("todos").insert([{ text }]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

//  Delete todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

//  Update todo 
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Todo text cannot be empty." });
  }

  const { data, error } = await supabase
    .from("todos")
    .update({ text: text.trim() })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "Todo not found." });
  }

  res.json(data[0]);
});

//  Get all todos
app.get("/todos", async (req, res) => {
  const { data, error } = await supabase.from("todos").select();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

//  Summarize todos using Cohere and send to Slack
app.post("/summarize", async (req, res) => {
  try {
    // Fetch all todos from DB
    const { data: todos, error } = await supabase.from("todos").select();
    if (error) throw error;

    if (!todos.length) {
      return res.json({ success: false, message: "No todos to summarize." });
    }

    const todoText = todos.map((todo, i) => `${i + 1}. ${todo.text}`).join("\n");

    // Generate summary with Cohere
    const response = await cohere.generate({
      model: "command",
      prompt: `Summarize these tasks:\n${todoText}\nSummary:`,
      max_tokens: 100,
      temperature: 0.5,
    });

    if (!response.generations || !response.generations.length) {
      return res.status(500).json({ success: false, message: "No summary returned from Cohere." });
    }

    const summary = response.generations[0].text.trim();

    // Send summary to Slack
    const slackRes = await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `📝 *Todo Summary:*\n${summary}` }),
    });

    if (!slackRes.ok) {
      const slackErrorText = await slackRes.text();
      console.error("Slack webhook error:", slackErrorText);
      return res.status(500).json({ success: false, message: "Failed to send summary to Slack." });
    }

    res.json({ success: true, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});