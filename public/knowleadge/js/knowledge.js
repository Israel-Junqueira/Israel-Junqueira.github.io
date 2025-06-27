/**
 * Knowledge Arsenal - Gerenciamento de Conhecimentos
 */

// Base de dados dos conhecimentos
const knowledgeData = [
  {
    id: "dotnet-core",
    title: ".NET Core",
    description: "Framework para desenvolvimento de aplicações multiplataforma. APIs, Web Apps e Microservices.",
    category: "backend",
    level: "advanced",
    status: "mastered",
    icon: "⚙️",
    tags: ["C#", "API", "Web", "Microservices"],
    lastUpdated: "2024-01-15",
    githubRepo: "https://github.com/Israel-Junqueira/dotnet-examples",
    documentation: "documentacoes.html#dotnet-core",
  },
  {
    id: "csharp",
    title: "C#",
    description: "Linguagem de programação orientada a objetos. Sintaxe, conceitos avançados e boas práticas.",
    category: "backend",
    level: "advanced",
    status: "mastered",
    icon: "💻",
    tags: ["OOP", "LINQ", "Async", "Generics"],
    lastUpdated: "2024-01-10",
    githubRepo: "https://github.com/Israel-Junqueira/csharp-studies",
    documentation: "documentacoes.html#csharp",
  },
  {
    id: "entity-framework",
    title: "Entity Framework",
    description: "ORM para .NET. Code First, Database First, migrações e otimizações de performance.",
    category: "database",
    level: "intermediate",
    status: "mastered",
    icon: "🗄️",
    tags: ["ORM", "Code First", "Migrations", "LINQ"],
    lastUpdated: "2024-01-08",
    githubRepo: "https://github.com/Israel-Junqueira/ef-examples",
    documentation: "documentacoes.html#entity-framework",
  },
  {
    id: "sql-server",
    title: "SQL Server",
    description: "Sistema de gerenciamento de banco de dados. Queries, procedures, índices e otimização.",
    category: "database",
    level: "intermediate",
    status: "mastered",
    icon: "📊",
    tags: ["T-SQL", "Procedures", "Indexes", "Performance"],
    lastUpdated: "2024-01-12",
    githubRepo: "https://github.com/Israel-Junqueira/sql-scripts",
    documentation: "documentacoes.html#sql-server",
  },
  {
    id: "docker",
    title: "Docker",
    description: "Containerização de aplicações. Dockerfile, Docker Compose e deploy em containers.",
    category: "tools",
    level: "beginner",
    status: "learning",
    icon: "🐳",
    tags: ["Containers", "DevOps", "Deploy", "Microservices"],
    lastUpdated: "2024-01-14",
    githubRepo: "https://github.com/Israel-Junqueira/docker-studies",
    documentation: "documentacoes.html#docker",
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Linguagem de programação para web. ES6+, DOM manipulation, async/await e APIs.",
    category: "frontend",
    level: "intermediate",
    status: "mastered",
    icon: "🟨",
    tags: ["ES6", "DOM", "Async", "APIs"],
    lastUpdated: "2024-01-05",
    githubRepo: "https://github.com/Israel-Junqueira/js-projects",
    documentation: "documentacoes.html#javascript",
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    description: "Estruturação e estilização web. Semantic HTML, Flexbox, Grid e responsividade.",
    category: "frontend",
    level: "intermediate",
    status: "mastered",
    icon: "🎨",
    tags: ["Semantic", "Flexbox", "Grid", "Responsive"],
    lastUpdated: "2024-01-03",
    githubRepo: "https://github.com/Israel-Junqueira/frontend-projects",
    documentation: "documentacoes.html#html-css",
  },
  {
    id: "git",
    title: "Git & GitHub",
    description: "Controle de versão e colaboração. Branches, merge, rebase e workflows.",
    category: "tools",
    level: "intermediate",
    status: "mastered",
    icon: "🌿",
    tags: ["Version Control", "Branches", "Collaboration", "Workflows"],
    lastUpdated: "2024-01-01",
    githubRepo: "https://github.com/Israel-Junqueira/git-workflows",
    documentation: "documentacoes.html#git",
  },
]

