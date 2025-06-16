import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"

export default function CurriculoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header da página */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Portfólio
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/curriculo.pdf" target="_blank">
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Abrir em Nova Aba
              </Button>
            </Link>
            <Link href="/curriculo.pdf" download="Israel_Ribeiro_Curriculo.pdf">
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Baixar PDF
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Visualizador do PDF */}
      <main className="container py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Currículo - Israel Ribeiro Junqueira</h1>

          {/* Embed do PDF */}
          <div className="w-full h-[800px] border rounded-lg overflow-hidden shadow-lg">
            <iframe src="/curriculo.pdf" className="w-full h-full" title="Currículo Israel Ribeiro Junqueira" />
          </div>

          {/* Fallback para dispositivos que não suportam iframe */}
          <div className="mt-4 text-center">
            <p className="text-muted-foreground mb-4">Não consegue visualizar o PDF?</p>
            <Link href="/curriculo.pdf" target="_blank">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Baixar Currículo
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
