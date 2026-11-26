# Die Chronik der vier Gefährten

Illustriertes D&D-Tagebuch von **Murtagh, Gamakichi, Heela und Asphodel**.

**Live-Website:** https://bernd8741.github.io/dnd-chronik/

## Projektstruktur

| Datei | Inhalt |
|---|---|
| `index.html` | Seitenaufbau und Navigation |
| `styles.css` | Fantasy-Design und mobile Darstellung |
| `app.js` | Kapitelwechsel, Charakterfenster, Zeitleiste, Bildgalerie und Audioplayer |
| `content.js` | Einzige Quelle für veröffentlichte Texte, Kapitelmetadaten, Audio- und Bildpfade |
| `assets/characters/` | Aktuelle Porträts von Murtagh, Gamakichi, Heela und Asphodel |
| `assets/chapters/<id>/` | Titelbilder, weitere Szenenbilder und optionale Hörfassungen |
| `assets/icons/favicon-32.png` | Website-Symbol |

Die öffentlichen Charakterprofile in `content.js` enthalten das Feld `backstory`: eine Liste bestätigter Vorgeschichts-Absätze. Sie werden im Charakterfenster angezeigt. Keine Geheimnisse oder unbestätigten Ereignisse hinzufügen.

Die veraltete Offline-Vorschau und das ursprüngliche ZIP-Archiv wurden aus dem aktuellen Repository entfernt. Ältere Stände sind weiterhin über die Git-Versionshistorie wiederherstellbar.

## Neue Kapitel hinzufügen
Schreibe nach jeder Session deinem ChatGPT-D&D-Chat, was passiert ist. ChatGPT kann daraus ein Kapitel und passende Szenenbilder machen und nach deiner Freigabe die passenden Dateien im verbundenen GitHub-Repository aktualisieren.

Ein Kapitel in `content.js` hat Felder wie `id`, `label`, `title`, `subtitle`, `date` (YYYY-MM-DD), `time` (HH:MM), `session`, `inWorldDate`, `location`, `image`, `imageAlt`, `audio`, `images`, `summary` und `paragraphs`.

### Kapitelmedien (eine Quelle, keine Duplikate)
- Titelbild: `assets/chapters/<id>/cover.webp` und in `content.js` unter `image` referenzieren.
- Weitere Illustrationen: `assets/chapters/<id>/szene-01.webp` usw. und als `images: [{src: "assets/chapters/<id>/szene-01.webp", alt: "Motiv", caption: "Bildunterschrift"}]` eintragen. Der Leser zeigt sie unterhalb des Textes, auch in der Bildansicht.
- Hörfassung: `assets/chapters/<id>/erzaehlung.mp3` (möglichst kompakt für Sprache). Erst nach dem **tatsächlichen Upload** der MP3 `audio: "assets/chapters/<id>/erzaehlung.mp3"` setzen. Solange keine Audiodatei vorliegt, `audio: null` belassen; dann erscheint kein leerer Player.
- Der Audioplayer unterstützt Pausieren, Spulen und Download. Beim Kapitelwechsel stoppt die alte Hörfassung. Keine automatischen Audiodateien oder Platzhalterlinks erzeugen.
- Texte bleiben ausschließlich in `content.js`, bestätigte Spielereignisse im Branch `kampagnenstatus` in `Kampagnenstatus.md`. Nicht als weitere Kapiteltextkopien in Medienordnern ablegen.
- MP3 möglichst klein halten; die Dateigrößen und GitHub-Pages-Grenzen im Blick behalten. Keine Musik oder Klangeffekte ohne die erforderlichen Nutzungsrechte veröffentlichen.

**Aktueller Stand:** Prolog und Kapitel I besitzen Titelbilder; derzeit liegen noch keine bestätigten Hörfassungen oder zusätzlichen Szenenbilder vor.

## Magisches Tagebuch (Buchmodus)

