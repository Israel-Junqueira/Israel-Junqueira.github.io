// Funcionalidades padrão para páginas de categoria
document.addEventListener("DOMContentLoaded", () => {
  console.log("📚 Categoria carregada!")

  // Inicializar funcionalidades
  initializeTechFilters()
  initializeLevelFilters()
  initializeArticleAnimations()
  initializeCopyButtons()
  initializeSearchFunctionality()

  // Filtros de tecnologia
  function initializeTechFilters() {
    const techItems = document.querySelectorAll(".tech-item")
    const articles = document.querySelectorAll(".article-card")

    techItems.forEach((item) => {
      item.addEventListener("click", function () {
        const tech = this.dataset.tech

        // Atualizar item ativo
        techItems.forEach((t) => t.classList.remove("active"))
        this.classList.add("active")

        // Filtrar artigos
        filterArticles(tech, getCurrentLevel())

        // Animação de feedback
        this.style.transform = "scale(0.95)"
        setTimeout(() => {
          this.style.transform = "scale(1)"
        }, 150)
      })
    })
  }

  // Filtros de nível
  function initializeLevelFilters() {
    const levelBtns = document.querySelectorAll(".level-btn")

    levelBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const level = this.dataset.level

        // Atualizar botão ativo
        levelBtns.forEach((b) => b.classList.remove("active"))
        this.classList.add("active")

        // Filtrar artigos
        filterArticles(getCurrentTech(), level)

        // Animação de feedback
        this.style.transform = "scale(0.95)"
        setTimeout(() => {
          this.style.transform = "scale(1)"
        }, 150)
      })
    })
  }

  // Função para filtrar artigos
  function filterArticles(tech, level) {
    const articles = document.querySelectorAll(".article-card")
    let visibleCount = 0

    articles.forEach((article, index) => {
      const articleTech = article.dataset.tech
      const articleLevel = article.dataset.level

      const techMatch = !tech || tech === "" || articleTech === tech
      const levelMatch = !level || level === "all" || articleLevel === level

      if (techMatch && levelMatch) {
        article.style.display = "block"
        setTimeout(() => {
          article.style.opacity = "1"
          article.style.transform = "translateY(0)"
        }, index * 50)
        visibleCount++
      } else {
        article.style.opacity = "0"
        article.style.transform = "translateY(20px)"
        setTimeout(() => {
          article.style.display = "none"
        }, 300)
      }
    })

    // Atualizar contadores
    updateTechCounts()

    // Mostrar mensagem se nenhum artigo for encontrado
    showFilterResults(visibleCount)
  }

  // Obter tecnologia atual
  function getCurrentTech() {
    const activeTech = document.querySelector(".tech-item.active")
    return activeTech ? activeTech.dataset.tech : ""
  }

  // Obter nível atual
  function getCurrentLevel() {
    const activeLevel = document.querySelector(".level-btn.active")
    return activeLevel ? activeLevel.dataset.level : "all"
  }

  // Atualizar contadores de tecnologia
  function updateTechCounts() {
    const techItems = document.querySelectorAll(".tech-item")

    techItems.forEach((item) => {
      const tech = item.dataset.tech
      const count =
        tech === ""
          ? document.querySelectorAll(".article-card").length
          : document.querySelectorAll(`[data-tech="${tech}"]`).length

      const countElement = item.querySelector(".tech-count")
      if (countElement) {
        countElement.textContent = count
      }
    })
  }

  // Mostrar resultados do filtro
  function showFilterResults(count) {
    const existingMessage = document.querySelector(".filter-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    if (count === 0) {
      const message = document.createElement("div")
      message.className = "filter-message"
      message.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3>Nenhum artigo encontrado</h3>
          <p>Tente ajustar os filtros para ver mais conteúdo.</p>
        </div>
      `

      const articlesGrid = document.querySelector(".articles-grid")
      if (articlesGrid) {
        articlesGrid.appendChild(message)
      }
    }
  }

  // Animações dos artigos
  function initializeArticleAnimations() {
    const articles = document.querySelectorAll(".article-card")

    articles.forEach((article) => {
      article.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px)"
      })

      article.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
      })

      // Adicionar ripple effect
      article.addEventListener("click", function (e) {
        const ripple = document.createElement("span")
        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(37, 99, 235, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `

        this.style.position = "relative"
        this.style.overflow = "hidden"
        this.appendChild(ripple)

        setTimeout(() => {
          ripple.remove()
        }, 600)
      })
    })

    // Adicionar CSS para ripple animation
    const style = document.createElement("style")
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }

  // Botões de copiar código
  function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll(".copy-btn")

    copyButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const codeBlock = this.nextElementSibling.querySelector("code")
        const text = codeBlock.textContent

        navigator.clipboard
          .writeText(text)
          .then(() => {
            const originalText = this.textContent
            this.textContent = "Copiado!"
            this.style.background = "#10b981"

            setTimeout(() => {
              this.textContent = originalText
              this.style.background = ""
            }, 2000)

            // Mostrar notificação
            if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
              window.KnowledgeArsenal.showNotification("Código copiado!", "success", 2000)
            }
          })
          .catch((err) => {
            console.error("Erro ao copiar:", err)
            if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
              window.KnowledgeArsenal.showNotification("Erro ao copiar código", "error", 2000)
            }
          })
      })
    })
  }

  // Funcionalidade de busca
  function initializeSearchFunctionality() {
    // Criar campo de busca se não existir
    const sidebar = document.querySelector(".category-sidebar")
    if (sidebar && !document.querySelector(".search-input")) {
      const searchCard = document.createElement("div")
      searchCard.className = "sidebar-card"
      searchCard.innerHTML = `
        <h3>🔍 Buscar</h3>
        <input type="text" class="search-input" placeholder="Buscar artigos..." 
               style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); 
                      border-radius: var(--radius-md); font-size: 0.9rem; transition: var(--transition);">
      `

      sidebar.insertBefore(searchCard, sidebar.firstChild)

      const searchInput = searchCard.querySelector(".search-input")

      // Estilo do input
      searchInput.addEventListener("focus", function () {
        this.style.borderColor = "var(--primary-color)"
        this.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)"
      })

      searchInput.addEventListener("blur", function () {
        this.style.borderColor = "var(--border-color)"
        this.style.boxShadow = "none"
      })

      // Funcionalidade de busca
      const debouncedSearch = debounce((query) => {
        searchArticles(query)
      }, 300)

      searchInput.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase()
        debouncedSearch(query)
      })
    }
  }

  // Função de busca
  function searchArticles(query) {
    const articles = document.querySelectorAll(".article-card")
    let visibleCount = 0

    articles.forEach((article) => {
      const title = article.querySelector("h3").textContent.toLowerCase()
      const description = article.querySelector("p").textContent.toLowerCase()
      const tech = article.dataset.tech.toLowerCase()

      const matches = query === "" || title.includes(query) || description.includes(query) || tech.includes(query)

      if (matches) {
        article.style.display = "block"
        article.style.opacity = "1"
        article.style.transform = "translateY(0)"
        visibleCount++
      } else {
        article.style.opacity = "0"
        article.style.transform = "translateY(20px)"
        setTimeout(() => {
          article.style.display = "none"
        }, 300)
      }
    })

    showFilterResults(visibleCount)
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

  // Scroll suave para sidebar
  const sidebar = document.querySelector(".category-sidebar")
  if (sidebar) {
    sidebar.style.scrollBehavior = "smooth"
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K para focar na busca
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      const searchInput = document.querySelector(".search-input")
      if (searchInput) {
        searchInput.focus()
      }
    }

    // Escape para limpar filtros
    if (e.key === "Escape") {
      const searchInput = document.querySelector(".search-input")
      if (searchInput) {
        searchInput.value = ""
        searchArticles("")
      }

      // Reset filters
      const allTechBtn = document.querySelector('.tech-item[data-tech=""]')
      const allLevelBtn = document.querySelector('.level-btn[data-level="all"]')

      if (allTechBtn) allTechBtn.click()
      if (allLevelBtn) allLevelBtn.click()
    }
  })

  // Lazy loading para exemplos de código
  const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const codeBlock = entry.target.querySelector("pre code")
        if (codeBlock && !codeBlock.classList.contains("highlighted")) {
          // Simular syntax highlighting
          highlightCode(codeBlock)
          codeBlock.classList.add("highlighted")
        }
        codeObserver.unobserve(entry.target)
      }
    })
  })

  const codeExamples = document.querySelectorAll(".example-card")
  codeExamples.forEach((example) => {
    codeObserver.observe(example)
  })

  // Função simples de syntax highlighting
  function highlightCode(codeBlock) {
    let code = codeBlock.innerHTML

    // Destacar palavras-chave C#
    const keywords = [
      "public",
      "private",
      "protected",
      "class",
      "interface",
      "namespace",
      "using",
      "var",
      "string",
      "int",
      "bool",
      "void",
      "return",
      "if",
      "else",
      "foreach",
      "for",
      "while",
      "new",
      "this",
      "base",
      "override",
      "virtual",
      "abstract",
      "static",
      "readonly",
      "const",
      "get",
      "set",
    ]

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g")
      code = code.replace(regex, `<span style="color: #569cd6;">${keyword}</span>`)
    })

    // Destacar strings
    code = code.replace(/"([^"]*)"/g, '<span style="color: #ce9178;">"$1"</span>')

    // Destacar comentários
    code = code.replace(/\/\/ (.*)/g, '<span style="color: #6a9955;">// $1</span>')
    code = code.replace(/\/\* (.*?) \*\//g, '<span style="color: #6a9955;">/* $1 */</span>')

    codeBlock.innerHTML = code
  }

  console.log("✅ Funcionalidades da categoria carregadas!")
})

