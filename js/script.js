/* Progressive enhancement: content and project links work without JavaScript. */
"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function initTheme() {
  const button = $("#themeToggle");
  if (!button) return;
  const key = "arthur-portfolio-tema";
  let saved = null;
  try {
    saved = localStorage.getItem(key);
  } catch {
    /* Private mode may block storage. */
  }
  if (!["light", "dark"].includes(saved)) saved = null;

  function apply(theme) {
    document.body.dataset.theme = theme;
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.setAttribute(
      "aria-label",
      `Ativar tema ${theme === "dark" ? "claro" : "escuro"}`,
    );
    button.title = button.getAttribute("aria-label");
  }
  apply(saved || "dark");
  button.hidden = false;
  button.addEventListener("click", () => {
    saved = document.body.dataset.theme === "dark" ? "light" : "dark";
    apply(saved);
    try {
      localStorage.setItem(key, saved);
    } catch {
      /* The toggle still works. */
    }
  });
}

function initMenu() {
  const toggle = $("#navToggle");
  const menu = $("#navMenu");
  if (!toggle || !menu) return;
  const mobile = window.matchMedia("(max-width: 800px)");
  menu.classList.add("is-enhanced");
  toggle.hidden = false;

  function setOpen(open, restoreFocus = false) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.inert = mobile.matches && !open;
    if (restoreFocus) toggle.focus();
  }
  setOpen(false);
  toggle.addEventListener("click", () =>
    setOpen(toggle.getAttribute("aria-expanded") !== "true"),
  );
  $$("a", menu).forEach((link) =>
    link.addEventListener("click", () => {
      if (mobile.matches) setOpen(false, true);
    }),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open"))
      setOpen(false, true);
  });
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target))
      setOpen(false);
  });
  document.addEventListener("focusin", (event) => {
    if (
      mobile.matches &&
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    )
      setOpen(false);
  });
  mobile.addEventListener("change", () => setOpen(false));
}

function initFilters() {
  const controls = $(".filters");
  // Os filtros foram removidos da página; sem esta verificação o script
  // parava aqui e desligava galeria, certificados, cópia e formulário.
  if (!controls) return;
  const buttons = $$(".filter", controls);
  const cards = $$(".project-card");
  const count = $("#projectCount");
  controls.hidden = false;
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      buttons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      let visible = 0;
      cards.forEach((card) => {
        const matches =
          category === "todos" ||
          card.dataset.categories.split(" ").includes(category);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      count.textContent = `${visible} ${visible === 1 ? "projeto selecionado" : "projetos selecionados"}`;
    }),
  );
}

function initGallery() {
  const dialog = $("#lightbox");
  const links = $$("[data-gallery-item]");
  if (!dialog || !links.length || typeof dialog.showModal !== "function") return;
  const items = [
    ...new Map(
      links.map((link) => [
        link.dataset.image,
        {
          src: link.dataset.image,
          title: link.dataset.title,
        },
      ]),
    ).values(),
  ];
  const picture = $("#lightboxImage");
  const caption = $("#lightboxCaption");
  const counter = $("#lightboxCounter");
  const error = $("#lightboxError");
  let current = 0;
  let lastFocus = null;

  function render() {
    const item = items[current];
    error.hidden = true;
    picture.hidden = false;
    picture.alt = item.title;
    picture.src = item.src;
    caption.textContent = item.title;
    counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
    $("#lightboxOriginal").href = item.src;
  }
  function navigate(step) {
    current = (current + step + items.length) % items.length;
    render();
  }
  picture.addEventListener("error", () => {
    picture.hidden = true;
    error.hidden = false;
  });
  links.forEach((link) =>
    link.addEventListener("click", (event) => {
      // Preserve opening the original image in a new tab with Ctrl/Cmd/click.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      current = items.findIndex((item) => item.src === link.dataset.image);
      lastFocus = link;
      render();
      dialog.showModal();
      document.body.classList.add("modal-open");
    }),
  );
  $("#lightboxFechar").addEventListener("click", () => dialog.close());
  $("#lightboxAnterior").addEventListener("click", () => navigate(-1));
  $("#lightboxProximo").addEventListener("click", () => navigate(1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      const controls = $$("button:not([disabled]), a[href]", dialog).filter(
        (element) => element.getClientRects().length,
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      navigate(event.key === "ArrowLeft" ? -1 : 1);
    }
  });
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (event.target === dialog && outside) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
  });
}

function initCertificates() {
  const dialog = $("#certificateModal");
  const cards = $$("[data-certificate-card]");
  if (!dialog || !cards.length || typeof dialog.showModal !== "function") return;

  const picture = $("#certificateModalImage");
  const title = $("#certificateModalTitle");
  const loading = $("#certificateModalLoading");
  const error = $("#certificateModalError");
  const status = $("#certificateModalStatus");
  const linkedin = $("#certificateLinkedInButton");
  const close = $("#certificateModalClose");
  let lastFocus = null;

  function lockLinkedIn() {
    linkedin.setAttribute("aria-disabled", "true");
    linkedin.tabIndex = -1;
    linkedin.classList.add("is-disabled");
    status.textContent =
      "O LinkedIn será liberado depois que a imagem do certificado carregar.";
  }

  function unlockLinkedIn() {
    linkedin.setAttribute("aria-disabled", "false");
    linkedin.tabIndex = 0;
    linkedin.classList.remove("is-disabled");
    status.textContent =
      "Certificado carregado. Agora você pode abrir a credencial no LinkedIn.";
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      lastFocus = card;
      title.textContent = card.dataset.title || "Certificado";
      linkedin.href = card.dataset.linkedin || "#";
      lockLinkedIn();
      error.hidden = true;
      loading.hidden = false;
      picture.hidden = true;
      picture.alt = card.dataset.title
        ? `Certificado: ${card.dataset.title}`
        : "Certificado";
      picture.removeAttribute("src");

      dialog.showModal();
      document.body.classList.add("modal-open");
      picture.src = card.dataset.image;
    });
  });

  picture.addEventListener("load", () => {
    loading.hidden = true;
    error.hidden = true;
    picture.hidden = false;
    unlockLinkedIn();
  });

  picture.addEventListener("error", () => {
    loading.hidden = true;
    picture.hidden = true;
    error.hidden = false;
    lockLinkedIn();
    status.textContent =
      "A imagem não carregou, então o botão do LinkedIn continua bloqueado.";
  });

  linkedin.addEventListener("click", (event) => {
    if (linkedin.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
    }
  });

  close.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (event.target === dialog && outside) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = $$(
      'button:not([disabled]), a[href]:not([aria-disabled="true"])',
      dialog,
    ).filter((element) => element.getClientRects().length);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    picture.removeAttribute("src");
    picture.hidden = true;
    loading.hidden = false;
    error.hidden = true;
    lockLinkedIn();
    if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
  });
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 4500);
}

