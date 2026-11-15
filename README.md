# Isabelly Carmo — Portfolio

Site estático (HTML + CSS + JS puro), sem build. Pronto para a Vercel.

```
index.html        estrutura e textos
styles.css        visual (cores em :root)
script.js         lista de projetos + interações
assets/           foto e capas dos projetos
vercel.json       URLs limpas + cache das imagens
```

## Rodar localmente

```bash
npx serve .
```

## Deploy na Vercel

**Opção A — CLI**

```bash
npm i -g vercel
vercel        # primeira vez: login e configuração (Framework: Other, sem build)
vercel --prod
```

**Opção B — GitHub**
Suba esta pasta para um repositório e importe em vercel.com/new
(Framework Preset: *Other*, Build Command vazio, Output Directory `.`).

## Adicionar um projeto novo

1. Salve a capa em `assets/projects/nome.png` (proporção ~4:3).
2. Em `script.js`, adicione um item na lista `PROJECTS`:

```js
{ title: "Nome", type: "Identidade visual", cat: "branding", img: "/assets/projects/nome.png", url: "https://www.behance.net/gallery/..." },
```

`cat` pode ser `branding` ou `social` (são os filtros).

## Links usados

- Orçamento: https://forms.gle/EU88FLYwaj5GqNEt9
- WhatsApp: https://wa.me/5547999816200
- E-mail: isabellycarmodesigner@gmail.com
- Behance, Instagram, LinkedIn, TikTok (rodapé)

## Vídeos que tocam direto no site

1. Salve o MP4 em `assets/videos/` (ex.: `processo-identidade.mp4`). Ideal: vertical 9:16, até ~8 MB.
2. Em `script.js`, na lista `REELS`, preencha `file` com o caminho (`/assets/videos/processo-identidade.mp4`).
   `poster` é opcional (imagem de capa em JPG).
3. Publique de novo (`npx vercel --prod`).

Vídeo com `file` usa o player próprio do site (com botão "Ver no Instagram").
Vídeo sem `file` continua usando o player oficial do Instagram.
