/**
 * Knowledge Arsenal - JavaScript Principal
 * Funcionalidades gerais do site
 */

const $ = require("jquery") // Declare the $ variable before using it

$(document).ready(() => {
  console.log("🧠 Knowledge Arsenal carregado!")

  // Inicializar componentes
  initLoadingScreen()
  initNavigation()
  initScrollEffects()
  initBackToTop()
  initAnimations()

  console.log("✅ Todos os componentes inicializados")
})

// ===== LOADING SCREEN =====
function initLoadingScreen() {
  const loadingScreen = $("#loading-screen")
  const loadingProgress = $(".loading-progress")

  // Simular carregamento
  let progress = 0
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 30

    if (progress >= 100) {
      progress = 100
      clearInterval(loadingInterval)

      // Esconder loading screen após completar
      setTimeout(() => {
        loadingScreen.fadeOut(500, function () {
          $(this).remove()
        })
      }, 500)
    }

    loadingProgress.css("width", progress + "%")
  }, 200)
}

// ===== NAVEGAÇÃO =====
function initNavigation() {
  const navToggle = $("#nav-toggle")
  const navMenu = $("#nav-menu")
  const header = $("#header")

  // Toggle menu mobile
  navToggle.on("click", function () {
    $(this).toggleClass("active")
    navMenu.toggleClass("active")
    $("body").toggleClass("menu-open")
  })

  // Fechar menu ao clicar em link
  $(".nav-link").on("click", () => {
    navToggle.removeClass("active")
    navMenu.removeClass("active")
    $("body").removeClass("menu-open")
  })

  // Header scroll effect
  $(window).on("scroll", () => {
    if ($(window).scrollTop() > 100) {
      header.addClass("scrolled")
    } else {
      header.removeClass("scrolled")
    }
  })

  // Smooth scroll para links internos
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault()
    const target = $(this.getAttribute("href"))

    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80,
        },
        800,
      )
    }
  })
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  // Intersection Observer para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $(entry.target).addClass("animate-in")

        // Animar contadores se existirem
        const counters = $(entry.target).find("[data-count]")
        counters.each(function () {
          animateCounter($(this))
        })
      }
    })
  }, observerOptions)

  // Observar elementos
  $(".hero, .knowledge-section, .quick-links-section").each(function () {
    observer.observe(this)
  })
}

// ===== ANIMAÇÃO DE CONTADORES =====
function animateCounter($element) {
  const target = Number.parseInt($element.data("count"))
  const $number = $element.find(".stat-number")
  let current = 0
  const increment = target / 50
  const duration = 2000
  const stepTime = duration / 50

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    $number.text(Math.floor(current))
  }, stepTime)
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const backToTop = $("#back-to-top")

  $(window).on("scroll", () => {
    if ($(window).scrollTop() > 300) {
      backToTop.addClass("visible")
    } else {
      backToTop.removeClass("visible")
    }
  })

  backToTop.on("click", () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800,
    )
  })
}

// ===== ANIMAÇÕES GERAIS =====
function initAnimations() {
  // Adicionar classes de animação com delay
  $(".hero-content > *").each(function (index) {
    $(this).css("animation-delay", index * 200 + "ms")
    $(this).addClass("fade-in-up")
  })

  // Hover effects nos botões
  $(".btn-animated")
    .on("mouseenter", function () {
      $(this).addClass("hover-effect")
    })
    .on("mouseleave", function () {
      $(this).removeClass("hover-effect")
    })
}

// ===== UTILITÁRIOS =====
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

// Função para mostrar notificações
function showNotification(message, type = "info") {
  const notification = $(`
        <div class="notification notification-${type}">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `)

  $("body").append(notification)

  setTimeout(() => {
    notification.addClass("show")
  }, 100)

  // Auto remove
  setTimeout(() => {
    notification.removeClass("show")
    setTimeout(() => notification.remove(), 300)
  }, 4000)

  // Close button
  notification.find(".notification-close").on("click", () => {
    notification.removeClass("show")
    setTimeout(() => notification.remove(), 300)
  })
}

// Expor funções globalmente
window.showNotification = showNotification
