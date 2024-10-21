"use client";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./ui/Loading";

const FetchSeo = () => {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState<any>({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const idea = useSelector((state: RootState) => state.singleIdea.value);

  const fetchKeywords = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/seo-keyword-research?keyword=${encodeURIComponent(
          idea
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

  //   useEffect(() => {
  //     if (idea) {
  //       fetchKeywords();
  //     }
  //   }, [idea]);

  return (
    <div
      id="seo"
      className="text-white min-h-screen flex flex-col justify-center items-center"
    >
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        data && (
          // <pre style={{ textAlign: "left" }}>{JSON.stringify(data, null, 2)}</pre>

          <SeoAnalysis data={data} />
        )
      )}
    </div>
  );
};

type SeoAnalysisProps = {
  data: object;
};

const SeoAnalysis = ({ data }: SeoAnalysisProps) => {
  if (!data) {
    return <p>No data available.</p>;
  }

  const { difficulty, shortage, serp }: any = data;
  const results = serp?.results || [];

  return (
    <div>
      <h2>SEO Analysis</h2>

      <div>
        <h3>Keyword Difficulty</h3>
        <p>{difficulty}</p>
      </div>

      <div>
        <h3>Content Shortage</h3>
        <p>{shortage}</p>
      </div>

      <div>
        <h3>Search Engine Results</h3>
        {results.map((result: any, index: any) => {
          const pos = result.pos;
          const content = result.content;

          // Determine the content type
          const contentType = content[0];
          const contentData = content[1];

          if (contentType === "organic" && contentData) {
            const linkData = contentData.link[1];
            const title = linkData.title;
            const url = linkData.url[1]?.url;
            const metrics = linkData.metrics;

            return (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  margin: "10px 0",
                  padding: "10px",
                }}
              >
                <h4>
                  Position {pos}: {title}
                </h4>
                <p>
                  <strong>URL:</strong>{" "}
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </p>

                {metrics && (
                  <div>
                    <h5>Metrics</h5>
                    <ul>
                      {metrics.domainRating !== null && (
                        <li>
                          <strong>Domain Rating:</strong> {metrics.domainRating}
                        </li>
                      )}
                      {metrics.urlRating !== null && (
                        <li>
                          <strong>URL Rating:</strong> {metrics.urlRating}
                        </li>
                      )}
                      {metrics.traffic !== null && (
                        <li>
                          <strong>Traffic:</strong> {metrics.traffic}
                        </li>
                      )}
                      {metrics.keywords !== null && (
                        <li>
                          <strong>Keywords:</strong> {metrics.keywords}
                        </li>
                      )}
                      {metrics.topKeyword && (
                        <li>
                          <strong>Top Keyword:</strong> {metrics.topKeyword}
                        </li>
                      )}
                      {metrics.topVolume !== null && (
                        <li>
                          <strong>Top Volume:</strong> {metrics.topVolume}
                        </li>
                      )}
                      {metrics.nrWords !== null && (
                        <li>
                          <strong>Number of Words:</strong> {metrics.nrWords}
                        </li>
                      )}
                      {metrics.httpCode !== null && (
                        <li>
                          <strong>HTTP Code:</strong> {metrics.httpCode}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            );
          } else if (contentType === "questions" && Array.isArray(content[1])) {
            return (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  margin: "10px 0",
                  padding: "10px",
                }}
              >
                <h4>Related Questions</h4>
                <ul>
                  {content[1].map((question, idx) => (
                    <li key={idx}>{question[1]?.title}</li>
                  ))}
                </ul>
              </div>
            );
          } else if (contentType === "knowledge_panel" && contentData) {
            return (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  margin: "10px 0",
                  padding: "10px",
                }}
              >
                <h4>Knowledge Panel</h4>
                <p>
                  <strong>Title:</strong> {contentData.title}
                </p>
              </div>
            );
          } else {
            // Handle other content types if necessary
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default FetchSeo;
