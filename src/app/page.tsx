// src/app/page.tsx
"use client";

import { useState } from "react";
import TextInputForm from "../components/TextInputForm";
import axios from "axios";
import Spinner from "../components/Spinner"; // Import Spinner component

export default function Page() {
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      const result = await axios.post("/api/generate-image", { prompt });
      setImageURL(result.data.data[0].url);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }
    setIsLoading(false);
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
//
