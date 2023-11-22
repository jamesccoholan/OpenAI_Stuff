// src/pages/api/check-status.js
import imageGenerationTasks from "./sharedTasks"; // Import shared map

export default function handler(req, res) {
  if (req.method === "POST") {
    const { taskId } = req.body;
    const task = imageGenerationTasks.get(taskId);

    if (task) {
      res.status(200).json({ status: "completed", data: task });
      imageGenerationTasks.delete(taskId); // Optional: clean up
    } else {
      res.status(200).json({ status: "processing" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
