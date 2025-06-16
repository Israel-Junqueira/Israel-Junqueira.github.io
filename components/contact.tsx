"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Linkedin, Github } from "lucide-react"

export function Contact() {
  return (
    <section id="contato" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Entre em Contato</h2>

        {/* Container centralizado para o card único */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>Você pode me contatar diretamente através dos seguintes canais:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">E-mail</p>
                    <a href="mailto:israelribeiro313@gmail.com" className="text-muted-foreground hover:text-primary">
                      israelribeiro313@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Telefone</p>
                    <a href="tel:+5514996983584" className="text-muted-foreground hover:text-primary">
                      (14) 99698-3584
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Linkedin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/israel-junqueira/"
                      target="_blank"
                      className="text-muted-foreground hover:text-primary"
                      rel="noreferrer"
                    >
                      linkedin.com/in/israel-junqueira
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <a
                      href="https://github.com/Israel-Junqueira"
                      target="_blank"
                      className="text-muted-foreground hover:text-primary"
                      rel="noreferrer"
                    >
                      github.com/Israel-Junqueira
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
