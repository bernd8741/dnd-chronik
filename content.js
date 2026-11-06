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
      sheet: {"ac":14,"hp":17,"speed":"9 m","abilities":{"STÄ":10,"GES":12,"KON":15,"INT":13,"WEI":17,"CHA":8},"features":["Zauberwirken","Tiergestalt","Wilder Gefährte","Heiler"]},
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
      sheet: {"ac":12,"hp":12,"speed":"7,5 m","abilities":{"STÄ":8,"GES":14,"KON":13,"INT":17,"WEI":13,"CHA":10},"features":["Zauberbuch","Rituale","Arkane Erholung"]},
      image: "assets/gamakichi.webp",
      imageAlt: "Gamakichi, rosafarbener Grung-Magier mit violettem Sternenhut, Zauberstab mit violetter Kristallkugel und schwarzem Raben",
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
      sheet: {"ac":13,"hp":29,"speed":"9 m","abilities":{"STÄ":15,"GES":13,"KON":14,"INT":8,"WEI":12,"CHA":10},"features":["Kampfrausch","Gefahrengespür","Rücksichtsloser Angriff"]},
      image: "assets/heela.webp",
      imageAlt: "Heela, rothaarige Zwergin mit Fellrüstung und Streitaxt zwischen ihren Schafen am Gebirgshof",
      color: "ember",
      quote: "Bei meinen Schafen hört der Spaß auf.",
      description: "Kräftige Zwergin mit wilder feuerroter Haarmähne und stechend grünen Augen. Aufgewachsen auf einem Bergbauernhof im Alptal. Schafhüten beruhigt sie – Banditen haben eher die gegenteilige Wirkung.",
      specialties: ["Kampfrausch", "Nahkampf", "Zähigkeit"],
      backstory: [
            "Heela wuchs auf einem zwergischen Bergbauernhof im Dorf Alptal auf. Schon früh hatte sie mit ihrer Wut zu kämpfen. Die harte Hofarbeit sollte helfen, doch erst beim Hüten der sanftmütigen Schafe fand sie wirkliche Ruhe. Auf den Feldern half sie mit der Sichel; abends kochte sie für ihre Familie deftige Eintöpfe.",
            "Dann besetzten Banditen den Bergpass, blockierten die Handelswege und plünderten die Höfe. Als sie auch noch Heelas geliebte Schafe stehlen wollten, war es mit ihrer Geduld vorbei. Mit Langschwert und Schild schlug sie die Angreifer in die Flucht.",
            "Heela erkannte, dass ihr Kampfrausch auch eine Waffe sein konnte. Nun zieht sie als Abenteurerin los: Sie möchte Kriegerin werden und einen Weg finden, den Bergpass endgültig von den Banditen zu befreien."
      ],
      status: "portrait"
    },
    {
      id: "asphodel",
      name: "Asphodel",
      role: "Der Schatten",
      species: "Tiefling",
      characterClass: "Schurke · Stufe 2",
      age: "666 Jahre",
      height: "192 cm",
      sheet: {"ac":13,"hp":13,"speed":"9 m","abilities":{"STÄ":14,"GES":16,"KON":11,"INT":13,"WEI":8,"CHA":13},"features":["Hinterhältiger Angriff","Listige Aktion","Waffenmeisterschaft"]},
      image: "assets/asphodel.webp",
      imageAlt: "Asphodel, maskierter Tiefling-Schurke mit goldener Maske und dunkler Kleidung",
      color: "steel",
      quote: "Nicht jeder Weg muss im Licht liegen.",
      description: "Ein hochgewachsener Tiefling-Schurke mit grauer Haut, roten Augen, einer markanten goldenen Maske und einem dunklen Umhang. Seine Stärken liegen in Heimlichkeit und Fingerfertigkeit.",
      specialties: ["Heimlichkeit", "Geschick", "Sneak Attack"],
      backstory: [
        "Asphodel ist ein geheimnisvoller Tiefling, der durch die Welt zieht. Er trägt eine auffällige goldene Maske und hält sich über seine Vergangenheit bedeckt. Über seinen wahren Namen spricht er nicht.",
        "Als Schurke ist er mit den Schattenseiten des Lebens vertraut. Er verlässt sich auf Geschick, Heimlichkeit und Täuschung, bleibt meist höflich und verschwiegen – und verliert seinen eigenen Vorteil nur selten aus den Augen."
      ],
      status: "portrait"
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
      title: "Die Chroniken der vier Gefährten",
      subtitle: "Vier Wege. Eine Begegnung. Ein ungeschriebenes Schicksal.",
      date: null,
      time: null,
      dateLabel: "Datum noch offen",
      session: "Auftakt · bestätigt",
      inWorldDate: "Nicht überliefert",
      location: "Eine Taverne · Name und Ort noch unbekannt",
      image: "assets/tavern.webp",
      imageAlt: "Die vier Gefährten am Tisch einer warm beleuchteten Taverne: Asphodel, Gamakichi mit Raben, Murtagh mit P-Nut und Heela",
      state: "story",
      summary: "Vier Fremde finden unabhängig voneinander ihren Weg in dieselbe Taverne – hier beginnt die Geschichte der vier Gefährten.",
      paragraphs: [
        "Manchmal beginnen die größten Geschichten nicht mit einer Schlacht, einer Prophezeiung oder einem heldenhaften Entschluss.",
        "Manchmal beginnen sie einfach in einer Taverne.",
        "Vier Fremde, jeder mit seiner eigenen Vergangenheit, seinen eigenen Zielen und Gründen, unterwegs zu sein. Ihre Wege führten sie unabhängig voneinander an denselben Ort.",
        "Ein Zufall? Vielleicht.",
        "Noch ahnte keiner von ihnen, dass aus vier einzelnen Wegen bald ein gemeinsamer werden sollte.",
        "**Ich bin Murtagh, ein einfacher Waldgnom, und dies ist die Geschichte von vier ungewöhnlichen Gefährten.**",
        "Was uns erwartet, weiß ich nicht.",
        "Aber eines weiß ich gewiss: **Jede Geschichte muss irgendwo beginnen. Und unsere beginnt hier.**"
      ]

    }
  ]
};
