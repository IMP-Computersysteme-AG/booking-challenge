# Aufgabe: Ressourcen-Buchung

Hallo und danke, dass du dir Zeit für diese Aufgabe nimmst.

Dieses Repository enthält eine lauffähige Anwendung: ein Spring-Boot-Backend, ein React-Frontend
mit MUI, ein Gradle-Build, der beides in ein einziges Jar packt, und ein Dockerfile, das daraus
einen Container baut. Ein kleines Beispiel-Feature — die Anzeige buchbarer Ressourcen — ist durch
alle Schichten hindurch fertig implementiert, inklusive Tests. Es dient dir als Wegweiser durch das
Projekt, ist aber keine Vorschrift.

**Deine Aufgabe ist es, darauf aufbauend eine Buchungsfunktion zu bauen.**

## Fachlicher Hintergrund

Ein Team teilt sich Räume und Geräte — Besprechungsräume, ein Ultraschallgerät, ein Messwagen.
Diese Ressourcen sind im System bereits hinterlegt und werden dir in der Oberfläche angezeigt.
Was fehlt: Man kann sie nicht buchen.

## Pflichtteil

1. **Buchung anlegen.** Eine Ressource wird für einen Zeitraum (von / bis) auf einen Namen gebucht.
2. **Überschneidungen verhindern.** Zwei Buchungen derselben Ressource dürfen sich zeitlich nicht
   überlappen. Der Konfliktfall muss in der Oberfläche verständlich zurückgemeldet werden — die
   Person soll erkennen können, _warum_ die Buchung nicht funktioniert hat.
3. **Buchungen anzeigen.** Mindestens filterbar nach Ressource oder nach Zeitraum.
4. **Buchung stornieren.**
5. **Automatisierte Tests für die Kollisionslogik.** Im Backend erwarten wir Tests; Frontend-Tests
   sind willkommen, aber nicht Pflicht. Denk an die Randfälle: Was ist mit Buchungen, die exakt
   aneinander anschließen?
6. **Der Container läuft.** Auf einem frischen Clone muss Folgendes funktionieren:

   ```bash
   docker compose up --build
   # → Anwendung erreichbar unter http://localhost:8080
   ```

7. **Die CI-Pipeline ist grün.** Der mitgelieferte GitHub-Actions-Workflow baut das Projekt und
   führt die Tests aus. Er muss am Ende durchlaufen.

Mehr wollen wir nicht: kein Begleitdokument, kein Bericht, keine Aufwandsaufstellung. Reiche das
Ergebnis ein — Code, Tests und einen laufenden Container.

## Was wir bewusst **nicht** vorgeben

Das ist der eigentliche Kern dieser Aufgabe. Es gibt hier keinen von uns vorgesehenen „richtigen"
Lösungsweg, und wir haben absichtlich keine Signaturen, Interfaces oder Tabellen vorbereitet, die
du nur noch ausfüllen müsstest. Du entscheidest:

- **Das API-Design.** Wie die Endpunkte heißen, welche Statuscodes du verwendest, wie ein Fehler
  über die Leitung geht.
- **Das Datenmodell.** Eine Tabelle oder mehrere. Wie du einen Zeitraum ablegst.
- **Wo die Kollisionsprüfung stattfindet.** Als Query in der Datenbank, als Logik im Service, als
  Constraint im Schema, über optimistisches Sperren — all das sind tragfähige Antworten mit jeweils
  eigenen Vor- und Nachteilen.
- **Wie die Oberfläche aussieht.** Eine Tabelle, ein Formular, eine Kalender- oder Timeline-Ansicht.
  Ob du den Zustand mit `useState`, Context, React Query oder etwas anderem verwaltest.
- **Ob du Bibliotheken ergänzt.** Wenn eine Abhängigkeit dir Arbeit abnimmt, nimm sie dazu.

Wenn du beim Lesen dieser Liste denkst „das kommt darauf an" — genau darüber wollen wir im Gespräch
mit dir reden. Du musst dafür nichts aufschreiben; wir fragen dich einfach danach.

## Stretch Goals — optional

Ausdrücklich freiwillig. Wir erwarten **nichts** davon, und ein sauber gelöster Pflichtteil ist uns
deutlich lieber als drei halbfertige Zusatzfeatures. Falls dich etwas davon reizt:

- Tests im Frontend
- Kalender- oder Timeline-Darstellung statt einer Liste
- Serientermine („jeden Dienstag, acht Wochen lang")
- Nebenläufigkeit: zwei Personen buchen im selben Moment denselben Slot
- Zeitzonen oder Ganztagesbuchungen
- Eine OpenAPI-Beschreibung der Schnittstelle
- Persistenz über einen Neustart hinweg (aktuell läuft eine In-Memory-Datenbank)

## Zeitrahmen

Für den Pflichtteil rechnen wir mit **etwa 3 bis 4 Stunden**. Das ist eine Einschätzung, keine
Stoppuhr. Wenn du feststellst, dass es deutlich länger dauert, hör auf und reiche den Stand einfach
so ein. Ein ehrlich abgegrenzter Zwischenstand ist für uns aussagekräftiger als etwas hastig
Fertiggestelltes — was noch offen ist, besprechen wir im Gespräch.

## Worauf wir schauen

Damit du weißt, woran wir das lesen — und woran nicht:

- **Lesbarkeit.** Würde jemand aus dem Team diesen Code in sechs Monaten verstehen?
- **Der Fehlerfall.** Was passiert bei einer Kollision, bei ungültigen Eingaben, wenn das Backend
  nicht antwortet?
- **Testschnitt.** Was hast du getestet, und warum gerade das?
- **Nachvollziehbare Commits.** Wir schauen uns die Historie an. Kleine, thematisch saubere Commits
  sagen mehr über deine Arbeitsweise aus als ein einzelner „final".

Wir bewerten **nicht** die Anzahl der Features, nicht die Pixelgenauigkeit der Oberfläche und nicht,
ob du dieselbe Lösung gewählt hast wie wir.

## Los geht's

Wie du das Repository übernimmst, lokal startest und die fertige Lösung bei uns einreichst, steht in
der [README.md](README.md).

Bei Verständnisfragen zur Aufgabe melde dich gern — Rückfragen sind kein Minuspunkt.

Viel Erfolg!
