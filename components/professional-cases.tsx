import profile from "@/data/profile.json"

export function ProfessionalCases() {
  return (
    <section id="entregas" className="py-16 md:py-20">
      <div className="container">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Trabalho na prática</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Três entregas, problemas reais.</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">Integrações e automações desenvolvidas no contexto de cooperativa de crédito.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {profile.cases.map((item) => (
            <article key={item.id} className="flex flex-col rounded-xl border bg-card p-6 text-card-foreground md:p-8">
              <p className="text-sm text-muted-foreground"><span className="mr-2 font-mono text-primary">{item.id}</span>{item.category}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <dl className="mt-6 space-y-5 text-base leading-relaxed">
                <div><dt className="font-semibold">O problema</dt><dd className="mt-1 text-muted-foreground">{item.context}</dd></div>
                <div><dt className="font-semibold">Minha atuação</dt><dd className="mt-1 text-muted-foreground">{item.action}</dd></div>
                <div><dt className="font-semibold">Resultado</dt><dd className="mt-1 text-muted-foreground">{item.result}</dd></div>
              </dl>
              <details className="mt-6 border-t pt-4"><summary className="cursor-pointer text-sm font-medium text-primary">Detalhes técnicos</summary><p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.details}</p></details>
              <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Tecnologias">{item.tags.map((tag) => <li key={tag} className="rounded-md bg-muted px-2.5 py-1 text-sm">{tag}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
