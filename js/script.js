/* ============================================================
   ARTHUR HENRIQUE — PORTFÓLIO
   JavaScript: tema claro/escuro, menu mobile, filtro de projetos,
   galeria/lightbox, copiar e-mail/telefone e revelação ao rolar.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTema();
  initMenu();
  initFiltros();
  initGaleria();
  initCopiar('copiarEmail', 'emailTexto', 'E-mail copiado!');
  initCopiar('copiarTelefone', 'telefoneTexto', 'Telefone copiado!');
  initRevelacaoScroll();
  document.getElementById('anoAtual').textContent = new Date().getFullYear();
});

/* ---------- Tema claro/escuro ---------- */
function initTema() {
  const body = document.body;
  const botao = document.getElementById('themeToggle');
  const salvo = localStorage.getItem('arthur-portfolio-tema');
  const preferSistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const temaInicial = salvo || (preferSistemaEscuro ? 'dark' : 'light');
  body.setAttribute('data-theme', temaInicial);

  botao.addEventListener('click', () => {
    const atual = body.getAttribute('data-theme');
    const novo = atual === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', novo);
    localStorage.setItem('arthur-portfolio-tema', novo);
  });
}

/* ---------- Menu mobile ---------- */
function initMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', () => {
    const aberto = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(aberto));
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Filtro de projetos ---------- */
function initFiltros() {
  const botoes = document.querySelectorAll('.filtro');
  const cards = document.querySelectorAll('.projeto-card');

  function aplicarFiltro(categoria) {
    cards.forEach(card => {
      const categorias = card.dataset.categorias.split(' ');
      const mostrar = categoria === 'todos' || categorias.includes(categoria);
      card.classList.toggle('is-visible', mostrar);
    });
  }

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      botoes.forEach(b => b.classList.remove('filtro--ativo'));
      botao.classList.add('filtro--ativo');
      aplicarFiltro(botao.dataset.filtro);
    });
  });

  aplicarFiltro('todos');
}

/* ---------- Galeria / lightbox ---------- */

function initGaleria() {

  const itens = Array.from(
    document.querySelectorAll('[data-gallery-item]')
  );

  const lightbox = document.getElementById('lightbox');
  const imagemContainer = document.getElementById('lightboxImagem');
  const legenda = document.getElementById('lightboxLegenda');

  const btnFechar = document.getElementById('lightboxFechar');
  const btnAnterior = document.getElementById('lightboxAnterior');
  const btnProximo = document.getElementById('lightboxProximo');

  let indiceAtual = 0;
  let ultimoFoco = null;


  function carregarImagem() {

    const item = itens[indiceAtual];

    const print = item.querySelector('.galeria-print');

    if (!print) {
      console.error('Print não encontrado:', item);
      return;
    }

    legenda.textContent = item.dataset.titulo || '';

    imagemContainer.innerHTML = '';

    const img = document.createElement('img');

    img.src = print.src;
    img.alt = print.alt || item.dataset.titulo || 'Imagem do projeto';

    imagemContainer.appendChild(img);
  }


  function abrir(indice) {

    indiceAtual = indice;

    carregarImagem();

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');

    ultimoFoco = document.activeElement;

    btnFechar.focus();

    document.body.style.overflow = 'hidden';
  }


  function fechar() {

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');

    imagemContainer.innerHTML = '';

    document.body.style.overflow = '';

    if (ultimoFoco) {
      ultimoFoco.focus();
    }
  }


  function navegar(direcao) {

    indiceAtual =
      (indiceAtual + direcao + itens.length) % itens.length;

    carregarImagem();
  }


  itens.forEach((item, indice) => {

    item.addEventListener('click', (evento) => {

      /*
       * Impede que o clique em qualquer imagem interna
       * seja tratado de forma diferente.
       */
      evento.preventDefault();

      abrir(indice);

    });

  });


  btnFechar.addEventListener('click', fechar);


  btnAnterior.addEventListener('click', () => {
    navegar(-1);
  });


  btnProximo.addEventListener('click', () => {
    navegar(1);
  });


  lightbox.addEventListener('click', (evento) => {

    if (evento.target === lightbox) {
      fechar();
    }

  });


  document.addEventListener('keydown', (evento) => {

    if (!lightbox.classList.contains('is-open')) {
      return;
    }

    if (evento.key === 'Escape') {
      fechar();
    }

    if (evento.key === 'ArrowLeft') {
      navegar(-1);
    }

    if (evento.key === 'ArrowRight') {
      navegar(1);
    }

  });

}

/* ---------- Copiar e-mail / telefone ---------- */
function initCopiar(idBotao, idTexto, mensagemSucesso) {
  const botao = document.getElementById(idBotao);
  const elementoTexto = document.getElementById(idTexto);
  if (!botao || !elementoTexto) return;

  const valor = elementoTexto.textContent.trim();

  botao.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(valor);
      mostrarToast(mensagemSucesso);
    } catch (erro) {
      mostrarToast('Não foi possível copiar. Copie manualmente: ' + valor);
    }
  });
}

let toastTimeoutId;
function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');
  toast.textContent = mensagem;
  toast.classList.add('is-visible');
  clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

/* ---------- Revelação suave ao rolar a página ---------- */
function initRevelacaoScroll() {
  const alvos = document.querySelectorAll('.section, .projeto-card, .cert-card, .timeline__item');
  alvos.forEach(alvo => alvo.setAttribute('data-reveal', ''));

  if (!('IntersectionObserver' in window)) {
    alvos.forEach(alvo => alvo.classList.add('is-visible'));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  alvos.forEach(alvo => observador.observe(alvo));
}
