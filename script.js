// ===== Projetos (imagens trazidas do behance.net/Isabellycarmo) =====
// `slug` = pasta em /assets/projetos/<slug>/ com as imagens 01.webp, 02.webp…
// `count` = quantidade de imagens nessa pasta.
// `mock` = fotos de mockup que aparecem no quadro-carrossel do projeto (estilo Tonata).
const M = (slug, ...files) => files.map((f) => (f.startsWith("/") ? f : `/assets/projetos/${slug}/${f}.webp`));
const PROJECTS = [
  { slug: "aurora", count: 2, mock: M("aurora", "mock-1", "mock-3", "mock-4", "mock-6"), title: "Aurora Floricultura", type: "Identidade visual", cat: "branding", img: "/assets/projects/aurora.png", url: "https://www.behance.net/gallery/256579187/Aurora-Floricultura-Identidade-Visual" },
  { slug: "studio-work", count: 12, mock: M("studio-work", "01", "05", "11", "09", "06"), title: "Studio Work", type: "Identidade visual", cat: "branding", img: "/assets/projects/studio-work.png", url: "https://www.behance.net/gallery/241499801/Identidade-Visual-Studio-Work-Estudio-Criativo" },
  // imagens em alta qualidade enviadas pela Isabelly (pastas *-hd)
  { slug: "flammy-hd", count: 16, mock: M("flammy-hd", "01", "11", "14", "05"), title: "Flammy Hub", type: "Brand book", cat: "branding", img: "/assets/projetos/flammy-hd/01.webp", url: "https://www.behance.net/gallery/256487365/Brand-Book-Flammy-Hub-Studio-Criativo" },
  { slug: "achei-no-vale-hd", count: 16, mock: M("achei-no-vale-hd", "13", "14", "12", "10"), title: "Achei no Vale", type: "Manual de marca", cat: "branding", img: "/assets/projetos/achei-no-vale-hd/10.webp", url: "https://www.behance.net/gallery/255439219/Manual-de-Marca-Achei-no-Vale" },
  // feed-N = 3 posts lado a lado (montados a partir das imagens do projeto)
  { slug: "dermatologista", count: 126, mock: M("dermatologista", "feed-1", "feed-2", "feed-3"), title: "Dermatologista", type: "Social media", cat: "social", img: "/assets/projects/dermatologista.jpg", url: "https://www.behance.net/gallery/240993367/social-Media-dermatologista" },
  { slug: "clinica-infantil", count: 10, mock: M("clinica-infantil", "04", "05", "08", "03"), title: "Clínica Infantil", type: "Social media", cat: "social", img: "/assets/projects/clinica-infantil.png", url: "https://www.behance.net/gallery/240019595/Social-Media-Clinica-Infantil" },
  { slug: "ginecologia", count: 11, mock: M("ginecologia", "03", "05", "06", "08"), title: "Ginecologia & Obstetrícia", type: "Social media", cat: "social", img: "/assets/projects/ginecologia.png", url: "https://www.behance.net/gallery/239980853/social-Media-ginecologia-e-obstetricia" },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== Render projetos: mosaico de quadros-carrossel de mockups (estilo Tonata) =====
// Tamanho de cada quadro no computador (grade de 12 colunas):
//   span  = quantas colunas ocupa (12 = largura total)
//   ratio = proporção do quadro (largura / altura) no computador
//   mratio = proporção no celular (todos ocupam a largura toda)
// Cada quadro tem o mesmo formato das fotos dele, então nada fica cortado nem com bordas.
const LAYOUT = {
  aurora: { span: 6, ratio: 1.42, mratio: 1.42 },
  "studio-work": { span: 6, ratio: 1.42, mratio: 1.42 },
  "flammy-hd": { span: 6, ratio: 1.42, mratio: 1.42 },
  "achei-no-vale-hd": { span: 6, ratio: 1.42, mratio: 1.42 },
  dermatologista: { span: 12, ratio: 2.28, mratio: 2.28 },
  "clinica-infantil": { span: 12, ratio: 2.21, mratio: 2.21 },
  ginecologia: { span: 12, ratio: 2.21, mratio: 2.21 },
};
const arrowSvg = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
$("#projects").innerHTML = PROJECTS.map((p, i) => {
  const L = LAYOUT[p.slug] || { span: 6, ratio: 1, mratio: 1 };
  return `
  <article class="ptile reveal" data-cat="${p.cat}" style="--span:${L.span};--ratio:${L.ratio};--mratio:${L.mratio}">
    <div class="ptile__frame">
      <div class="ptile__track" tabindex="0" aria-label="${p.title}: mockups (${p.mock.length})">
        ${p.mock
          .map(
            (src, k) =>
              `<div class="ptile__slide"><img src="${src}" alt="${p.title} — mockup ${k + 1}" loading="lazy" decoding="async" draggable="false" /></div>`
          )
          .join("")}
      </div>
      <button class="ptile__nav ptile__nav--prev" aria-label="Mockup anterior">${arrowSvg("M15 5l-7 7 7 7")}</button>
      <button class="ptile__nav ptile__nav--next" aria-label="Próximo mockup">${arrowSvg("M9 5l7 7-7 7")}</button>
      <div class="ptile__dots" aria-hidden="true">${p.mock.map(() => "<i></i>").join("")}</div>
    </div>
    <a class="ptile__info" href="${p.url}" data-project="${i}" aria-label="Ver projeto completo: ${p.title}">
      <span><strong translate="no">${p.title}</strong><small>${p.type}</small></span>
      <span class="ptile__more">Ver projeto completo</span>
    </a>
  </article>`;
}).join("");

$$(".ptile").forEach((tile) => {
  const track = $(".ptile__track", tile);
  const slides = $$("img", track);
  const dots = $$(".ptile__dots i", tile);
  const prev = $(".ptile__nav--prev", tile);
  const next = $(".ptile__nav--next", tile);
  let cur = -1;
  const show = (k) => {
    if (k === cur) return;
    cur = k;
    dots.forEach((d, j) => d.classList.toggle("on", j === k));
  };
  const go = (k) => {
    k = (k + slides.length) % slides.length; // volta ao início, como na referência
    const left = k * track.clientWidth;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    setTimeout(() => { if (Math.abs(track.scrollLeft - left) > 2) track.scrollLeft = left; show(k); }, 650);
  };
  prev.addEventListener("click", () => go(cur - 1));
  next.addEventListener("click", () => go(cur + 1));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); }
  });
  track.addEventListener("scroll", () => show(Math.round(track.scrollLeft / track.clientWidth)), { passive: true });
  // clicar na foto também abre a galeria completa
  slides.forEach((im) => im.addEventListener("click", () => $(".ptile__info", tile).click()));
  window.addEventListener("load", () => { track.scrollLeft = 0; cur = -1; show(0); });
  show(0);
});

