import { Card, CardContent } from "@/components/ui/card";
export function About() {
  return (
    <section id="sobre" className="py-20 bg-gray-50 section-pattern">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Sobre Mim
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              "Mais do que código, escrevo soluções com propósito."
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Card className="p-8 shadow-lg border-0">
                <CardContent className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-300 mb-4">
                    Caminho Profissional e Pessoal
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    Sou Técnico em Informática pela ETEC Comendador João Rays e atualmente curso Engenharia de Software na UNICESUMAR, ampliando minha base técnica e estratégica.
                  </p>
                  
                  <p className="text-gray-400 leading-relaxed">
                    Acredito em equipes que compartilham conhecimento, se respeitam e crescem juntas. Gosto de ambientes colaborativos e valorizo o reconhecimento pelo esforço.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Sou detalhista com regras de negócio, faço perguntas e busco compreender bem antes de desenvolver, sempre visando qualidade e assertividade.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Tenho interesse em evoluir como pessoa e profissional, aprendendo com quem me rodeia e contribuindo com o máximo que posso.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="animate-fade-in-up space-y-6">
              <Card className="p-6 border-l-4 border-l-primary">
                <CardContent>
                  <h4 className="font-semibold text-gray-300 mb-2">Filosofia de Trabalho</h4>
                  <p className="text-gray-400">
                    Acredito que trabalhar com propósito, técnica, empatia e a chave para evolução interior.
                    Compartilhar conhecimento, escutar com humildade e construir com intenção são princípios que carrego.
                    Valorizo o cuidado com os detalhes e o impacto do que desenvolvo no todo.
                    Crescer, pra mim, é evoluir como pessoa enquanto contribuo com o coletivo.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-secondary">
                <CardContent className="space-y-6">
                  <h4 className="font-semibold text-gray-300 mb-2">Especialização</h4>
                  
                  <p className="text-gray-400 leading-relaxed" >
                    Atuo com foco em desenvolvimento backend, utilizando C# e .NET para construção de APIs RESTful robustas e escaláveis. 
                  </p>    

                  <p className="text-gray-400 leading-relaxed">Tenho especialização prática em sistemas financeiros, especialmente voltados para cooperativas de crédito, aplicando padrões como Clean Architecture, DDD e princípios SOLID.</p>

                  <p className="text-gray-400 leading-relaxed">Também possuo experiência com consultas e rotinas em PL/SQL Oracle, integração de serviços legados (SOA), versionamento com Git/Gitflow e automações via Azure DevOps. 
                      Busco continuamente aprimorar minha arquitetura de software e visão estratégica de produto.
                  </p>
                  
                </CardContent>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-accent">
                <CardContent>
                  <h4 className="font-semibold text-gray-300 mb-2">Objetivo</h4>
                  <p className="text-gray-400">
                    Contribuir para projetos que impactem positivamente a vida das pessoas através da tecnologia.
                    Busco desafios que me tirem da zona de conforto, onde eu possa evoluir como profissional e ser reconhecido como alguém que domina o código, entende o negócio e soma de verdade com o time.

                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
