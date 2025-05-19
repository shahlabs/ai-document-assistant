import axios from "axios";
import React, { useState } from "react";

const DocumentQA = () => {
  const [documentText, setDocumentText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setDocumentText(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentText.trim()) {
      setError("Please upload a non-empty document first");
      return;
    }

    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post("/ask", {
        document_text: documentText,
        question: question,
      });

      setAnswer(response.data.answer);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to get answer");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="document-qa">
      <div className="file-upload">
        <input type="file" onChange={handleFileUpload} accept=".txt,.pdf" />
        <small>Supports TXT files (first 3000 characters)</small>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the document..."
          disabled={!documentText}
        />
        <button type="submit" disabled={!documentText || isLoading}>
          {isLoading ? "Analyzing..." : "Ask Question"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {answer && (
        <div className="answer">
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentQA;
