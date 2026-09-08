"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, FileText } from "lucide-react"

const links = [{ href: "#sobre", label: "Sobre" }, { href: "#experiencia", label: "Experiência" }, { href: "#entregas", label: "Entregas" }, { href: "#habilidades", label: "Competências" }, { href: "#formacao", label: "Formação" }, { href: "#contato", label: "Contato" }]

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-background focus:p-3">Pular para o conteúdo</a>
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0 text-lg font-bold">Israel Ribeiro<span className="text-primary">.</span></Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-5 lg:flex">{links.map((link) => <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">{link.label}</a>)}<Button asChild size="sm" variant="outline"><Link href="/curriculo"><FileText className="mr-2 h-4 w-4" aria-hidden="true" />Currículo</Link></Button></nav>
        <Button className="lg:hidden" variant="ghost" size="icon" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</Button>
      </div>
      {open && <nav id="menu-mobile" aria-label="Navegação móvel" className="container flex flex-col gap-1 border-t py-3 lg:hidden">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-2 text-base font-medium">{link.label}</a>)}<Link href="/curriculo" onClick={() => setOpen(false)} className="py-2 font-medium text-primary">Ver currículo</Link></nav>}
    </header>
  )
}
