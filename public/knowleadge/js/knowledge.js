// Knowledge-specific functionality
document.addEventListener("DOMContentLoaded", () => {
  // Projects Filter Functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.dataset.filter

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")

        // Filter projects
        projectCards.forEach((card) => {
          const category = card.dataset.category

          if (filter === "all" || category === filter) {
            card.classList.remove("hidden")
            card.style.display = "block"
          } else {
            card.classList.add("hidden")
            setTimeout(() => {
              if (card.classList.contains("hidden")) {
                card.style.display = "none"
              }
            }, 300)
          }
        })

        // Show notification
        const filterText = filter === "all" ? "todos os projetos" : `projetos de ${filter}`
        window.KnowledgeArsenal.showNotification(`Mostrando ${filterText}`, "info", 2000)
      })
    })
  }

  // Skills Progress Animation
  const skillBars = document.querySelectorAll(".skill-progress")

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.dataset.width

          setTimeout(() => {
            progressBar.style.width = width
          }, 200)

          skillObserver.unobserve(progressBar)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })

  // Contact Form Validation and Submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    const formFields = {
      name: document.getElementById("name"),
      email: document.getElementById("email"),
      subject: document.getElementById("subject"),
      message: document.getElementById("message"),
    }

    const errorElements = {
      name: document.getElementById("nameError"),
      email: document.getElementById("emailError"),
      subject: document.getElementById("subjectError"),
      message: document.getElementById("messageError"),
    }

    const submitBtn = document.getElementById("submitBtn")
    const successMessage = document.getElementById("successMessage")

    // Real-time validation
    Object.keys(formFields).forEach((fieldName) => {
      const field = formFields[fieldName]
      const errorElement = errorElements[fieldName]

      if (field && errorElement) {
        field.addEventListener("blur", () => validateField(fieldName))
        field.addEventListener("input", () => clearError(fieldName))
      }
    })

    function validateField(fieldName) {
      const field = formFields[fieldName]
      const errorElement = errorElements[fieldName]
      let isValid = true
      let errorMessage = ""

      // Clear previous error
      clearError(fieldName)

      switch (fieldName) {
        case "name":
          if (!field.value.trim()) {
            errorMessage = "Nome é obrigatório"
            isValid = false
          } else if (field.value.trim().length < 2) {
            errorMessage = "Nome deve ter pelo menos 2 caracteres"
            isValid = false
          }
          break

        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!field.value.trim()) {
            errorMessage = "Email é obrigatório"
            isValid = false
          } else if (!emailRegex.test(field.value)) {
            errorMessage = "Email inválido"
            isValid = false
          }
          break

        case "subject":
          if (!field.value) {
            errorMessage = "Selecione um assunto"
            isValid = false
          }
          break

        case "message":
          if (!field.value.trim()) {
            errorMessage = "Mensagem é obrigatória"
            isValid = false
          } else if (field.value.trim().length < 10) {
            errorMessage = "Mensagem deve ter pelo menos 10 caracteres"
            isValid = false
          }
          break
      }

      if (!isValid) {
        showError(fieldName, errorMessage)
        field.classList.add("error")
      } else {
        field.classList.remove("error")
        field.classList.add("valid")
      }

      return isValid
    }

    function showError(fieldName, message) {
      const errorElement = errorElements[fieldName]
      if (errorElement) {
        errorElement.textContent = message
        errorElement.style.display = "block"
      }
    }

    function clearError(fieldName) {
      const errorElement = errorElements[fieldName]
      const field = formFields[fieldName]

      if (errorElement) {
        errorElement.textContent = ""
        errorElement.style.display = "none"
      }

      if (field) {
        field.classList.remove("error")
      }
    }

    function validateForm() {
      let isFormValid = true

      Object.keys(formFields).forEach((fieldName) => {
        if (!validateField(fieldName)) {
          isFormValid = false
        }
      })

      return isFormValid
    }

    // Form submission
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (!validateForm()) {
        window.KnowledgeArsenal.showNotification("Por favor, corrija os erros no formulário", "error")
        return
      }

      // Show loading state
      submitBtn.classList.add("loading")
      submitBtn.disabled = true

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Hide loading state
        submitBtn.classList.remove("loading")
        submitBtn.disabled = false

        // Show success message
        contactForm.style.display = "none"
        successMessage.style.display = "block"

        // Show notification
        window.KnowledgeArsenal.showNotification("Mensagem enviada com sucesso!", "success")

        // Reset form after delay
        setTimeout(() => {
          contactForm.reset()
          contactForm.style.display = "block"
          successMessage.style.display = "none"

          // Clear validation classes
          Object.values(formFields).forEach((field) => {
            if (field) {
              field.classList.remove("error", "valid")
            }
          })
        }, 3000)
      }, 2000)
    })
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active", !isActive)
    })
  })

  // Category Cards Interactive Effects
  const categoryCards = document.querySelectorAll(".category-card")

  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.dataset.category

      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)

      // Show notification with category info
      const categoryNames = {
        frontend: "Frontend Development",
        backend: "Backend Development",
        tools: "Ferramentas de Desenvolvimento",
        design: "Design e UX/UI",
      }

      const categoryName = categoryNames[category] || "Categoria"
      window.KnowledgeArsenal.showNotification(`Explorando ${categoryName}`, "info")

      // Could redirect to a detailed category page
      // window.location.href = `categoria.html?cat=${category}`;
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
    card.setAttribute("aria-label", `Explorar categoria ${card.querySelector("h3").textContent}`)
  })

  // Project Cards Hover Effects
  const projectLinksCards = document.querySelectorAll(".project-card")

  projectLinksCards.forEach((card) => {
    const projectLinks = card.querySelectorAll(".project-link")

    projectLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        const linkText = this.textContent.toLowerCase()
        let message = ""

        if (linkText.includes("demo")) {
          message = "Abrindo demonstração do projeto..."
        } else if (linkText.includes("github")) {
          message = "Redirecionando para o GitHub..."
        }

        window.KnowledgeArsenal.showNotification(message, "info")

        // Simulate opening link after delay
        setTimeout(() => {
          // window.open(this.href, '_blank');
          console.log(`Would open: ${this.href}`)
        }, 1000)
      })
    })
  })

  // Timeline Animation
  const timelineItems = document.querySelectorAll(".timeline-item, .journey-item")

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 200)

          timelineObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 },
  )

  timelineItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = "all 0.6s ease"
    timelineObserver.observe(item)
  })

  // Search Functionality (for future implementation)
  function initializeSearch() {
    const searchInput = document.getElementById("searchInput")

    if (searchInput) {
      const debouncedSearch = window.KnowledgeArsenal.debounce((query) => {
        performSearch(query)
      }, 300)

      searchInput.addEventListener("input", function () {
        const query = this.value.trim()
        if (query.length > 2) {
          debouncedSearch(query)
        }
      })
    }
  }

  function performSearch(query) {
    // Implementation for search functionality
    console.log(`Searching for: ${query}`)
    window.KnowledgeArsenal.showNotification(`Buscando por "${query}"...`, "info", 1500)
  }

  // Initialize search if search input exists
  initializeSearch()

  // Dark Mode Toggle (for future implementation)
  function initializeDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle")

    if (darkModeToggle) {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        document.body.classList.toggle("dark-mode", savedTheme === "dark")
      }

      darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode")
        const isDark = document.body.classList.contains("dark-mode")

        localStorage.setItem("theme", isDark ? "dark" : "light")
        window.KnowledgeArsenal.showNotification(`Modo ${isDark ? "escuro" : "claro"} ativado`, "info", 1500)
      })
    }
  }

  // Initialize dark mode if toggle exists
  initializeDarkMode()

  // Performance monitoring
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0]
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart

        console.log(`Knowledge Arsenal loaded in ${loadTime}ms`)

        if (loadTime > 3000) {
          console.warn("Page load time is above optimal threshold")
        }
      }, 0)
    })
  }

  console.log("Knowledge Arsenal specific features initialized! 📚")
})

// Export knowledge-specific utilities
window.KnowledgeUtils = {
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

    projects.forEach((project) => {
      const techTags = project.querySelectorAll(".tech-tag")
      techTags.forEach((tag) => {
        technologies.add(tag.textContent)
      })
    })

    return {
      totalProjects: projects.length,
      uniqueTechnologies: technologies.size,
      technologies: Array.from(technologies),
    }
  },

  // Export knowledge data (for future backup feature)
  exportData: function () {
    const data = {
      timestamp: new Date().toISOString(),
      stats: this.getProjectStats(),
      version: "1.0.0",
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "knowledge-arsenal-data.json"
    a.click()

    URL.revokeObjectURL(url)
    window.KnowledgeArsenal.showNotification("Dados exportados com sucesso!", "success")
  },
}

// Declare KnowledgeArsenal variable
window.KnowledgeArsenal = {
  showNotification: (message, type, duration) => {
    console.log(`Notification: ${message} (${type})`)
  },
  debounce: (func, wait) => {
    let timeout
    return function (...args) {
      
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  },
}
