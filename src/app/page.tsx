// src/app/page.tsx
"use client";

import { useState } from "react";
import TextInputForm from "../components/TextInputForm";
import axios from "axios";
import Spinner from "../components/Spinner"; // Import Spinner component

export default function Page() {
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const handleTextSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      const initResult = await axios.post("/api/generate-image", { prompt });
      setTaskId(initResult.data.taskId);
      pollForCompletion(initResult.data.taskId);
    } catch (error) {
      console.error("Error initiating OpenAI request:", error);
      setIsLoading(false);
    }
  };

  const pollForCompletion = async (taskId) => {
    const interval = setInterval(async () => {
      try {
        const statusResult = await axios.post("/api/check-status", { taskId });
        if (statusResult.data.status === "completed") {
          setImageURL(statusResult.data.data.data[0].url);
          clearInterval(interval);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error polling for status:", error);
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 5000); // Poll every 5 seconds
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">OpenAI Image Generation</h1>
      <TextInputForm onSubmit={handleTextSubmit} />
      {isLoading && <Spinner />} {/* Display the spinner when loading */}
      {imageURL && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Generated Image:</h2>
          <img src={imageURL} alt="Generated" className="border p-2" />
        </div>
      )}
    </div>
  );
}
