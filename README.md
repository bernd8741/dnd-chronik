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

Die bisherige `DND_Chronik_Offline_Vorschau.html` und `DND_Chronik_Website.zip` bleiben als Original-Sicherung im Repository.

## Neue Kapitel hinzufügen
Schreibe nach jeder Session deinem ChatGPT-D&D-Chat, was passiert ist. ChatGPT kann daraus ein Kapitel und passende Szenenbilder machen und nach deiner Freigabe die passenden Dateien im verbundenen GitHub-Repository aktualisieren.

Ein Kapitel in `content.js` hat Felder wie `id`, `label`, `title`, `subtitle`, `date` (YYYY-MM-DD), `time` (HH:MM), `session`, `inWorldDate`, `location`, `image`, `summary` und `paragraphs`.

## Design-Änderungen
Schicke einen Screenshot mit gewünschter Änderung direkt im Chat. Für größere Umbauten erst einen **Entwurf** (Vorschau oder separater Branch) erstellen; Veröffentlichung erst nach Bestätigung. Github bewahrt frühere Versionen auf.

## Veröffentlichung
GitHub Pages veröffentlicht automatisch Änderungen auf `main` aus dem Stammverzeichnis; der Link bleibt unverändert. ZIP-Uploads sind nicht mehr erforderlich.

## Datenschutz / Spoiler
Dieses Repository und die Website sind **öffentlich**. Geheime Charakterinformationen, unveröffentlichte Handlungsdetails und persönliche Daten gehören nicht in die Website-Dateien.

## Stand des Tagebuchs
Der Prolog ist öffentlich und das Tavernenkapitel als **Beispielentwurf** gekennzeichnet. Die finalen Porträts von Heela und Asphodel fehlen noch.