- Im Kapitel-Leser kann zwischen **Magisches Buch** (Standard) und **Klassisch** umgeschaltet werden. Die Auswahl wird ausschließlich auf dem Gerät im Browser gespeichert (\`localStorage\`). Die Inhalte stammen in beiden Ansichten aus derselben \`content.js\`.
- **Magisches Buch:** Dunkler Ledereinband mit goldenen Verzierungen und Kapitelmotiv; auf **Kapitel aufschlagen** folgen Pergamentseiten. Breite Bildschirme zeigen Doppelseiten, kleinere Geräte einzelne Seiten.
- Die Absätze werden anhand der tatsächlichen Seitengröße auf Buchseiten verteilt; Hervorhebungen (\`**fett**\`) werden übernommen. Umblättern funktioniert per Tasten und auf Touchgeräten durch horizontales Wischen. Nach einem Kapitelwechsel erscheint wieder der neue Bucheinband.
- Die Hörfassung und Szenengalerie bleiben dieselben DOM-Elemente. Beim Wechsel **zwischen Lesemodi** spielt Audio weiter; **beim Kapitelwechsel** wird es gestoppt. Direkte Kapitel-Links (\`#prolog\`, \`#kapitel-01\`) bleiben nutzbar.
- Die klassische Kapitelansicht bleibt unverändert zugänglich. Animationen werden bei \`prefers-reduced-motion\` ausgeschaltet, es werden keine externen Animationsbibliotheken eingebunden.
- Neue Kapitel brauchen keine Sonderdaten für den Buchmodus; die bestehenden Kapitelangaben, Bilder und Texte werden direkt verwendet.

## Design-Änderungen
Schicke einen Screenshot mit gewünschter Änderung direkt im Chat. Für größere Umbauten erst einen **Entwurf** (Vorschau oder separater Branch) erstellen; Veröffentlichung erst nach Bestätigung. GitHub bewahrt frühere Versionen auf.

## Veröffentlichung
GitHub Pages veröffentlicht automatisch Änderungen auf `main` aus dem Stammverzeichnis; der Link bleibt unverändert. ZIP-Uploads sind nicht mehr erforderlich.

## App-Icon und Installation auf dem Handy

Für iPhone (Safari: Teilen → Zum Home-Bildschirm) und Android (Chrome: Menü → App installieren / Zum Startbildschirm hinzufügen) ist das **rote Drachenlogo mit goldenem W20** als Icon eingebunden.

- `manifest.webmanifest`: Name, Start-URL und eigenständige Darstellung der installierten Website; die Installation startet unter `/dnd-chronik/`.
- `assets/icons/apple-touch-icon.png`: iOS-Startbildschirm, 180 × 180.
- `assets/icons/app-icon-192.png` und `assets/icons/app-icon-512.png`: allgemeine Android-/PWA-Icons.
- `assets/icons/app-icon-maskable-512.png`: Icon mit Sicherheitsrand für Android-Symbolmasken.
- `assets/icons/favicon-32.png`: kleines Browser-Tab-Symbol.

Wenn bereits ein früheres Startbildschirm-Symbol existiert, muss es gegebenenfalls vom Startbildschirm entfernt und die Website erneut hinzugefügt werden, damit das neue Icon erscheint. Die Website bietet keine installierte Offline-Funktion; hierfür wurde kein Service Worker ergänzt.

## Datenschutz / Spoiler
Dieses Repository und die Website sind **öffentlich**. Geheime Charakterinformationen, unveröffentlichte Handlungsdetails und persönliche Daten gehören nicht in die Website-Dateien.

## Eine eindeutige Quelle je Aufgabe

- `main` ist **ausschließlich** die öffentliche Website mit `content.js` als Quelle für veröffentlichte Charakterprofile, Kapitel und Bilder.
- [`kampagnenstatus`](https://github.com/bernd8741/dnd-chronik/tree/kampagnenstatus) enthält **nur** `Kampagnenstatus.md` und seine Anleitung. Hier werden tatsächliche Spielereignisse, NSC, Beute, Quests und Fortschritte fortgeschrieben. Niemals eine zweite Website dort pflegen.
- Aktuelle bestätigte **Charakterbögen und Referenzbilder** liegen als Projektdateien in ChatGPT; die Website zeigt nur kurze, freigegebene Auszüge. Bei Änderungen an Charakterwerten zuerst den neuesten bestätigten Charakterbogen prüfen. Keine eigenständigen Website-/Statuskopien der PDF-Charakterbögen führen.
- Der Branch `copilot/dnd-abenteuertagebuch` ist ein **veralteter Entwurf** und kein maßgeblicher Kampagnen- oder Veröffentlichungsstand.
- **Sicherheit:** Das ganze Repository, auch `kampagnenstatus`, ist öffentlich einsehbar. Keine DM-Geheimnisse in die Website oder andere Veröffentlichungen übernehmen.

## Stand des Tagebuchs
Der Prolog und das freigegebene **Kapitel I** (Auftakt der vier Gefährten in einer Taverne) sind veröffentlicht. Die Porträts aller vier Gefährten sind eingebunden. Asphodels öffentliches Profil bleibt spoilerfrei. Gamakichis aktuelle verbindliche Bildreferenz ist `assets/characters/gamakichi.webp`; das vorherige Bild wurde ersetzt. Das aktuelle Tavernen-Gruppenbild liegt unter `assets/chapters/kapitel-01/cover.webp` (alter Beispielentwurf in der Git-Historie).
