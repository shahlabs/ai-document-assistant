import React, { useState } from "react";
import axios from "axios";
import "./EmailSummarizer.css";
import { ClipLoader } from "react-spinners";

const EmailSummarizer = () => {
  const [emailText, setEmailText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailText.trim()) {
      setError("Please enter an email to summarize");
      return;
    }
    try {
      setError("");
      setIsLoading(true);
      const response = await axios.post("/summarize", {
        email_text: emailText,
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error summarizing email:", error);
      setError(
        error.response?.data?.error ||
          error.message ||
          "Failed to summarize email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="email-summarizer">
      <form onSubmit={handleSubmit} className="form">
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Paste your email here..."
          rows="10"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            "Generate Summary"
          )}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {summary && (
        <div className="summary">
          <div className="summary-header">
            <h2>Summary:</h2>
            <button
              onClick={handleCopy}
              className="copy-button"
              title="Copy to clipboard"
            >
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default EmailSummarizer;