// Exportar utilitários
window.CategoryUtils = {
  // Filtrar por tecnologia específica
  filterByTech: (tech) => {
    const techItem = document.querySelector(`[data-tech="${tech}"]`)
    if (techItem) {
      techItem.click()
    }
  },

  // Filtrar por nível específico
  filterByLevel: (level) => {
    const levelBtn = document.querySelector(`[data-level="${level}"]`)
    if (levelBtn) {
      levelBtn.click()
    }
  },

  // Obter estatísticas da categoria
  getStats: () => {
    const articles = document.querySelectorAll(".article-card")
    const technologies = new Set()
    const levels = new Set()

    articles.forEach((article) => {
      technologies.add(article.dataset.tech)
      levels.add(article.dataset.level)
    })

    return {
      totalArticles: articles.length,
      technologies: Array.from(technologies),
      levels: Array.from(levels),
      uniqueTechnologies: technologies.size,
      uniqueLevels: levels.size,
    }
  },

  // Exportar dados da categoria
  exportData: () => {
    const stats = window.CategoryUtils.getStats()
    const articles = Array.from(document.querySelectorAll(".article-card")).map((article) => ({
      title: article.querySelector("h3").textContent,
      description: article.querySelector("p").textContent,
      technology: article.dataset.tech,
      level: article.dataset.level,
      readTime: article.querySelector(".read-time").textContent,
      date: article.querySelector(".article-date").textContent,
    }))

    const data = {
      timestamp: new Date().toISOString(),
      category: document.querySelector(".category-title").textContent,
      statistics: stats,
      articles: articles,
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${data.category.toLowerCase().replace(/\s+/g, "-")}-data.json`
    a.click()

    URL.revokeObjectURL(url)

    if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
      window.KnowledgeArsenal.showNotification("Dados exportados!", "success")
    }
  },
}
