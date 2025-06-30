# Knowledge Arsenal - Guia de Uso e Manutenção

## 📋 Visão Geral

O Knowledge Arsenal é um sistema modular para organização e apresentação de conhecimentos técnicos. Este guia explica como usar, atualizar e expandir o sistema.

## 🔧 Como Atualizar Estatísticas

### Método 1: Usando o Console do Navegador

\`\`\`javascript
// Atualizar estatísticas principais
updateStats(200, 35, 18) // (artigos, projetos, tecnologias)

// Verificar configuração atual
console.log(KnowledgeConfig.stats)
\`\`\`

### Método 2: Editando o arquivo config.js

Abra o arquivo `js/config.js` e modifique a seção `stats`:

\`\`\`javascript
stats: {
  articles: 200,    // ← Altere aqui
  projects: 35,     // ← Altere aqui  
  technologies: 18  // ← Altere aqui
}
\`\`\`

## 📝 Como Adicionar Nova Categoria

### 1. Criar nova entrada no config.js

\`\`\`javascript
// Adicionar em KnowledgeConfig.categories
newcategory: {
  name: "Nova Categoria",
  icon: "🆕",
  description: "Descrição da categoria",
  count: 10,
  color: "#ff6b6b",
  page: "nova-categoria.html"
}
\`\`\`

### 2. Criar arquivo HTML da categoria

Copie um dos arquivos existentes (ex: `frontend.html`) e renomeie para `nova-categoria.html`.

### 3. Atualizar index.html

Adicione o card da categoria na seção `knowledge-categories`:

\`\`\`html
<div class="category-card" data-category="newcategory" onclick="window.location.href='nova-categoria.html'">
    <div class="category-icon">🆕</div>
    <h3>Nova Categoria</h3>
    <p>Descrição da categoria</p>
    <span class="category-count">10 itens</span>
</div>
\`\`\`

## 🎯 Como Adicionar Nova Competência

### Usando JavaScript no console:

\`\`\`javascript
// Adicionar nova categoria de skill
addSkill("Nova Categoria", { name: "Nova Skill", level: 85 })

// Verificar skills atuais
console.log(KnowledgeConfig.skills)
\`\`\`

### Editando config.js diretamente:

\`\`\`javascript
skills: {
  "Nova Categoria": [
    { name: "Skill 1", level: 90 },
    { name: "Skill 2", level: 85 }
  ]
}
\`\`\`

## 📄 Estrutura de Arquivos

\`\`\`
knowledge/
├── index.html              # Página principal
├── sobre.html              # Página sobre
├── projetos.html           # Página de projetos
├── contato.html            # Página de contato
├── frontend.html           # Categoria Frontend
├── backend.html            # Categoria Backend
├── database.html           # Categoria Banco de Dados
├── devops.html             # Categoria DevOps
├── mobile.html             # Categoria Mobile
├── architecture.html       # Categoria Arquitetura
├── css/
│   ├── style.css           # Estilos principais
│   ├── responsive.css      # Responsividade
│   ├── animations.css      # Animações
│   ├── knowledge.css       # Estilos específicos
│   └── category.css        # Estilos das categorias
└── js/
    ├── config.js           # Configurações centrais
    ├── main.js             # Funcionalidades principais
    ├── knowledge.js        # Funcionalidades específicas
    └── category.js         # Funcionalidades das categorias
\`\`\`

## 🔄 Como Adicionar Novo Artigo

### 1. Edite a página da categoria correspondente

Adicione um novo `article-card` na seção `articles-grid`:

\`\`\`html
<article class="article-card" data-tech="tecnologia" data-level="nivel">
    <div class="article-header">
        <span class="article-tech">Tecnologia</span>
        <span class="article-level nivel">Nível</span>
    </div>
    <h3>Título do Artigo</h3>
    <p>Descrição do artigo...</p>
    <div class="article-meta">
        <span class="read-time">X min</span>
        <span class="article-date">Data</span>
    </div>
</article>
\`\`\`

### 2. Atualize o contador da categoria

No `index.html`, atualize o `category-count` da categoria correspondente.

## 🎨 Personalização de Cores

### Variáveis CSS principais (em style.css):

\`\`\`css
:root {
  --primary-color: #2563eb;      /* Cor principal */
  --primary-dark: #1d4ed8;       /* Cor principal escura */
  --secondary-color: #64748b;    /* Cor secundária */
  --accent-color: #f59e0b;       /* Cor de destaque */
  --success-color: #10b981;      /* Cor de sucesso */
  --error-color: #ef4444;        /* Cor de erro */
}
\`\`\`

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px  
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🔍 Funcionalidades Implementadas

### ✅ Página Principal
- Hero section com estatísticas animadas
- Cards de categorias clicáveis
- Timeline de adições recentes
- Ícones flutuantes (corrigido overflow)

### ✅ Páginas de Categoria
- Filtros por tecnologia e nível
- Artigos organizados por cards
- Exemplos de código com botão copiar
- Barra de progresso de leitura
- Funcionalidade de busca

### ✅ Sistema Modular
- Configuração centralizada em config.js
- Funções utilitárias para atualizações
- Estrutura CSS organizada
- JavaScript modular

### ✅ Acessibilidade
- Navegação por teclado
- ARIA labels
- Contraste adequado
- Foco visível

## 🚀 Próximos Passos Sugeridos

1. **Sistema de Busca Global**: Implementar busca entre todas as categorias
2. **Modo Escuro**: Adicionar toggle para tema escuro
3. **Blog Section**: Criar seção de blog com artigos completos
4. **PWA**: Transformar em Progressive Web App
5. **GitHub Integration**: Integrar com API do GitHub para mostrar repositórios

## 🐛 Solução de Problemas

### Ícones flutuantes saindo da tela
✅ **Corrigido**: Adicionado `overflow: hidden` e reposicionamento dos cards

### Timeline com datas sobrepostas
✅ **Corrigido**: Ajustado posicionamento das datas e bolinhas

### Scroll horizontal indesejado
✅ **Corrigido**: Limitada largura máxima dos elementos flutuantes

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador para erros
2. Consulte este README
3. Teste as funções utilitárias no console
4. Verifique a estrutura de arquivos

---

**Última atualização**: Dezembro 2024
**Versão**: 2.0.0
