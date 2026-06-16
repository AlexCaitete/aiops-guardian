"use client";
import { useState, useEffect } from "react";
import RobotIcon from "../app/RobotIcon";

const Typewriter = ({ text, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    let i = 0;
    setDisplayedText("");
    setIsTyping(true);

    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <>
      {displayedText}
      {isTyping && <span className="typing-cursor"></span>}
    </>
  );
};

export default function AnalysisResult({
  status,
  data,
  resetAnalysis,
  handleExport,
  t,
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (data?.solucao) {
      navigator.clipboard.writeText(data.solucao);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section className="output-section glass-panel">
      {status === "idle" && (
        <div className="empty-state">
          <RobotIcon className="robot-idle" />
          <h3>{t.waitTele}</h3>
          <p>{t.readyAgent}</p>
        </div>
      )}

      {status === "analyzing" && (
        <div className="analyzing-state">
          <div className="radar-spinner"></div>
          <h3>{t.analyzingFlows}</h3>
          <p>{t.applyingAnalysis}</p>
        </div>
      )}

      {status === "complete" && data && (
        <div className="results-container fade-in">
          <div className="results-header">
            <h2>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--neon-green)"
                strokeWidth="2"
                role="img"
                aria-label="Ícone"
                alt=""
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {t.analysisComplete}
            </h2>
            <div className="results-actions">
              <button
                className="btn-secondary btn-clear"
                onClick={resetAnalysis}
                title="Apagar os resultados atuais"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                {t.clearHistory}
              </button>
              <button className="btn-secondary" onClick={handleExport}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                {t.export}
              </button>
              <button className="btn-reset" onClick={resetAnalysis}>
                {t.newAnalysis}
              </button>
            </div>
          </div>

          <div className="result-card">
            <div className="card-header">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {t.errorId}
            </div>
            <div className="card-body">
              <div className="data-row">
                <span className="data-label">{t.techSummary}</span>
                <span className="data-value">
                  <Typewriter text={data.resumo} speed={15} />
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">{t.rootCause}</span>
                <span className="data-value">
                  <Typewriter text={data.causa} speed={15} />
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">{t.impact}</span>
                <span className="data-value">
                  <Typewriter text={data.impacto} speed={15} />
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">{t.criticality}</span>
                <span
                  className={`data-value ${data.criticidade.includes("Seguro") || data.criticidade.includes("Safe") ? "badge-safe" : "badge-critical"}`}
                >
                  {data.criticidade}
                </span>
              </div>
            </div>
          </div>

          <div className="result-card">
            <div className="card-header highlight">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              {t.solutionsPrev}
            </div>
            <div className="card-body">
              <div className="data-row">
                <span className="data-label">{t.recommendations}</span>
                <span className="data-value">
                  <Typewriter text={data.recomendacoes} speed={15} />
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">{t.possibleSolution}</span>
                <div className="code-snippet">
                  <button
                    className={`btn-copy ${isCopied ? "copied" : ""}`}
                    onClick={handleCopy}
                    title="Copiar Resolução"
                  >
                    {isCopied ? t.copied : t.copy}
                  </button>
                  <code style={{ whiteSpace: "pre-wrap" }}>
                    <Typewriter text={data.solucao} speed={10} />
                  </code>
                </div>
              </div>
              <div className="data-row">
                <span className="data-label">{t.prevImprovements}</span>
                <span className="data-value">
                  <Typewriter text={data.melhorias} speed={15} />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
