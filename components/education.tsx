import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"

export function Education() {
  const education = [
    {
      degree: "Bacharelado em Engenharia de software",
      institution: "CESUMAR Centro de Ensino Superior de Maringa",
      period: "2024 - Atualmente",
      description:
        "Formação focada em arquitetura de software, engenharia de requisitos, desenvolvimento full stack e boas práticas de programação. O curso tem contribuído para aprofundar minha capacidade de projetar soluções escaláveis, seguras e alinhadas às necessidades do negócio.",
    },
    {
      degree: "Técnico em Desenvolvimento de Sistemas",
      institution: "ETEC Comendador João Rays / Barra Bonita",
      period: "2021 - 2022",
      description:
        "Formação especializada em desenvolvimento de sistemas, com foco em linguagens de programação, bancos de dados e desenvolvimento de aplicações. Aquisição de habilidades para projetar e implementar soluções tecnológicas inovadoras.",
    },
    {
      degree: "Técnico em Informática",
      institution: "ETEC Comendador João Rays / Barra Bonita",
      period: "2020 - 2021",
      description:
        "Formação técnica em informática com foco em programação, suporte a sistemas e redes. Desenvolvimento de habilidades essenciais para resolução de problemas complexos e trabalho em equipe.",
    },
  ]

  return (
    <section id="formacao" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Formação Acadêmica</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((item, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>{item.degree}</CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{item.period}</span>
                  </div>
                  <p className="font-medium">{item.institution}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
