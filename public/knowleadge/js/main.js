// Funcionalidades principais do Knowledge Arsenal
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Knowledge Arsenal iniciado!")

  // Inicializar funcionalidades
  initializeNavigation()
  initializeCounterAnimation()
  initializeScrollEffects()
  initializeTechModal()
  initializeResponsiveMenu()
  initializePerformanceMonitoring()

  // Navegação suave
  function initializeNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]')

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href").substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  // ANIMAÇÃO DOS CONTADORES - NOVA FUNCIONALIDADE
  function initializeCounterAnimation() {
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

    // Observar todos os números das estatísticas
    const statNumbers = document.querySelectorAll(".stat-number[data-target]")
    statNumbers.forEach((stat) => {
      stat.textContent = "0" // Começar do zero
      counterObserver.observe(stat)
    })
  }

  // Função para animar contadores
  function animateCounter(element, target, duration = 2000) {
    const start = 0
    const increment = target / (duration / 16)
    const startTime = performance.now()

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function para suavizar a animação
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(easeOutQuart * target)

      element.textContent = current

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target
        // Adicionar efeito de "pulse" no final
        element.style.transform = "scale(1.1)"
        setTimeout(() => {
          element.style.transform = "scale(1)"
        }, 200)
      }
    }

    requestAnimationFrame(updateCounter)
  }

  // Efeitos de scroll
  function initializeScrollEffects() {
    const header = document.querySelector(".header")
    let lastScrollY = window.scrollY

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY

      // Header com backdrop blur
      if (currentScrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.backdropFilter = "blur(20px)"
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.backdropFilter = "blur(10px)"
        header.style.boxShadow = "none"
      }

      // Parallax suave para elementos
      const parallaxElements = document.querySelectorAll(".hero::before")
      parallaxElements.forEach((element) => {
        const speed = 0.5
        const yPos = -(currentScrollY * speed)
        element.style.transform = `translateY(${yPos}px)`
      })

      lastScrollY = currentScrollY
    })

    // Animação de entrada para elementos
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          fadeInObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(".category-card, .timeline-item")
    animatedElements.forEach((element, index) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"
      element.style.transition = `all 0.6s ease ${index * 0.1}s`
      fadeInObserver.observe(element)
    })
  }

  // Modal de tecnologias
  function initializeTechModal() {
    const modal = document.getElementById("techModal")
    const closeBtn = modal?.querySelector(".close")

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none"
      })
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
      }
    })

    // Escape key para fechar modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal?.style.display === "block") {
        modal.style.display = "none"
      }
    })
  }

  // Menu responsivo
  function initializeResponsiveMenu() {
    const navToggle = document.getElementById("nav-toggle")
    const navMenu = document.getElementById("nav-menu")

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active")
        navToggle.classList.toggle("active")

        // Animação das barras do hamburger
        const bars = navToggle.querySelectorAll(".bar")
        bars.forEach((bar, index) => {
          if (navToggle.classList.contains("active")) {
            if (index === 0) bar.style.transform = "rotate(45deg) translate(5px, 5px)"
            if (index === 1) bar.style.opacity = "0"
            if (index === 2) bar.style.transform = "rotate(-45deg) translate(7px, -6px)"
          } else {
            bar.style.transform = "none"
            bar.style.opacity = "1"
          }
        })
      })

      // Fechar menu ao clicar em link
      const navLinks = navMenu.querySelectorAll(".nav-link")
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active")
          navToggle.classList.remove("active")

          const bars = navToggle.querySelectorAll(".bar")
          bars.forEach((bar) => {
            bar.style.transform = "none"
            bar.style.opacity = "1"
          })
        })
      })
    }
  }

  // Monitoramento de performance
  function initializePerformanceMonitoring() {
    if ("performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType("navigation")[0]
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart

          console.log(`📊 Knowledge Arsenal carregado em ${loadTime}ms`)

          if (loadTime > 3000) {
            console.warn("⚠️ Tempo de carregamento acima do ideal")
          }

          // Métricas de Core Web Vitals
          if ("PerformanceObserver" in window) {
            const observer = new PerformanceObserver((list) => {
              list.getEntries().forEach((entry) => {
                console.log(`📈 ${entry.name}: ${entry.value}ms`)
              })
            })

            observer.observe({ entryTypes: ["measure", "navigation"] })
          }
        }, 0)
      })
    }
  }

  // Botão "Explorar Conhecimentos"
  const exploreBtn = document.getElementById("exploreBtn")
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      const categoriesSection = document.querySelector(".knowledge-categories")
      if (categoriesSection) {
        categoriesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }

      // Efeito visual no botão
      exploreBtn.style.transform = "scale(0.95)"
      setTimeout(() => {
        exploreBtn.style.transform = "scale(1)"
      }, 150)
    })
  }

  // Lazy loading para imagens
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    const lazyImages = document.querySelectorAll("img[data-src]")
    lazyImages.forEach((img) => imageObserver.observe(img))
  }

  // Smooth scroll para navegação interna
  const smoothScrollLinks = document.querySelectorAll('a[href*="#"]:not([href="#"])')
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      const targetId = href.split("#")[1]
      const targetElement = document.getElementById(targetId)

      if (targetElement && href.includes("#")) {
        e.preventDefault()
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Atualizar URL sem reload
        history.pushState(null, null, href)
      }
    })
  })

  // Preload de páginas importantes
  const importantPages = ["sobre.html", "projetos.html", "contato.html"]
  importantPages.forEach((page) => {
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = page
    document.head.appendChild(link)
  })

  console.log("✅ Knowledge Arsenal totalmente carregado!")
})

