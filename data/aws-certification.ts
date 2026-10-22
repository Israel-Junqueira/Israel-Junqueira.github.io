export type AwsTopic = {
  id: string
  title: string
  eyebrow: string
  domain: string
  summary: string
  solves: string[]
  keywords: string[]
  related: string[]
  status: "studied" | "next" | "planned"
}

export type AwsDomain = {
  id: string
  label: string
  icon: string
  description: string
}

export const awsDomains: AwsDomain[] = [
  { id: "databases", label: "Bancos de dados", icon: "◈", description: "Escolha o banco pelo modelo e pela carga." },
  { id: "analytics", label: "Analytics", icon: "◌", description: "Do data lake ao dashboard." },
  { id: "deployment", label: "Deploy e infraestrutura", icon: "⌁", description: "Provisionamento, entrega e operação." },
  { id: "code-services", label: "AWS Code Services", icon: "</>", description: "Leve o código do repositório à produção." },
]

export const awsTopics: AwsTopic[] = [
  {
    id: "rds",
    title: "Amazon RDS",
    eyebrow: "Relacional · OLTP",
    domain: "databases",
    summary: "Banco relacional gerenciado para engines SQL conhecidas, com backups, monitoramento e opções de alta disponibilidade.",
    solves: ["Administrar o servidor do banco", "Reduzir indisponibilidade", "Centralizar dados transacionais"],
    keywords: ["SQL", "Multi-AZ", "Read Replica", "backup", "OLTP"],
    related: ["aurora", "dms", "glue"],
    status: "studied",
  },
  {
    id: "aurora",
    title: "Amazon Aurora",
    eyebrow: "Relacional · Cloud-native",
    domain: "databases",
    summary: "Banco relacional da AWS compatível com MySQL e PostgreSQL, com cluster, writer, readers e armazenamento distribuído.",
    solves: ["Escalar leitura relacional", "Aumentar disponibilidade", "Atender aplicações globais"],
    keywords: ["MySQL", "PostgreSQL", "Reader endpoint", "Global Database"],
    related: ["rds", "dms", "quicksight"],
    status: "studied",
  },
  {
    id: "dynamodb",
    title: "Amazon DynamoDB",
    eyebrow: "NoSQL · Serverless",
    domain: "databases",
    summary: "Banco NoSQL de chave-valor e documentos para grande escala e baixa latência, sem gerenciar servidores.",
    solves: ["Escalar dados de chave-valor", "Atender picos de acesso", "Reduzir administração operacional"],
    keywords: ["NoSQL", "chave-valor", "documento", "serverless"],
    related: ["dax", "documentdb", "elasticache"],
    status: "studied",
  },
  {
    id: "elasticache",
    title: "Amazon ElastiCache",
    eyebrow: "Cache · Memória",
    domain: "databases",
    summary: "Cache gerenciado em memória para reduzir latência e retirar leituras repetidas do banco principal.",
    solves: ["Consultas repetidas", "Latência alta", "Sobrecarga no banco"],
    keywords: ["Valkey", "Redis OSS", "Memcached", "cache-aside"],
    related: ["dynamodb", "dax", "rds"],
    status: "studied",
  },
  {
    id: "dax",
    title: "Amazon DAX",
    eyebrow: "Cache · DynamoDB",
    domain: "databases",
    summary: "Cache em memória criado especificamente para acelerar leituras repetidas do DynamoDB.",
    solves: ["Leituras repetidas no DynamoDB", "Latência de microssegundos"],
    keywords: ["DynamoDB", "microssegundos", "cache"],
    related: ["dynamodb", "elasticache"],
    status: "studied",
  },
  {
    id: "athena",
    title: "Amazon Athena",
    eyebrow: "Analytics · Serverless",
    domain: "analytics",
    summary: "Executa SQL diretamente sobre arquivos armazenados no Amazon S3, sem provisionar um data warehouse.",
    solves: ["Consultar arquivos no S3", "Análise ad hoc", "Evitar infraestrutura de consulta"],
    keywords: ["SQL", "S3", "serverless", "Data Catalog"],
    related: ["glue", "s3", "redshift", "quicksight"],
    status: "studied",
  },
  {
    id: "glue",
    title: "AWS Glue",
    eyebrow: "Analytics · ETL",
    domain: "analytics",
    summary: "Serviço serverless de ETL, descoberta de schemas e catálogo de dados para pipelines analíticos.",
    solves: ["Preparar dados", "Descobrir schemas", "Catalogar tabelas"],
    keywords: ["ETL", "Crawler", "Data Catalog", "serverless"],
    related: ["athena", "s3", "redshift", "emr"],
    status: "studied",
  },
  {
    id: "redshift",
    title: "Amazon Redshift",
    eyebrow: "Analytics · OLAP",
    domain: "analytics",
    summary: "Data warehouse gerenciado para consultas analíticas, agregações, relatórios e BI em grande volume.",
    solves: ["Analisar históricos", "Executar agregações", "Servir workloads OLAP"],
    keywords: ["OLAP", "data warehouse", "SQL", "BI"],
    related: ["glue", "athena", "quicksight"],
    status: "studied",
  },
  {
    id: "quicksight",
    title: "Amazon QuickSight",
    eyebrow: "Analytics · BI",
    domain: "analytics",
    summary: "Cria análises, gráficos e dashboards interativos a partir de fontes como Athena, Redshift, RDS e S3.",
    solves: ["Transformar dados em decisões", "Criar dashboards", "Compartilhar indicadores"],
    keywords: ["BI", "dashboard", "SPICE", "visualização"],
    related: ["athena", "redshift", "glue"],
    status: "studied",
  },
  {
    id: "cloudformation",
    title: "AWS CloudFormation",
    eyebrow: "Deploy · IaC",
    domain: "deployment",
    summary: "Define e provisiona infraestrutura como código por meio de templates e stacks.",
    solves: ["Criação manual de recursos", "Ambientes inconsistentes", "Repetição de infraestrutura"],
    keywords: ["Infrastructure as Code", "template", "stack", "provisionamento"],
    related: ["cdk", "codepipeline", "elastic-beanstalk"],
    status: "studied",
  },
  {
    id: "elastic-beanstalk",
    title: "Elastic Beanstalk",
    eyebrow: "Deploy · PaaS",
    domain: "deployment",
    summary: "Simplifica a implantação de aplicações enquanto a AWS provisiona o ambiente necessário.",
    solves: ["Configurar ambiente de aplicação", "Implantar sem operar tudo manualmente"],
    keywords: ["PaaS", "EC2", "load balancer", "autoscaling"],
    related: ["cloudformation", "codedeploy"],
    status: "studied",
  },
  {
    id: "systems-manager",
    title: "AWS Systems Manager",
    eyebrow: "Operação · Servidores",
    domain: "deployment",
    summary: "Administra servidores em escala com Run Command, Patch Manager, parâmetros e automações.",
    solves: ["Executar comandos em escala", "Aplicar patches", "Padronizar operação"],
    keywords: ["SSM", "Run Command", "Patch Manager", "EC2"],
    related: ["codedeploy", "cloudformation"],
    status: "studied",
  },
  {
    id: "codecommit",
    title: "AWS CodeCommit",
    eyebrow: "Code Services · Git",
    domain: "code-services",
    summary: "Repositório Git privado para armazenar e colaborar em código-fonte.",
    solves: ["Versionar código", "Colaborar em repositórios privados"],
    keywords: ["Git", "repositório", "source control"],
    related: ["codebuild", "codepipeline"],
    status: "studied",
  },
  {
    id: "codebuild",
    title: "AWS CodeBuild",
    eyebrow: "Code Services · Build",
    domain: "code-services",
    summary: "Compila código, executa testes e gera artefatos em um ambiente gerenciado.",
    solves: ["Manter servidor de build", "Automatizar testes", "Gerar artefatos"],
    keywords: ["build", "testes", "artefatos", "CI"],
    related: ["codecommit", "codepipeline", "codeartifact"],
    status: "studied",
  },
  {
    id: "codedeploy",
    title: "AWS CodeDeploy",
    eyebrow: "Code Services · Deploy",
    domain: "code-services",
    summary: "Automatiza a entrega de novas versões para destinos como EC2 e servidores locais.",
    solves: ["Atualizar aplicações em servidores", "Reduzir erro manual no deploy"],
    keywords: ["deploy", "EC2", "on-premises", "pipeline"],
    related: ["codebuild", "codepipeline", "elastic-beanstalk"],
    status: "studied",
  },
  {
    id: "codepipeline",
    title: "AWS CodePipeline",
    eyebrow: "Code Services · Orquestração",
    domain: "code-services",
    summary: "Coordena as etapas de entrega: origem, build, testes e implantação.",
    solves: ["Orquestrar CI/CD", "Conectar serviços de entrega", "Automatizar o fluxo até produção"],
    keywords: ["pipeline", "CI/CD", "source", "build", "deploy"],
    related: ["codecommit", "codebuild", "codedeploy"],
    status: "studied",
  },
  {
    id: "codeartifact",
    title: "AWS CodeArtifact",
    eyebrow: "Code Services · Pacotes",
    domain: "code-services",
    summary: "Armazena e distribui pacotes e dependências para aplicações e processos de build.",
    solves: ["Distribuir bibliotecas internas", "Controlar dependências"],
    keywords: ["npm", "NuGet", "pacotes", "dependências"],
    related: ["codebuild", "codepipeline"],
    status: "studied",
  },
  {
    id: "cdk",
    title: "AWS CDK",
    eyebrow: "Deploy · Código",
    domain: "deployment",
    summary: "Define infraestrutura usando linguagens de programação e sintetiza templates CloudFormation.",
    solves: ["Descrever infraestrutura com abstrações", "Reutilizar padrões de infraestrutura"],
    keywords: ["TypeScript", "Python", "CloudFormation", "constructs"],
    related: ["cloudformation", "codepipeline"],
    status: "studied",
  },
]

