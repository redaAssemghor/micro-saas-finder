"use client";
import React, { useState } from "react";

const KeywordResults = () => {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("in");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchKeywords = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/seo-keyword-research?keyword=${encodeURIComponent(
          keyword
        )}&country=${encodeURIComponent(country)}`
      );
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        setError(result.error || "An error occurred");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Keyword Research</h2>
      <input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter country code"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button onClick={fetchKeywords} disabled={loading}>
        {loading ? "Loading..." : "Fetch Keywords"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <pre style={{ textAlign: "left" }}>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default KeywordResults;
