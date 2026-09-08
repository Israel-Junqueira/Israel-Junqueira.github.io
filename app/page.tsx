import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Career } from "@/components/career"
import { ProfessionalCases } from "@/components/professional-cases"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Education } from "@/components/education"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (<><Header /><main id="conteudo"><Hero /><About /><Career /><ProfessionalCases /><Skills /><Projects /><Education /><Contact /></main><Footer /></>)
}