export const awsEdges = [
  ["rds", "aurora"], ["rds", "dms"], ["rds", "glue"], ["aurora", "quicksight"],
  ["dynamodb", "dax"], ["dynamodb", "elasticache"], ["athena", "glue"], ["athena", "redshift"],
  ["glue", "redshift"], ["glue", "quicksight"], ["cloudformation", "cdk"],
  ["cloudformation", "elastic-beanstalk"], ["codecommit", "codebuild"], ["codebuild", "codepipeline"],
  ["codepipeline", "codedeploy"], ["codebuild", "codeartifact"],
] as const

export type AwsConnection = {
  from: string
  to: string
  title: string
  how: string
  example: string
  useCases: string[]
}

export const awsConnections: AwsConnection[] = [
  { from: "rds", to: "aurora", title: "RDS e Aurora: banco relacional gerenciado", how: "A aplicação usa o endpoint do RDS ou do cluster Aurora para executar transações SQL. Aurora é a opção cloud-native compatível com MySQL e PostgreSQL.", example: "Uma API de pedidos grava clientes e pedidos no Aurora; uma aplicação menor pode usar RDS PostgreSQL com Multi-AZ.", useCases: ["OLTP", "transações", "joins", "integridade referencial"] },
  { from: "rds", to: "dms", title: "RDS + DMS: migração com pouco downtime", how: "O DMS faz a carga inicial do banco de origem e replica mudanças com CDC até o destino ficar pronto para a virada.", example: "Migrar PostgreSQL on-premises para Amazon RDS PostgreSQL mantendo a aplicação funcionando durante a cópia inicial.", useCases: ["migração", "CDC", "cutover", "disaster recovery"] },
  { from: "rds", to: "glue", title: "RDS + Glue: banco operacional para analytics", how: "O Glue extrai dados do RDS, transforma registros e os envia para um data lake ou warehouse sem sobrecarregar as consultas transacionais.", example: "Extrair pedidos do RDS todas as noites, particionar por data no S3 e preparar tabelas para Athena.", useCases: ["ETL", "relatórios", "data lake", "OLTP para OLAP"] },
  { from: "aurora", to: "quicksight", title: "Aurora + QuickSight: dados relacionais em dashboards", how: "O QuickSight consulta ou recebe dados preparados do Aurora para criar indicadores e visualizações para o negócio.", example: "Dashboard de pedidos por região conectado a uma camada analítica derivada do Aurora.", useCases: ["BI", "indicadores", "dashboards", "relatórios"] },
  { from: "dynamodb", to: "dax", title: "DynamoDB + DAX: leituras em microssegundos", how: "A aplicação usa o endpoint compatível do DAX; leituras repetidas são atendidas pela memória e o DynamoDB continua como banco principal.", example: "Uma tabela de sessões ou catálogo recebe muitas leituras repetidas durante um pico de tráfego.", useCases: ["leitura intensa", "catálogo", "sessões", "baixa latência"] },
  { from: "dynamodb", to: "elasticache", title: "DynamoDB + ElastiCache: cache com lógica própria", how: "O ElastiCache pode guardar respostas, sessões ou estruturas temporárias que não precisam ser modeladas como itens do DynamoDB.", example: "DynamoDB mantém o perfil permanente e ElastiCache mantém a sessão ativa e o ranking do usuário.", useCases: ["sessões", "ranking", "respostas temporárias", "cache geral"] },
  { from: "athena", to: "glue", title: "Athena + Glue: SQL sobre dados catalogados", how: "O Crawler e o Data Catalog do Glue descrevem os arquivos; o Athena usa esses metadados para executar SQL no S3.", example: "O crawler descobre arquivos Parquet de vendas e o analista consulta por região usando Athena.", useCases: ["SQL no S3", "ad hoc", "catalogação", "Parquet"] },
  { from: "athena", to: "redshift", title: "Athena e Redshift: consulta no lake versus warehouse", how: "Athena consulta arquivos diretamente no S3; Redshift mantém dados estruturados em um warehouse otimizado para análises recorrentes.", example: "Athena explora logs brutos; Redshift atende o dashboard financeiro diário.", useCases: ["data lake", "OLAP", "exploração", "BI"] },
  { from: "glue", to: "redshift", title: "Glue + Redshift: pipeline analítico", how: "O Glue limpa e transforma dados de várias fontes e carrega tabelas analíticas no Redshift.", example: "Unificar pedidos, clientes e pagamentos em tabelas dimensionais para relatórios.", useCases: ["ETL", "warehouse", "agregações", "modelagem dimensional"] },
  { from: "glue", to: "quicksight", title: "Glue + QuickSight: preparar antes de visualizar", how: "O Glue organiza e padroniza os dados; o QuickSight consome o resultado para análises e dashboards.", example: "Normalizar nomes de regiões antes de exibir vendas por estado no dashboard.", useCases: ["qualidade de dados", "BI", "dashboards", "governança"] },
  { from: "cloudformation", to: "cdk", title: "CloudFormation + CDK: infraestrutura com abstrações", how: "O CDK permite escrever infraestrutura em TypeScript, Python ou Java e sintetiza templates que o CloudFormation provisiona.", example: "Definir uma VPC, três EC2 e um RDS em código reutilizável.", useCases: ["Infrastructure as Code", "templates", "ambientes repetíveis", "provisionamento"] },
  { from: "cloudformation", to: "elastic-beanstalk", title: "CloudFormation + Elastic Beanstalk: ambiente pronto", how: "O Beanstalk simplifica a implantação da aplicação e usa recursos AWS; CloudFormation é a opção explícita para controlar a infraestrutura como código.", example: "Publicar uma aplicação Node.js rapidamente e depois controlar recursos complementares com CloudFormation.", useCases: ["PaaS", "deploy web", "ambientes", "autoscaling"] },
  { from: "codecommit", to: "codebuild", title: "CodeCommit + CodeBuild: código para artefato", how: "Uma alteração no repositório pode disparar o CodeBuild para instalar dependências, executar testes e gerar um artefato.", example: "Push na branch main inicia testes npm e cria um pacote da aplicação.", useCases: ["CI", "Git", "testes", "build"] },
  { from: "codebuild", to: "codepipeline", title: "CodeBuild dentro do CodePipeline", how: "O CodePipeline orquestra as etapas; o CodeBuild executa a etapa de compilação e testes.", example: "Pipeline detecta commit, chama CodeBuild, publica artefato e libera a próxima etapa.", useCases: ["CI/CD", "pipeline", "automação", "artefatos"] },
  { from: "codepipeline", to: "codedeploy", title: "CodePipeline + CodeDeploy: entregar a versão", how: "Depois do build e dos testes, o CodePipeline aciona o CodeDeploy para instalar a versão nos destinos configurados.", example: "Implantar a versão 2.0 em várias instâncias EC2 usando estratégia de deployment.", useCases: ["CD", "EC2", "produção", "rollback"] },
  { from: "codebuild", to: "codeartifact", title: "CodeBuild + CodeArtifact: dependências privadas", how: "O build baixa pacotes internos do CodeArtifact e pode publicar novos artefatos para outros projetos.", example: "Uma biblioteca npm privada é consumida por cinco aplicações durante o build.", useCases: ["npm", "NuGet", "dependências", "bibliotecas internas"] },
]

