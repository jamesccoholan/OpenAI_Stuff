// src/pages/api/generate-image.js
import axios from "axios"; // Ensure axios is imported
import { v4 as uuidv4 } from "uuid";
import imageGenerationTasks from "./sharedTasks"; // Import shared map

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;
    const taskId = uuidv4();

    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        }
      )
      .then((response) => {
        imageGenerationTasks.set(taskId, response.data);
      })
      .catch((error) => {
        console.error("Error in OpenAI image generation request:", error);
        // Consider handling this error appropriately
      });

    res.status(200).json({ taskId });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
