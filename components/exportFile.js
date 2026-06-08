export const exportReport = (analysisData, showToast) => {
  if (!analysisData) return;

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

  if (showToast) {
    showToast("Relatório exportado para o seu dispositivo!", "success");
  }
};
