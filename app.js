(() => {
  "use strict";
  const data = window.CHRONIK;
  if (!data || !Array.isArray(data.chapters) || !Array.isArray(data.characters)) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
  const chapterList = $("#chapter-list");
  const reader = $("#kapitel-leser");
  let active = Math.max(0, data.chapters.length - 1);

  function chapterDate(chapter) {
    if (chapter.date) {
      const parsed = new Date(`${chapter.date}T12:00:00`);
      if (!Number.isNaN(parsed.valueOf())) {
        return new Intl.DateTimeFormat("de-AT", {day:"2-digit", month:"long", year:"numeric"}).format(parsed) + (chapter.time ? ` · ${chapter.time} Uhr` : "");
      }
    }
    return chapter.dateLabel || "Datum noch offen";
  }

  function renderChapters() {
    chapterList.innerHTML = data.chapters.map((chapter, index) => `
      <button type="button" class="chapter-nav-item ${index === active ? "is-active" : ""}" data-chapter="${index}" aria-current="${index === active ? "true" : "false"}">
        <span class="chapter-nav-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="chapter-nav-text"><span class="chapter-nav-kicker">${esc(chapter.label)}</span><strong>${esc(chapter.title)}</strong><small>${esc(chapterDate(chapter))}</small></span>
        <span class="chapter-nav-arrow" aria-hidden="true">↗</span>
      </button>`).join("");
    $("#hero-chapter-count").textContent = $("#chapter-counter").textContent = String(data.chapters.length).padStart(2,"0");
  }

  function renderReader() {
    const chapter = data.chapters[active];
    $("#reader-image").src = chapter.image;
    $("#reader-image").alt = chapter.imageAlt || chapter.title;
    $("#reader-image-mark").textContent = chapter.label;
    $("#reader-label").textContent = chapter.label.toUpperCase();
    $("#reader-date").textContent = chapterDate(chapter);
    if (chapter.date) $("#reader-date").setAttribute("datetime", chapter.date + (chapter.time ? `T${chapter.time}` : ""));
    else $("#reader-date").removeAttribute("datetime");
    $("#reader-title").textContent = chapter.title;
    $("#reader-subtitle").textContent = chapter.subtitle || "";
    $("#reader-prose").innerHTML = (chapter.state === "draft" ? '<div class="draft-indicator">✧ Szenenentwurf · noch keine bestätigte Spielhandlung</div>' : "")
      + (chapter.paragraphs || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join("");
    $("#reader-location").textContent = chapter.location || "Ort unbekannt";
    $("#prev-chapter").disabled = active === 0;
    $("#next-chapter").disabled = active === data.chapters.length - 1;
    [...chapterList.querySelectorAll("[data-chapter]")].forEach((el, idx) => {
      el.classList.toggle("is-active", idx === active);
      el.setAttribute("aria-current", idx === active ? "true" : "false");
    });
  }

  function chooseChapter(index, scroll = false) {
    active = Math.min(data.chapters.length - 1, Math.max(0, Number(index)));
    renderReader();
    if (history.replaceState) history.replaceState(null, "", `#${data.chapters[active].id}`);
    if (scroll) reader.scrollIntoView({behavior: "smooth", block: "start"});
  }

  chapterList.addEventListener("click", (evt) => {
    const target = evt.target.closest("[data-chapter]");
    if (target) chooseChapter(target.dataset.chapter, window.innerWidth < 850);
  });
  $("#prev-chapter").addEventListener("click", () => chooseChapter(active - 1));
  $("#next-chapter").addEventListener("click", () => chooseChapter(active + 1));

  function renderCharacters() {
    $("#characters").innerHTML = data.characters.map((c, index) => `
      <article class="character-card accent-${esc(c.color)}">
        <div class="character-photo ${!c.image ? "is-placeholder" : ""}">
          ${c.image ? `<img src="${esc(c.image)}" alt="${esc(c.imageAlt)}">` : `<div class="placeholder-graphic" aria-label="Porträt folgt"><span class="placeholder-rune">✦</span><span class="placeholder-initial">${esc(c.name.slice(0,1))}</span><span class="placeholder-caption">PORTRÄT FOLGT</span></div>`}
          <div class="character-index">0${index+1}</div>
          <div class="character-photo-gradient"></div>
          <div class="character-photo-tag">${esc(c.species)} · ${esc(c.height)}</div>
        </div>
        <div class="character-info">
          <div class="character-overline">${esc(c.role)}</div>
          <h3>${esc(c.name)}</h3>
          <div class="character-class">${esc(c.characterClass)}</div>
          <p>${esc(c.description)}</p>
          <button class="character-link" type="button" data-character="${esc(c.id)}" aria-label="Mehr zu ${esc(c.name)} erfahren">Charakter ansehen <span aria-hidden="true">↗</span></button>
        </div>
      </article>`).join("");
  }

  function renderTimeline() {
    $("#timeline").innerHTML = data.chapters.map((c, i) => `
      <button type="button" class="timeline-entry" data-timeline="${i}" aria-label="${esc(c.label)} öffnen: ${esc(c.title)}">
        <div class="timeline-marker"><span>${String(i+1).padStart(2,"0")}</span></div>
        <div class="timeline-text"><div class="timeline-event">${esc(c.session)} <span>·</span> ${esc(chapterDate(c))}</div><h3>${esc(c.title)}</h3><p>${esc(c.summary || "")}</p><div class="timeline-place">⌖ ${esc(c.location)}</div></div>
        <div class="timeline-more" aria-hidden="true">↗</div>
      </button>`).join("");
    $("#timeline").addEventListener("click", (evt) => {
      const target = evt.target.closest("[data-timeline]");
      if (target) chooseChapter(target.dataset.timeline, true);
    });
  }

  const detailDialog = $("#detail-dialog");
  $("#characters").addEventListener("click", (evt) => {
    const btn = evt.target.closest("[data-character]");
    if (!btn) return;
    const c = data.characters.find(ch => ch.id === btn.dataset.character);
    if (!c) return;
    $("#detail-body").innerHTML = `
      <div class="detail-layout">
        <div class="detail-image ${c.image ? "" : "detail-no-photo"}">${c.image ? `<img src="${esc(c.image)}" alt="${esc(c.imageAlt)}">` : '<div class="detail-placeholder">✦</div>'}</div>
        <div class="detail-copy">
          <div class="section-kicker">EINTRAG AUS DER GEFÄHRTENGALERIE</div>
          <h2 id="detail-title">${esc(c.name)}</h2><div class="detail-role">${esc(c.role)} · ${esc(c.characterClass)}</div>
          <p>${esc(c.description)}</p>
          <dl class="detail-facts"><div><dt>Volk</dt><dd>${esc(c.species)}</dd></div><div><dt>Größe</dt><dd>${esc(c.height)}</dd></div><div><dt>Alter</dt><dd>${esc(c.age)}</dd></div></dl>
          <div class="detail-quote-label">LEITSPRUCH · ENTWURF</div><blockquote>„${esc(c.quote)}“</blockquote>
          <div class="detail-specialties">${c.specialties.map(t => `<span>${esc(t)}</span>`).join("")}</div>
        </div>
      </div>`;
    detailDialog.showModal();
  });
  $("#detail-close").addEventListener("click", () => detailDialog.close());
  detailDialog.addEventListener("click", (evt) => {if (evt.target === detailDialog) detailDialog.close();});

  const imageDialog = $("#image-dialog");
  $("#reader-expand").addEventListener("click", () => {
    const c = data.chapters[active];
    $("#image-dialog-img").src = c.image;
    $("#image-dialog-img").alt = c.imageAlt;
    $("#image-dialog-caption").textContent = c.title;
    imageDialog.showModal();
  });
  $("#image-close").addEventListener("click", () => imageDialog.close());
  imageDialog.addEventListener("click", (evt) => {if (evt.target === imageDialog) imageDialog.close();});

  const menuBtn = $("#menu-toggle");
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
    $("#main-nav").classList.toggle("open", !expanded);
  });
  $("#main-nav").addEventListener("click", (evt) => {
    if (evt.target.closest("a")) {
      $("#main-nav").classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  renderChapters();
  renderCharacters();
  renderTimeline();
  const hashId = decodeURIComponent(location.hash.slice(1));
  const found = data.chapters.findIndex(c => c.id === hashId);
  if (found >= 0) active = found;
  renderReader();
})();
