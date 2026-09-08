import profile from "@/data/profile.json"

export function About() {
  return (
    <section id="sobre" className="py-16 md:py-20">
      <div className="container grid gap-6 md:grid-cols-[1fr_2fr]">
        <h2 className="text-3xl font-bold tracking-tight">Software conectado<br className="hidden md:block" /> ao negócio.</h2>
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>{profile.summary}</p>
          <p>Trabalho a partir dos requisitos compartilhados pelo PO e da leitura de documentação técnica. Acompanho as entregas junto à operação, verificando logs, integrações e comportamento das aplicações nos diferentes ambientes.</p>
          <p>Curso Engenharia de Software e tenho interesse em aplicar minha experiência em novos setores, incluindo sistemas laboratoriais, com foco em aprender o domínio e resolver problemas de integração e dados.</p>
        </div>
      </div>
    </section>
  )
}
