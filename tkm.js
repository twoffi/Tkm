/* ════════════════════════════════════════════
   TKM AUTO — Script partagé
   Toutes les pages chargent ce fichier.
   ════════════════════════════════════════════ */

/* ────────────────────────────────────────────
   1. LIENS DE PAIEMENT STRIPE
   Colle ici tes liens Stripe (https://buy.stripe.com/...).
   Tant qu'un lien est vide, le bouton envoie le client
   vers la page contact au lieu du paiement.
   ──────────────────────────────────────────── */
const STRIPE = {
  COVERING_RETROS:     '',
  COVERING_CAPOT:      '',
  COVERING_TOIT:       '',
  COVERING_PARTIEL:    '',
  VITRES_LUNETTE:      '',
  VITRES_2ARRIERE:     '',
  VITRES_PACK_ARRIERE: '',
  VITRES_INTEGRAL:     '',
  STICKER_SMALL:       '',
  STICKER_MEDIUM:      '',
  CIEL_250:            '',
  CIEL_500:            '',
  CIEL_800:            '',
  CIEL_1000:           '',
  BANDEAU_SIMPLE:      '',
  BANDEAU_BICOLORE:    '',
  BANDEAU_CUSTOM:      '',
  CACHE_SIMPLE:        '',
  CACHE_CUSTOM:        '',
  CACHE_PRESTIGE:      '',
  OPTIQUE_ARRIERE:     '',
  OPTIQUE_4H:          '',
  OPTIQUE_5H:          '',
  PACK_STYLE:          '',
  PACK_CONFORT:        ''
};

/* ────────────────────────────────────────────
   2. PRESTATIONS & TARIFS
   Modifie un prix ici : il change partout sur le site.
   p = prix en euros (null si sur devis), label = texte affiché à la place
   s = clé du lien Stripe ci-dessus, badge = petite étiquette
   ──────────────────────────────────────────── */
