import "./globals.css";

export const metadata = {
  title: "AIOps Guardian | Micro-Agente",
  description:
    "Agente inteligente especialista em governança e análise de telemetria para Microsoft Power Platform.",
  keywords: ["AIOps", "Power Platform", "IA", "Governança", "Low-Code"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
