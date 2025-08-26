function placeholderFor(title){
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#0f1a13'/><stop offset='100%' stop-color='#16261d'/>
      </linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='40' y='560' fill='#a7d8bf' font-family='system-ui,Segoe UI,Roboto' font-size='40' font-weight='700'>${title}</text>
    </svg>`
  );
  return `data:image/svg+xml;charset=utf-8,${svg}`;
}

const IMAGE_BASE = "img";

const SAFRAS = {
  milho: {
    nome: "Milho (1ª e 2ª safra)",
    lead: "No PR, o milho é pilar do sistema produtivo. A 2ª safra (‘safrinha’) sustenta volumes altos quando o clima favorece semeadura antecipada.",
    facts: [
      {k: "Janela crítica", v: "Estabelecimento e fechamento de entrelinhas"},
      {k: "Pontos de atenção", v: "Gramíneas anuais/perenes e Amaranthus (caruru)"},
      {k: "Diretriz de manejo", v: "Rotação de culturas + herbicidas em pré + pós no timing"}
    ],
    plantas: [
      { id:"capim-pe-de-galinha", nome:"Capim-pé-de-galinha (Eleusine indica)",
        impacto:"Forma colônias densas; muito comum em solo compactado; resistência a glifosato/ALS.",
        manejo:"Pré: pendimethalin, S-metolacloro. Pós: cletodim/haloxifope/quizalofop em janelas precoces; rotação de MOA; descompactação de solo.",
        img:"capim-pé-de-galinha.jpg" },
      { id:"caruru", nome:"Caruru (Amaranthus spp.)",
        impacto:"Crescimento explosivo; até ~500k sementes/planta; alta competição por luz e nutrientes.",
        manejo:"Pré: flumioxazina, S-metolacloro. Pós: fomesafen, lactofen, imazaquin (evitar glifosato isolado); controle em plântula; adensamento e coberturas.",
        img:"caruru.jpg" },
      { id:"amendoim-bravo", nome:"Leiteiro/Mamona-brava (Euphorbia heterophylla)",
        impacto:"Hospedeira de vírus; látex irritante; resistência a glifosato/ALS; grande variabilidade morfológica.",
        manejo:"Rotação de culturas e MOA; pré (flumioxazina, diclosulam) + pós (fomesafen, lactofen, bentazon); evitar produção de sementes; EPI na capina.",
        img:"mamona.jpg" },
      { id:"picao-preto", nome:"Picão-preto (Bidens pilosa)",
        impacto:"Infestaões escalonadas; contamina colheita; alta sementeira.",
        manejo:"Coberturas vivas, pré-emergentes e monitoramento pós-chuvas.",
        img:"picao-preto.jpg" }
    ]
  },

  soja: {
    nome: "Soja",
    lead: "Cultura mais difundida do PR; exige dessecação bem planejada e controle precoce de biótipos resistentes.",
    facts: [
      {k: "Janela crítica", v: "Pré-plantio e V1–V4"},
      {k: "Pontos de atenção", v: "Buva, capim-amargoso e Amaranthus resistentes"},
      {k: "Diretriz de manejo", v: "Dessecação escalonada + pré-emergentes + pós cedo"}
    ],
    plantas: [
      { id:"buva", nome:"Buva (Conyza spp.)",
        impacto:"Resistente (principalmente a glifosato); sementes dispersas pelo vento; dificulta até colheita quando adulta.",
        manejo:"Pré (diclosulam, flumioxazina) + pós em roseta (misturas: 2,4-D, glufosinato, mesotriona). Evitar glifosato isolado; coberturas e rotação.",
        img:"buva.jpg" },
      { id:"capim-pe-de-galinha", nome:"Capim-pé-de-galinha (Eleusine indica)",
        impacto:"Janelas curtas de controle; populações resistentes.",
        manejo:"Pré (pendimethalin, S-metolacloro) + pós precoce com graminicidas seletivos; plantas de cobertura e descompactação.",
        img:"capim-pé-de-galinha.jpg" },
      { id:"caruru", nome:"Caruru (Amaranthus spp.)",
        impacto:"Pode causar perdas muito altas; 500k sementes/planta; resistência a glifosato/ALS.",
        manejo:"Pré (flumioxazina, S-metolacloro). Pós (fomesafen, lactofen, imazaquin). Evitar glifosato isolado; arrancar plantas grandes; rotação.",
        img:"caruru.jpg" },
      { id:"amendoim-bravo", nome:"Leiteiro/Mamona-brava (Euphorbia heterophylla)",
        impacto:"Hospedeira de vírus; látex; interfere no estande e colheita.",
        manejo:"Misturas registradas e aplicação cedo (2–4 folhas); desinfecção de equipamentos; impedir florescimento.",
        img:"mamona.jpg" }
    ]
  },

  feijao: {
    nome: "Feijão (1ª, 2ª e 3ª safras)",
    lead: "Ciclos curtos e emergência escalonada pedem vigilância constante e controle em plântula.",
    facts: [
      {k: "Janela crítica", v: "Da emergência ao fechamento das entrelinhas"},
      {k: "Pontos de atenção", v: "Gramíneas iniciais e folhas largas de alto banco de sementes"},
      {k: "Diretriz de manejo", v: "Pré-emergentes + capinas pontuais + inspeções pós-chuva"}
    ],
    plantas: [
      { id:"picao-preto", nome:"Picão-preto (Bidens pilosa)",
        impacto:"Alta sementeira e depreciação de grãos; emergência após chuvas.",
        manejo:"Pré + capina localizada antes da floração; cobertura do solo.",
        img:"picao-preto.jpg" },
      { id:"capim-pe-de-galinha", nome:"Capim-pé-de-galinha (Eleusine indica)",
        impacto:"Compete forte por água na fase inicial.",
        manejo:"Graminicidas em pós precoce; evitar estresse hídrico/cultural.",
        img:"capim-pé-de-galinha.jpg" },
      { id:"amendoim-bravo", nome:"Leiteiro/Mamona-brava (Euphorbia heterophylla)",
        impacto:"Alta plasticidade; atrapalha colheita; látex tóxico.",
        manejo:"Misturas em timing correto; EPI na capina; impedir produção de sementes.",
        img:"mamona.jpg" },
      { id:"caruru", nome:"Caruru (Amaranthus spp.)",
        impacto:"Sombreamento agressivo; crescimento rápido.",
        manejo:"Rotação de culturas e MOA; controle ainda na fase de plântula.",
        img:"caruru.jpg" }
    ]
  },

  cafe: {
    nome: "Café",
    lead: "Manter ruas e sob a ‘saia’ limpos reduz competição por água e luz; cuidado com perenes e tiriricas.",
    facts: [
      {k: "Condição desejável", v: "Coberturas manejadas + seletividade no entrelinhas"},
      {k: "Risco", v: "Gramíneas perenes e Cyperus (bancos de tubérculos)"},
      {k: "Diretriz de manejo", v: "Intervenções antes da emissão de panículas/inflorescências"}
    ],
    plantas: [
      { id:"tiririca", nome:"Tiririca (Cyperus rotundus)",
        impacto:"Tubérculos persistentes; rebrota.",
        manejo:"Programas com repetições; integração químico + cultural.",
        img:"tiririca.jpg" },
      { id:"picao-preto", nome:"Picão-preto (Bidens pilosa)",
        impacto:"Infesta ruas; deprecia colheita.",
        manejo:"Pós de contato em plantas jovens + manejo de cobertura.",
        img:"picao-preto.jpg" },
      { id:"sida", nome:"Guanxuma (Sida spp.)",
        impacto:"Caule lenhoso; rebrote após corte.",
        manejo:"Misturas adequadas e apoio mecânico; evitar florescimento.",
        img:"guanxuma.jpg" }
    ]
  },

  trigo: {
    nome: "Trigo",
    lead: "Parte da área migra a forrageiras por custo/seguro; foco em manejar gramíneas e folhas largas resistentes.",
    facts: [
      {k: "Ponto crítico", v: "Estabelecimento e perfilhamento"},
      {k: "Pontos de atenção", v: "Azevém, buva e nabo-silvestre"},
      {k: "Diretriz de manejo", v: "Pré + pós com MOA distintos e monitoramento"}
    ],
    plantas: [
      { id:"azevem", nome:"Azevém (Lolium multiflorum)",
        impacto:"Resistência frequente; grande competição.",
        manejo:"Pré + pós com MOA alternados; controle antecipado.",
        img:"azevem.jpg" },
      { id:"nabo-silvestre", nome:"Nabo-silvestre (Raphanus raphanistrum)",
        impacto:"Alta sementeira; contamina colheita.",
        manejo:"Controle antes da floração; coberturas e rotação.",
        img:"nabo silvestre.jpg" },
      { id:"buva", nome:"Buva (Conyza spp.)",
        impacto:"Dificulta estabelecimento; resistente.",
        manejo:"Dessecação escalonada; pré + pós cedo; evitar glifosato isolado.",
        img:"buva.jpg" }
    ]
  },

  mandioca: {
    nome: "Mandioca e Amendoim",
    lead: "Mandioca em dois ciclos com colheita avançada; amendoim tardio com boa produtividade; atenção a perenes e trepadeiras.",
    facts: [
      {k: "Status", v: "Colheita avançada (mandioca)"},
      {k: "Desafio", v: "Perenes (rizomas/tubérculos) e trepadeiras"},
      {k: "Diretriz de manejo", v: "Pré específicos + coberturas + ações repetidas"}
    ],
    plantas: [
      { id:"amendoim-bravo", nome:"Leiteiro/Mamona-brava (Euphorbia heterophylla)",
        impacto:"Interfere no arranquio; látex.",
        manejo:"Aplicações em estádios iniciais; impedir florescimento.",
        img:"mamona.jpg" },
      { id:"tiririca", nome:"Tiririca (Cyperus rotundus)",
        impacto:"Bulbilhos; rebrota persistente.",
        manejo:"Programas repetidos e integração mecânica.",
        img:"tiririca.jpg" },
      { id:"corda-de-viola", nome:"Corda-de-viola (Ipomoea spp.)",
        impacto:"Enrosca plantas e máquinas; perdas na colheita.",
        manejo:"Controle antes de florescer; roçadas dirigidas.",
        img:"corda de viola.jpg" }
    ]
  }
};

const state = {
  get username(){ return localStorage.getItem("username") || ""; },
  set username(v){ localStorage.setItem("username", v || ""); },
  crop: ""
};

const $loginScreen   = document.getElementById("screen-login");
const $chooserScreen = document.getElementById("screen-chooser");
const $cropScreen    = document.getElementById("screen-crop");

const $loginForm     = document.getElementById("login-form");
const $usernameInput = document.getElementById("username");
const $helloUser     = document.getElementById("hello-user");
const $btnLogout     = document.getElementById("btn-logout");

const $cropGrid      = document.getElementById("crop-grid");
const $btnBack       = document.getElementById("btn-back");

const $cropTitle     = document.getElementById("crop-title");
const $cropLead      = document.getElementById("crop-lead");
const $cropFacts     = document.getElementById("crop-facts");
const $btnShowPlants = document.getElementById("btn-show-plants");
const $catalog       = document.getElementById("catalog");

function show(screen){
  [$loginScreen,$chooserScreen,$cropScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
  if (screen === $loginScreen) setTimeout(() => $usernameInput?.focus(), 0);
}

function updateHeader(){
  $helloUser.textContent = state.username ? `Olá, ${state.username}!` : "";
  $btnLogout.style.display = state.username ? "inline-flex" : "none";
}

$loginForm?.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const name = ($usernameInput?.value || "").trim();
  if (!name) return $usernameInput?.focus();
  state.username = name;
  updateHeader();
  renderCropChooser();
  show($chooserScreen);
});

$btnLogout?.addEventListener("click", () => {
  localStorage.removeItem("username");
  state.username = "";
  updateHeader();
  show($loginScreen);
});

function renderCropChooser(){
  $cropGrid.innerHTML = "";
  Object.entries(SAFRAS).forEach(([key, data]) => {
    const card = document.createElement("article");
    card.className = "crop-card";
    card.setAttribute("role","listitem");
    card.innerHTML = `
      <h3>${data.nome}</h3>
      <p>${data.lead}</p>
      <div class="actions">
        <button class="btn btn-accent" type="button" data-crop="${key}">Explorar</button>
      </div>
    `;
    $cropGrid.appendChild(card);
  });
}

let cropGridBound = false;
function bindCropGrid(){
  if (cropGridBound) return;
  cropGridBound = true;
  $cropGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-crop]");
    if (!btn) return;
    const key = btn.getAttribute("data-crop");
    openCrop(key);
  });
}

function openCrop(key){
  state.crop = key;
  const data = SAFRAS[key];
  if (!data) return;

  $cropTitle.textContent = data.nome;
  $cropLead.textContent  = data.lead;

  $cropFacts.innerHTML = "";
  data.facts?.forEach(({k,v}) => {
    const el = document.createElement("div");
    el.className = "fact";
    el.innerHTML = `<span class="kicker">${k}</span><span class="text">${v}</span>`;
    $cropFacts.appendChild(el);
  });

  $catalog.innerHTML = "";
  show($cropScreen);
}

$btnBack?.addEventListener("click", () => {
  show($chooserScreen);
  $catalog.innerHTML = "";
});

$btnShowPlants?.addEventListener("click", () => {
  renderPlants(state.crop);
});

function renderPlants(cropKey){
  const data = SAFRAS[cropKey];
  if (!data) return;
  const base = IMAGE_BASE;

  $catalog.innerHTML = "";
  data.plantas.forEach((p, idx) => {
    const card = document.createElement("article");
    card.className = "weed-card";

    const imgWrap = document.createElement("div");
    imgWrap.className = "weed-media";
    const img = document.createElement("img");
    img.className = "weed-img";
    const src = p.img ? `${base}/${p.img}` : "";
    img.src = p.img ? src : placeholderFor(p.nome);
    img.alt = `Imagem de ${p.nome}`;
    img.onerror = () => { img.src = placeholderFor(p.nome); };
    imgWrap.appendChild(img);

    const body = document.createElement("div");
    body.className = "weed-body";

    const title = document.createElement("h3");
    title.className = "weed-title";
    title.textContent = p.nome;

    const meta = document.createElement("div");
    meta.className = "weed-meta";
    const b1 = document.createElement("span");
    b1.className = "badge"; b1.textContent = `Prioridade ${idx+1}`;
    const b2 = document.createElement("span");
    b2.className = "badge"; b2.textContent = p.impacto || "Impacto: —";
    meta.append(b1, b2);

    const desc = document.createElement("p");
    desc.className = "weed-desc";
    desc.textContent = p.manejo ? `${p.manejo}` : (p.descricao || "");

    body.append(title, meta, desc);
    card.append(imgWrap, body);
    $catalog.appendChild(card);
  });
}

(function init(){
  updateHeader();
  if (state.username){
    renderCropChooser();
    show($chooserScreen);
  } else {
    show($loginScreen);
  }
  bindCropGrid();
  $usernameInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") $loginForm.requestSubmit();
  });
})();
