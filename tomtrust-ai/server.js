import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("✅ TomTrust AI backend is running successfully!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});
