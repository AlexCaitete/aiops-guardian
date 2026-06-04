export default function FAQ() {
  return (
    <section className="faq-section">
      <h2 className="section-title">Perguntas Frequentes</h2>

      <details className="faq-card">
        <summary>
          O AIOps Guardian funciona com quais linguagens de programação?
        </summary>
        <div className="faq-content">
          <p>
            Atualmente, temos suporte total a Python, JavaScript, TypeScript,
            Java e Go. Nossos modelos são treinados constantemente e planejamos
            adicionar suporte a Rust e C# no próximo trimestre.
          </p>
        </div>
      </details>

      <details className="faq-card">
        <summary>Meus códigos são enviados para treinar outras IAs?</summary>
        <div className="faq-content">
          <p>
            Absolutamente não. A privacidade e segurança do seu código são nossa
            prioridade máxima. No plano Enterprise, garantimos em contrato o
            isolamento total dos dados (Zero Data Retention) ou a implantação
            local (On-Premise).
          </p>
        </div>
      </details>

      <details className="faq-card">
        <summary>
          Qual a diferença do Guardian para um linter tradicional?
        </summary>
        <div className="faq-content">
          <p>
            Linters tradicionais procuram por erros de sintaxe ou padrões fixos.
            O AIOps Guardian utiliza inteligência artificial para entender o{" "}
            <strong>contexto e a lógica</strong>, identificando alucinações
            matemáticas, regras de negócios quebradas e falhas de segurança
            reais.
          </p>
        </div>
      </details>

      <details className="faq-card">
        <summary>Posso testar a ferramenta gratuitamente?</summary>
        <div className="faq-content">
          <p>
            Sim! O plano Desenvolvedor é 100% gratuito e permite até 50 análises
            completas por mês no nosso editor web ou via extensão do VS Code.
          </p>
        </div>
      </details>
    </section>
  );
}