function initCopy() {
  if (!$("#toast")) return;
  $$("[data-copy]").forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        showToast(`${button.dataset.copyLabel} copiado!`);
      } catch {
        showToast(`Copie manualmente: ${button.dataset.copy}`);
      }
    });
  });
}

function initContact() {
  const form = $("#contactForm");
  if (!form) return;
  const name = $("#contactName");
  const email = $("#contactEmail");
  const message = $("#contactMessage");
  const status = $("#formStatus");
  const draftLink = document.createElement("a");
  draftLink.id = "preparedEmail";
  draftLink.hidden = true;
  draftLink.textContent = "Abrir mensagem no aplicativo de e-mail";
  form.append(draftLink);
  form.hidden = false;
  [name, email, message].forEach((input) =>
    input.addEventListener("input", () => {
      input.setCustomValidity("");
      status.textContent = "";
    }),
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    name.setCustomValidity(
      name.value.trim().length < 2 ? "Informe seu nome." : "",
    );
    message.setCustomValidity(
      message.value.trim().length < 10
        ? "Escreva uma mensagem com pelo menos 10 caracteres."
        : "",
    );
    if (!form.reportValidity()) return;
    const subject = `Contato pelo portfólio — ${name.value.trim()}`;
    const body = `Olá, Arthur!\n\n${message.value.trim()}\n\nNome: ${name.value.trim()}\nE-mail: ${email.value.trim()}`;
    draftLink.href = `mailto:arthurhpb7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    draftLink.click();
    status.textContent =
      "Mensagem preparada. Revise e envie no seu aplicativo de e-mail. Se ele não abrir, use o endereço ao lado.";
  });
}

function initActiveNavigation() {
  if (!("IntersectionObserver" in window)) return;
  const links = $$("#navMenu a");
  const sections = links
    .filter((link) => link.getAttribute("href").startsWith("#"))
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          if (link.hash === `#${entry.target.id}`)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
  );
  sections.forEach((section) => observer.observe(section));
}

/* ---------- Animações ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* Revela blocos ao rolar. Só esconde o que ainda está fora da tela,
   então nada pisca e o conteúdo continua visível sem JavaScript. */
function initReveal() {
  if (reduceMotion.matches || !("IntersectionObserver" in window)) return;
  const groups = [
    [".section-heading, .about__heading, .contact__copy, .journey__subtitle", "up"],
    [".project-manifesto", "up"],
    [".projects-grid > *", "up", 110],
    [".gallery__item", "pop", 80],
    [".about__content > *", "up", 90],
    [".timeline li, .experience", "up", 120],
    [".certificates-list > *, .certifications__list > *", "side", 45],
    [".contact__form-wrap", "up"],
    [".projects-bottom", "up"],
  ];
  const viewport = window.innerHeight;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        element.classList.add("is-visible");
        observer.unobserve(element);
        // Depois da entrada, devolve as transições originais (hover dos cards).
        const delay = parseFloat(element.style.getPropertyValue("--reveal-delay")) || 0;
        setTimeout(() => {
          element.classList.remove("reveal", "is-visible", "reveal--up", "reveal--pop", "reveal--side");
          element.style.removeProperty("--reveal-delay");
        }, 900 + delay);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  groups.forEach(([selector, kind, stagger = 0]) => {
    $$(selector).forEach((element, index) => {
      if (element.getBoundingClientRect().top < viewport * 0.92) return;
      element.classList.add("reveal", `reveal--${kind}`);
      if (stagger) element.style.setProperty("--reveal-delay", `${(index % 6) * stagger}ms`);
      observer.observe(element);
    });
  });
}

/* Cabeçalho compacto e barra de progresso de leitura. */
function initScrollEffects() {
  const header = $(".site-header");
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.append(bar);
  let ticking = false;
  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${progress})`;
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/* Inclinação 3D na foto e luz que segue o mouse nas capas (só com mouse). */
function initTilt() {
  if (reduceMotion.matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  $$(".hero__frame, .project-cover").forEach((element) => {
    const strength = element.classList.contains("hero__frame") ? 6 : 0;
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (strength) {
        element.style.setProperty("--tilt-x", `${(-y * strength).toFixed(2)}deg`);
        element.style.setProperty("--tilt-y", `${(x * strength).toFixed(2)}deg`);
      }
      element.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      element.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    });
    element.addEventListener("pointerleave", () => {
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
    });
  });
}

initTheme();
initMenu();
initFilters();
initGallery();
initCertificates();
initCopy();
initContact();
initActiveNavigation();
initReveal();
initScrollEffects();
initTilt();
const currentYear = $("#anoAtual");
if (currentYear) currentYear.textContent = new Date().getFullYear();
