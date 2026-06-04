Markdown
# 🛡️ AIOps Guardian | Micro-Agente

Uma interface de simulação de um agente de Inteligência Artificial focado em analisar logs e telemetria da Microsoft Power Platform. 

Este projeto foi desenvolvido com foco total na criação de uma experiência de usuário (UX) imersiva e uma interface (UI) com temática futurista/cibernética. Atualmente, o projeto funciona como uma prova de conceito (PoC) 100% no front-end, preparando o terreno para uma futura integração com um back-end de processamento de dados e IA real.

## 🚀 O que o projeto faz

A interface permite que o usuário envie arquivos de log e simule uma análise profunda feita por uma Inteligência Artificial. As principais funcionalidades incluem:

*   **Upload de Arquivos:** Suporte a Drag & Drop (arrastar e soltar) ou clique para envio de arquivos `.txt`, `.xml`, `.json` e `.log` (limite de 2MB).
*   **Simulação de IA:** Processo de análise dividido em 3 estados visuais (Ocioso, Analisando, Concluído) com um delay simulado de 2.5s.
*   **Resultados Detalhados:** Apresentação da análise em cards contendo Resumo, Causa Raiz, Impacto, Criticidade, Recomendações e Melhorias.
*   **Efeitos Visuais e Animações:** 
    *   Efeito "Máquina de Escrever" (Typewriter) na renderização das respostas.
    *   Animações de loading simulando radares e robôs vetoriais.
    *   Notificações customizadas flutuantes (Toast) criadas do zero.
*   **Ações de Usuário:** Exportação do relatório da IA para `.txt`, cópia para a área de transferência e limpeza de histórico.
*   **Modo Demo:** Um botão de simulação rápida que digita automaticamente um pedido de análise para facilitar apresentações.

## 💻 Tecnologias e Arquitetura

O foco principal na construção deste front-end foi utilizar os fundamentos da web, evitando bibliotecas visuais prontas para ter total controle sobre o Design System.

*   **Framework:** Next.js (App Router) com React.
*   **Estilização:** CSS Puro (Vanilla CSS) com uso intensivo de variáveis (CSS Custom Properties).
*   **Design System:** Tema HUD (Head-Up Display) escuro (Obsidian) com detalhes em Verde Neon (`#00e676`).
*   **Efeitos:** Glassmorphism, cursores SVG customizados via CSS, scrollbar personalizada e efeitos "glitch".
*   **Componentização:** Divisão clara de responsabilidades, com o estado global na tela principal passando props para painéis de *Input* e *Output*.

## 🧪 Como testar o projeto online (Modo Demo)

Você pode ver a interface funcionando direto no navegador, sem precisar baixar o código, acessando o link do deploy: 
👉 **[Acessar o AIOps Guardian](https://aiops-guardian.vercel.app/)**

Para fazer uma simulação rápida e ver os efeitos visuais em ação, siga este passo a passo:

1. Abra o link do projeto.
2. Na tela inicial, faça um Uploud de algum arquivo(só para simulação) em seguida clique no botão **"Simular Incidente"**. A interface vai digitar um texto de teste sozinha para você.
3. Assim que a digitação terminar, clique no botão principal **"Analisar Incidente"**.
4. A tela vai mudar para o estado de "Analisando" com uma animação de radar verde. Após uns 2 segundos, os cards de resultado vão aparecer no painel da direita, mostrando a resposta letra por letra.

## 🛠️ Como rodar o projeto localmente

Se você quiser clonar e testar a interface na sua máquina, siga os passos abaixo:

1. Clone este repositório:
```bash
git clone [https://github.com/AlexCaitete/aiops-guardian.git](https://github.com/AlexCaitete/aiops-guardian.git)
Entre na pasta do projeto:

Bash
cd aiops-guardian
Instale as dependências:

Bash
npm install
Rode o servidor de desenvolvimento:

Bash
npm run dev
Abra o seu navegador e acesse http://localhost:3000.

🔮 Próximos Passos
O roadmap futuro deste projeto envolve sair do ambiente simulado e transformar a aplicação em um sistema funcional e integrado:

[ ] Desenvolver a API no back-end para receber e processar os logs reais.

[ ] Integrar a aplicação com um modelo de LLM (ex: OpenAI, Gemini) para gerar as análises de forma dinâmica.

[ ] Conectar com um banco de dados para salvar o histórico de análises e incidentes dos usuários.
