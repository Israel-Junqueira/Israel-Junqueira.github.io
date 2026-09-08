"""Generate the public resume and an optional private application resume.
Requires Python 3 and reportlab. Run: python scripts/build_resume.py
"""
from pathlib import Path
from xml.sax.saxutils import escape
import argparse
import json
import os
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--output-root', type=Path, default=ROOT)
parser.add_argument('--target-profile', type=Path, help='Local JSON with target, targetSummary and filename; keep outside version control.')
args = parser.parse_args()
target_profile = json.loads(args.target_profile.read_text(encoding='utf-8')) if args.target_profile else None
profile = json.loads((ROOT / 'data/profile.json').read_text(encoding='utf-8'))
# Embed a Unicode font so that Portuguese text remains selectable and extractable.
font_roots = [Path(os.environ.get('WINDIR', 'C:/Windows')) / 'Fonts', Path('/usr/share/fonts/truetype/dejavu')]
for directory in font_roots:
    regular = next((directory / name for name in ['arial.ttf', 'DejaVuSans.ttf'] if (directory / name).exists()), None)
    bold = next((directory / name for name in ['arialbd.ttf', 'DejaVuSans-Bold.ttf'] if (directory / name).exists()), None)
    if regular and bold:
        pdfmetrics.registerFont(TTFont('Resume', str(regular)))
        pdfmetrics.registerFont(TTFont('ResumeBold', str(bold)))
        pdfmetrics.registerFontFamily('Resume', normal='Resume', bold='ResumeBold')
        break
else:
    raise RuntimeError('Install Arial or DejaVu Sans to embed a Unicode font.')

ink = colors.HexColor('#182336')
blue = colors.HexColor('#204A77')
styles = {
    'name': ParagraphStyle('name', fontName='ResumeBold', fontSize=21, leading=25, textColor=ink, spaceAfter=4),
    'title': ParagraphStyle('title', fontName='ResumeBold', fontSize=10.7, leading=14, textColor=blue, spaceAfter=5),
    'contact': ParagraphStyle('contact', fontName='Resume', fontSize=9, leading=12, textColor=ink),
    'body': ParagraphStyle('body', fontName='Resume', fontSize=10.3, leading=13.6, textColor=ink, spaceAfter=4),
    'bullet': ParagraphStyle('bullet', fontName='Resume', fontSize=10.3, leading=13.6, textColor=ink, leftIndent=9, firstLineIndent=-9, spaceAfter=6),
    'section': ParagraphStyle('section', fontName='ResumeBold', fontSize=10.4, leading=14, textColor=blue, spaceBefore=9, spaceAfter=5, keepWithNext=True),
    'job': ParagraphStyle('job', fontName='ResumeBold', fontSize=10, leading=13, textColor=ink, spaceAfter=3, keepWithNext=True),
}
def clean(text):
    return text.replace('\u2013', '-').replace('\u2014', '-').replace('\u2011', '-').replace('\u2192', 'para')
def para(text, style='body'):
    return Paragraph(escape(clean(text)), styles[style])
def link(url, label):
    return '<link href="' + escape(url, {'"': '&quot;'}) + '" color="#204A77">' + escape(label) + '</link>'

def build(targeted=False):
    destination = args.output_root / (str(Path('output/pdf') / Path(target_profile['filename']).name) if targeted else 'public/curriculo.pdf')
    destination.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(destination), pagesize=A4, leftMargin=37, rightMargin=37, topMargin=30, bottomMargin=30,
                            title=profile['name'] + (' - ' + target_profile['target'] if targeted else ' - Curriculo'), author=profile['name'])
    items = [para(profile['name'], 'name'), para('Objetivo: ' + target_profile['target'] if targeted else 'Desenvolvimento de sistemas e integrações | C#/.NET, SQL e AWS', 'title')]
    items += [Paragraph(escape(profile['location'] + ' | ' + profile['phone'] + ' | ') + link('mailto:' + profile['email'], profile['email']), styles['contact'])]
    items += [Paragraph(link(profile['linkedin'], 'linkedin.com/in/israel-junqueira') + ' | ' + link(profile['github'], 'github.com/Israel-Junqueira'), styles['contact'])]
    items += [Paragraph(link(profile['website'], 'israel-junqueira.github.io'), styles['contact'])]
    items += [para('RESUMO PROFISSIONAL', 'section'), para(target_profile['targetSummary'] if targeted else profile['summary'])]
    items += [para('EXPERIÊNCIA PROFISSIONAL', 'section'), para(profile['company'], 'job'), para(profile['role'] + ' | ' + profile['period'], 'job')]
    items += [Paragraph('- <b>' + escape(item['area']) + ':</b> ' + escape(clean(item['description'])), styles['bullet']) for item in profile['resumeExperience']]
    items += [para('COMPETÊNCIAS TÉCNICAS', 'section')]
    for skill in profile['resumeSkills']:
        items += [Paragraph('<b>' + escape(skill['area']) + ':</b> ' + escape(skill['description']), styles['body'])]
    items += [para('FORMAÇÃO ACADÊMICA', 'section')]
    for i, edu in enumerate(profile['education']):
        separator = '<br/>' if i == 0 else ' | '
        items += [Paragraph('<b>' + escape(edu['course']) + '</b> - ' + escape(edu['institution']) + separator + escape(clean(edu['status'])), styles['body'])]
    items += [para('IDIOMAS E INFORMAÇÕES COMPLEMENTARES', 'section'), para(profile['languages']), para(profile['additional'])]
    doc.build(items)
    print(destination)

build(False)
if target_profile:
    build(True)