// ===== Galeria do projeto (abre no próprio site) =====
{
  const modal = $("#pmodal");
  const body = $(".pmodal__body", modal);
  const scroller = $(".pmodal__scroll", modal);
  let lastFocus = null, currentIdx = 0;
  const keyOf = (p) => p.slug.replace(/-hd$/, "");
  const wa = (p) => `https://wa.me/5547999816200?text=${encodeURIComponent(`Olá, Isabelly! Vi o projeto ${p.title} no seu site e quero um projeto assim.`)}`;
  const open = (i) => {
    const p = PROJECTS[i];
    currentIdx = i;
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    $(".pmodal__title", modal).textContent = p.title;
    $(".pmodal__type", modal).textContent = `${p.type}, ${p.count} ${p.count > 1 ? "imagens" : "imagem"}`;
    $(".pmodal__behance", modal).href = p.url;
    const dims = (window.DIMS && window.DIMS[p.slug]) || [];
    const imgs = Array.from({ length: p.count }, (_, k) => {
      const n = String(k + 1).padStart(2, "0");
      const [w, h] = dims[k] || [];
      const size = w ? `width="${w}" height="${h}"` : "";
      // imagens largas ocupam a linha inteira na grade de social media
      const wide = w && w > h * 1.15 ? ' class="is-wide"' : "";
      return `<img src="/assets/projetos/${p.slug}/${n}.webp" alt="${p.title} — imagem ${k + 1}" ${size}${wide} ${k < 2 ? "" : 'loading="lazy"'} decoding="async" />`;
    }).join("");
    body.className = `pmodal__body pmodal__body--${p.cat}`;
    body.innerHTML = `
      <div class="pmodal__grid">${imgs}</div>
      <div class="pmodal__end">
        <p>Gostou do <em>${p.title}</em>?</p>
        <div>
          <a class="btn btn--rose" href="${wa(p)}" target="_blank" rel="noopener">Quero um projeto assim</a>
          <button class="btn btn--line pmodal__next" type="button">Próximo projeto: ${next.title}</button>
        </div>
      </div>`;
    $(".pmodal__next", body).addEventListener("click", () => open((currentIdx + 1) % PROJECTS.length));
    scroller.scrollTop = 0;
    // link direto para o projeto (ex.: ?projeto=aurora), para a Isabelly poder enviar
    const url = new URL(location.href);
    url.searchParams.set("projeto", keyOf(p));
    history.replaceState(null, "", url);
    if (modal.hidden) {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      setTimeout(() => modal.classList.add("is-open"), 20);
    }
    $(".pmodal__close", modal).focus();
  };
  const close = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { modal.hidden = true; body.innerHTML = ""; }, reduceMotion ? 0 : 350);
    lastFocus && lastFocus.focus();
    const url = new URL(location.href);
    url.searchParams.delete("projeto");
    history.replaceState(null, "", url);
  };
  // abre direto o projeto quando o link tem ?projeto=...
  const wanted = new URLSearchParams(location.search).get("projeto");
  const wantedIdx = PROJECTS.findIndex((p) => keyOf(p) === wanted);
  if (wantedIdx >= 0) open(wantedIdx);
  $$("[data-project]").forEach((a) =>
    a.addEventListener("click", (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey) return; // permite abrir o Behance em nova aba
      e.preventDefault();
      open(+a.dataset.project);
    })
  );
  $(".pmodal__close", modal).addEventListener("click", close);
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
    if (e.key === "Tab") { // mantém o foco dentro da galeria
      const f = $$("a[href], button", modal).filter((el) => el.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
}

// ===== Carrosséis de estratégia de conteúdo =====
// Cada slide é uma imagem (.webp) ou uma animação (.mp4, toca sem som em loop).
// Arquivos em /assets/carrosseis/ (formato 3:4, como no Instagram).
const C = (name) => `/assets/carrosseis/${name}`;
// Arquivos nomeados como c<carrossel>-<ordem> (ex.: c2-5.webp = carrossel 2, slide 5).
const range = (c, n, videos = []) =>
  Array.from({ length: n }, (_, i) => `c${c}-${i + 1}.${videos.includes(i + 1) ? "mp4" : "webp"}`);
const CAROUSELS = [
  {
    title: "O que a Flammy pode fazer pelo seu negócio?",
    tag: "Apresentação de serviços, 8 slides",
    slides: range(2, 8),
  },
  {
    title: "Coisas que fazem seu Instagram parecer menos profissional",
    tag: "Carrossel educativo, 6 slides",
    slides: range(3, 6),
  },
  {
    title: "No meio de uma rotina barulhenta",
    tag: "Conexão com animação, 5 slides",
    slides: range(4, 5, [2, 3]),
  },
  {
    title: "Flammy — comunicação com intenção",
    tag: "Posicionamento de marca, 3 slides",
    slides: range(1, 3),
  },
  {
    title: "Aurora Floricultura",
    tag: "Posts de feed, 4 posts",
    slides: range(5, 4),
    ratio: "4 / 5", // posts no formato do feed do Instagram
  },
];
const slideHTML = (s, i, title) =>
  s.endsWith(".mp4")
    ? `<div class="cslide"><video src="${C(s)}" poster="${C(s.replace(".mp4", ".webp"))}" muted loop playsinline preload="none" aria-label="${title} — slide ${i + 1} (animação)"></video></div>`
    : `<div class="cslide"><img src="${C(s)}" alt="${title} — slide ${i + 1}" loading="lazy" decoding="async" /></div>`;
const TAPES = ["", " tape--kraft", " tape--butter", ""];
$("#carousels").innerHTML = CAROUSELS.map(
  (c, ci) => `
  <article class="carousel reveal"${c.ratio ? ` style="--cratio:${c.ratio}"` : ""}>
    <span class="tape${TAPES[ci % TAPES.length]}" aria-hidden="true"></span>
    <div class="carousel__frame">
      <div class="carousel__track" tabindex="0" aria-label="${c.title}: carrossel com ${c.slides.length} slides">
        ${c.slides.map((s, i) => slideHTML(s, i, c.title)).join("")}
      </div>
      <button class="carousel__nav carousel__nav--prev" aria-label="Slide anterior">‹</button>
      <button class="carousel__nav carousel__nav--next" aria-label="Próximo slide">›</button>
      <span class="carousel__count">1/${c.slides.length}</span>
    </div>
    <div class="carousel__dots" aria-hidden="true">${c.slides.map(() => "<i></i>").join("")}</div>
    <h3>${c.title}</h3>
    <small>${c.tag}</small>
  </article>`
).join("");

$$(".carousel").forEach((car) => {
  const track = $(".carousel__track", car);
  const slides = $$(".cslide", track);
  const dots = $$(".carousel__dots i", car);
  const count = $(".carousel__count", car);
  const prev = $(".carousel__nav--prev", car);
  const next = $(".carousel__nav--next", car);
  let current = -1;
  const show = (i) => {
    if (i === current) return;
    current = i;
    dots.forEach((d, k) => d.classList.toggle("on", k === i));
    count.textContent = `${i + 1}/${slides.length}`;
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
    // anima só o slide visível (e nunca para quem pediu menos movimento: fica a imagem parada)
    slides.forEach((s, k) => {
      const v = $("video", s);
      if (!v) return;
      if (k === i && !reduceMotion) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
    });
  };
  const go = (i) => {
    const left = Math.max(0, Math.min(i, slides.length - 1)) * track.clientWidth;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    // garantia: se a rolagem suave não acontecer, pula direto
    setTimeout(() => { if (Math.abs(track.scrollLeft - left) > 2) { track.scrollLeft = left; show(Math.round(left / track.clientWidth)); } }, 700);
  };
  prev.addEventListener("click", () => go(current - 1));
  next.addEventListener("click", () => go(current + 1));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
  });
  const sync = () => show(Math.round(track.scrollLeft / track.clientWidth));
  track.addEventListener("scroll", sync, { passive: true });
  // sempre começa no slide 1 (o navegador pode restaurar a rolagem ao recarregar)
  const reset = () => { track.scrollLeft = 0; current = -1; sync(); };
  reset();
  window.addEventListener("load", reset);
  window.addEventListener("resize", sync);
});

