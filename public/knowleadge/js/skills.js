// Sistema de habilidades com níveis de 1 a 10
document.addEventListener("DOMContentLoaded", () => {
  // Animar barras de progresso das habilidades
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const level = progressBar.dataset.level
          const percentage = (level / 10) * 100

          setTimeout(() => {
            progressBar.style.width = `${percentage}%`
          }, 200)

          // Animar dots
          const skillItem = progressBar.closest(".skill-item")
          const dots = skillItem.querySelectorAll(".dot")

          dots.forEach((dot, index) => {
            setTimeout(
              () => {
                if (index < level) {
                  dot.classList.add("filled")
                }
              },
              300 + index * 100,
            )
          })

          skillObserver.unobserve(progressBar)
        }
      })
    },
    { threshold: 0.5 },
  )

  // Observar todas as barras de progresso
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })

  // Hover effects nas skill items
  const skillItems = document.querySelectorAll(".skill-item")

  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
      this.style.boxShadow = "var(--shadow-md)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "none"
    })
  })

  console.log("Skills system initialized! 🎯")
})

// Função para atualizar nível de habilidade
function updateSkillLevel(skillName, newLevel) {
  if (newLevel < 1 || newLevel > 10) {
    console.error("Nível deve estar entre 1 e 10")
    return
  }

  const skillItems = document.querySelectorAll(".skill-item")

  skillItems.forEach((item) => {
    const nameElement = item.querySelector(".skill-name")
    if (nameElement && nameElement.textContent === skillName) {
      // Atualizar nível no texto
      const levelElement = item.querySelector(".skill-level")
      levelElement.textContent = `${newLevel}/10`

      // Atualizar barra de progresso
      const progressBar = item.querySelector(".skill-progress")
      progressBar.dataset.level = newLevel
      const percentage = (newLevel / 10) * 100
      progressBar.style.width = `${percentage}%`

      // Atualizar dots
      const dots = item.querySelectorAll(".dot")
      dots.forEach((dot, index) => {
        if (index < newLevel) {
          dot.classList.add("filled")
        } else {
          dot.classList.remove("filled")
        }
      })

      console.log(`Skill "${skillName}" atualizada para nível ${newLevel}`)
    }
  })
}

// Função para adicionar nova habilidade
function addNewSkill(category, skillName, level) {
  if (level < 1 || level > 10) {
    console.error("Nível deve estar entre 1 e 10")
    return
  }

  const skillCategories = document.querySelectorAll(".skill-category")
  let targetCategory = null

  skillCategories.forEach((cat) => {
    const categoryTitle = cat.querySelector("h4").textContent
    if (categoryTitle === category) {
      targetCategory = cat
    }
  })

  if (!targetCategory) {
    console.error(`Categoria "${category}" não encontrada`)
    return
  }

  const skillHTML = `
    <div class="skill-item">
      <div class="skill-header">
        <span class="skill-name">${skillName}</span>
        <span class="skill-level">${level}/10</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress" data-level="${level}"></div>
      </div>
      <div class="skill-dots">
        ${Array.from({ length: 10 }, (_, i) => `<span class="dot ${i < level ? "filled" : ""}"></span>`).join("")}
      </div>
    </div>
  `

  targetCategory.insertAdjacentHTML("beforeend", skillHTML)
  console.log(`Nova skill "${skillName}" adicionada à categoria "${category}" com nível ${level}`)
}

// Export functions
window.SkillsUtils = {
  updateSkillLevel,
  addNewSkill,

  // Obter todas as habilidades
  getAllSkills: () => {
    const skills = []
    const skillItems = document.querySelectorAll(".skill-item")

    skillItems.forEach((item) => {
      const category = item.closest(".skill-category").querySelector("h4").textContent
      const name = item.querySelector(".skill-name").textContent
      const level = Number.parseInt(item.querySelector(".skill-progress").dataset.level)

      skills.push({ category, name, level })
    })

    return skills
  },

  // Exportar dados das habilidades
  exportSkillsData: () => {
    const skills = window.SkillsUtils.getAllSkills()

    const data = {
      timestamp: new Date().toISOString(),
      skills: skills,
      summary: {
        totalSkills: skills.length,
        averageLevel: skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length,
        categories: [...new Set(skills.map((skill) => skill.category))],
      },
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "skills-data.json"
    a.click()

    URL.revokeObjectURL(url)

    console.log("Dados das habilidades exportados!")
  },
}
