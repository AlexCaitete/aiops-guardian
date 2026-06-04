import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="logo" style={{ fontSize: "1.1rem" }}>
          <img
            src="/logo.png"
            alt="Logo AIOps Guardian"
            style={{ height: "30px" }}
          />
          AIOps Guardian
        </div>
        <div className="footer-links">
          <Link href="/features">Recursos</Link>
          <Link href="/integrations">Integrações</Link>
          <Link href="/case-studies">Estudos de Caso</Link>
          <Link href="/docs">Documentação</Link>
          <Link href="/pricing">Preços</Link>
        </div>
        <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          &copy; {new Date().getFullYear()} AIOps Guardian. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