const TARIFS = [
  { id:'covering', name:'Covering', from:40,
    desc:"Changez la couleur de votre voiture, en entier ou juste une partie, sans toucher à la peinture d'origine. Mat, brillant, carbone ou chrome.",
    note:"Prix pour un véhicule de taille standard. Le tarif final dépend du modèle et du film choisi.",
    items:[
      { n:'Rétroviseurs', d:'La paire, film et pose', p:40, s:'COVERING_RETROS' },
      { n:'Capot', d:'Film vinyle et pose', p:80, s:'COVERING_CAPOT' },
      { n:'Toit', d:'Film vinyle et pose', p:90, s:'COVERING_TOIT' },
      { n:'Partiel', d:'Capot, toit et rétroviseurs', p:190, s:'COVERING_PARTIEL', badge:'Le plus demandé' },
      { n:'Complet', d:'Carrosserie entière', p:null, label:'Sur devis' }
    ]},
  { id:'vitres', name:'Vitres teintées', from:60,
    desc:"Des films homologués qui gardent l'habitacle au frais, bloquent les UV et donnent un vrai caractère à la voiture.",
    note:"La loi impose au moins 70 % de lumière sur les vitres avant. Les vitres arrière sont libres. On respecte la réglementation sur chaque pose.",
    items:[
      { n:'Lunette arrière', d:'Vitre du coffre', p:60, s:'VITRES_LUNETTE' },
      { n:'2 vitres arrière', d:'Latérales arrière', p:80, s:'VITRES_2ARRIERE' },
      { n:'Pack arrière', d:'2 latérales et lunette', p:120, s:'VITRES_PACK_ARRIERE', badge:'Le plus demandé' },
      { n:'Pack intégral', d:'Toutes les vitres sauf le pare-brise', p:180, s:'VITRES_INTEGRAL' }
    ]},
  { id:'stickers', name:'Stickers personnalisés', from:5,
    link:{ href:'sticker.html', label:'Créer mon sticker' },
    desc:"Votre pseudo Instagram, TikTok, Snap ou YouTube, ou votre propre logo, découpé au plotter dans un vinyle qui tient dehors.",
    note:"Créez votre sticker dans le configurateur : vous voyez le rendu et on reçoit le fichier prêt à découper.",
    items:[
      { n:'Sticker réseau', d:"Pseudo et logo, jusqu'à 15 cm", p:5, s:'STICKER_SMALL', badge:'Idéal pour commencer' },
      { n:'Sticker réseau', d:'Pseudo et logo, de 15 à 30 cm', p:8, s:'STICKER_MEDIUM' },
      { n:'Design personnalisé', d:'Votre logo ou motif', p:null, label:'Dès 10 €' },
      { n:'Lot de 5', d:'Même design, même taille', p:null, label:'−20 %' }
    ]},
  { id:'ciel', name:'Ciel étoilé', from:350,
    link:{ href:'ciel.html', label:'Simuler mon ciel' },
    desc:"Des centaines de fibres optiques posées une à une dans votre plafond. Scintillement et étoiles filantes en option.",
    note:"Démontage et remontage du plafond, pose des fibres et boîtier LED inclus. Prix pour une citadine ou une berline, supplément pour SUV et monospace.",
    items:[
      { n:'Essentiel', d:'250 fibres', p:350, s:'CIEL_250' },
      { n:'Confort', d:'500 fibres', p:500, s:'CIEL_500', badge:'Le plus demandé' },
      { n:'Premium', d:'800 fibres', p:700, s:'CIEL_800' },
      { n:'Prestige', d:'1000 fibres, scintillement inclus', p:900, s:'CIEL_1000' },
      { n:'Étoiles filantes', d:'Option sur toutes les formules', p:null, label:'+50 €' }
    ]},
  { id:'bandeau', name:'Bandeau pare-brise', from:30,
    desc:"Un bandeau découpé à vos mesures, avec le texte, la police et la couleur que vous voulez.",
    note:"Livré prêt à poser avec les instructions, ou posé par nos soins à l'atelier.",
    items:[
      { n:'Texte simple', d:'Une couleur', p:30, s:'BANDEAU_SIMPLE', badge:'Le plus demandé' },
      { n:'Bicolore', d:'Texte et liseré de couleur', p:40, s:'BANDEAU_BICOLORE' },
      { n:'Design personnalisé', d:'Logo, motif, plusieurs éléments', p:50, s:'BANDEAU_CUSTOM' },
      { n:'Pose à l\'atelier', d:'En option', p:null, label:'+10 €' }
    ]},
  { id:'cacheplaque', name:'Cache plaque', from:20,
    link:{ href:'cacheplaque.html', label:'Créer ma plaque' },
    desc:"Un cache plaque à votre image : fond, logos de réseaux sociaux, texte. Format standard français 52 × 11 cm.",
    note:"Dessinez votre plaque dans le configurateur, téléchargez le visuel et envoyez-le-nous.",
    items:[
      { n:'Simple', d:'Une couleur et du texte', p:20, s:'CACHE_SIMPLE' },
      { n:'Personnalisé', d:'Logo réseau social et texte', p:30, s:'CACHE_CUSTOM', badge:'Le plus demandé' },
      { n:'Prestige', d:'Design complet avec image de fond', p:45, s:'CACHE_PRESTIGE' },
      { n:'Avant et arrière', d:'Les 2 plaques, même design', p:null, label:'−10 %' }
    ]},
  { id:'optiques', name:"Rénovation d'optiques", from:35,
    desc:"Des phares jaunis ou ternis qui redeviennent transparents, puis protégés de 6 mois à 2 ans selon le vernis choisi.",
    note:"Pour 25 € de plus, le vernis 5H tient deux fois plus longtemps face aux UV et à la météo du Nord. C'est celui qu'on conseille.",
    items:[
      { n:'Feux arrière', d:'La paire, polissage et protection', p:35, s:'OPTIQUE_ARRIERE' },
      { n:'Phares vernis 4H', d:'La paire, protection 6 à 12 mois', p:40, s:'OPTIQUE_4H' },
      { n:'Phares vernis 5H', d:"La paire, protection jusqu'à 2 ans", p:65, s:'OPTIQUE_5H', badge:'Conseillé' }
    ]},
  { id:'packs', name:'Packs', from:150,
    desc:"Plusieurs prestations sur la même voiture, pour moins cher qu'à l'unité.",
    note:"Plus vous combinez de prestations, plus la remise est importante. Demandez un devis pour votre projet.",
    items:[
      { n:'Pack Style', d:'Covering toit, bandeau et sticker', p:150, s:'PACK_STYLE' },
      { n:'Pack Confort', d:'Vitres teintées et ciel 250 fibres', p:450, s:'PACK_CONFORT' },
      { n:'Full custom', d:'Covering, vitres, ciel et stickers', p:null, label:'Sur devis' }
    ]}
];

