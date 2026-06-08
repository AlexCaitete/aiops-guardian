import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        {/* A logo carregará direto da pasta public */}
        <Image
          src="/logo.png"
          alt="Logo AIOps Guardian"
          width={30}
          height={30}
        />
        AIOps Guardian
      </div>
      <div className="nav-links">
        <Link href="/features">Recursos</Link>
        <Link href="/integrations">Integrações</Link>
        <Link href="/case-studies">Estudos de Caso</Link>
        <Link href="/docs">Documentação</Link>
        <Link href="/pricing">Preços</Link>
      </div>
      <button className="btn-cta">Comece Agora (Grátis)</button>
    </nav>
  );
}