// ===== Vídeos =====
// `id`   = código do reel (o trecho depois de /reel/ no link do Instagram)
// `file` = vídeo MP4 hospedado no próprio site (em /assets/videos/).
//          Com `file`, o vídeo toca direto no site no player próprio.
//          Sem `file`, usa o player oficial do Instagram como reserva.
// `poster` (opcional) = imagem de capa (JPG) mostrada antes do play.
// Vídeos captados e editados pela Isabelly para clientes.
// Sem `id`, o botão "Ver no Instagram" leva para os reels do perfil dela.
const REELS = [
  { title: "Dermato na farmácia", file: "/assets/videos/dermato-farmacia.mp4", poster: "/assets/videos/dermato-farmacia.jpg" },
  { title: "Estética facial", file: "/assets/videos/estetica-facial.mp4", poster: "/assets/videos/estetica-facial.jpg" },
  { title: "Obstetrícia", file: "/assets/videos/ginecologia.mp4", poster: "/assets/videos/ginecologia.jpg" },
  { title: "Alergia & imunologia", file: "/assets/videos/alergista.mp4", poster: "/assets/videos/alergista.jpg" },
  { title: "Ortopedia", file: "/assets/videos/ancora.mp4", poster: "/assets/videos/ancora.jpg" },
  { title: "Clínica médica", file: "/assets/videos/clinica-medica.mp4", poster: "/assets/videos/clinica-medica.jpg" },
  { title: "Proctologia", file: "/assets/videos/proctologia.mp4", poster: "/assets/videos/proctologia.jpg" },
  { title: "Urologia pediátrica", file: "/assets/videos/urologia-apresentacao.mp4", poster: "/assets/videos/urologia-apresentacao.jpg" },
  { title: "Acolhimento infantil", file: "/assets/videos/urologia-acolhimento.mp4", poster: "/assets/videos/urologia-acolhimento.jpg" },
  { title: "Bastidores do centro cirúrgico", file: "/assets/videos/centro-cirurgico.mp4", poster: "/assets/videos/centro-cirurgico.jpg" },
];
// "Marca pessoal" abre o carrossel
REELS.unshift({ title: "Marca pessoal", file: "/assets/videos/marca-pessoal.mp4", poster: "/assets/videos/marca-pessoal.jpg" });
// Vídeos da própria Isabelly contando o processo criativo dela (seção Bastidores).
const BACKSTAGE = [
  { id: "DdCnIXby3yO", title: "Processo de uma identidade visual", tag: "Processo do Achei no Vale", file: "/assets/videos/bastidores-identidade-visual.mp4", poster: "/assets/videos/bastidores-identidade-visual.jpg" },
  { id: "Dd4rNzkRN90", title: "O post que eu faria sem ideia do que postar", tag: "Criação de conteúdo", file: "/assets/videos/bastidores-o-que-postar.mp4", poster: "/assets/videos/bastidores-o-que-postar.jpg" },
  { title: "Livros que me inspiram como designer", tag: "Referências", file: "/assets/videos/bastidores-conteudo-design.mp4", poster: "/assets/videos/bastidores-conteudo-design.jpg" },
];
const igLink = (id) => (id ? `https://www.instagram.com/reel/${id}/` : "https://www.instagram.com/isa.carm0/reels/");
const ownCard = (r) => `
  <figure class="reel reel--own">
    <div class="reel__frame">
      <video src="${r.file}" ${r.poster ? `poster="${r.poster}"` : ""} preload="metadata" playsinline muted loop></video>
      <button class="reel__toggle" aria-label="Reproduzir ${r.title}"><span aria-hidden="true">▶</span></button>
      <button class="reel__sound" aria-label="Ativar som" hidden>🔇</button>
    </div>
    <figcaption>
      <span><strong>${r.title}</strong><small>${r.tag || "Captação + edição"}</small></span>
      <a href="${igLink(r.id)}" target="_blank" rel="noopener">Ver no Instagram ↗</a>
    </figcaption>
  </figure>`;
