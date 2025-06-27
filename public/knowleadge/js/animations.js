/**
 * Knowledge Arsenal - Animações e Efeitos
 */

const $ = require("jquery") // Declare the $ variable

$(document).ready(() => {
  initAnimationEffects()
  initParticleEffects()
  initHoverEffects()

  console.log("✨ Animações inicializadas")
})

// ===== EFEITOS DE ANIMAÇÃO =====
function initAnimationEffects() {
  // Adicionar classes CSS para animações
  addAnimationStyles()

  // Intersection Observer para animações de entrada
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $(entry.target).addClass("animate-in")

        // Animar elementos filhos com delay
        const children = $(entry.target).find(".animate-child")
        children.each(function (index) {
          setTimeout(() => {
            $(this).addClass("animate-in")
          }, index * 100)
        })
      }
    })
  }, observerOptions)

  // Observar elementos para animação
  $(".knowledge-section, .quick-links-section, .footer").each(function () {
    animationObserver.observe(this)
  })
}

// ===== EFEITOS DE PARTÍCULAS =====
function initParticleEffects() {
  const heroParticles = $(".hero-particles")

  if (heroParticles.length === 0) return

  // Criar partículas dinâmicas
  for (let i = 0; i < 20; i++) {
    const particle = $('<div class="particle"></div>')
    particle.css({
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      animationDelay: Math.random() * 20 + "s",
      animationDuration: Math.random() * 10 + 10 + "s",
    })
    heroParticles.append(particle)
  }
}

// ===== EFEITOS DE HOVER =====
function initHoverEffects() {
  // Efeito de tilt nos cards
  $(".knowledge-card, .quick-link-card")
    .on("mouseenter", function (e) {
      const card = $(this)
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.css("transform", `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`)
    })
    .on("mouseleave", function () {
      $(this).css("transform", "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)")
    })

  // Efeito ripple nos botões
  $(".btn").on("click", function (e) {
    const button = $(this)
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const ripple = $('<span class="ripple"></span>')
    ripple.css({
      width: size,
      height: size,
      left: x,
      top: y,
    })

    button.append(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })

  // Efeito de glow nos ícones
  $(".knowledge-icon, .card-icon")
    .on("mouseenter", function () {
      $(this).addClass("glow-effect")
    })
    .on("mouseleave", function () {
      $(this).removeClass("glow-effect")
    })
}

// ===== ADICIONAR ESTILOS CSS DINAMICAMENTE =====
function addAnimationStyles() {
  const styles = `
        <style id="animation-styles">
        /* Animações de entrada */
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .fade-in-up {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Partículas */
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float-particle linear infinite;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        /* Efeito ripple */
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Efeito glow */
        .glow-effect {
            animation: glow 0.5s ease;
            filter: drop-shadow(0 0 10px currentColor);
        }
        
        @keyframes glow {
            0%, 100% {
                filter: drop-shadow(0 0 5px currentColor);
            }
            50% {
                filter: drop-shadow(0 0 20px currentColor);
            }
        }
        
        /* Hover effects */
        .hover-effect {
            transform: translateY(-2px) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        /* Transições suaves */
        .knowledge-card,
        .quick-link-card,
        .btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Estados iniciais para animação */
        .knowledge-card,
        .quick-link-card {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .knowledge-card.animate-in,
        .quick-link-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        </style>
    `

  if ($("#animation-styles").length === 0) {
    $("head").append(styles)
  }
}

// ===== EFEITOS ESPECIAIS =====
function createFloatingElements() {
  // Criar elementos flutuantes no hero
  const hero = $(".hero")
  if (hero.length === 0) return

  for (let i = 0; i < 5; i++) {
    const element = $('<div class="floating-element"></div>')
    element.css({
      left: Math.random() * 100 + "%",
      animationDelay: Math.random() * 5 + "s",
    })
    hero.append(element)
  }
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
  $(window).on("scroll", () => {
    const scrolled = $(window).scrollTop()
    const parallaxElements = $(".parallax-element")

    parallaxElements.each(function () {
      const speed = $(this).data("speed") || 0.5
      const yPos = -(scrolled * speed)
      $(this).css("transform", `translateY(${yPos}px)`)
    })
  })
}

// Inicializar efeitos especiais
$(window).on("load", () => {
  createFloatingElements()
  initParallaxEffect()
})
