import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react"

// Atalhos para os sites hospedados aqui mesmo (pasta public/)
// Use <a> e nao <Link>: sao paginas HTML estaticas, fora das rotas do Next.
const sites = [
  {
    href: "/meeting-copilot/",
    icon: Sparkles,
    tag: "Produto · Windows",
    title: "Meeting Copilot",
    description:
      "Copiloto de reunião que transcreve a conversa ao vivo e sugere a próxima fala com base no seu contexto. Invisível no compartilhamento de tela.",
    cta: "Conhecer o Meeting Copilot",
    accent: "from-blue-500/20 to-emerald-500/10",
    ring: "hover:ring-blue-400/50",
  },
  {
    href: "/knowleadge/index.html",
    icon: BookOpen,
    tag: "Projeto acadêmico · Web",
    title: "DevLearning",
    description:
      "Plataforma de tutoriais feita com HTML5, CSS3 e JavaScript puro, com formulários validados e layout responsivo.",
    cta: "Abrir o DevLearning",
    accent: "from-violet-500/20 to-sky-500/10",
    ring: "hover:ring-violet-400/50",
  },
]

export function Showcase() {
  return (
    <section id="sites" aria-labelledby="sites-titulo" className="bg-slate-950 pb-16 text-white md:pb-24">
      <div className="container">
        <h2 id="sites-titulo" className="mb-6 text-sm font-medium uppercase tracking-widest text-blue-300">
          Explore meus sites
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {sites.map(({ href, icon: Icon, tag, title, description, cta, accent, ring }) => (
            <a
              key={href}
              href={href}
              className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 ring-1 ring-transparent transition duration-300 hover:-translate-y-1 hover:border-slate-700 ${ring}`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-60 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-950/70">
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">{tag}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-slate-300">{description}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-semibold text-white">
                  {cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
