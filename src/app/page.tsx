// src/app/page.tsx
"use client";

import { useState } from "react";
import TextInputForm from "../components/TextInputForm";
import axios from "axios";

export default function Page() {
  const [imageURL, setImageURL] = useState("");

  const handleTextSubmit = async (prompt: string) => {
    try {
      const result = await axios.post("/api/generate-image", { prompt });
      setImageURL(result.data.data[0].url);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">OpenAI Image Generation</h1>
      <TextInputForm onSubmit={handleTextSubmit} />
      {imageURL && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Generated Image:</h2>
          <img src={imageURL} alt="Generated" className="border p-2" />
        </div>
      )}
    </div>
  );
}
