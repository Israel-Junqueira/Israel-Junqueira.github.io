import type React from "react"
export type SkillLevel = "iniciante" | "intermediario" | "avancado" | "especialista"

export interface Skill {
  title: string
  description: string
  level: SkillLevel
  icon: React.ReactNode
  category?: string
}

export interface SkillLevelConfig {
  label: string
  percentage: number
  color: string
  bgColor: string
}
