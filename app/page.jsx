"use client";
import { useState } from "react";
import InputPanel from "@/components/InputPanel";
import AnalysisResult from "@/components/AnalysisResult";
import { mockData } from "@/components/mockData";
import { exportReport } from "@/components/exportFile";

// O componente principal inicia aqui (garantindo que não há chaves '}' perdidas antes desta linha)
export default function Home() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [aiModel, setAiModel] = useState("guardian-v2");
  const [analysisData, setAnalysisData] = useState(null);

  // Sistema Customizado de Notificação (Toast)
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "info" }),
      4000,
    );
  };

  const processFile = (selectedFile) => {
    // Validação de Extensão de Arquivo
    const allowedExtensions = ["txt", "xml", "json", "log"];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      showToast("Erro: Formato de arquivo não suportado.", "error");
      return;
    }

    // Validação Profissional de Tamanho (Máx 2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      showToast("Erro: O arquivo anexado excede o limite de 2MB.", "error");
      return;
    }
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      setInput(event.target.result);
      showToast(
        `Arquivo "${selectedFile.name}" carregado com sucesso.`,
        "success",
      );
    };
    reader.readAsText(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!input && !file) return;
    setStatus("analyzing");

    try {
      // Simulação visual 100% no Front-end (Sem usar backend/API)
      await new Promise((resolve) => setTimeout(resolve, 2500));

      setAnalysisData(mockData);
      setStatus("complete");
      showToast("Análise de telemetria concluída!", "success");
    } catch (error) {
      setStatus("idle");
      showToast("Falha na simulação.", "error");
    }
  };

  const resetAnalysis = () => {
    setInput("");
    setFile(null);
    setAnalysisData(null);
    setStatus("idle");
  };

  const handleExport = () => {
    exportReport(analysisData, showToast);
  };

  return (
    <main className="app-container">
      {/* Notificação Toast */}
      {toast.show && (
        <div className={`toast-container ${toast.type}`}>
          {toast.type === "error"
            ? "⚠️"
            : toast.type === "success"
              ? "✅"
              : "ℹ️"}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Cabeçalho */}
      <header className="app-header glass-panel">
        <div className="logo-area">
          <div className="logo-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1>
            <span className="glow-title">AIOps Guardian</span>{" "}
            <span className="badge">Micro-Agente</span>
          </h1>
        </div>
        <nav className="header-nav">
          <select
            className="header-model-select"
            value={aiModel}
            onChange={(e) => setAiModel(e.target.value)}
            disabled={status === "analyzing"}
          >
            <option value="guardian-v2">AIOps Guardian v2.0</option>
            <option value="fast-tracker">Fast-Tracker Diagnostic v1.5</option>
          </select>
          <span>Power Platform</span>
        </nav>
      </header>

      <div className="content-grid">
        <InputPanel
          input={input}
          setInput={setInput}
          file={file}
          processFile={processFile}
          handleAnalyze={handleAnalyze}
          status={status}
        />
        <AnalysisResult
          status={status}
          data={analysisData}
          resetAnalysis={resetAnalysis}
          handleExport={handleExport}
        />
      </div>

      {/* Rodapé Terminal */}
      <footer className="terminal-footer">
        <span className="status-dot"></span> AIOps Guardian v2.0 - Active
      </footer>
    </main>
  );
}
