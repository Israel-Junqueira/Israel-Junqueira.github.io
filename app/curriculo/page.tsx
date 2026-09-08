import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import profile from "@/data/profile.json"

export const metadata: Metadata = { title: "Currículo | Israel Ribeiro Junqueira", description: "Experiência profissional em C#/.NET, SQL, integração de sistemas e automação em AWS." }

export default function CurriculoPage() {
  return (
    <div className="min-h-screen bg-muted/40 print:bg-white print:text-black">
      <header className="border-b bg-background print:hidden"><div className="container flex flex-wrap items-center justify-between gap-3 py-4"><Button asChild variant="ghost"><Link href="/"><ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />Voltar ao portfólio</Link></Button><Button asChild><a href="/curriculo.pdf" download="Israel_Ribeiro_Junqueira_Curriculo.pdf"><Download className="mr-2 h-4 w-4" aria-hidden="true" />Baixar PDF</a></Button></div></header>
      <main className="container py-8 md:py-12 print:p-0">
        <article className="mx-auto max-w-4xl rounded-xl border bg-card p-6 text-card-foreground sm:p-12 print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0 print:text-black">
          <header className="border-b pb-6"><h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1><p className="mt-2 text-lg font-medium">{profile.headline} | C#/.NET, SQL e AWS</p><p className="mt-4 text-sm">{profile.location} · {profile.phone} · <a href={`mailto:${profile.email}`} className="break-all underline">{profile.email}</a></p><p className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm"><a className="underline" href={profile.linkedin}>linkedin.com/in/israel-junqueira</a><a className="underline" href={profile.github}>github.com/Israel-Junqueira</a></p></header>
          <section className="mt-7"><h2 className="text-lg font-bold">Resumo profissional</h2><p className="mt-3 leading-relaxed">{profile.summary}</p></section>
          <section className="mt-7"><h2 className="text-lg font-bold">Experiência profissional</h2><h3 className="mt-3 font-semibold">{profile.company}</h3><p>{profile.role} | {profile.period}</p><ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">{profile.resumeExperience.map((item) => <li key={item.area}><strong>{item.area}:</strong> {item.description}</li>)}</ul></section>
          <section className="mt-7"><h2 className="text-lg font-bold">Competências técnicas</h2><ul className="mt-3 space-y-2">{profile.resumeSkills.map((skill) => <li key={skill.area}><strong>{skill.area}:</strong> {skill.description}</li>)}</ul></section>
          <section className="mt-7"><h2 className="text-lg font-bold">Formação acadêmica</h2><div className="mt-3 space-y-3">{profile.education.map((item) => <p key={item.course}><strong>{item.course}</strong><br />{item.institution} | {item.status}</p>)}</div></section>
          <section className="mt-7"><h2 className="text-lg font-bold">Idiomas e informações complementares</h2><p className="mt-3">{profile.languages}</p><p className="mt-2">{profile.additional}</p></section>
        </article>
      </main>
    </div>
  )
}
