// pages/api/openai.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        { prompt, max_tokens: 150 },
        { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
      );
      res.status(200).json({ result: response.data.choices[0].text });
    } catch (error) {
      console.error("Error in OpenAI API request:", error);
      res.status(500).json({ error: "Error fetching response from OpenAI" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
