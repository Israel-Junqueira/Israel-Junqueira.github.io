"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, FileText } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            Israel Ribeiro
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#sobre" className="text-sm font-medium hover:underline underline-offset-4">
            Sobre
          </Link>
          <Link href="#habilidades" className="text-sm font-medium hover:underline underline-offset-4">
            Habilidades
          </Link>
          <Link href="#projetos" className="text-sm font-medium hover:underline underline-offset-4">
            Projetos
          </Link>
          <Link href="#formacao" className="text-sm font-medium hover:underline underline-offset-4">
            Formação
          </Link>
          <Link href="#contato" className="text-sm font-medium hover:underline underline-offset-4">
            Contato
          </Link>
           <Link href="/curriculo">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Currículo
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/israel-junqueira/" target="_blank">
            <Button variant="outline" size="sm">
              LinkedIn
            </Button>
          </Link>
          
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden py-4 pb-6">
          <nav className="flex flex-col gap-4">
            <Link href="#sobre" className="text-sm font-medium" onClick={toggleMenu}>
              Sobre
            </Link>
            <Link href="#habilidades" className="text-sm font-medium" onClick={toggleMenu}>
              Habilidades
            </Link>
            <Link href="#projetos" className="text-sm font-medium" onClick={toggleMenu}>
              Projetos
            </Link>
            <Link href="#formacao" className="text-sm font-medium" onClick={toggleMenu}>
              Formação
            </Link>
            <Link href="#contato" className="text-sm font-medium" onClick={toggleMenu}>
              Contato
            </Link>
            <Link href="/curriculo">
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Ver Currículo
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/israel-junqueira/" target="_blank">
              <Button variant="outline" size="sm" className="w-full">
                LinkedIn
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