/* ────────────────────────────────────────────
   3. LOGOS RÉSEAUX (tracés SVG, viewBox 24×24)
   ──────────────────────────────────────────── */
const ICONS = {
  instagram: [
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z",
    "M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z",
    "M18.406 5.155c0 .796-.645 1.44-1.441 1.44-.795 0-1.439-.644-1.439-1.44s.644-1.44 1.439-1.44c.796 0 1.441.644 1.441 1.44z"
  ],
  tiktok: [
    "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z"
  ],
  youtube: [
    "M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.81 3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z"
  ],
  snapchat: [
    "M12.065 2.012c.268 0 .54.013.806.04 2.756.277 4.758 2.32 4.758 5.076 0 .337-.033.68-.055 1.018-.022.338.022.676.088 1.01.2 1.032.876 1.836 2.268 2.11.055.011.11.022.165.033.308.066.605.198.76.462.15.255.1.566-.044.804-.19.31-.496.518-.838.625-.452.14-1.044.268-1.14.814-.088.498.18.94.44 1.332.13.195.302.37.422.577.26.44.196.947-.1 1.347-.308.41-.81.64-1.347.74-.495.09-1.12.19-1.508.554-.38.355-.507.86-.678 1.347-.198.553-.498 1.082-1.02 1.347-.495.252-1.114.19-1.642.033-.528-.157-1.064-.36-1.624-.36-.56 0-1.096.203-1.624.36-.528.157-1.147.22-1.642-.033-.522-.265-.822-.794-1.02-1.347-.17-.487-.298-.992-.678-1.347-.388-.364-1.013-.464-1.508-.554-.537-.1-1.04-.33-1.347-.74-.296-.4-.36-.907-.1-1.347.12-.207.292-.382.422-.577.26-.392.528-.834.44-1.332-.096-.546-.688-.674-1.14-.814-.342-.107-.648-.315-.838-.625-.144-.238-.194-.549-.044-.804.155-.264.452-.396.76-.462.055-.011.11-.022.165-.033 1.392-.274 2.068-1.078 2.268-2.11.066-.334.11-.672.088-1.01-.022-.338-.055-.681-.055-1.018 0-2.756 2.002-4.799 4.758-5.076.266-.027.538-.04.806-.04z"
  ]
};

