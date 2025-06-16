import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"

export function Projects() {
  const projects = [
    {
      title: "LocalBus",
      description:
        "Aplicativo web desenvolvido para facilitar a marcação dos pontos de ônibus escolares, otimizando rotas e melhorando a experiência dos estudantes.",
      image: "/local-bus-200-400.png?height=200&width=400",
      tags: ["C#", ".NET Core", "Entity Framework", "SQL Server"],
      github: "https://github.com/Israel-Junqueira/Projeto-LocalBus-View",
      type: "Projeto de TCC - Ensino Técnico",
    },
    {
      title: "EntregaRapida",
      description:
        "Aplicativo Web desenvolvido como ferramenta para melhorar a disponibilidade de entregadores para delivery, incluindo funcionalidades em tempo real com Signal.R.",
      image: "/entregarapida.png?height=200&width=400",
      tags: ["C#", ".NET Core", "Signal.R", "Entity Framework"],
      github: "https://github.com/Israel-Junqueira/EF_entregaRapida",
      type: "Projeto de TCC - Ensino Técnico",
    },
  ]

  return (
    <section id="projetos" className="py-16 md:py-24 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Projetos</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Projetos desenvolvidos durante minha formação técnica, com foco em aprendizado e aplicação prática dos conhecimentos adquiridos. Cada projeto foi uma oportunidade de evoluir e exercitar minhas habilidades em desenvolvimento de sistemas e resolução de problemas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg">
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={project.github} target="_blank">
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    Ver no GitHub
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
