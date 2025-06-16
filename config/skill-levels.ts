import type { SkillLevelConfig } from "@/types/skills"

export const skillLevels: Record<string, SkillLevelConfig> = {
  iniciante: {
    label: "Iniciante",
    percentage: 25,
    color: "text-orange-600",
    bgColor: "bg-orange-600",
  },
  intermediario: {
    label: "Intermediário",
    percentage: 50,
    color: "text-blue-600",
    bgColor: "bg-blue-600",
  },
  avancado: {
    label: "Avançado",
    percentage: 75,
    color: "text-green-600",
    bgColor: "bg-green-600",
  },
  especialista: {
    label: "Especialista",
    percentage: 100,
    color: "text-purple-600",
    bgColor: "bg-purple-600",
  },
}
