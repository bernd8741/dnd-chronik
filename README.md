# Die Chronik der vier Gefährten

Illustriertes D&D-Tagebuch von **Murtagh, Gamakichi, Heela und Asphodel**.

**Live-Website:** https://bernd8741.github.io/dnd-chronik/

## Projektstruktur

| Datei | Inhalt |
|---|---|
| `index.html` | Seitenaufbau und Navigation |
| `styles.css` | Fantasy-Design und mobile Darstellung |
| `app.js` | Kapitelwechsel, Charakterfenster, Zeitleiste und Bildansicht |
| `content.js` | Kapitel, Session-Termine, Chronik und öffentliche Charakterprofile |
| `assets/` | Illustrationen, Porträts und Favicon |

Die öffentlichen Charakterprofile in `content.js` enthalten das Feld `backstory`: eine Liste bestätigter Vorgeschichts-Absätze. Sie werden im Charakterfenster angezeigt. Keine Geheimnisse oder unbestätigten Ereignisse hinzufügen.

Die veraltete Offline-Vorschau und das ursprüngliche ZIP-Archiv wurden aus dem aktuellen Repository entfernt. Ältere Stände sind weiterhin über die Git-Versionshistorie wiederherstellbar.

## Neue Kapitel hinzufügen
Schreibe nach jeder Session deinem ChatGPT-D&D-Chat, was passiert ist. ChatGPT kann daraus ein Kapitel und passende Szenenbilder machen und nach deiner Freigabe die passenden Dateien im verbundenen GitHub-Repository aktualisieren.

Ein Kapitel in `content.js` hat Felder wie `id`, `label`, `title`, `subtitle`, `date` (YYYY-MM-DD), `time` (HH:MM), `session`, `inWorldDate`, `location`, `image`, `summary` und `paragraphs`.

## Design-Änderungen
Schicke einen Screenshot mit gewünschter Änderung direkt im Chat. Für größere Umbauten erst einen **Entwurf** (Vorschau oder separater Branch) erstellen; Veröffentlichung erst nach Bestätigung. GitHub bewahrt frühere Versionen auf.

## Veröffentlichung
GitHub Pages veröffentlicht automatisch Änderungen auf `main` aus dem Stammverzeichnis; der Link bleibt unverändert. ZIP-Uploads sind nicht mehr erforderlich.

## Datenschutz / Spoiler
Dieses Repository und die Website sind **öffentlich**. Geheime Charakterinformationen, unveröffentlichte Handlungsdetails und persönliche Daten gehören nicht in die Website-Dateien.

## Eine eindeutige Quelle je Aufgabe

- `main` ist **ausschließlich** die öffentliche Website mit `content.js` als Quelle für veröffentlichte Charakterprofile, Kapitel und Bilder.
- [`kampagnenstatus`](https://github.com/bernd8741/dnd-chronik/tree/kampagnenstatus) enthält **nur** `Kampagnenstatus.md` und seine Anleitung. Hier werden tatsächliche Spielereignisse, NSC, Beute, Quests und Fortschritte fortgeschrieben. Niemals eine zweite Website dort pflegen.
- Aktuelle bestätigte **Charakterbögen und Referenzbilder** liegen als Projektdateien in ChatGPT; die Website zeigt nur kurze, freigegebene Auszüge. Bei Änderungen an Charakterwerten zuerst den neuesten bestätigten Charakterbogen prüfen. Keine eigenständigen Website-/Statuskopien der PDF-Charakterbögen führen.
- Der Branch `copilot/dnd-abenteuertagebuch` ist ein **veralteter Entwurf** und kein maßgeblicher Kampagnen- oder Veröffentlichungsstand.
- **Sicherheit:** Das ganze Repository, auch `kampagnenstatus`, ist öffentlich einsehbar. Keine DM-Geheimnisse in die Website oder andere Veröffentlichungen übernehmen.

## Stand des Tagebuchs
Der Prolog ist öffentlich und das Tavernenkapitel als **Beispielentwurf** gekennzeichnet. Die Porträts aller vier Gefährten sind inzwischen eingebunden. Asphodels öffentliches Profil enthält nur eine spoilerfreie Hintergrundbeschreibung.