$("#backstage").innerHTML = BACKSTAGE.map(ownCard).join("");
const reelsEl = $("#reels");
reelsEl.innerHTML = REELS.map(ownCard).join("");

// setas do carrossel de vídeos: avançam um "bloco" visível por clique
{
  const prev = $(".reels-arrow--prev");
  const next = $(".reels-arrow--next");
  const step = () => {
    const card = $(".reel", reelsEl);
    const gap = parseFloat(getComputedStyle(reelsEl).columnGap) || 16;
    const w = card ? card.getBoundingClientRect().width + gap : 300;
    return Math.max(w, Math.floor(reelsEl.clientWidth / w) * w);
  };
  const update = () => {
    const max = reelsEl.scrollWidth - reelsEl.clientWidth - 2;
    prev.disabled = reelsEl.scrollLeft <= 2;
    next.disabled = reelsEl.scrollLeft >= max;
  };
  const go = (dir) => {
    const max = reelsEl.scrollWidth - reelsEl.clientWidth;
    const target = Math.max(0, Math.min(max, reelsEl.scrollLeft + dir * step()));
    reelsEl.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
    // garantia: se a rolagem suave não acontecer, pula direto
    setTimeout(() => { if (Math.abs(reelsEl.scrollLeft - target) > 4) { reelsEl.scrollLeft = target; update(); } }, 700);
  };
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  reelsEl.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", () => { reelsEl.scrollLeft = 0; update(); });
  update();
}

