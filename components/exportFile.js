export const exportReport = (analysisData, showToast, t) => {
  if (!analysisData) return;

  const reportContent = `${t.reportTitle}\n\n1. ${t.techSummary}:\n${analysisData.resumo}\n\n2. ${t.rootCause}:\n${analysisData.causa}\n\n3. ${t.impact}:\n${analysisData.impacto}\n\n4. ${t.criticality}:\n${analysisData.criticidade}\n\n5. ${t.recommendations}:\n${analysisData.recomendacoes}\n\n6. ${t.possibleSolution}:\n${analysisData.solucao}\n\n7. ${t.prevImprovements}:\n${analysisData.melhorias}\n`;
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
    showToast(t.reportExported, "success");
  }
};
