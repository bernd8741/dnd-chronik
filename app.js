(() => {
  "use strict";
  const data = window.CHRONIK;
  if (!data || !Array.isArray(data.chapters) || !Array.isArray(data.characters)) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
  const chapterList = $("#chapter-list");
  const reader = $("#kapitel-leser");
  let active = Math.max(0, data.chapters.length - 1);
  const readerAudio = $("#reader-audio");
  const readerAudioWrap = $("#reader-audio-wrap");
  const readerAudioDownload = $("#reader-audio-download");
  const readerGallery = $("#reader-gallery");
  const readerGalleryList = $("#reader-gallery-list");

  // Zwei Lesemodi, eine gemeinsame Quelle für Text, Hörfassung und Bilder.
  // Die Audiowiedergabe wird beim Moduswechsel nicht neu geladen.
  const classicView = $("#reader-classic");
  const bookView = $("#magic-book");
  const bookCover = $("#magic-book-cover");
  const bookOpenView = $("#magic-book-open");
  const bookSpread = $("#magic-book-spread");
  const bookMeasureBody = $("#magic-book-measure-body");
  const bookLeft = $("#magic-book-page-left");
  const bookRight = $("#magic-book-page-right");
  const bookStatus = $("#magic-book-page-status");
  const narrowBook = window.matchMedia("(max-width: 1120px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let readerMode = "book";
  try {
    readerMode = localStorage.getItem("chronik-reader-mode") === "classic" ? "classic" : "book";
  } catch (_) {
    readerMode = "book";
  }
  let bookOpened = false;
  let bookPages = [];
  let bookPageIndex = 0;
  let bookTurning = false;
  let bookResizeTimer = null;

  function setReaderMode(mode, scrollToTop = true) {
    readerMode = mode === "classic" ? "classic" : "book";
    classicView.hidden = readerMode !== "classic";
    bookView.hidden = readerMode !== "book";
    $("#reader-mode-classic").setAttribute("aria-pressed", String(readerMode === "classic"));
    $("#reader-mode-book").setAttribute("aria-pressed", String(readerMode === "book"));
    $("#reader-mode-classic").classList.toggle("is-active", readerMode === "classic");
    $("#reader-mode-book").classList.toggle("is-active", readerMode === "book");
    (readerMode === "book" ? $("#magic-book-audio-slot") : $("#classic-audio-slot")).appendChild(readerAudioWrap);
    (readerMode === "book" ? $("#magic-book-gallery-slot") : $("#classic-gallery-slot")).appendChild(readerGallery);
    try { localStorage.setItem("chronik-reader-mode", readerMode); } catch (_) {}
    if (readerMode === "book" && bookOpened) {
      requestAnimationFrame(paginateBook);
    }
    if (scrollToTop) reader.scrollIntoView({behavior:"instant",block:"start"});
  }

  function updateBookChapter() {
    const chapter = data.chapters[active];
    bookOpened = false;
    bookTurning = false;
    bookPageIndex = 0;
    bookPages = [];
    bookSpread.classList.remove("is-turning-next", "is-turning-prev");
    bookCover.hidden = false;
    bookOpenView.hidden = true;
    $("#magic-book-cover-label").textContent = chapter.label;
    $("#magic-book-cover-title").textContent = chapter.title;
    $("#magic-book-cover-subtitle").textContent = chapter.subtitle || "";
    const coverImg = $("#magic-book-cover-image");
    coverImg.src = chapter.image;
    coverImg.alt = chapter.imageAlt || chapter.title;
    $("#magic-book-prev-chapter").disabled = active === 0;
    $("#magic-book-next-chapter").disabled = active === data.chapters.length - 1;
    bookStatus.textContent = "";
  }

  function bookTokens(rawParagraph) {
    // **Fettschrift** aus dem bestätigten Kapiteltext ohne HTML-Duplikat übernehmen.
    return String(rawParagraph || "").split("**").flatMap((piece, index) =>
      (piece.match(/\S+\s*/g) || []).map(word => ({word, bold: index % 2 === 1}))
    );
  }

  function bookTokenMarkup(tokens) {
    let output = "";
    let strong = false;
    tokens.forEach(token => {
      if (token.bold !== strong) {
        output += strong ? "</strong>" : "<strong>";
        strong = token.bold;
      }
      output += esc(token.word);
    });
    if (strong) output += "</strong>";
    return output;
  }

  function bookContentMarkup(parts) {
    return parts.map(part => '<p class="magic-book-paragraph">' + bookTokenMarkup(part.tokens) + "</p>").join("");
  }

  function paginateBook() {
    if (!bookOpened || readerMode !== "book") return;
    if (bookMeasureBody.clientHeight < 100) return;
    const source = Array.isArray(data.chapters[active].paragraphs) ? data.chapters[active].paragraphs : [];
    const pages = [];
    let parts = [];
    const fits = trial => {
      bookMeasureBody.innerHTML = bookContentMarkup(trial);
      return bookMeasureBody.scrollHeight <= bookMeasureBody.clientHeight + 1;
    };
    source.forEach(paragraph => {
      const tokens = bookTokens(paragraph);
      let offset = 0;
      while (offset < tokens.length) {
        const remaining = tokens.slice(offset);
        const entire = parts.concat([{tokens: remaining}]);
        if (fits(entire)) {
          parts = entire;
          offset = tokens.length;
          continue;
        }
        let low = 0, high = remaining.length;
        while (low < high) {
          const mid = Math.ceil((low + high) / 2);
          if (fits(parts.concat([{tokens: remaining.slice(0, mid)}]))) low = mid;
          else high = mid - 1;
        }
        if (low > 0) {
          parts.push({tokens: remaining.slice(0, low)});
          offset += low;
        } else if (parts.length === 0) {
          // Ein überlanges Wort wird nicht verworfen.
          parts.push({tokens: remaining.slice(0, 1)});
          offset += 1;
        }
        if (parts.length) {
          pages.push(bookContentMarkup(parts));
          parts = [];
        }
      }
    });
    if (parts.length) pages.push(bookContentMarkup(parts));
    bookPages = pages.length ? pages : ['<p class="magic-book-paragraph">Für diesen Eintrag ist noch kein Text vorhanden.</p>'];
    bookPageIndex = Math.min(bookPageIndex, bookPages.length - 1);
    renderBookSpread();
  }

  function bookPageMarkup(index) {
    const chapter = data.chapters[active];
    const valid = index < bookPages.length;
    return '<div class="magic-book-page-top"><span>' + esc(chapter.label) + '</span><span aria-hidden="true">✧</span></div>' +
      '<div class="magic-book-page-body">' +
      (valid ? bookPages[index] : '<p class="magic-book-end-mark" aria-hidden="true">✦</p>') +
      '</div>' +
      '<div class="magic-book-page-bottom"><span>Die Chronik der vier Gefährten</span><span>' +
      (valid ? String(index + 1).padStart(2, "0") : "✦") + '</span></div>';
  }

  function renderBookSpread() {
    const spreadSize = narrowBook.matches ? 1 : 2;
    const first = Math.floor(bookPageIndex / spreadSize) * spreadSize;
    bookPageIndex = first;
    bookLeft.innerHTML = bookPageMarkup(first);
    bookRight.hidden = spreadSize === 1;
    bookRight.innerHTML = spreadSize === 2 ? bookPageMarkup(first + 1) : "";
    bookRight.setAttribute("aria-hidden", spreadSize === 1 ? "true" : "false");
    const last = Math.min(first + spreadSize, bookPages.length);
    bookStatus.textContent = spreadSize === 2 && last > first + 1
      ? "Seiten " + (first + 1) + "–" + last + " von " + bookPages.length
      : "Seite " + (first + 1) + " von " + bookPages.length;
    $("#magic-book-prev-page").disabled = first === 0;
    $("#magic-book-next-page").disabled = last >= bookPages.length;
  }

  function turnBookPage(direction) {
    if (!bookOpened || bookTurning) return;
    const step = narrowBook.matches ? 1 : 2;
    const destination = bookPageIndex + direction * step;
    if (destination < 0 || destination >= bookPages.length) return;
    if (reduceMotion.matches) {
      bookPageIndex = destination;
      renderBookSpread();
      return;
    }
    bookTurning = true;
    bookSpread.classList.add(direction > 0 ? "is-turning-next" : "is-turning-prev");
    window.setTimeout(() => {
      bookPageIndex = destination;
      bookSpread.classList.remove("is-turning-next", "is-turning-prev");
      renderBookSpread();
      bookTurning = false;
    }, 470);
  }

  function openBook() {
    bookOpened = true;
    bookPageIndex = 0;
    bookCover.hidden = true;
    bookOpenView.hidden = false;
    requestAnimationFrame(() => { paginateBook(); });
  }

  function refreshBookPagination() {
    if (readerMode !== "book" || !bookOpened) return;
    clearTimeout(bookResizeTimer);
    bookResizeTimer = window.setTimeout(() => {
      if (!bookTurning) paginateBook();
    }, 140);
  }


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

    // Stoppe die alte Hörfassung sofort, bevor ein anderes Kapitel erscheint.
    readerAudio.pause();
    readerAudio.removeAttribute("src");
    readerAudio.load();
    const audioPath = typeof chapter.audio === "string" ? chapter.audio.trim() : "";
    readerAudioWrap.hidden = !audioPath;
    if (audioPath) {
      readerAudio.src = audioPath;
      readerAudio.setAttribute("aria-label", "Hörfassung: " + chapter.title);
      readerAudioDownload.href = audioPath;
    } else {
      readerAudioDownload.removeAttribute("href");
    }

    const additionalImages = Array.isArray(chapter.images) ? chapter.images : [];
    const imageItems = additionalImages.flatMap((media, index) => media && typeof media.src === "string" && media.src.trim()
      ? [`<figure><button type="button" class="reader-gallery-button" data-gallery-image="${index}" aria-label="Bild vergrößern: ${esc(media.alt || "Szenenbild")}"><img src="${esc(media.src)}" alt="${esc(media.alt || chapter.title)}" loading="lazy" decoding="async"></button>${media.caption ? `<figcaption>${esc(media.caption)}</figcaption>` : ""}</figure>`]
      : []);
    readerGallery.hidden = imageItems.length === 0;
    readerGalleryList.innerHTML = imageItems.join("");
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
      + (chapter.paragraphs || []).map(paragraph => `<p>${esc(paragraph).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`).join("");
    $("#reader-location").textContent = chapter.location || "Ort unbekannt";
    $("#prev-chapter").disabled = active === 0;
    $("#next-chapter").disabled = active === data.chapters.length - 1;
    updateBookChapter();
    [...chapterList.querySelectorAll("[data-chapter]")].forEach((el, idx) => {
      el.classList.toggle("is-active", idx === active);
      el.setAttribute("aria-current", idx === active ? "true" : "false");
    });
  }

  function chooseChapter(index, scroll = false) {
    active = Math.min(data.chapters.length - 1, Math.max(0, Number(index)));
    renderReader();
    if (history.replaceState) history.replaceState(null, "", `#${data.chapters[active].id}`);
    if (scroll || readerMode === "book") reader.scrollIntoView({behavior: scroll === "instant" || readerMode === "book" ? "instant" : "smooth", block: "start"});
  }

  chapterList.addEventListener("click", (evt) => {
    const target = evt.target.closest("[data-chapter]");
    if (target) chooseChapter(target.dataset.chapter, window.innerWidth < 850);
  });
  $("#prev-chapter").addEventListener("click", () => chooseChapter(active - 1, "instant"));
  $("#next-chapter").addEventListener("click", () => chooseChapter(active + 1, "instant"));

  $("#reader-mode-classic").addEventListener("click", () => setReaderMode("classic"));
  $("#reader-mode-book").addEventListener("click", () => setReaderMode("book"));
  $("#magic-book-open-button").addEventListener("click", openBook);
  $("#magic-book-close-button").addEventListener("click", () => {
    bookOpened = false;
    bookCover.hidden = false;
    bookOpenView.hidden = true;
    bookCover.scrollIntoView({behavior:"instant",block:"start"});
  });
  $("#magic-book-prev-page").addEventListener("click", () => turnBookPage(-1));
  $("#magic-book-next-page").addEventListener("click", () => turnBookPage(1));
  $("#magic-book-prev-chapter").addEventListener("click", () => chooseChapter(active - 1, "instant"));
  $("#magic-book-next-chapter").addEventListener("click", () => chooseChapter(active + 1, "instant"));

  // Auf dem Handy links/rechts wischen, ohne vertikales Scrollen zu blockieren.
  let touchStart = null;
  bookSpread.addEventListener("touchstart", event => {
    if (event.touches.length !== 1) return;
    touchStart = {x:event.touches[0].clientX,y:event.touches[0].clientY};
  }, {passive:true});
  bookSpread.addEventListener("touchend", event => {
    if (!touchStart || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) >= 70 && Math.abs(dx) > Math.abs(dy) * 1.6) turnBookPage(dx < 0 ? 1 : -1);
  }, {passive:true});
  window.addEventListener("resize", refreshBookPagination);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshBookPagination);

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
          ${c.sheet ? `
          <section class="detail-sheet" aria-label="Charakterbogen-Werte von ${esc(c.name)}">
            <h3>Charakterwerte · D&amp;D 2024</h3>
            <div class="sheet-stats">${Object.entries(c.sheet.abilities).map(([k,v]) => `<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("")}</div>
            <div class="sheet-meta">
              <span><b>RK</b> ${esc(c.sheet.ac)}</span>
              <span><b>Max. TP</b> ${esc(c.sheet.hp)}</span>
              <span><b>Bewegung</b> ${esc(c.sheet.speed)}</span>
            </div>
            <p class="sheet-note">Werte aus den bestätigten Charakterbögen, nicht der aktuelle Kampfzustand.</p>
            <div class="sheet-features">${c.sheet.features.map(t => `<span>${esc(t)}</span>`).join("")}</div>
          </section>` : ""}
          ${Array.isArray(c.backstory) && c.backstory.length ? `
          <section class="detail-backstory" aria-label="Vorgeschichte von ${esc(c.name)}">
            <h3>Vorgeschichte</h3>
            ${c.backstory.map(p => `<p>${esc(p)}</p>`).join("")}
          </section>` : ""}
          <div class="detail-quote-label">LEITSPRUCH · ENTWURF</div><blockquote>„${esc(c.quote)}“</blockquote>
          <div class="detail-specialties">${c.specialties.map(t => `<span>${esc(t)}</span>`).join("")}</div>
        </div>
      </div>`;
    detailDialog.showModal();
  });
  $("#detail-close").addEventListener("click", () => detailDialog.close());
  detailDialog.addEventListener("click", (evt) => {if (evt.target === detailDialog) detailDialog.close();});

  const imageDialog = $("#image-dialog");
  function openChapterImage(src, alt, caption) {
    $("#image-dialog-img").src = src;
    $("#image-dialog-img").alt = alt || caption;
    $("#image-dialog-caption").textContent = caption;
    imageDialog.showModal();
  }
  $("#reader-expand").addEventListener("click", () => {
    const c = data.chapters[active];
    openChapterImage(c.image, c.imageAlt, c.title);
  });
  readerGalleryList.addEventListener("click", (evt) => {
    const button = evt.target.closest("[data-gallery-image]");
    if (!button) return;
    const chapter = data.chapters[active];
    const image = Array.isArray(chapter.images) ? chapter.images[Number(button.dataset.galleryImage)] : null;
    if (!image || !image.src) return;
    openChapterImage(image.src, image.alt || chapter.title, image.caption || chapter.title);
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
  setReaderMode(readerMode, false);
})();
