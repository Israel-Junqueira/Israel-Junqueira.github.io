import { ArrowDownRight, FileText, Github, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import profile from "@/data/profile.json"

export function Hero() {
  return (
    <section className="bg-slate-950 text-white py-16 md:py-24">
      <div className="container grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-widest text-blue-300">{profile.stack}</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{profile.name}</h1>
          <p className="mt-5 text-2xl font-medium text-slate-100 sm:text-3xl">{profile.headline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{profile.intro}</p>
          <p className="mt-6 flex items-center gap-2 text-sm text-slate-300"><MapPin className="h-4 w-4" aria-hidden="true" />{profile.location} · Disponibilidade para viagens</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="#experiencia">Conheça meu trabalho<ArrowDownRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:text-white"><Link href="/curriculo"><FileText className="mr-2 h-4 w-4" aria-hidden="true" />Ver currículo</Link></Button>
            <Button asChild size="lg" variant="ghost" className="text-slate-200 hover:bg-slate-800 hover:text-white"><a href={profile.github} target="_blank" rel="noreferrer"><Github className="mr-2 h-4 w-4" aria-hidden="true" />GitHub</a></Button>
          </div>
        </div>
        <img src="/Eu-min.png" alt="Israel Ribeiro Junqueira" width={192} height={192} className="row-start-1 h-24 w-24 rounded-full object-cover ring-4 ring-slate-800 md:col-start-2 md:h-48 md:w-48" />
      </div>
    </section>
  )
}