// player próprio: toca/pausa no clique, som opcional, e só um vídeo tocando por vez
const ownVideos = $$(".reel--own video");
$$(".reel--own").forEach((card) => {
  const v = $("video", card);
  const toggle = $(".reel__toggle", card);
  const sound = $(".reel__sound", card);
  const sync = () => {
    card.classList.toggle("is-playing", !v.paused);
    toggle.setAttribute("aria-label", v.paused ? "Reproduzir vídeo" : "Pausar vídeo");
    sound.hidden = v.paused && v.currentTime === 0;
    sound.textContent = v.muted ? "🔇" : "🔊";
    sound.setAttribute("aria-label", v.muted ? "Ativar som" : "Desativar som");
  };
  toggle.addEventListener("click", () => {
    if (v.paused) {
      ownVideos.forEach((o) => o !== v && o.pause());
      if (v.currentTime === 0) v.muted = false; // primeiro play do usuário já com som
      v.play();
    } else v.pause();
  });
  sound.addEventListener("click", () => { v.muted = !v.muted; sync(); });
  ["play", "pause", "volumechange"].forEach((ev) => v.addEventListener(ev, sync));
});
// pausa vídeos que saem da tela
const vidIO = new IntersectionObserver((entries) => entries.forEach((e) => !e.isIntersecting && e.target.pause()), { threshold: 0.2 });
ownVideos.forEach((v) => vidIO.observe(v));

