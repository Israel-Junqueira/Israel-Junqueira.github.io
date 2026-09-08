import profile from "@/data/profile.json"

export function Career() {
  return (
    <section id="experiencia" className="border-y bg-muted/40 py-16 md:py-20">
      <div className="container">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Experiência profissional</p>
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div><h2 className="text-3xl font-bold">Barracred</h2><p className="mt-3 text-lg">{profile.role}</p><p className="mt-3 text-muted-foreground">{profile.period} · {profile.location}</p></div>
          <ul className="max-w-3xl list-disc space-y-4 pl-5 text-base leading-relaxed text-muted-foreground marker:text-primary">
            {profile.resumeExperience.map((item) => <li key={item.area}><strong className="font-semibold text-foreground">{item.area}:</strong> {item.description}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
