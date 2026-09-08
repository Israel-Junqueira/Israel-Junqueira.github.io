import profile from "@/data/profile.json"

export function Skills() {
  return (
    <section id="habilidades" className="border-y bg-muted/40 py-16 md:py-20">
      <div className="container">
        <h2 className="text-3xl font-bold md:text-4xl">Competências técnicas</h2>
        <p className="mt-4 text-lg text-muted-foreground">Ferramentas e práticas aplicadas no desenvolvimento e na evolução dos sistemas.</p>
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((skill) => <div key={skill.title}><h3 className="text-xl font-semibold">{skill.title}</h3><p className="mt-3 text-sm font-medium text-primary">{skill.tools}</p><p className="mt-3 text-base leading-relaxed text-muted-foreground">{skill.description}</p></div>)}
        </div>
      </div>
    </section>
  )
}