// ===== Texto digitando / apagando (rodapé) =====
const typer = $(".typer__text");
if (typer && !reduceMotion) {
  const words = typer.dataset.words.split("|");
  let w = 0, i = words[0].length, deleting = true, running = false, timer;
  const schedule = (d) => { clearTimeout(timer); timer = setTimeout(step, d); };
  const step = () => {
    if (!running) return;
    const word = words[w];
    i += deleting ? -1 : 1;
    typer.textContent = word.slice(0, i);
    let delay = deleting ? 45 : 85;
    if (!deleting && i === word.length) { deleting = true; delay = 1800; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
    schedule(delay);
  };
  new IntersectionObserver(([e]) => {
    const was = running;
    running = e.isIntersecting;
    if (running && !was) schedule(1400);
  }).observe(typer);
}

// ===== Filtros =====
$$(".filters button").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".filters button").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", b === btn);
    });
    const f = btn.dataset.filter;
    $$(".ptile").forEach((el) => el.classList.toggle("is-hidden", f !== "all" && el.dataset.cat !== f));
  });
});

// ===== Serviços (lista editorial / acordeão) =====
// Textos baseados nos slides de serviço da própria Isabelly.
const SERVICES = [
  {
    title: "Identidade visual",
    lead: "Para uma marca ser reconhecida antes mesmo de ser lida.",
    desc: "Criamos uma identidade que traduz a personalidade da marca em cores, tipografias, formas, elementos gráficos, direção visual e referências. Um sistema visual pensado para existir além de um logo bonito.",
    tags: ["logo", "paleta", "tipografia", "direção visual"],
  },
  {
    title: "Gestão de redes sociais",
    lead: "Sua marca presente, do jeito que ela merece.",
    desc: "Cuidamos da presença digital de ponta a ponta: estratégia de conteúdo, planejamento, pautas, copy, direção criativa, design, roteiros, publicação e acompanhamento das redes — para que a comunicação tenha continuidade e personalidade.",
    tags: ["estratégia", "design", "copy", "roteiros"],
  },
  {
    title: "Análise & construção de perfil",
    lead: "Antes de começar a falar, a gente entende o que precisa ser dito.",
    desc: "Analisamos o perfil, a comunicação atual, a apresentação da marca e a experiência de quem chega até ela. A partir disso, organizamos ou construímos uma presença digital mais clara, coerente e fiel ao que a marca quer transmitir.",
    tags: ["diagnóstico", "bio", "feed", "posicionamento"],
  },
  {
    title: "Captação de vídeos",
    lead: "Momentos que merecem ser registrados no instante em que acontecem.",
    desc: "Eventos, lançamentos, experiências, bastidores e ativações: planejamos a captação, gravamos o que importa e editamos o conteúdo para as redes da sua marca.",
    tags: ["captação", "edição", "reels"],
  },
  {
    title: "Cobertura real time",
    lead: "Tem coisa que só faz sentido enquanto está acontecendo.",
    desc: "Planejamos a cobertura, captamos o que importa e transformamos o momento em conteúdo enquanto ele ainda está vivo — stories e posts publicados durante o seu evento.",
    tags: ["eventos", "stories", "ao vivo"],
  },
  {
    title: "Sites & landing pages",
    lead: "Porque a experiência da sua marca não termina no Instagram.",
    desc: "Sites e landing pages que unem estética, organização e funcionalidade, com uma experiência pensada para quem chega, navega e precisa encontrar o que procura. Cada página nasce a partir da marca e do objetivo.",
    tags: ["site", "landing page", "experiência"],
  },
];
const waService = (s) =>
  `https://wa.me/5547999816200?text=${encodeURIComponent(`Olá, Isabelly! Tenho interesse no serviço de ${s.title}.`)}`;