// Estado da aplicação
let currentFilter = "all"
let searchQuery = ""
let filteredKnowledge = [...knowledgeData]

// Import jQuery
const $ = require("jquery")

// Import showNotification
const showNotification = require("./showNotification")

// Inicialização
$(document).ready(() => {
  initKnowledgeSection()
  initSearch()
  initFilters()
  renderKnowledge()

  console.log("📚 Knowledge Manager inicializado")
})

// ===== INICIALIZAÇÃO =====
function initKnowledgeSection() {
  // Verificar se estamos na página que tem a seção de conhecimento
  if ($("#knowledge-grid").length === 0) return

  // Setup dos event listeners
  setupKnowledgeEventListeners()
}

function setupKnowledgeEventListeners() {
  // Search input
  $("#knowledge-search").on(
    "input",
    debounce(function () {
      searchQuery = $(this).val().toLowerCase().trim()
      filterAndRenderKnowledge()
    }, 300),
  )

  // Filter tabs
  $(".filter-tab").on("click", function () {
    $(".filter-tab").removeClass("active")
    $(this).addClass("active")
    currentFilter = $(this).data("filter")
    filterAndRenderKnowledge()
  })

  // Knowledge card actions
  $(document).on("click", ".knowledge-action", function (e) {
    e.preventDefault()
    const action = $(this).data("action")
    const knowledgeId = $(this).data("knowledge-id")
    handleKnowledgeAction(action, knowledgeId)
  })
}

// ===== BUSCA =====
function initSearch() {
  const searchBox = $(".search-box")
  const searchInput = $("#knowledge-search")
  const searchBtn = $(".search-btn")

  // Focus effect
  searchInput
    .on("focus", () => {
      searchBox.addClass("focused")
    })
    .on("blur", () => {
      searchBox.removeClass("focused")
    })

  // Search button click
  searchBtn.on("click", () => {
    searchInput.focus()
  })
}

// ===== FILTROS =====
function initFilters() {
  // Atualizar contadores dos filtros
  updateFilterCounts()
}

function updateFilterCounts() {
  $(".filter-tab").each(function () {
    const filter = $(this).data("filter")
    let count = knowledgeData.length

    if (filter !== "all") {
      if (filter === "learning") {
        count = knowledgeData.filter((item) => item.status === "learning").length
      } else {
        count = knowledgeData.filter((item) => item.category === filter).length
      }
    }

    const currentText = $(this).text().split(" (")[0]
    $(this).text(`${currentText} (${count})`)
  })
}

// ===== FILTRAR E RENDERIZAR =====
function filterAndRenderKnowledge() {
  filteredKnowledge = knowledgeData.filter((item) => {
    // Filtro por categoria
    let categoryMatch = true
    if (currentFilter !== "all") {
      if (currentFilter === "learning") {
        categoryMatch = item.status === "learning"
      } else {
        categoryMatch = item.category === currentFilter
      }
    }

    // Filtro por busca
    let searchMatch = true
    if (searchQuery) {
      searchMatch =
        item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    }

    return categoryMatch && searchMatch
  })

  renderKnowledge()
}

// ===== RENDERIZAÇÃO =====
function renderKnowledge() {
  const grid = $("#knowledge-grid")

  if (filteredKnowledge.length === 0) {
    grid.html(renderEmptyState())
    return
  }

  const knowledgeCards = filteredKnowledge.map((item, index) => renderKnowledgeCard(item, index)).join("")

  grid.html(knowledgeCards)

  // Animar cards
  setTimeout(() => {
    $(".knowledge-card").each(function (index) {
      setTimeout(() => {
        $(this).addClass("animate-in")
      }, index * 100)
    })
  }, 100)
}

