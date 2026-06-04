"use client";
import { useRef, useState } from "react";

export default function InputPanel({
  input,
  setInput,
  file,
  processFile,
  handleAnalyze,
  status,
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Automação para a Apresentação (Demo Mode)
  const handleLoadDemo = () => {
    if (status === "analyzing") return;

    const demoLog = `faça a anlise pra mim.`;

    let currentText = "";
    let i = 0;
    setInput(""); // Limpa o painel antes de começar

    const intervalId = setInterval(() => {
      currentText += demoLog.charAt(i);
      setInput(currentText);
      i++;
      if (i >= demoLog.length) clearInterval(intervalId);
    }, 20); // Velocidade da digitação (20ms por letra para texto curto)
  };

  return (
    <section className="input-section glass-panel">
      <div className="section-header">
        <h2>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--neon-green)"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="cyber-text" data-text="Comunicação com a IA">
            Comunicação com a IA
          </span>
        </h2>
        <p className="subtitle">
          Envie logs, XMLs de erro ou descreva o problema ocorrido no ambiente
          Power Platform.
        </p>
      </div>

      <div
        className={`upload-area ${isDragging ? "dragging" : ""} ${status === "analyzing" ? "disabled" : ""}`}
        onClick={() => {
          if (fileInputRef.current && status !== "analyzing") {
            fileInputRef.current.value = "";
            fileInputRef.current.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept=".txt,.xml,.json,.log"
          disabled={status === "analyzing"}
        />
        <div className="upload-content">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-silver)"
            strokeWidth="1.5"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          {file ? (
            <span className="file-name">{file.name}</span>
          ) : (
            <span>
              Clique para anexar arquivos do seu computador <br />
              <small>(.txt, .xml, .json, .log)</small>
            </span>
          )}
        </div>
      </div>

      <div className="text-area-wrapper" style={{ position: "relative" }}>
        <textarea
          placeholder="Ou cole a telemetria, log ou contexto do problema aqui..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status === "analyzing"}
        ></textarea>

        {/* Botão de Automação da Demo */}
        {status !== "analyzing" && (
          <button
            className="btn-demo fade-in"
            onClick={handleLoadDemo}
            title="Interceptar uma telemetria de exemplo"
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
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Simular Incidente
          </button>
        )}
      </div>

      <button
        className={`btn-analyze ${status === "analyzing" ? "analyzing" : ""}`}
        onClick={handleAnalyze}
        disabled={status === "analyzing" || (!input && !file)}
      >
        {status === "analyzing" ? (
          <>
            <span className="spinner"></span> Processando Dados...
          </>
        ) : (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>{" "}
            Analisar Incidente
          </>
        )}
      </button>
    </section>
  );
}
