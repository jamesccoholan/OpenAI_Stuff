// src/pages/api/index.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      const openAIResponse = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: prompt,
          // ... other necessary OpenAI request parameters
        },
        {
          headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        }
      );
      res.status(200).json({ result: openAIResponse.data.choices[0].text });
    } catch (error) {
      console.error("Error in OpenAI API request:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
