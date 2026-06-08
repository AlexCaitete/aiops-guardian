import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="logo" style={{ fontSize: "1.1rem" }}>
          <Image
            src="/logo.png"
            alt="Logo AIOps Guardian"
            width={30}
            height={30}
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
