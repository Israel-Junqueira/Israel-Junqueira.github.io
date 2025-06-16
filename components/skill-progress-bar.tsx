import type { SkillLevel } from "@/types/skills"

interface SkillProgressBarProps {
  level: SkillLevel
  showLabel?: boolean
}

const levelConfig = {
  iniciante: {
    label: "Iniciante",
    percentage: 25,
    colorClass: "text-orange-600",
    bgColorClass: "bg-orange-600",
  },
  intermediario: {
    label: "Intermediário",
    percentage: 50,
    colorClass: "text-blue-600",
    bgColorClass: "bg-blue-600",
  },
  avancado: {
    label: "Avançado",
    percentage: 75,
    colorClass: "text-green-600",
    bgColorClass: "bg-green-600",
  },
  especialista: {
    label: "Especialista",
    percentage: 100,
    colorClass: "text-purple-600",
    bgColorClass: "bg-purple-600",
  },
}

export function SkillProgressBar({ level, showLabel = true }: SkillProgressBarProps) {
  const config = levelConfig[level]

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className={`text-xs font-medium ${config.colorClass}`}>{config.label}</span>
          <span className="text-xs text-muted-foreground">{config.percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${config.bgColorClass}`}
          style={{ width: `${config.percentage}%` }}
        />
      </div>
    </div>
  )
}
