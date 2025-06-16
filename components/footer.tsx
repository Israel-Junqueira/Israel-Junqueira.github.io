import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Israel Ribeiro Junqueira</h3>
            <p className="text-slate-300">Desenvolvedor Backend</p>
          </div>

          <div className="flex space-x-4 mb-6 md:mb-0">
            <Link href="https://github.com/Israel-Junqueira" target="_blank" aria-label="GitHub">
              <Github className="h-6 w-6 text-slate-300 hover:text-white transition-colors" />
            </Link>
            <Link href="https://www.linkedin.com/in/israel-junqueira/" target="_blank" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-slate-300 hover:text-white transition-colors" />
            </Link>
            <Link href="mailto:israelribeiro313@gmail.com" aria-label="Email">
              <Mail className="h-6 w-6 text-slate-300 hover:text-white transition-colors" />
            </Link>
          </div>

          <div className="text-slate-400 text-sm">
            <p>&copy; {currentYear} Israel Ribeiro Junqueira. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
