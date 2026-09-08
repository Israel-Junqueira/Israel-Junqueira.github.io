import Link from "next/link"
import { GraduationCap } from "lucide-react"
import profile from "@/data/profile.json"

export function Education() {
  return (
    <section id="formacao" className="border-t py-16 md:py-20">
      <div className="container grid gap-10 md:grid-cols-2">
        <div><h2 className="text-3xl font-bold">Formação</h2><div className="mt-8 space-y-7">{profile.education.map((item) => <div key={item.course}><h3 className="text-xl font-semibold">{item.course}</h3><p className="mt-2 text-muted-foreground">{item.institution}</p><p className="mt-1 text-sm text-muted-foreground">{item.status}</p></div>)}</div></div>
        <div><h2 className="text-3xl font-bold">Aprendizado contínuo</h2><p className="mt-8 text-base leading-relaxed text-muted-foreground">{profile.languages}</p><p className="mt-4 text-base leading-relaxed text-muted-foreground">{profile.additional}</p><Link href="/knowleadge/index.html" className="mt-6 inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"><GraduationCap className="h-5 w-5" aria-hidden="true" />Acessar minha área de conhecimento</Link></div>
      </div>
    </section>
  )
}
