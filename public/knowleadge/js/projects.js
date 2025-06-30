// Funcionalidades específicas da página de projetos
document.addEventListener("DOMContentLoaded", () => {
  // Filtros de projetos
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter projects with animation
      projectCards.forEach((card, index) => {
        const category = card.dataset.category

        if (filter === "all" || category === filter) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, index * 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })

      // Show notification
      const filterText = filter === "all" ? "todos os projetos" : `projetos de ${filter}`
      if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
        window.KnowledgeArsenal.showNotification(`Mostrando ${filterText}`, "info", 2000)
      }
    })
  })

  // Animação dos números das métricas
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number.parseInt(entry.target.dataset.target)
        animateCounter(entry.target, target)
        counterObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all metric numbers
  const metricNumbers = document.querySelectorAll(".metric-number[data-target], .stat-number[data-target]")
  metricNumbers.forEach((metric) => {
    counterObserver.observe(metric)
  })

  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target
      }
    }

    updateCounter()
  }

  // Hover effects para project cards
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Click handlers para project links
  const projectLinks = document.querySelectorAll(".project-link")

  projectLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const linkText = this.textContent.toLowerCase()
      let message = ""

      if (linkText.includes("demo") || linkText.includes("ver")) {
        message = "Abrindo demonstração do projeto..."
      } else if (linkText.includes("github")) {
        message = "Redirecionando para o GitHub..."
      } else if (linkText.includes("docs")) {
        message = "Abrindo documentação..."
      } else if (linkText.includes("instalar")) {
        message = "Redirecionando para instalação..."
      }

      if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
        window.KnowledgeArsenal.showNotification(message, "info", 2000)
      }

      // Simulate opening link after delay
      setTimeout(() => {
        console.log(`Would open: ${this.href || "#"}`)
        // window.open(this.href, '_blank');
      }, 1000)
    })
  })

  // Animação da seção de código
  const codeLines = document.querySelectorAll(".code-line")

  const codeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lines = entry.target.parentElement.querySelectorAll(".code-line")
          lines.forEach((line, index) => {
            setTimeout(() => {
              line.style.opacity = "1"
              line.style.transform = "translateX(0)"
            }, index * 200)
          })
          codeObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const codeAnimation = document.querySelector(".code-animation")
  if (codeAnimation) {
    // Initially hide code lines
    codeLines.forEach((line) => {
      line.style.opacity = "0"
      line.style.transform = "translateX(-20px)"
      line.style.transition = "all 0.5s ease"
    })

    codeObserver.observe(codeAnimation)
  }

  // Parallax effect para hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroSection = document.querySelector(".projects-hero")

    if (heroSection) {
      const rate = scrolled * -0.5
      heroSection.style.transform = `translateY(${rate}px)`
    }
  })

  // Search functionality
  const searchInput = document.getElementById("projectSearch")

  if (searchInput) {
    const debouncedSearch = window.KnowledgeArsenal
      ? window.KnowledgeArsenal.debounce((query) => {
          searchProjects(query)
        }, 300)
      : (query) => searchProjects(query)

    searchInput.addEventListener("input", function () {
      const query = this.value.trim().toLowerCase()
      debouncedSearch(query)
    })
  }

  function searchProjects(query) {
    projectCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase()
      const description = card.querySelector("p").textContent.toLowerCase()
      const techTags = Array.from(card.querySelectorAll(".tech-tag"))
        .map((tag) => tag.textContent.toLowerCase())
        .join(" ")

      const matches = title.includes(query) || description.includes(query) || techTags.includes(query)

      if (query === "" || matches) {
        card.style.display = "block"
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      } else {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        setTimeout(() => {
          if (!card.style.opacity || card.style.opacity === "0") {
            card.style.display = "none"
          }
        }, 300)
      }
    })

    const visibleCount = Array.from(projectCards).filter((card) => card.style.display !== "none").length

    console.log(`Found ${visibleCount} projects matching "${query}"`)
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Reset filters
      const allButton = document.querySelector('.filter-btn[data-filter="all"]')
      if (allButton) {
        allButton.click()
      }
    }
  })

  // Performance optimization
  const throttle = (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Throttled scroll handler
  const throttledScrollHandler = throttle(() => {
    // Additional scroll-based animations can be added here
  }, 16)

  window.addEventListener("scroll", throttledScrollHandler)

  console.log("Projects page functionality initialized! 🚀")
})

// Export utilities
window.ProjectsUtils = {
  // Filter projects by technology
  filterByTech: (tech) => {
    const projectCards = document.querySelectorAll(".project-card")

    projectCards.forEach((card) => {
      const techTags = card.querySelectorAll(".tech-tag")
      let hasMatch = false

      techTags.forEach((tag) => {
        if (tag.textContent.toLowerCase().includes(tech.toLowerCase())) {
          hasMatch = true
        }
      })

      card.style.display = hasMatch ? "block" : "none"
    })
  },

  // Get project statistics
  getProjectStats: () => {
    const projects = document.querySelectorAll(".project-card")
    const technologies = new Set()
    const categories = new Set()

    projects.forEach((project) => {
      const techTags = project.querySelectorAll(".tech-tag")
      const category = project.dataset.category

      techTags.forEach((tag) => {
        technologies.add(tag.textContent)
      })

      if (category) {
        categories.add(category)
      }
    })

    return {
      totalProjects: projects.length,
      uniqueTechnologies: technologies.size,
      categories: Array.from(categories),
      technologies: Array.from(technologies),
    }
  },

  // Export project data
  exportProjectData: () => {
    const stats = window.ProjectsUtils.getProjectStats()

    const data = {
      timestamp: new Date().toISOString(),
      statistics: stats,
      projects: Array.from(document.querySelectorAll(".project-card")).map((project) => ({
        title: project.querySelector("h3").textContent,
        description: project.querySelector("p").textContent,
        category: project.dataset.category,
        technologies: Array.from(project.querySelectorAll(".tech-tag")).map((tag) => tag.textContent),
        featured: project.classList.contains("featured"),
      })),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "projects-data.json"
    a.click()

    URL.revokeObjectURL(url)

    if (window.KnowledgeArsenal && window.KnowledgeArsenal.showNotification) {
      window.KnowledgeArsenal.showNotification("Dados dos projetos exportados!", "success")
    }
  },
}