// Função global para abrir modal de tecnologia
window.openTechModal = (tech) => {
  const modal = document.getElementById("techModal")
  const modalBody = document.getElementById("modalBody")

  if (!modal || !modalBody) return

  const techData = {
    csharp: {
      title: "C# Programming",
      description: "Linguagem de programação moderna e versátil da Microsoft",
      features: ["Orientação a Objetos", "Type Safety", "Garbage Collection", "LINQ"],
      projects: 15,
      level: "Avançado",
    },
    sql: {
      title: "SQL Database",
      description: "Linguagem para gerenciamento de bancos de dados relacionais",
      features: ["Consultas Complexas", "Stored Procedures", "Triggers", "Otimização"],
      projects: 12,
      level: "Intermediário",
    },
    dotnet: {
      title: ".NET Framework",
      description: "Plataforma de desenvolvimento da Microsoft",
      features: ["Cross-platform", "High Performance", "Rich Ecosystem", "Cloud Ready"],
      projects: 18,
      level: "Avançado",
    },
    api: {
      title: "API Development",
      description: "Desenvolvimento de APIs RESTful e GraphQL",
      features: ["REST", "GraphQL", "Authentication", "Documentation"],
      projects: 10,
      level: "Intermediário",
    },
  }

  const data = techData[tech]
  if (!data) return

  modalBody.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <div style="margin: 1.5rem 0;">
      <h4>Características:</h4>
      <ul style="margin-left: 1rem;">
        ${data.features.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
    </div>
    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
      <span style="background: var(--primary-color); color: white; padding: 0.5rem 1rem; border-radius: 0.5rem;">
        ${data.projects} Projetos
      </span>
      <span style="background: var(--accent-color); color: white; padding: 0.5rem 1rem; border-radius: 0.5rem;">
        Nível ${data.level}
      </span>
    </div>
  `

  modal.style.display = "block"
  modal.style.animation = "modalSlideIn 0.3s ease-out"
}

// Utilitários globais
window.KnowledgeArsenal = {
  // Mostrar notificações
  showNotification: (message, type = "info", duration = 3000) => {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: white;
      font-weight: 500;
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `

    const colors = {
      info: "#2563eb",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
    }

    notification.style.background = colors[type] || colors.info

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease-out"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, duration)
  },

  // Debounce para otimização
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle para scroll events
  throttle: (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  // Copiar texto para clipboard
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      window.KnowledgeArsenal.showNotification("Texto copiado!", "success", 2000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
      window.KnowledgeArsenal.showNotification("Erro ao copiar texto", "error", 2000)
    }
  },
}

// Adicionar estilos para animações de notificação
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`
document.head.appendChild(notificationStyles)
