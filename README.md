# Fintech Enigma midlertidig ladningsside

![OneLinerDark](./bilder/OneLinerDark.svg)

## Krav:

### 1. Bruk av teknologi.

- _KUN_ bruk av html, CSS og JavaScript. 

- For CSS kan en sjekke ut [TailwindCSS](https://tailwindcss.com/docs/installation) dersom dere ønsker en utfordring. (Enklere måte å jobbe med CSS). 

### 2. Design

- Sentrert logo på siden. 

    * SVG filer finner dere her [her](./bilder/).

- En liten tekst hvor det står comming soon... (e.l.)

- Bruk bakgrunnsfarger som er spesifisert i [GrafiskProfil01](./bilder/GrafiskProfil01.pdf) og passer med valg av farge på logo. 

- Bruk en kul font:

    - Denne pleier å være good:

        ````css
        .minOverskrift{
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        ````

- Vær kreativ! :)

### 3. Visning av sponsorer og sammarbeidspartnere (dette haster ikke).

- Gjør det enkelt å vise frem sponsorer og sammarbeidspartnere i `footer'en`. Bla enigma, og eventult bedrifter på sikt.

- Gjør det enkelt å legge til nye sponsorer/sammarbeidspartnere i feks en array.

- Tips for å komme i gang: 

    ````javascript
    const sponsorer = [
        {
            navn: 'Enigma', 
            bilde: 'link',
            ... // Flere egenskaper
        }, 
        ... // eventuelt flere ...
    ];

    // En enkel måte å gjøre det på:
    // Sjekk ut https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    sponsorer.forEach(spons => {
        // Rendre sponsorer på siden. 
    });
    ````

