// Configuração central do Knowledge Arsenal
const KnowledgeConfig = {
  // Estatísticas principais (EDITE AQUI PARA ATUALIZAR OS NÚMEROS)
  stats: {
    articles: 180, // Total de artigos
    projects: 32, // Total de projetos
    technologies: 15, // Total de tecnologias
  },

  // Categorias de conhecimento
  categories: {
    frontend: {
      name: "Frontend",
      icon: "🎨",
      description: "HTML, CSS, JavaScript, React, Vue",
      count: 65,
      color: "#3b82f6",
      page: "frontend.html",
    },
    backend: {
      name: "Backend",
      icon: "⚙️",
      description: "C#, .NET Core, Node.js, APIs RESTful",
      count: 48,
      color: "#10b981",
      page: "backend.html",
    },
    database: {
      name: "Banco de Dados",
      icon: "🗄️",
      description: "PL/SQL Oracle, SQL Server, MongoDB",
      count: 35,
      color: "#f59e0b",
      page: "database.html",
    },
    devops: {
      name: "DevOps & Cloud",
      icon: "☁️",
      description: "Docker, Azure DevOps, AWS, CI/CD",
      count: 28,
      color: "#8b5cf6",
      page: "devops.html",
    },
    mobile: {
      name: "Mobile",
      icon: "📱",
      description: "Flutter, React Native, PWA",
      count: 15,
      color: "#ef4444",
      page: "mobile.html",
    },
    architecture: {
      name: "Arquitetura",
      icon: "🏗️",
      description: "Clean Architecture, DDD, SOLID, Microserviços",
      count: 22,
      color: "#06b6d4",
      page: "architecture.html",
    },
  },

  // Competências técnicas detalhadas
  skills: {
    "Linguagens & Frameworks": [
      { name: "C#", level: 90 },
      { name: ".NET Core", level: 85 },
      { name: "JavaScript", level: 88 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "React", level: 80 },
      { name: "Flutter", level: 60 },
    ],
    "Banco de Dados": [
      { name: "PL/SQL Oracle", level: 85 },
      { name: "SQL Server", level: 80 },
      { name: "MongoDB", level: 70 },
    ],
    "DevOps & Cloud": [
      { name: "Docker", level: 75 },
      { name: "Azure DevOps", level: 80 },
      { name: "AWS", level: 70 },
      { name: "Git/GitFlow", level: 90 },
    ],
    "Arquitetura & Testes": [
      { name: "Clean Architecture", level: 85 },
      { name: "DDD", level: 80 },
      { name: "SOLID", level: 90 },
      { name: "XUnit", level: 75 },
      { name: "Selenium", level: 70 },
    ],
  },

  // Projetos recentes
  recentAdditions: [
    {
      date: "Hoje",
      title: "Clean Architecture com .NET Core",
      description: "Implementação de arquitetura limpa em projetos .NET",
    },
    {
      date: "2 dias",
      title: "Microserviços com Docker",
      description: "Transição de monolito para arquitetura de microserviços",
    },
    {
      date: "1 semana",
      title: "PL/SQL Avançado Oracle",
      description: "Rotinas complexas e otimização de consultas",
    },
    {
      date: "2 semanas",
      title: "CI/CD com Azure DevOps",
      description: "Pipeline completo de integração e entrega contínua",
    },
  ],
}

// Função para atualizar estatísticas (USE ESTA FUNÇÃO PARA ALTERAR OS NÚMEROS)
function updateStats(articles, projects, technologies) {
  KnowledgeConfig.stats.articles = articles
  KnowledgeConfig.stats.projects = projects
  KnowledgeConfig.stats.technologies = technologies

  // Atualizar na interface
  const statsElements = document.querySelectorAll("[data-target]")
  statsElements.forEach((element) => {
    const target = element.dataset.target
    if (target == articles && element.closest(".stat-item").textContent.includes("Artigos")) {
      element.dataset.target = articles
    } else if (target == projects && element.closest(".stat-item").textContent.includes("Projetos")) {
      element.dataset.target = projects
    } else if (target == technologies && element.closest(".stat-item").textContent.includes("Tecnologias")) {
      element.dataset.target = technologies
    }
  })
}

// Função para adicionar nova categoria
function addCategory(key, categoryData) {
  KnowledgeConfig.categories[key] = categoryData
}

// Função para adicionar nova competência
function addSkill(category, skillData) {
  if (!KnowledgeConfig.skills[category]) {
    KnowledgeConfig.skills[category] = []
  }
  KnowledgeConfig.skills[category].push(skillData)
}

// Exportar configuração
window.KnowledgeConfig = KnowledgeConfig
window.updateStats = updateStats
window.addCategory = addCategory
window.addSkill = addSkill

console.log("📊 Knowledge Arsenal Config loaded!")
console.log("💡 Para atualizar estatísticas use: updateStats(artigos, projetos, tecnologias)")
console.log("📝 Para adicionar categoria use: addCategory(chave, dados)")
console.log("🎯 Para adicionar skill use: addSkill(categoria, dados)")