const svcList = $("#svc-list");
svcList.innerHTML = SERVICES.map(
  (s, i) => `
  <li class="svc${i === 0 ? " is-open" : ""}">
    <button class="svc__head" aria-expanded="${i === 0}" aria-controls="svc-${i}" id="svc-h-${i}">
      <span class="svc__title">${s.title}</span>
      <span class="svc__icon" aria-hidden="true"></span>
    </button>
    <div class="svc__body" id="svc-${i}" role="region" aria-labelledby="svc-h-${i}">
      <div class="svc__inner">
        <p class="svc__lead">${s.lead}</p>
        <p class="svc__desc">${s.desc}</p>
        <div class="svc__foot">
          <ul class="svc__tags">${s.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
          <a class="svc__cta" href="${waService(s)}" target="_blank" rel="noopener">Quero esse serviço</a>
        </div>
      </div>
    </div>
  </li>`
).join("");
$$(".svc__head", svcList).forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const open = !item.classList.contains("is-open");
    $$(".svc", svcList).forEach((el) => {
      const on = el === item && open;
      el.classList.toggle("is-open", on);
      $(".svc__head", el).setAttribute("aria-expanded", on);
    });
  });
});

// ===== Entrada do topo (única animação ao carregar a página) =====
$$(".hero .reveal").forEach((el, i) => (el.style.transitionDelay = `${i * 110}ms`));
setTimeout(() => $$(".hero .reveal").forEach((el) => el.classList.add("is-in")), 30);

// ===== Nav / FAB =====
const nav = $(".nav");
const fab = $(".fab");

// ===== Rodapé: revelação 3D (perspectiva + translateZ ligado ao scroll) =====
const footer = $("#footer");
const Z_START = -500; // começa "dentro" da tela
let ticking = false;