export type AwsGlossaryTerm = {
  term: string
  short: string
  definition: string
  whyItMatters: string
  example: string
  related: string[]
}

export const awsGlossary: AwsGlossaryTerm[] = [
  { term: "DMS", short: "Database Migration Service", definition: "Serviço gerenciado para migrar bancos de dados entre ambientes, como on-premises e AWS, ou entre engines diferentes.", whyItMatters: "Resolve migrações com menos trabalho manual e pode manter a origem funcionando enquanto as mudanças são replicadas.", example: "Migrar PostgreSQL on-premises para RDS e usar CDC até o momento do cutover.", related: ["RDS", "CDC", "cutover"] },
  { term: "CDC", short: "Change Data Capture", definition: "Técnica que captura apenas as alterações feitas na origem depois da carga inicial.", whyItMatters: "Reduz a janela de indisponibilidade durante migrações e mantém origem e destino sincronizados.", example: "O DMS copia o histórico primeiro e depois replica INSERT, UPDATE e DELETE com CDC.", related: ["DMS", "cutover"] },
  { term: "cutover", short: "Virada para o destino", definition: "Momento planejado em que a aplicação deixa de usar a origem e passa a usar o banco de destino.", whyItMatters: "É a etapa final de uma migração; um bom planejamento reduz downtime e risco de perda de dados.", example: "Após validar a replicação do DMS, alterar a string de conexão para o RDS e concluir o cutover.", related: ["DMS", "CDC"] },
  { term: "OLTP", short: "Online Transaction Processing", definition: "Processamento de transações do dia a dia, com muitas operações pequenas de leitura e escrita.", whyItMatters: "Indica bancos operacionais como RDS, Aurora e DynamoDB, focados na aplicação em funcionamento.", example: "Registrar um pedido, atualizar estoque e confirmar pagamento são operações OLTP.", related: ["RDS", "Aurora", "SQL"] },
  { term: "OLAP", short: "Online Analytical Processing", definition: "Processamento analítico de grandes volumes históricos para agregações, relatórios e descoberta de tendências.", whyItMatters: "Indica workloads de analytics, normalmente atendidos por Redshift, Athena e QuickSight.", example: "Calcular vendas por região nos últimos três anos é uma consulta OLAP.", related: ["Redshift", "Athena", "BI"] },
  { term: "cluster", short: "Grupo coordenado de recursos", definition: "Conjunto de servidores ou nós que trabalham juntos como uma unidade lógica.", whyItMatters: "Clusters podem aumentar disponibilidade, distribuir carga e separar funções de leitura e escrita.", example: "Um cluster Aurora possui um writer e pode ter vários readers.", related: ["Aurora", "Reader", "alta disponibilidade"] },
  { term: "serverless", short: "Sem gerenciamento de servidores", definition: "Modelo em que a AWS gerencia a infraestrutura; você se concentra no uso do serviço e paga conforme a utilização ou configuração.", whyItMatters: "Reduz operações, provisionamento e capacidade ociosa, mas não significa custo zero nem ausência de infraestrutura.", example: "Athena consulta dados no S3 sem criar um servidor de consulta.", related: ["Athena", "Glue", "DynamoDB"] },
  { term: "ETL", short: "Extract, Transform, Load", definition: "Processo de extrair dados de fontes, transformá-los e carregá-los em um destino analítico.", whyItMatters: "Prepara dados operacionais para consultas, relatórios e dashboards.", example: "Glue extrai pedidos do RDS, normaliza os campos e carrega arquivos no S3.", related: ["Glue", "RDS", "S3"] },
  { term: "SQL", short: "Structured Query Language", definition: "Linguagem usada para consultar e manipular dados em bancos relacionais e serviços analíticos compatíveis.", whyItMatters: "É uma pista comum na prova para RDS, Aurora, Redshift e Athena.", example: "SELECT vendas FROM tabela WHERE regiao = 'Sul';", related: ["RDS", "Aurora", "Redshift", "Athena"] },
  { term: "NoSQL", short: "Bancos não relacionais", definition: "Categoria de bancos que não depende do modelo tradicional de tabelas relacionais e joins.", whyItMatters: "É escolhida para escala, flexibilidade de schema e baixa latência, como DynamoDB e DocumentDB.", example: "DynamoDB armazena itens de chave-valor ou documentos sem exigir schema relacional rígido.", related: ["DynamoDB", "DocumentDB"] },
  { term: "cache", short: "Cópia temporária de acesso rápido", definition: "Camada que mantém dados frequentemente usados em memória para evitar consultas repetidas ao armazenamento principal.", whyItMatters: "Diminui latência e carga no banco, mas exige estratégia de expiração e atualização.", example: "ElastiCache mantém sessões e respostas populares em memória.", related: ["ElastiCache", "DAX", "cache-aside"] },
  { term: "data lake", short: "Repositório de dados em formato bruto", definition: "Armazenamento central que guarda dados estruturados e não estruturados, frequentemente no Amazon S3.", whyItMatters: "Permite guardar dados antes de decidir todo o modelo e explorá-los com Athena, Glue ou EMR.", example: "Logs brutos são armazenados no S3 e consultados pelo Athena.", related: ["S3", "Athena", "Glue"] },
  { term: "data warehouse", short: "Armazém analítico estruturado", definition: "Banco otimizado para consultas analíticas, agregações e relatórios sobre dados organizados.", whyItMatters: "Ajuda a diferenciar Redshift de um banco OLTP ou de um data lake bruto.", example: "Redshift consolida vendas e dimensões para dashboards financeiros.", related: ["Redshift", "OLAP", "BI"] },
  { term: "BI", short: "Business Intelligence", definition: "Prática de transformar dados em indicadores, relatórios e decisões para o negócio.", whyItMatters: "QuickSight é o serviço AWS mais associado à visualização e dashboards de BI.", example: "Um dashboard de margem por produto é uma saída de BI.", related: ["QuickSight", "dashboard", "OLAP"] },
  { term: "IaC", short: "Infrastructure as Code", definition: "Definição de infraestrutura em arquivos ou código versionável, em vez de criação manual no console.", whyItMatters: "Torna ambientes repetíveis, auditáveis e automatizáveis com CloudFormation ou CDK.", example: "CDK define uma VPC em TypeScript e gera um template CloudFormation.", related: ["CloudFormation", "CDK", "template"] },
  { term: "pipeline", short: "Fluxo automatizado de entrega", definition: "Sequência de etapas que leva uma alteração de código por build, testes e implantação.", whyItMatters: "CodePipeline coordena o fluxo, enquanto CodeBuild e CodeDeploy executam etapas específicas.", example: "Um commit dispara build, testes e deploy em EC2.", related: ["CodePipeline", "CI/CD", "deploy"] },
  { term: "CI/CD", short: "Continuous Integration / Continuous Delivery", definition: "Práticas de integrar mudanças frequentemente, testar automaticamente e entregar versões com segurança.", whyItMatters: "Relaciona CodeCommit, CodeBuild, CodePipeline e CodeDeploy em uma cadeia de entrega.", example: "Cada push executa testes e publica uma versão aprovada.", related: ["CodeBuild", "CodePipeline", "CodeDeploy"] },
  { term: "schema", short: "Estrutura dos dados", definition: "Descrição dos campos, tipos e organização esperada de um conjunto de dados.", whyItMatters: "Glue Crawlers descobrem schemas e o Data Catalog registra metadados para Athena e outros consumidores.", example: "O crawler identifica que a coluna amount é numérica em arquivos Parquet.", related: ["Glue", "Data Catalog", "Crawler"] },
  { term: "Reader", short: "Instância de leitura", definition: "Nó ou endpoint usado para distribuir consultas de leitura sem receber as escritas principais.", whyItMatters: "Réplicas de leitura ajudam a escalar consultas e preservar o writer para transações.", example: "A aplicação envia SELECTs ao reader endpoint do Aurora.", related: ["Aurora", "Read Replica", "OLTP"] },
]


