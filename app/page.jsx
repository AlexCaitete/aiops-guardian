"use client";
import { useState } from "react";
import InputPanel from "../components/InputPanel";
import AnalysisResult from "../components/AnalysisResult";

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

      // Dados simulados para a apresentação
      const mockData = {
        resumo:
          "Os dados fornecidos indicam que nenhum problema crítico foi detectado. Isso sugere que, no momento atual, o sistema está operando sem incidentes graves que exijam intervenção imediata ou atenção. ✅",
        causa:
          "Dado que nenhum problema crítico foi relatado, a causa raiz pode ser que o sistema esteja bem gerenciado e que quaisquer problemas menores tenham sido resolvidos ou estejam sob controle. Também é possível que os sistemas de monitoramento estejam eficazes e que quaisquer problemas potenciais estejam sendo identificados e resolvidos precocemente antes de se tornarem críticos. 🔍",
        impacto:
          "O impacto é mínimo ou nulo no momento, pois nenhum problema crítico está afetando o ambiente. No entanto, a ausência de problemas críticos não diminui a necessidade de monitoramento contínuo e manutenção preventiva para garantir que o sistema permaneça estável e que quaisquer problemas menores sejam resolvidos prontamente. 🛡️",
        criticidade: "Seguro (Informativo)",
        recomendacoes:
          "Manter o monitoramento contínuo ativo. Nenhuma ação corretiva direta é necessária no momento. 📊",
        solucao:
          "N/A - O sistema encontra-se saudável e operando dentro dos parâmetros de normalidade. ✨",
        melhorias:
          "Aproveitar o período de estabilidade para revisar as políticas de DLP e auditar conectores órfãos no CoE Starter Kit. 🚀",
      };

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
    if (!analysisData) return;

    // Exportação usando os dados da API!
    const reportContent = `AIOps Guardian v2.0 - Relatório de Análise\n\n1. Resumo Técnico:\n${analysisData.resumo}\n\n2. Causa Raiz:\n${analysisData.causa}\n\n3. Impacto:\n${analysisData.impacto}\n\n4. Criticidade:\n${analysisData.criticidade}\n\n5. Recomendações:\n${analysisData.recomendacoes}\n\n6. Possível Solução:\n${analysisData.solucao}\n\n7. Melhorias Preventivas:\n${analysisData.melhorias}\n`;
    const blob = new Blob([reportContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "relatorio-analise-aiops.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Relatório exportado para o seu dispositivo!", "success");
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
