# Portfólio e currículo de Israel Ribeiro Junqueira

## Desenvolvimento

```sh
npm ci
npm run dev
```

## Atualizar o conteúdo

Os dados profissionais, as experiências, a formação e os estudos de caso estão em `data/profile.json`. Os componentes do site e o gerador do currículo usam esse arquivo.

- `experience`: descrição completa exibida no site.
- `resumeExperience`: tópicos com `area` e `description`, usados no PDF, na página do currículo e na seção de experiência.
- `resumeSkills`: competências com `area` e `description`, compartilhadas pelo PDF e pela página do currículo.
- `summary`: apresentação geral.
- Candidaturas específicas usam um JSON local em `output/candidatura/target.json`, com `target`, `targetSummary` e `filename`. Essa pasta não entra no Git.

## Gerar os PDFs

Requer Python 3, ReportLab e uma fonte Arial (Windows) ou DejaVu Sans (Linux).

```sh
python -m pip install reportlab
python scripts/build_resume.py
# Opcional: usar os dados locais de uma candidatura
python scripts/build_resume.py --target-profile output/candidatura/target.json
```

Saídas:

- `public/curriculo.pdf`: versão geral, publicada no site.
- `output/pdf/`: versões direcionadas, geradas apenas com `--target-profile`. A pasta `output/` fica somente no computador: é ignorada pelo Git e não é publicada pelo Next.js.

Revise visualmente os PDFs e confira a extração do texto após cada alteração. Não use percentuais ou resultados financeiros sem evidências.

## Verificar e publicar

```sh
npx tsc --noEmit --incremental false
npm run build
```

O GitHub Actions publica a pasta `out/` no GitHub Pages após um push para `main`. A área de conhecimento permanece em `public/knowleadge/`, preservando seu endereço atual.
