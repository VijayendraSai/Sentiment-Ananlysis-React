import React, { useState } from "react";
import { analyzeSentiment } from "../api";

const SentimentForm = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await analyzeSentiment(text);
      setResult(data);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    }
    setLoading(false);
  };

  return (
    <div className="card p-4">
      <h2 className="card-title text-center mb-4">Sentiment Analysis</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="textInput" className="form-label">
            Enter text to analyze:
          </label>
          <textarea
            id="textInput"
            className="form-control"
            placeholder="Enter text to analyze..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border rounded bg-light">
          <p>
            <strong>Sentiment:</strong> {result.sentiment}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SentimentForm;