const update = () => {
  ticking = false;
  const y = window.scrollY;
  nav.classList.toggle("is-scrolled", window.innerWidth <= 960 || y > window.innerHeight * 0.85);
  fab.classList.toggle("is-visible", y > window.innerHeight * 0.6);

  if (reduceMotion) return;
  const r = footer.parentElement.getBoundingClientRect();
  const vh = window.innerHeight;
  // 0 quando o rodapé começa a entrar, 1 quando o fim da página chega
  const dist = Math.max(Math.min(r.height, vh), 1);
  const p = Math.min(Math.max(1 - (r.bottom - vh) / dist, 0), 1);
  const eased = 1 - Math.pow(1 - p, 3);
  footer.style.setProperty("--z", `${(Z_START * (1 - eased)).toFixed(1)}px`);
};
const onScroll = () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
};
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
update();

// ===== Menu mobile =====
const toggle = $(".nav__toggle");
const menu = $(".mobile-menu");
const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  menu.classList.toggle("is-open", open);
  menu.setAttribute("aria-hidden", !open);
  nav.classList.toggle("menu-open", open);
  document.body.style.overflow = open ? "hidden" : "";
};
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
$$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
window.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

$("#year").textContent = new Date().getFullYear();

// ===== Cursor personalizado (só em computador com mouse) =====
// Áreas marcadas com data-cursor="texto" mostram uma bolinha rosa com o texto.
// Elementos com a classe .is-native (setas, botão de som) mantêm o cursor normal.
if (matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  const cur = $(".cursor");
  const label = $(".cursor__label");
  document.body.classList.add("has-cursor");

  // marca as áreas
  $$(".ptile__frame").forEach((el) => (el.dataset.cursor = "Ver projeto"));
  $$(".reel__frame").forEach((el) => (el.dataset.cursor = "Play"));
  $$(".carousel__frame").forEach((el) => (el.dataset.cursor = "Arraste"));
  $$(".ptile__nav, .carousel__nav, .reels-arrow, .reel__sound").forEach((el) => el.classList.add("is-native"));

  let x = -200, y = -200, tx = -200, ty = -200, raf = null;
  const loop = () => {
    // segue o mouse com um leve atraso, para o movimento ficar suave
    x += (tx - x) * 0.22;
    y += (ty - y) * 0.22;
    cur.style.setProperty("--x", `${x.toFixed(1)}px`);
    cur.style.setProperty("--y", `${y.toFixed(1)}px`);
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : null;
  };
  const textFor = (zone) => {
    if (zone.classList.contains("reel__frame")) {
      const v = $("video", zone);
      return v && !v.paused ? "Pausar" : "Play";
    }
    return zone.dataset.cursor;
  };
  const update = (e) => {
    tx = e.clientX; ty = e.clientY;
    const zone = e.target.closest("[data-cursor]");
    const show = zone && !e.target.closest(".is-native");
    if (show) {
      label.textContent = textFor(zone);
      if (!cur.classList.contains("is-on")) { x = tx; y = ty; } // aparece já no lugar certo
    }
    cur.classList.toggle("is-on", !!show);
    if (!raf) raf = requestAnimationFrame(loop);
  };
  document.addEventListener("pointermove", update, { passive: true });
  document.addEventListener("pointerdown", (e) => { if (cur.classList.contains("is-on")) cur.classList.add("is-down"); });
  document.addEventListener("pointerup", (e) => { cur.classList.remove("is-down"); setTimeout(() => update(e), 30); });
  document.addEventListener("mouseleave", () => cur.classList.remove("is-on"));
  // ao abrir a galeria, esconde o cursor
  document.addEventListener("click", (e) => { if (e.target.closest(".ptile__frame")) cur.classList.remove("is-on"); });
}

// ===== Fita de serviços: só anima enquanto está visível na tela =====
{
  const marquee = $(".marquee");
  if (marquee) new IntersectionObserver(([e]) => marquee.classList.toggle("is-paused", !e.isIntersecting)).observe(marquee);
}
