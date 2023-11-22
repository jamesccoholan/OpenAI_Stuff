// src/app/page.tsx
"use client";

import { useState } from "react";
import TextInputForm from "../components/TextInputForm";
import axios from "axios";

export default function Page() {
  const [response, setResponse] = useState("");

  const handleTextSubmit = async (prompt: any) => {
    try {
      const result = await axios.post("/api/openai", { prompt });
      setResponse(result.data.result);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
      setResponse("Error fetching response");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        OpenAI Integration with Next.js
      </h1>

      <TextInputForm onSubmit={handleTextSubmit} />

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Response:</h2>
        <p className="border p-2">{response || "No response yet"}</p>
      </div>
    </div>
  );
}