function renderKnowledgeCard(item, index) {
  const levelIcons = {
    beginner: "🟢",
    intermediate: "🟡",
    advanced: "🔴",
  }

  const statusLabels = {
    mastered: "Dominado",
    learning: "Aprendendo",
    reviewing: "Revisando",
  }

  const statusColors = {
    mastered: "success",
    learning: "warning",
    reviewing: "info",
  }

  return `
        <div class="knowledge-card" data-knowledge-id="${item.id}" style="animation-delay: ${index * 100}ms">
            <div class="knowledge-header">
                <div class="knowledge-icon">${item.icon}</div>
                <div class="knowledge-meta">
                    <span class="knowledge-level" title="Nível: ${item.level}">${levelIcons[item.level]}</span>
                    <span class="knowledge-status status-${statusColors[item.status]}">${statusLabels[item.status]}</span>
                </div>
            </div>
            
            <div class="knowledge-content">
                <h3 class="knowledge-title">${item.title}</h3>
                <p class="knowledge-description">${item.description}</p>
                
                <div class="knowledge-tags">
                    ${item.tags.map((tag) => `<span class="knowledge-tag">${tag}</span>`).join("")}
                </div>
                
                <div class="knowledge-info">
                    <span class="knowledge-updated">📅 ${formatDate(item.lastUpdated)}</span>
                    <span class="knowledge-category">${getCategoryIcon(item.category)} ${getCategoryLabel(item.category)}</span>
                </div>
            </div>
            
            <div class="knowledge-actions">
                ${
                  item.documentation
                    ? `
                    <a href="${item.documentation}" class="btn btn-primary knowledge-action" data-action="docs">
                        📚 Documentação
                    </a>
                `
                    : ""
                }
                
                ${
                  item.githubRepo
                    ? `
                    <a href="${item.githubRepo}" target="_blank" class="btn btn-outline knowledge-action" data-action="github">
                        🐙 Repositório
                    </a>
                `
                    : ""
                }
                
                <button class="btn btn-outline knowledge-action" data-action="share" data-knowledge-id="${item.id}">
                    📤 Compartilhar
                </button>
            </div>
        </div>
    `
}

function renderEmptyState() {
  return `
        <div class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3>Nenhum conhecimento encontrado</h3>
            <p>Tente ajustar seus filtros ou termos de busca.</p>
            <button class="btn btn-primary" onclick="clearFilters()">
                Limpar Filtros
            </button>
        </div>
    `
}

// ===== AÇÕES =====
function handleKnowledgeAction(action, knowledgeId) {
  const item = knowledgeData.find((k) => k.id === knowledgeId)

  switch (action) {
    case "share":
      shareKnowledge(item)
      break
    case "docs":
    case "github":
      // Links são tratados automaticamente
      break
  }
}

function shareKnowledge(item) {
  if (navigator.share) {
    navigator.share({
      title: `Knowledge Arsenal - ${item.title}`,
      text: item.description,
      url: window.location.href,
    })
  } else {
    // Fallback - copiar para clipboard
    const url = `${window.location.origin}/knowledge/#${item.id}`
    navigator.clipboard.writeText(url).then(() => {
      showNotification("Link copiado para a área de transferência!", "success")
    })
  }
}

function clearFilters() {
  currentFilter = "all"
  searchQuery = ""
  $("#knowledge-search").val("")
  $(".filter-tab").removeClass("active")
  $('.filter-tab[data-filter="all"]').addClass("active")
  filterAndRenderKnowledge()
}

// ===== UTILITÁRIOS =====
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

function getCategoryIcon(category) {
  const icons = {
    backend: "⚙️",
    frontend: "🎨",
    database: "🗄️",
    tools: "🔧",
    mobile: "📱",
  }
  return icons[category] || "💻"
}

function getCategoryLabel(category) {
  const labels = {
    backend: "Backend",
    frontend: "Frontend",
    database: "Database",
    tools: "Ferramentas",
    mobile: "Mobile",
  }
  return labels[category] || "Geral"
}

// Função debounce
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Expor funções globalmente
window.clearFilters = clearFilters
window.knowledgeData = knowledgeData
