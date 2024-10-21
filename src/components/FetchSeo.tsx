"use client";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./ui/Loading";

const FetchSeo = () => {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState<any>({
    status: "success",
    serp: {
      results: [
        {
          content: [
            "organic",
            {
              link: [
                "Some",
                {
                  title: "About - AppGuard",
                  url: [
                    "Url",
                    {
                      url: "https://www.appguard.us/about/",
                      input: {
                        mode: "exact",
                        protocol: "https",
                        protocollessUrl: "www.appguard.us/about/",
                        signatureInfo: {
                          notAfter: "2024-10-20T14:22:48Z",
                          signature:
                            "ptjkYwDS5N+9DkGz9LhNeOm3uVKICOoRcvs886yi5P8=",
                        },
                      },
                    },
                  ],
                  attribute: null,
                  isTarget: null,
                  metrics: {
                    rank: 1446605,
                    domainRating: 42,
                    urlRating: 6,
                    refpages: 8,
                    domains: 6,
                    traffic: 35,
                    cost: 5686,
                    keywords: 4,
                    topKeyword: "appguard",
                    topVolume: 60,
                    nrWords: 1901,
                    httpCode: 200,
                  },
                },
              ],
              siteLinks: [],
            },
          ],
          pos: 1,
          posWithMetrics: 1,
        },
        {
          content: [
            "questions",
            [
              [
                "Some",
                {
                  title: "What does AppGuard do?",
                  link: "None",
                },
              ],
              [
                "Some",
                {
                  title: "Is AppGuard an EDR?",
                  link: "None",
                },
              ],
              [
                "Some",
                {
                  title: "What is an app guard?",
                  link: "None",
                },
              ],
            ],
          ],
          pos: 2,
        },
        {
          content: [
            "organic",
            {
              link: [
                "Some",
                {
                  title: "AppGuard Home",
                  url: [
                    "Url",
                    {
                      url: "https://www.appguard.us/appguard-home/",
                      input: {
                        mode: "exact",
                        protocol: "https",
                        protocollessUrl: "www.appguard.us/appguard-home/",
                        signatureInfo: {
                          notAfter: "2024-10-20T14:22:48Z",
                          signature:
                            "EZU95t/V2Fx+U+/5j+Y3UBrnvhUREgmIhnZHmLM38Sc=",
                        },
                      },
                    },
                  ],
                  attribute: null,
                  isTarget: null,
                  metrics: {
                    rank: 1446605,
                    domainRating: 42,
                    urlRating: 0,
                    refpages: 1,
                    domains: 1,
                    traffic: 9,
                    cost: 1286,
                    keywords: 2,
                    topKeyword: "appguard",
                    topVolume: 60,
                    nrWords: null,
                    httpCode: null,
                  },
                },
              ],
              siteLinks: [],
            },
          ],
          pos: 3,
          posWithMetrics: 2,
        },
        {
          content: [
            "organic",
            {
              link: [
                "Some",
                {
                  title: "AppGuard Review",
                  url: [
                    "Url",
                    {
                      url: "https://www.pcmag.com/reviews/appguard",
                      input: {
                        mode: "exact",
                        protocol: "https",
                        protocollessUrl: "www.pcmag.com/reviews/appguard",
                        signatureInfo: {
                          notAfter: "2024-10-20T14:22:48Z",
                          signature:
                            "YcCCOTTaGwsU4JlP33iE2h+NPz2shC9/rKQe5k7WXSI=",
                        },
                      },
                    },
                  ],
                  attribute: null,
                  isTarget: null,
                  metrics: {
                    rank: 1093,
                    domainRating: 91,
                    urlRating: 2,
                    refpages: 7,
                    domains: 4,
                    traffic: 4,
                    cost: 630,
                    keywords: 2,
                    topKeyword: "appguard",
                    topVolume: 60,
                    nrWords: 3028,
                    httpCode: 200,
                  },
                },
              ],
              siteLinks: [],
            },
          ],
          pos: 4,
          posWithMetrics: 3,
        },
        {
          content: [
            "organic",
            {
              link: [
                "Some",
                {
                  title: "Why AppGuard?",
                  url: [
                    "Url",
                    {
                      url: "https://www.appguard.us/why-appguard/",
                      input: {
                        mode: "exact",
                        protocol: "https",
                        protocollessUrl: "www.appguard.us/why-appguard/",
                        signatureInfo: {
                          notAfter: "2024-10-20T14:22:48Z",
                          signature:
                            "KVabG/TFi1RWhWS8sNvmrlZNEPFHEVmkELfx+Hdu2bI=",
                        },
                      },
                    },
                  ],
                  attribute: null,
                  isTarget: null,
                  metrics: null,
                },
              ],
              siteLinks: [],
            },
          ],
          pos: 5,
          posWithMetrics: 4,
        },
        {
          content: [
            "organic",
            {
              link: [
                "Some",
                {
                  title: "Partners - AppGuard",
                  url: [
                    "Url",
                    {
                      url: "https://www.appguard.us/partners/",
                      input: {
                        mode: "exact",
                        protocol: "https",
                        protocollessUrl: "www.appguard.us/partners/",
                        signatureInfo: {
                          notAfter: "2024-10-20T14:22:48Z",
                          signature:
                            "1vVpILfMynyqC49/J1zi6/GyUSEsPPNijuQy5GEfWDM=",
                        },
                      },
                    },
                  ],
                  attribute: null,
                  isTarget: null,
                  metrics: null,
                },
              ],
              siteLinks: [],
            },
          ],
          pos: 6,
          posWithMetrics: 5,
        },
        {
          content: [
            "knowledge_panel",
            [
              "Some",
              {
                title: "AppGuard, Inc.",
                url: null,
                attribute: null,
                isTarget: null,
              },
            ],
          ],
          pos: 7,
        },
        {
          content: [
            "organic",
            {
              link: [
                "Some",
                {
                  title: "Microsoft Defender Application Guard overview",
                  url: [
                    "Url",
                    {
                      url: "https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/microsoft-defender-application-guard/md-app-guard-overview",
                      input: {
                        mode: "exact",
                        protocol: "https",
                        protocollessUrl:
                          "learn.microsoft.com/en-us/windows/security/application-security/application-isolation/microsoft-defender-application-guard/md-app-guard-overview",
                        signatureInfo: {
                          notAfter: "2024-10-20T14:22:48Z",
                          signature:
                            "AvD+3iVJj0pn4R/dDusu8nlHdqQhmSQb7WwE0UEHKSg=",
                        },
                      },
                    },
                  ],
                  attribute: null,
                  isTarget: null,
                  metrics: null,
                },
              ],
              siteLinks: [],
            },
          ],
          pos: 8,
          posWithMetrics: 6,
        },
        {
          content: [
            "organic",
            {
              link: [
                "Some",
                {
                  title: "AppGuard | Arrow ECS NA",
                  url: [
                    "Url",
                    {
                      url: "https://www.arrow.com/globalecs/na/vendors/appguard/",
                      input: {
                        mode: "exact",
                        protocol: "https",
                        protocollessUrl:
                          "www.arrow.com/globalecs/na/vendors/appguard/",
                        signatureInfo: {
                          notAfter: "2024-10-20T14:22:48Z",
                          signature:
                            "lntd/+tmJV2i845scHtMtKd7ORo/1ANfvVqaDxkVJPQ=",
                        },
                      },
                    },
                  ],
                  attribute: null,
                  isTarget: null,
                  metrics: null,
                },
              ],
              siteLinks: [],
            },
          ],
          pos: 9,
          posWithMetrics: 7,
        },
        {
          content: [
            "organic",
            {
              link: [
                "Some",
                {
                  title: "AppGuard",
                  url: [
                    "Url",
                    {
                      url: "https://softprom.com/vendor/appguard",
                      input: {
                        mode: "exact",
                        protocol: "https",
                        protocollessUrl: "softprom.com/vendor/appguard",
                        signatureInfo: {
                          notAfter: "2024-10-20T14:22:48Z",
                          signature:
                            "hN7zuvM+0/32a7qs1gDOhr1RCEn7vDvgRDx3MwGVdCE=",
                        },
                      },
                    },
                  ],
                  attribute: null,
                  isTarget: null,
                  metrics: null,
                },
              ],
              siteLinks: [],
            },
          ],
          pos: 10,
          posWithMetrics: 8,
        },
      ],
      source: "Serps",
    },
    lastUpdate: "2024-10-05T14:10:40Z",
    difficulty: 2,
    shortage: 3,
  });

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