const TKM = {
  EMAIL: 'contact@tkm-auto.fr',
  INSTA: 'tkm.auto',
  STRIPE, TARIFS, ICONS,

  /* Échappe le texte saisi par les visiteurs avant affichage */
  esc(s){ return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); },

  /* Lien de paiement : Stripe si rempli, sinon page contact */
  payHref(key){ return (key && STRIPE[key]) ? STRIPE[key] : 'contact.html'; },
  isPayReady(key){ return !!(key && STRIPE[key]); },

  /* SVG inline d'un logo réseau */
  iconSVG(net, cls=''){
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${ICONS[net].map(d=>`<path d="${d}"/>`).join('')}</svg>`;
  },

  /* Dessine un logo réseau sur un canvas */
  drawIcon(ctx, net, x, y, size, color){
    const k = size / 24;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = color;
    for (const d of ICONS[net]) ctx.fill(new Path2D(d));
    ctx.restore();
  },

  /* Ouvre l'appli mail avec un message pré-rempli */
  mail(subject, lines){
    const a = document.createElement('a');
    a.href = `mailto:${TKM.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.filter(l => l !== null && l !== undefined && l !== false).join('\n'))}`;
    document.body.appendChild(a); a.click(); a.remove();
  },

  /* Télécharge un canvas en PNG */
  download(canvas, name){
    const a = document.createElement('a');
    a.download = name; a.href = canvas.toDataURL('image/png');
    document.body.appendChild(a); a.click(); a.remove();
  },

  reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

/* ────────────────────────────────────────────
   4. NAVIGATION & PIED DE PAGE (injectés sur chaque page)
   ──────────────────────────────────────────── */
(function chrome(){
  const here = location.pathname.split('/').pop() || 'index.html';
  const links = [
    ['index.html#prestations','Prestations'],
    ['index.html#configurateurs','Configurateurs'],
    ['tarifs.html','Tarifs'],
    ['index.html#avis','Avis'],
    ['contact.html','Contact']
  ];
  const on = h => h.split('#')[0] === here && !h.includes('#') ? ' class="on"' : '';

  const navHost = document.querySelector('[data-tkm-nav]');
  if (navHost){
    navHost.outerHTML = `
      <header class="nav" id="tkmNav">
        <a class="brand" href="index.html" aria-label="TKM Auto, accueil"><b>TKM</b><i>auto</i></a>
        <nav class="nav-links" aria-label="Navigation principale">
          ${links.map(([h,t]) => `<a href="${h}"${on(h)}>${t}</a>`).join('')}
        </nav>
        <a class="btn btn-sm nav-cta" href="contact.html">Demander un devis</a>
        <button class="burger" id="tkmBurger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="tkmMenu"><span></span><span></span></button>
      </header>
      <div class="menu" id="tkmMenu">
        ${links.map(([h,t]) => `<a href="${h}">${t}</a>`).join('')}
        <a class="btn" href="contact.html">Demander un devis</a>
      </div>`;
  }

  const footHost = document.querySelector('[data-tkm-footer]');
  if (footHost){
    footHost.outerHTML = `
      <footer class="foot">
        <div class="wrap">
          <div class="foot-grid">
            <div class="foot-about">
              <a class="brand" href="index.html"><b>TKM</b><i>auto</i></a>
              <p>Personnalisation automobile à Hersin-Coupigny, pour tout le secteur de Béthune, Lens et Liévin.</p>
              <a class="btn btn-sm btn-ghost" href="https://instagram.com/${TKM.INSTA}" target="_blank" rel="noopener">${TKM.iconSVG('instagram','ico')} @${TKM.INSTA}</a>
            </div>
            <div>
              <h4>Prestations</h4>
              <ul>${TARIFS.map(t => `<li><a href="tarifs.html#${t.id}">${t.name}</a></li>`).join('')}</ul>
            </div>
            <div>
              <h4>Configurateurs</h4>
              <ul>
                <li><a href="sticker.html">Sticker réseau</a></li>
                <li><a href="cacheplaque.html">Cache plaque</a></li>
                <li><a href="ciel.html">Ciel étoilé</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:${TKM.EMAIL}">${TKM.EMAIL}</a></li>
                <li><a href="https://instagram.com/${TKM.INSTA}" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="contact.html">Demander un devis</a></li>
                <li><a href="tarifs.html">Grille tarifaire</a></li>
              </ul>
            </div>
          </div>
          <div class="foot-bottom">
            <span>© ${new Date().getFullYear()} TKM Auto, Hersin-Coupigny 62530</span>
            <span>Paiement sécurisé par Stripe</span>
          </div>
        </div>
      </footer>`;
  }

  const style = document.createElement('style');
  style.textContent = '.foot .ico{width:16px;height:16px}';
  document.head.appendChild(style);
})();

/* ────────────────────────────────────────────
   5. DÉFILEMENT FLUIDE & ANIMATIONS
   ──────────────────────────────────────────── */
(function behaviours(){
  const root = document.documentElement;
  const nav = document.getElementById('tkmNav');
  const burger = document.getElementById('tkmBurger');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  let lenis = null;

  /* Menu mobile */
  const setMenu = open => {
    root.classList.toggle('menu-open', open);
    if (burger){ burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); }
    document.body.style.overflow = open ? 'hidden' : '';
    if (lenis) open ? lenis.stop() : lenis.start();
  };
  if (burger){
    burger.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
    document.querySelectorAll('#tkmMenu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  }

  /* Barre de progression */
  const bar = document.createElement('div');
  bar.id = 'tkm-progress';
  document.body.prepend(bar);

  /* Halo lumineux qui suit la souris (ordinateur uniquement) */
  if (matchMedia('(pointer:fine)').matches && !TKM.reduced){
    const glow = document.createElement('div');
    glow.id = 'tkm-cursor';
    document.body.appendChild(glow);
    let mx = innerWidth/2, my = innerHeight/2, gx = mx, gy = my;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive:true });
    (function loop(){ gx += (mx - gx) * .12; gy += (my - gy) * .12; glow.style.transform = `translate(${gx}px,${gy}px)`; requestAnimationFrame(loop); })();
  }

  /* Zones qui gardent leur propre défilement */
  document.querySelectorAll('.els, .cats-inner, textarea, .menu').forEach(el => el.setAttribute('data-lenis-prevent', ''));

  /* ── Boucle unique : défilement fluide + effets liés au scroll ── */
  const tickers = [];
  TKM.onScroll = fn => { tickers.push(fn); fn(scrollY); };
  let lastY = -1, dirty = true;
  addEventListener('resize', () => { dirty = true; }, { passive:true });
  addEventListener('load', () => { dirty = true; });
  function frame(t){
    if (lenis) lenis.raf(t);
    const y = scrollY;
    if (y !== lastY || dirty){
      lastY = y; dirty = false;
      const max = root.scrollHeight - innerHeight;
      bar.style.width = (max > 0 ? y / max * 100 : 0) + '%';
      if (nav) nav.classList.toggle('solid', y > 40);
      for (const f of tickers) f(y);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  TKM.refresh = () => { dirty = true; if (lenis) lenis.resize(); };

  /* Défilement fluide avec Lenis (chargé à côté, désactivé si l'utilisateur limite les animations) */
  if (!TKM.reduced){
    const sc = document.createElement('script');
    sc.src = 'lenis.min.js';
    sc.onload = () => {
      if (typeof Lenis === 'undefined') return;
      lenis = new Lenis({ lerp:.085, smoothWheel:true, anchors:false, autoRaf:false });
      TKM.lenis = lenis;
      if (location.hash){
        const t = document.querySelector(location.hash);
        if (t) setTimeout(() => lenis.scrollTo(t, { offset:-80, immediate:true }), 60);
      }
    };
    document.head.appendChild(sc);
  }

  /* Liens vers une section de la même page */
  const norm = p => p.replace(/index\.html$/, '');
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="#"]');
    if (!a || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (norm(url.pathname) !== norm(location.pathname) || !url.hash) return;
    const target = document.querySelector(url.hash);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset:-80, duration:1.5 });
    else target.scrollIntoView({ behavior: TKM.reduced ? 'auto' : 'smooth' });
    history.replaceState(null, '', url.hash);
  });

  /* ── Apparitions ── */
  const io = ('IntersectionObserver' in window && !TKM.reduced) ? new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const d = +e.target.dataset.d || 0;
      if (d) e.target.style.transitionDelay = d + 'ms';
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold:.15, rootMargin:'0px 0px -60px 0px' }) : null;
  const observe = els => els.forEach(el => io ? io.observe(el) : el.classList.add('in'));

  /* Titres découpés en mots qui montent */
  const splitWords = el => {
    if (el.dataset.split === 'done' || el.children.length || !el.textContent.trim()) return;
    let n = 0;
    el.innerHTML = el.textContent.split(/(\s+)/).map(p =>
      (!p || /^\s+$/.test(p)) ? p : `<span class="w"><span style="transition-delay:${(n++) * 55}ms">${TKM.esc(p)}</span></span>`
    ).join('');
    el.dataset.split = 'done';
    el.classList.add('split');
    el.classList.remove('rv');
  };

  /* Texte qui s'allume mot après mot pendant la lecture */
  const lit = el => {
    if (el.dataset.litDone) return;
    el.dataset.litDone = '1';
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="lw">${TKM.esc(w)}</span>`).join(' ');
    const words = [...el.querySelectorAll('.lw')];
    let shown = -1;
    if (TKM.reduced){ words.forEach(w => w.classList.add('on')); return; }
    TKM.onScroll(() => {
      const r = el.getBoundingClientRect();
      const p = clamp((innerHeight * .88 - r.top) / (r.height + innerHeight * .3), 0, 1);
      const k = Math.round(p * words.length);
      if (k === shown) return;
      shown = k;
      words.forEach((w, i) => w.classList.toggle('on', i < k));
    });
  };

  /* Effet de profondeur : l'élément glisse plus lentement que la page */
  const parallax = el => {
    if (el.dataset.pxDone || TKM.reduced) return;
    el.dataset.pxDone = '1';
    const sp = parseFloat(el.dataset.speed) || .15, ref = el.parentElement;
    TKM.onScroll(() => {
      const r = ref.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      el.style.transform = `translate3d(0,${-(r.top + r.height/2 - innerHeight/2) * sp}px,0)`;
    });
  };

  /* Bandeau de texte qui avance avec le défilement */
  const marquee = el => {
    if (el.dataset.mqDone) return;
    el.dataset.mqDone = '1';
    const track = el.firstElementChild, dir = +el.dataset.dir || -1, sp = parseFloat(el.dataset.speed) || .4;
    TKM.onScroll(y => {
      const w = track.scrollWidth / 2 || 1;
      const x = (((y * sp * dir) % w) + w) % w;
      track.style.transform = `translate3d(${-x}px,0,0)`;
    });
  };

  /* Trait qui se dessine selon la position dans la page (--p de 0 à 1) */
  const draw = el => {
    if (el.dataset.drawDone) return;
    el.dataset.drawDone = '1';
    TKM.onScroll(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--p', TKM.reduced ? 1 : clamp((innerHeight * .8 - r.top) / (r.height + innerHeight * .2), 0, 1).toFixed(3));
    });
  };

  TKM.animate = (scope = document) => {
    scope.querySelectorAll('.h2, .page-head .display, [data-split]').forEach(splitWords);
    scope.querySelectorAll('[data-lit]').forEach(lit);
    scope.querySelectorAll('[data-speed]').forEach(parallax);
    scope.querySelectorAll('[data-marquee]').forEach(marquee);
    scope.querySelectorAll('[data-draw]').forEach(draw);
    observe(scope.querySelectorAll('.rv:not(.in), .split:not(.in), .wipe:not(.in), .slide-l:not(.in), .slide-r:not(.in)'));
    TKM.refresh();
  };

  // Le texte d'introduction de chaque sous-page apparaît aussi en douceur
  document.querySelectorAll('.page-head .lead, .page-head .crumb').forEach(el => el.classList.add('rv'));
  TKM.animate();
})();
