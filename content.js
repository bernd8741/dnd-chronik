/*
 * HIER ERWEITERST DU DEINE CHRONIK.
 * Eine Anleitung steht in README.md.
 * Keine echten Geheimnisse oder privaten Informationen in diese Datei schreiben:
 * Wer die öffentliche Website besucht, kann auch ihren Quelltext lesen.
 */
window.CHRONIK = {
  website: {
    title: "Die Chronik der vier Gefährten",
    tagline: "Vier Wege. Eine Geschichte."
  },

  characters: [
    {
      id: "murtagh",
      name: "Murtagh",
      role: "Der Waldweise",
      species: "Waldgnom",
      characterClass: "Druide · Stufe 2",
      age: "180 Jahre",
      height: "110 cm",
      image: "assets/murtagh.webp",
      imageAlt: "Murtagh mit grauem Bart, runder Brille, spitzem Kräuterhut und Eichhörnchen",
      color: "sage",
      quote: "Wenn man ganz genau zuhört, hat sogar ein Eichhörnchen etwas zu sagen.",
      description: "Ein gutherziger, leicht schrulliger Druide aus einer abgelegenen Waldhütte. Trägt Brille, einen großen Kräuterhut und jede Menge Fläschchen. P-Nut, sein erstaunlich kluges Eichhörnchen, ist meist an seiner Seite.",
      specialties: ["Heilung", "Naturmagie", "Tiere"],
      backstory: [
            "Seit mehr als 150 Jahren lebte Murtagh in einer kleinen Hütte tief im Wald. Eine ganze Horde Eichhörnchen teilte sich den Ort mit ihm, plünderte seine Vorräte und brachte seine Kräuter durcheinander. Eines von ihnen fiel besonders auf: P-Nut, größer und deutlich klüger als die anderen.",
            "Um seine tierischen Mitbewohner endlich verstehen zu können, braute Murtagh einen Trank zum Sprechen mit Tieren. Die ernüchternde Erkenntnis: Die meisten Eichhörnchen dachten fast ausschließlich an Nüsse. P-Nut dagegen erwies sich als erstaunlich kenntnisreich, gab ungefragt Ratschläge und hasste ihren Namen.",
            "Schließlich verließ Murtagh seine vertraute Waldhütte. Er sucht eine äußerst seltene Zutat für ein geheimnisvolles Rezept. Worum es sich dabei genau handelt, behält er lieber für sich – P-Nut begleitet ihn auf seiner Reise."
      ],
      status: "portrait"
    },
    {
      id: "gamakichi",
      name: "Gamakichi",
      role: "Der Sternenmagier",
      species: "Grung",
      characterClass: "Magier · Stufe 2",
      age: "Nicht überliefert",
      height: "80 cm",
      image: "assets/gamakichi.webp",
      imageAlt: "Rosafarbener Froschmagier Gamakichi im violetten Sternenumhang mit Zauberstab und schwarzem Raben",
      color: "violet",
      quote: "Die Welt ist groß. Selbst wenn man nur achtzig Zentimeter misst.",
      description: "Ein rosafarbener Grung mit großen Augen, violettblauer Sternenrobe und spitzem Zauberhut. Ein schwarzer Rabe begleitet ihn. Wissbegierig, magisch begabt und fasziniert von verbotenen Geheimnissen.",
      specialties: ["Arkane Magie", "Wissen", "Zauberbuch"],
      backstory: [
            "Gamakichi ist ein außergewöhnlicher Grung: Seine rosafarbene Haut macht ihn in seiner Heimat zu einer Besonderheit. Er verließ seinen Sumpf, um Magie zu erlernen, mit der er seine Heimat vor dem Austrocknen bewahren kann.",
            "Neben diesem Ziel locken ihn Ruhm und Ehre. Als gelehriger Magier führt er ein Zauberbuch mit sich und interessiert sich besonders für Nekromantie. Ein schwarzer Rabe ist sein magischer Vertrauter."
      ],
      status: "portrait"
    },
    {
      id: "heela",
      name: "Heela",
      role: "Die Unbeugsame",
      species: "Zwergin",
      characterClass: "Barbarin · Stufe 2",
      age: "135 Jahre",
      height: "120 cm",
      image: "",
      imageAlt: "Porträt folgt",
      color: "ember",
      quote: "Bei meinen Schafen hört der Spaß auf.",
      description: "Kräftige Zwergin mit wilder feuerroter Haarmähne und stechend grünen Augen. Aufgewachsen auf einem Bergbauernhof im Alptal. Schafhüten beruhigt sie – Banditen haben eher die gegenteilige Wirkung.",
      specialties: ["Kampfrausch", "Nahkampf", "Zähigkeit"],
      backstory: [
            "Heela wuchs auf einem zwergischen Bergbauernhof im Dorf Alptal auf. Schon früh hatte sie mit ihrer Wut zu kämpfen. Die harte Hofarbeit sollte helfen, doch erst beim Hüten der sanftmütigen Schafe fand sie wirkliche Ruhe. Auf den Feldern half sie mit der Sichel; abends kochte sie für ihre Familie deftige Eintöpfe.",
            "Dann besetzten Banditen den Bergpass, blockierten die Handelswege und plünderten die Höfe. Als sie auch noch Heelas geliebte Schafe stehlen wollten, war es mit ihrer Geduld vorbei. Mit Langschwert und Schild schlug sie die Angreifer in die Flucht.",
            "Heela erkannte, dass ihr Kampfrausch auch eine Waffe sein konnte. Nun zieht sie als Abenteurerin los: Sie möchte Kriegerin werden und einen Weg finden, den Bergpass endgültig von den Banditen zu befreien."
      ],
      status: "pending"
    },
    {
      id: "asphodel",
      name: "Asphodel",
      role: "Der Schatten",
      species: "Tiefling",
      characterClass: "Schurke · Stufe 2",
      age: "666 Jahre",
      height: "192 cm",
      image: "",
      imageAlt: "Porträt des maskierten Tieflings Asphodel folgt",
      color: "steel",
      quote: "Nicht jeder Weg muss im Licht liegen.",
      description: "Ein hochgewachsener Tiefling-Schurke mit grauer Haut, roten Augen, einer markanten goldenen Maske und einem dunklen Umhang. Seine Stärken liegen in Heimlichkeit und Fingerfertigkeit.",
      specialties: ["Heimlichkeit", "Geschick", "Sneak Attack"],
      backstory: [],
      status: "pending"
    }
  ],

  // Neues Kapitel: den letzten { ... }-Block kopieren, dann Texte und Bild ändern.
  // Datum: "YYYY-MM-DD" oder null, solange die Session noch nicht stattgefunden hat.
  // time: z.B. "19:30" (optional); session: z.B. "Session 2"; inWorldDate: Spielweltdatum.
  chapters: [
    {
      id: "prolog",
      label: "Prolog",
      title: "Eine Hütte unter alten Bäumen",
      subtitle: "Wo die Geschichte des Druiden Murtagh beginnt.",
      date: null,
      time: null,
      dateLabel: "Vor Beginn der Kampagne",
      session: "Vorgeschichte",
      inWorldDate: "Nicht überliefert",
      location: "Eine abgelegene Waldhütte",
      image: "assets/forest-hut.webp",
      imageAlt: "Moosbedeckte Waldhütte im warmen Abendlicht",
      state: "story",
      summary: "Ein Druide, ein Wald voller Eichhörnchen und eine Reise ins Ungewisse.",
      paragraphs: [
        "Seit mehr als 150 Jahren lebte Murtagh in einer kleinen Hütte tief im Wald. Seine Mitbewohner waren Eichhörnchen, die zuverlässig seine Vorräte plünderten, Kräuter durcheinanderbrachten und grundsätzlich keine Miete bezahlten.",
        "Eines der Tiere war anders: größer als die übrigen, auffallend klug und seit Jahrzehnten unzertrennlich von Murtagh. Er nannte es P-Nut. Dass P-Nut diesen Namen verabscheute, ahnte er damals noch nicht.",
        "Als Murtagh schließlich einen Trank braute, mit dem er Tiere verstehen konnte, erfuhr er vor allem eines: Eichhörnchen reden erschreckend viel über Nüsse. Nur P-Nut überraschte ihn mit klugen, wenn auch meist ungefragten Ratschlägen.",
        "Irgendwann packte Murtagh seine Kräuter, seinen Honig und seine wenigen Habseligkeiten zusammen. Er musste eine seltene Zutat für ein geheimnisvolles Rezept finden. Wohin die Reise ihn führen würde, wusste er noch nicht – aber P-Nut hatte wie immer eine Meinung dazu."
      ]
    },
    {
      id: "kapitel-01",
      label: "Kapitel I",
      title: "Eine Begegnung bei Kerzenschein",
      subtitle: "Zwei Fremde, eine Taverne und ein ungewöhnlicher Anfang.",
      date: null,
      time: null,
      dateLabel: "Sessiondatum noch offen",
      session: "Session 1 · Entwurf",
      inWorldDate: "Noch offen",
      location: "Eine Taverne · Name noch offen",
      image: "assets/tavern.webp",
      imageAlt: "Murtagh mit P-Nut und Gamakichi mit Raben an einem Tisch in einer Taverne",
      state: "draft",
      summary: "Murtagh und Gamakichi begegnen einander in einer Taverne. Der Rest der Geschichte folgt nach eurer Spielrunde.",
      paragraphs: [
        "Eine Taverne, warmer Kerzenschein und zwei Gestalten, die unterschiedlicher kaum sein könnten: ein kleiner Waldgnom mit Eichhörnchen und ein noch kleinerer Grung-Magier mit Sternenhut und Raben.",
        "Dieses Kapitel ist ein BEISPIELENTWURF zur Tavernenszene aus eurem Bild. Es beschreibt noch keine bestätigten Ereignisse der Kampagne.",
        "Nach eurer ersten gemeinsamen Session ersetzen wir diesen Absatz durch das tatsächliche Geschehen: Was wurde gesagt? Welche Hinweise gab es? Welche Entscheidungen trafen die Gefährten – und welche Katastrophe hat P-Nut schon kommen sehen?"
      ]
    }
  ]
};
