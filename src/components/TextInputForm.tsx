import { useState, FormEvent } from "react";

interface TextInputFormProps {
  onSubmit: (prompt: string) => void;
}

export default function TextInputForm({ onSubmit }: TextInputFormProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt for image generation"
        rows={4}
        className="border p-2 w-full text-black" // Added text-black class here
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
        Generate Image
      </button>
    </form>
  );
}
