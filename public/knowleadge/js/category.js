// Category page specific functionality
document.addEventListener("DOMContentLoaded", () => {
  // Tech filter functionality
  const techItems = document.querySelectorAll(".tech-item")
  const articleCards = document.querySelectorAll(".article-card")

  techItems.forEach((item) => {
    item.addEventListener("click", function () {
      const tech = this.dataset.tech

      // Update active tech item
      techItems.forEach((techItem) => techItem.classList.remove("active"))
      this.classList.add("active")

      // Filter articles
      articleCards.forEach((card) => {
        const cardTech = card.dataset.tech

        if (!tech || cardTech === tech) {
          card.style.display = "block"
          card.classList.remove("hidden")
        } else {
          card.style.display = "none"
          card.classList.add("hidden")
        }
      })

      // Update count
      const visibleCards = document.querySelectorAll(".article-card:not(.hidden)").length
      console.log(`Showing ${visibleCards} articles for ${tech || "all technologies"}`)
    })
  })

  // Level filter functionality
  const levelButtons = document.querySelectorAll(".level-btn")

  levelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const level = this.dataset.level

      // Update active level button
      levelButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter articles by level
      articleCards.forEach((card) => {
        const cardLevel = card.dataset.level

        if (level === "all" || cardLevel === level) {
          card.style.display = "block"
          card.classList.remove("hidden")
        } else {
          card.style.display = "none"
          card.classList.add("hidden")
        }
      })

      // Show notification
      const levelText = level === "all" ? "todos os níveis" : `nível ${level}`
      if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
        window.KnowledgeArsenal.showNotification(`Filtrando por ${levelText}`, "info", 2000)
      }
    })
  })

  // Topic filter functionality
  const topicItems = document.querySelectorAll(".topic-item")

  topicItems.forEach((item) => {
    item.addEventListener("click", function () {
      const topic = this.dataset.topic

      // Visual feedback
      topicItems.forEach((topicItem) => topicItem.classList.remove("active"))
      this.classList.add("active")

      // Filter articles by topic (you can implement this based on article content)
      console.log(`Filtering by topic: ${topic}`)

      // Show notification
      if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
        window.KnowledgeArsenal.showNotification(`Explorando tópico: ${topic}`, "info", 2000)
      }
    })
  })

  // Article card click functionality
  articleCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector("h3").textContent

      // Add click animation
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)

      // Show notification (in a real app, this would navigate to the article)
      if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
        window.KnowledgeArsenal.showNotification(`Abrindo: ${title}`, "info", 2000)
      }

      console.log(`Would open article: ${title}`)
    })

    // Add keyboard support
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })

    // Make focusable
    card.setAttribute("tabindex", "0")
    card.setAttribute("role", "button")
    card.setAttribute("aria-label", `Ler artigo: ${card.querySelector("h3").textContent}`)
  })

  // Search functionality within category
  const searchInput = document.getElementById("categorySearch")

  if (searchInput) {
    const debouncedSearch = window.KnowledgeArsenal
      ? window.KnowledgeArsenal.debounce((query) => {
          searchArticles(query)
        }, 300)
      : (query) => searchArticles(query)

    searchInput.addEventListener("input", function () {
      const query = this.value.trim().toLowerCase()
      debouncedSearch(query)
    })
  }

  function searchArticles(query) {
    articleCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase()
      const description = card.querySelector("p").textContent.toLowerCase()
      const tech = card.dataset.tech.toLowerCase()

      const matches = title.includes(query) || description.includes(query) || tech.includes(query)

      if (query === "" || matches) {
        card.style.display = "block"
        card.classList.remove("hidden")
      } else {
        card.style.display = "none"
        card.classList.add("hidden")
      }
    })

    const visibleCount = document.querySelectorAll(".article-card:not(.hidden)").length
    console.log(`Found ${visibleCount} articles matching "${query}"`)
  }

  // Smooth scroll to sections
  const sectionLinks = document.querySelectorAll('a[href^="#"]')

  sectionLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Code copy functionality
  const codeBlocks = document.querySelectorAll("pre code")

  codeBlocks.forEach((codeBlock) => {
    const pre = codeBlock.parentElement
    const copyButton = document.createElement("button")

    copyButton.textContent = "Copiar"
    copyButton.className = "copy-code-btn"
    copyButton.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    `

    pre.style.position = "relative"
    pre.appendChild(copyButton)

    pre.addEventListener("mouseenter", () => {
      copyButton.style.opacity = "1"
    })

    pre.addEventListener("mouseleave", () => {
      copyButton.style.opacity = "0"
    })

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.textContent)
        copyButton.textContent = "Copiado!"

        setTimeout(() => {
          copyButton.textContent = "Copiar"
        }, 2000)

        if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
          window.KnowledgeArsenal.showNotification("Código copiado!", "success", 1500)
        }
      } catch (err) {
        console.error("Failed to copy code:", err)
        if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
          window.KnowledgeArsenal.showNotification("Erro ao copiar código", "error", 2000)
        }
      }
    })
  })

  // Reading progress indicator
  const progressBar = document.createElement("div")
  progressBar.className = "reading-progress"
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--primary-color);
    z-index: 1001;
    transition: width 0.1s ease;
  `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight
    const scrollTop = window.pageYOffset

    const progress = (scrollTop / documentHeight) * 100
    progressBar.style.width = `${Math.min(progress, 100)}%`
  })

  // Lazy loading for images (if any)
  const images = document.querySelectorAll("img[data-src]")

  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  // Print functionality
  const printButton = document.createElement("button")
  printButton.textContent = "🖨️ Imprimir"
  printButton.className = "print-btn"
  printButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-lg);
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    font-weight: 500;
    z-index: 1000;
    transition: all 0.3s ease;
  `

  printButton.addEventListener("click", () => {
    window.print()
  })

  printButton.addEventListener("mouseenter", () => {
    printButton.style.transform = "translateY(-2px)"
    printButton.style.boxShadow = "var(--shadow-xl)"
  })

  printButton.addEventListener("mouseleave", () => {
    printButton.style.transform = "translateY(0)"
    printButton.style.boxShadow = "var(--shadow-lg)"
  })

  document.body.appendChild(printButton)

  console.log("Category page functionality initialized! 📚")
})

// Export category utilities
window.CategoryUtils = {
  // Filter articles by multiple criteria
  filterArticles: (tech, level, query) => {
    const articles = document.querySelectorAll(".article-card")

    articles.forEach((article) => {
      const articleTech = article.dataset.tech
      const articleLevel = article.dataset.level
      const title = article.querySelector("h3").textContent.toLowerCase()
      const description = article.querySelector("p").textContent.toLowerCase()

      const techMatch = !tech || tech === "all" || articleTech === tech
      const levelMatch = !level || level === "all" || articleLevel === level
      const queryMatch = !query || title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())

      if (techMatch && levelMatch && queryMatch) {
        article.style.display = "block"
        article.classList.remove("hidden")
      } else {
        article.style.display = "none"
        article.classList.add("hidden")
      }
    })
  },

  // Get category statistics
  getCategoryStats: () => {
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
      techCount: technologies.size,
      levelCount: levels.size,
    }
  },

  // Export category data
  exportCategoryData: () => {
    const stats = window.CategoryUtils.getCategoryStats()
    const categoryName = document.querySelector(".category-title").textContent

    const data = {
      category: categoryName,
      timestamp: new Date().toISOString(),
      statistics: stats,
      articles: Array.from(document.querySelectorAll(".article-card")).map((article) => ({
        title: article.querySelector("h3").textContent,
        description: article.querySelector("p").textContent,
        tech: article.dataset.tech,
        level: article.dataset.level,
        readTime: article.querySelector(".read-time").textContent,
        date: article.querySelector(".article-date").textContent,
      })),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${categoryName.toLowerCase().replace(/\s+/g, "-")}-data.json`
    a.click()

    URL.revokeObjectURL(url)

    if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
      window.KnowledgeArsenal.showNotification("Dados da categoria exportados!", "success")
    }
  },
}
