# Bokföringsakuten - Övningsprogram

Ett interaktivt övningsprogram för att lära sig bokföring med spelkänsla!

## Funktioner

- **Interaktiv bokföring**: Öva på att kontera affärshändelser till rätt konton
- **Poängsystem**: Få poäng för rätt svar och höj din nivå
- **Ledtrådar**: Behöver du hjälp? Använd ledtråd-knappen
- **Anpassningsbara övningar**: Ladda in egna affärshändelser från JSON-filer
- **Validering**: Systemet kontrollerar att debet = kredit

## Kom igång

1. Öppna `index.html` i din webbläsare
2. Läs affärshändelsen som visas
3. Välj rätt konto, debet/kredit och belopp
4. Lägg till fler rader om det behövs (dubbel bokföring!)
5. Klicka "Kontrollera svar"

## Skapa egna övningar

Du kan skapa egna affärshändelser genom att ladda in en JSON-fil.

### Filformat

Filen ska vara en JSON-array med händelser i följande format:

```json
[
    {
        "description": "Beskrivning av affärshändelsen",
        "hint": "En ledtråd för användaren",
        "correctAnswer": [
            {
                "account": "1510",
                "side": "debet",
                "amount": 12500
            },
            {
                "account": "3001",
                "side": "kredit",
                "amount": 10000
            }
        ],
        "level": 1
    }
]
```

### Fältbeskrivning

- **description** (sträng): Beskrivning av affärshändelsen som användaren ska kontera
- **hint** (sträng): En ledtråd som hjälper användaren om de fastnar
- **correctAnswer** (array): Lista med rätta bokföringsrader
  - **account** (sträng): Kontonummer (måste finnas i kontoplanen)
  - **side** (sträng): "debet" eller "kredit"
  - **amount** (nummer): Belopp i kronor
- **level** (nummer): Svårighetsgrad (1 = lätt, 2 = medel, 3+ = svår)

### Tillgängliga konton

#### Tillgångar
- 1510 - Kundfordringar
- 1910 - Kassa
- 1930 - Bank
- 1500 - Varulager

#### Skulder
- 2440 - Leverantörsskulder
- 2610 - Utgående moms
- 2640 - Ingående moms

#### Intäkter
- 3001 - Försäljning varor
- 3740 - Öresutjämning

#### Kostnader
- 4000 - Inköp varor
- 5010 - Lokalhyra
- 6071 - Representation
- 7010 - Lön
- 7510 - Arbetsgivaravgifter

### Ladda in egna händelser

1. Skapa en JSON-fil enligt formatet ovan (se `exempel-händelser.json`)
2. Klicka på "Välj fil" i programmet
3. Välj din JSON-fil
4. Händelserna laddas in och spelet startar om
5. Klicka "Återställ standard" för att gå tillbaka till standardhändelserna

## Tips

- **Dubbelbok alltid**: Kom ihåg att varje affärshändelse ska bokföras på minst två konton
- **Debet = Kredit**: Totalsumman på debet måste alltid vara lika med totalsumman på kredit
- **Moms**: Glöm inte att räkna med moms på 25% där det är relevant
- **Kundfordringar**: När du säljer på kredit uppstår en kundfordran
- **Leverantörsskulder**: När du köper på kredit uppstår en leverantörsskuld

## Teknisk information

Programmet är byggt med:
- HTML5
- CSS3
- Vanilla JavaScript (ingen externa bibliotek)

Allt körs lokalt i webbläsaren, ingen server behövs.
