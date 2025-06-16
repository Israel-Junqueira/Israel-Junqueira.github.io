import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SkillProgressBar } from "@/components/skill-progress-bar"
import { skillsData } from "@/data/skills-data"

export function Skills() {
  const skillLevels = [
    { key: "iniciante", label: "Iniciante", bgColor: "bg-orange-600" },
    { key: "intermediario", label: "Intermediário", bgColor: "bg-blue-600" },
    { key: "avancado", label: "Avançado", bgColor: "bg-green-600" },
    { key: "especialista", label: "Especialista", bgColor: "bg-purple-600" },
  ]

  return (
    <section id="habilidades" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Habilidades</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Minhas competências técnicas organizadas por nível de experiência e domínio
        </p>

        {/* Legenda dos níveis */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-600" />
            <span className="text-sm font-medium">Iniciante</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-sm font-medium">Intermediário</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span className="text-sm font-medium">Avançado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600" />
            <span className="text-sm font-medium">Especialista</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {skill.icon}
                <div className="flex-1">
                  <CardTitle className="text-lg">{skill.title}</CardTitle>
                  {skill.category && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md mt-1 inline-block">
                      {skill.category}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground text-sm">{skill.description}</p>
                <SkillProgressBar level={skill.level} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
