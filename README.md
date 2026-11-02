# dnd-chronik

Ein interaktives D&D-Abenteuertagebuch in deutscher Sprache: sechs Beispielkapitel aus den Vergessenen Reichen, eigene Illustrationen und vier Charakterporträts.

## Starten

Voraussetzungen: Python 3; für die npm-Kommandos zusätzlich Node.js und npm.

```sh
npm start
```

Anschließend http://localhost:3000 öffnen. Alternativ direkt `python3 -m http.server 3000` im Projektverzeichnis ausführen. Es sind keine Paketinstallation und kein Build notwendig. Die JavaScript-Syntax lässt sich mit `npm run check` prüfen.

## Funktionen

- Kapitel lesen und zwischen aufeinanderfolgenden Kapiteln wechseln.
- Chronik nach Text und Ort durchsuchen, nach Abenteuer oder Zwischenspiel filtern.
- Heldenporträts und Hintergrundgeschichten entdecken.
- Kapitel merken und eigene Tagebucheinträge verfassen.
- Eigene Einträge über „Neuer Eintrag → Einträge exportieren“ als JSON sichern.

Eigene Einträge, Merkliste und zuletzt gelesenes Kapitel werden ausschließlich im lokalen Browserspeicher gespeichert. Sie werden nicht zwischen Geräten synchronisiert. Beim Löschen der Browserdaten gehen sie verloren; der JSON-Export dient als externe Sicherung (kein Import vorhanden). Ohne verfügbaren Browserspeicher funktioniert die Anwendung für die aktuelle Sitzung weiter.

Alle Illustrationen liegen im Verzeichnis `assets`. Es werden ausschließlich lokale Ressourcen und Systemschriften verwendet; externe Dienste sind nicht erforderlich.
