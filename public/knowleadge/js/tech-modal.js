// Modal para tecnologias das caixinhas flutuantes
const techData = {
  csharp: {
    title: "C# - Linguagem Moderna e Poderosa",
    icon: "🔷",
    description:
      "C# é uma linguagem de programação moderna, orientada a objetos e type-safe desenvolvida pela Microsoft.",
    features: [
      "Sintaxe limpa e expressiva",
      "Forte tipagem estática",
      "Garbage collection automático",
      "Suporte a programação assíncrona",
      "Integração com .NET ecosystem",
    ],
    examples: `// Exemplo de classe em C#
public class Produto
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public decimal Preco { get; set; }
    
    public async Task<bool> SalvarAsync()
    {
        // Lógica de salvamento assíncrono
        await Task.Delay(100);
        return true;
    }
}`,
    links: [
      { text: "Documentação Oficial", url: "https://docs.microsoft.com/pt-br/dotnet/csharp/" },
      { text: "Meus Projetos C#", url: "backend.html" },
    ],
  },
  sql: {
    title: "SQL - Linguagem de Consulta Estruturada",
    icon: "🗄️",
    description: "SQL é a linguagem padrão para gerenciamento e manipulação de bancos de dados relacionais.",
    features: [
      "Consultas complexas com JOINs",
      "Procedures e functions",
      "Triggers e views",
      "Otimização de performance",
      "Controle de transações",
    ],
    examples: `-- Exemplo de consulta SQL avançada
SELECT 
    p.nome,
    c.nome_categoria,
    COUNT(v.id) as total_vendas,
    SUM(v.valor) as receita_total
FROM produtos p
INNER JOIN categorias c ON p.categoria_id = c.id
LEFT JOIN vendas v ON p.id = v.produto_id
WHERE p.ativo = 1
GROUP BY p.id, p.nome, c.nome_categoria
HAVING SUM(v.valor) > 1000
ORDER BY receita_total DESC;`,
    links: [
      { text: "SQL Tutorial", url: "https://www.w3schools.com/sql/" },
      { text: "Meus Projetos SQL", url: "database.html" },
    ],
  },
  dotnet: {
    title: ".NET - Plataforma de Desenvolvimento",
    icon: "🟣",
    description:
      ".NET é uma plataforma de desenvolvimento gratuita, de código aberto e multiplataforma para criar aplicações modernas.",
    features: [
      "Multiplataforma (Windows, Linux, macOS)",
      "Performance de alta qualidade",
      "Vasto ecossistema de bibliotecas",
      "Suporte a microserviços",
      "Integração com cloud",
    ],
    examples: `// Exemplo de API Controller em .NET
[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private readonly IProdutoService _produtoService;
    
    public ProdutosController(IProdutoService produtoService)
    {
        _produtoService = produtoService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
    {
        var produtos = await _produtoService.ObterTodosAsync();
        return Ok(produtos);
    }
}`,
    links: [
      { text: "Documentação .NET", url: "https://docs.microsoft.com/pt-br/dotnet/" },
      { text: "Meus Projetos .NET", url: "backend.html" },
    ],
  },
  api: {
    title: "APIs RESTful - Arquitetura Moderna",
    icon: "🔌",
    description:
      "APIs REST são interfaces que permitem comunicação entre sistemas usando protocolo HTTP de forma padronizada.",
    features: [
      "Arquitetura stateless",
      "Métodos HTTP padronizados",
      "Formato JSON para dados",
      "Versionamento de API",
      "Documentação automática",
    ],
    examples: `// Exemplo de endpoint REST
GET    /api/produtos        // Listar todos
GET    /api/produtos/1      // Obter por ID
POST   /api/produtos        // Criar novo
PUT    /api/produtos/1      // Atualizar
DELETE /api/produtos/1      // Remover

// Resposta JSON
{
  "id": 1,
  "nome": "Produto Exemplo",
  "preco": 99.99,
  "categoria": "Eletrônicos"
}`,
    links: [
      { text: "REST API Tutorial", url: "https://restfulapi.net/" },
      { text: "Meus Projetos API", url: "backend.html" },
    ],
  },
}

function openTechModal(tech) {
  const modal = document.getElementById("techModal")
  const modalBody = document.getElementById("modalBody")
  const data = techData[tech]

  if (!data) return

  modalBody.innerHTML = `
    <div class="tech-modal-content">
      <div class="tech-header">
        <span class="tech-icon">${data.icon}</span>
        <h2>${data.title}</h2>
      </div>
      
      <p class="tech-description">${data.description}</p>
      
      <div class="tech-features">
        <h3>Principais Características:</h3>
        <ul>
          ${data.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </div>
      
      <div class="tech-example">
        <h3>Exemplo de Código:</h3>
        <pre><code>${data.examples}</code></pre>
      </div>
      
      <div class="tech-links">
        <h3>Links Úteis:</h3>
        <div class="links-container">
          ${data.links
            .map(
              (link) => `
            <a href="${link.url}" class="tech-link" target="_blank">
              ${link.text}
            </a>
          `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `

  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

// Fechar modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("techModal")
  const closeBtn = modal.querySelector(".close")

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })
})

// Estilos para o modal
const modalStyles = `
.tech-modal-content {
  max-height: 70vh;
  overflow-y: auto;
}

.tech-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-color);
}

.tech-icon {
  font-size: 3rem;
}

.tech-header h2 {
  color: var(--primary-color);
  margin: 0;
}

.tech-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--text-secondary);
}

.tech-features,
.tech-example,
.tech-links {
  margin-bottom: 2rem;
}

.tech-features h3,
.tech-example h3,
.tech-links h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.tech-features ul {
  list-style: none;
  padding: 0;
}

.tech-features li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: var(--text-secondary);
}

.tech-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--success-color);
  font-weight: bold;
}

.tech-example pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.links-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.tech-link {
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-link:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .tech-modal-content {
    max-height: 80vh;
  }
  
  .tech-header {
    flex-direction: column;
    text-align: center;
  }
  
  .links-container {
    flex-direction: column;
  }
  
  .tech-example pre {
    font-size: 0.8rem;
    padding: 1rem;
  }
}
`

// Adicionar estilos ao documento
const styleSheet = document.createElement("style")
styleSheet.textContent = modalStyles
document.head.appendChild(styleSheet)
