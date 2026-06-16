"use client";
import { useState } from "react";

// Alterado para caminhos relativos nativos (ajustando a quantidade exata de pastas)
import InputPanel from "../components/InputPanel";
import AnalysisResult from "../components/AnalysisResult";
import { mockData } from "../components/mockData";
import { exportReport } from "../components/exportFile";
import { translations } from "../components/translations";

export default function Home() {
  const [lang, setLang] = useState("pt");
  const t = translations[lang];

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
      showToast(t.errFormat, "error");
      return;
    }

    // Validação Profissional de Tamanho (Máx 2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      showToast(t.errSize, "error");
      return;
    }
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      setInput(event.target.result);
      showToast(t.fileLoaded.replace("{name}", selectedFile.name), "success");
    };
    reader.readAsText(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!input && !file) return;
    setStatus("analyzing");

    try {
      // Simulação visual 100% no Front-end (Sem usar backend/API)
      await new Promise((resolve) => setTimeout(resolve, 2500));

      setAnalysisData(mockData[lang]);
      setStatus("complete");
      showToast(t.analysisDone, "success");
    } catch (error) {
      setStatus("idle");
      showToast(t.simFail, "error");
    }
  };

  const resetAnalysis = () => {
    setInput("");
    setFile(null);
    setAnalysisData(null);
    setStatus("idle");
  };

  const handleExport = () => {
    exportReport(analysisData, showToast, t);
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
            <span className="glow-title">{t.appTitle}</span>{" "}
            <span className="badge">{t.badge}</span>
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

          <button
            className="header-model-select"
            onClick={() => {
              setLang(lang === "pt" ? "en" : "pt");
              if (analysisData)
                setAnalysisData(mockData[lang === "pt" ? "en" : "pt"]);
            }}
            title={lang === "pt" ? "Mudar para Inglês" : "Change to Portuguese"}
          >
            {lang === "pt" ? "🌐 EN" : "🌐 PT"}
          </button>
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
          t={t}
        />
        <AnalysisResult
          status={status}
          data={analysisData}
          resetAnalysis={resetAnalysis}
          handleExport={handleExport}
          t={t}
        />
      </div>

      {/* Rodapé Terminal */}
      <footer className="terminal-footer">
        <span className="status-dot"></span> {t.appTitle} v2.0 -{" "}
        {t.activeStatus}
      </footer>
    </main>
  );
}
