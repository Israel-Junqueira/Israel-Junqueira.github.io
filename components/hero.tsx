import { Button } from "@/components/ui/button"
import { ArrowDown, FileText,GraduationCap } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container flex flex-col items-center text-center">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary mb-8 overflow-hidden">
          <img
            src="/Eu-min.png?height=160&width=160"
            alt="Israel Ribeiro Junqueira"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-1">Israel Ribeiro Junqueira</h1>
        <h2 className="text-xl md:text-2xl font-medium text-primary mb-3">Desenvolvedor Backend</h2>
        <p className="max-w-2xl text-lg mb-8 text-slate-300">
          Propósito e eficiência em cada linha de código
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="#projetos">
            <Button size="lg">Ver Projetos</Button>
          </Link>
          <Link href="/knowleadge/index.html" target="_blank">
            <Button variant="outline" size="lg">
              <GraduationCap className="mr-2 h-5 w-5" />
              Area do Conhecimento
            </Button>
          </Link>
          <Link href="/curriculo">
            <Button variant="outline" size="lg">
              <FileText className="mr-2 h-5 w-5" />
              Ver Currículo
            </Button>
          </Link>
          <Link href="#contato">
            <Button variant="outline" size="lg">
              Entre em Contato
            </Button>
          </Link>
        </div>
        <Link href="#sobre" className="absolute bottom-8 animate-bounce">
          <ArrowDown className="h-8 w-8" />
        </Link>
      </div>
    </section>
  )
}
