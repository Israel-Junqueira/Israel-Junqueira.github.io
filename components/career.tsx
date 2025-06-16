import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"

export function Career() {
  const experiences = [
    {
      position: "Desenvolvedor Backend",
      company: "Empresa XYZ",
      period: "2022 - Presente",
      description:
        "Desenvolvimento e manutenção de aplicações web utilizando .NET Core, Entity Framework e SQL Server. Implementação de APIs RESTful e integração com sistemas de terceiros.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Experiência Profissional</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((item, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>{item.position}</CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{item.period}</span>
                  </div>
                  <p className="font-medium">{item.company}</p>
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
