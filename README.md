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

## Stand des Tagebuchs
Der Prolog ist öffentlich und das Tavernenkapitel als **Beispielentwurf** gekennzeichnet. Die Porträts aller vier Gefährten sind inzwischen eingebunden. Asphodels öffentliches Profil enthält nur eine spoilerfreie Hintergrundbeschreibung.
