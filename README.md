# Coding the Curbs - Design Challenge

In sprint 12 heb ik de opdracht gekregen om binnen 2,5 week een dashboard met interactief formulier te ontwerpen en bouwen voor Coding the Curbs. Op dit moment wordt een quickscan nog handmatig uitgevoerd: data wordt genoteerd in een kladblok en vervolgens overgezet naar Excel. Het doel is om dit proces te vereenvoudigen door medewerkers de data direct via het formulier te laten invullen, waarna deze in een overzicht wordt weergegeven. Dit overzicht moet ambtenaren, medewerkers en admins een duidelijker en interactiever inzicht geven in de problemen binnen een stad.

Voor de data maken we gebruik van een database die de docenten hebben opgezet: de [FDND Directus database - Coding the Curbs](https://fdnd-agency.directus.app/items/ctc_smartzone). Via de quickscan op de website kunnen wij hieraan data toevoegen.

Bij de ontwikkeling van de website is rekening gehouden met responsiveness, toegankelijkheid en performance, getoetst door middel van user-tests, WCAG-audits en performance-audits. De meeste tijd is echter besteed aan progressive enhancement. Dit houdt in dat de website eerst volledig functioneel is met alleen HTML, zodat ook oudere of minder krachtige browsers de basisinhoud en functionaliteit kunnen gebruiken. Daarna wordt de website laag voor laag verbeterd met CSS en JavaScript, zodat gebruikers met een moderne browser een rijkere ervaring krijgen, terwijl de website in alle browsers blijft werken. Voor de technische uitwerking is gebruikgemaakt van NodeJS, Express, JSON en Liquid.
#### Wat is Coding the Curbs
[Coding the Curbs](https://www.codingthecurbs.com/) is 3 jaar geleden opgericht in Nederland. De diensten van het bedrijf worden gebruikt in 20 steden en 9 landen. Via een app of een scanbare paal op straat reserveer je vooraf een tijdslot om de plek te kunnen gebruiken. Met hun eigen grondsensoren en een digitaal dashboard meet het bedrijf precies wanneer en hoe lang de plekken bezet zijn. Zo helpen ze stadsbesturen om de druk op die plekken te verlichten.

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Toegankelijkheid](#toegankelijkheid)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
Op dit moment wordt een quickscan nog handmatig uitgevoerd: data wordt eerst genoteerd in een kladblok en daarna handmatig overgezet naar Excel. Het doel is om dit proces te vereenvoudigen door medewerkers de data direct via het formulier te laten invullen, waarna dit in een overzicht wordt weergegeven.

Voor het ontwerp van de website heb ik eerst onderzoek gedaan naar hoe een dashboard en formulier eruit zouden kunnen zien op een telefoon, zodat alle functionaliteiten behouden blijven zonder dat gebruikers worden overspoeld met informatie. Van elke pagina heb ik meerdere versies ontworpen in [Figma](https://www.figma.com/design/4zUHXVcRVtgckJ6uqNOvX4/Coding-the-Curbs---Design-Challenge?node-id=0-1&t=y6HrWpO7TYIF44p6-1), en ik heb medestudenten en docenten gevraagd mee te kijken welk ontwerp zij het meest geschikt vonden.

Op dit moment zijn er 3 paginas op de website:
- De homepagina
- Een overzichts pagina per stad
- Een quickscan/ formulier

<img width="800" alt="all-devices-black(1)" src="https://github.com/user-attachments/assets/bc022ded-0d46-49c8-897c-4ba096fdcaeb" />

>_Mockup van de homepagina_

Link naar de website: https://proof-of-concept-oodn.onrender.com/

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->

**User story:** Als medewerker van Coding the Curbs wil ik op locatie snel een quickscan kunnen invullen, zodat de data direct en foutloos in het systeem terechtkomt, zonder dat ik dit achteraf handmatig via een kladblok en Excel moet verwerken.

De website bestaat uit meerdere pagina's, waaronder het quickscan-formulier en het dashboard met overzicht. Hieronder volgen drie uitgelichte onderdelen van de quickscan/het formulier.

### Fotopreview
Voor het toevoegen van een foto aan het formulier heb ik een fotopreview ontworpen die bevestigt dat de foto is geüpload. Zelfs bij traag internet of zonder JavaScript blijft deze bevestiging zichtbaar via een checkmark naast '1 - Upload foto', met daarnaast een opnieuw-icoon om een nieuwe foto toe te voegen.

https://github.com/user-attachments/assets/e4c86d9c-6c7a-4ecb-b158-8683c63e8a01

### Kies een stad
Voor het toevoegen van een stad heb ik een lijst gemaakt waaruit je kunt kiezen. Vanuit het principe van progressive enhancement werkt deze lijst in elke browser, maar in Chrome is het ontwerp uitgebreider, omdat deze browser meer mogelijkheden biedt op het gebied van styling. In Firefox wordt een standaard dropdown getoond, terwijl Chrome een uitgebreidere visuele weergave krijgt met extra styling zoals kleuren en iconen.

Verschil tussen Firefox en Chrome:

https://github.com/user-attachments/assets/82b9ce0e-c363-48bf-b364-f3e92017bb12

<br>

https://github.com/user-attachments/assets/d6fc48b6-76b1-441b-8024-e27dc4aed2d1

### Succes- en errorstate Quickscan
Om aan te geven of het formulier succesvol is verstuurd, heb ik succes- en errorstates toegepast. Bij een succesvolle verzending verschijnt de melding "Quickscan toegevoegd!", waarna je wordt doorgeleid naar de pagina met de formulierdata. Bij een fout, bijvoorbeeld door een storing in de database of geen internetverbinding, verschijnt in plaats daarvan "Oeps... Er ging iets mis, probeer het later opnieuw!" en blijf je op de formulierpagina.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/01c47fb1-e505-42ae-8531-15cf6c8abffe" />

>_Successtate_

<br>

<img width="300" alt="image" src="https://github.com/user-attachments/assets/91f5d68c-18dc-46cf-b7e7-75db1d1a4f1a" />

>_Errorstate_

## Toegankelijkheid
Voor de toegankelijkheid heb ik [een user-test](https://github.com/SieuwkeSheta/proof-of-concept/issues/25), [een WCAG Audit](https://github.com/SieuwkeSheta/proof-of-concept/issues/15) en [een Performance Audit](https://github.com/SieuwkeSheta/proof-of-concept/issues/16) uitgevoerd op de quickscan/formulier pagina, uitgeschreven in issues en verwerkt.

- User test is uitgevoerd door een medestudent de pagina te laten testen
- WCAG Audit is uitgevoerd door middel van de Lighthouse Accessibility test van Google Chrome, een handmatige test aan de hand van de checklist van de A11Y Project, en een test met de [NVDA](https://www.nvaccess.org/download/) screenreader
- Performance Audit is uitgevoerd door middel van de Lighthouse Performance test van Google Chrome, een [PageSpeed Insights test](https://pagespeed.web.dev/) en [een WebPageTest](https://www.webpagetest.org/)


## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->
De website is gebouwd met NodeJS, Express, JSON en Liquid, volgens het principe van progressive enhancement.

### HTML
Voor de HTML heb ik semantische tags gebruikt zoals `<header>`, `<main>` en `<section>`, zodat de pagina ook zonder CSS en JS nog steeds logisch in elkaar zit. Voor het overzicht van de geschiktheid per categorie (Monitoring en Smart Zone) op de homepagina heb ik het [`<meter>`-element](https://github.com/SieuwkeSheta/proof-of-concept/blob/a3f676f90529311859af0a856462658533aaec18/views/index.liquid#L48-L83) gebruikt, waarmee de verdeling tussen geschikt, neutraal en ongeschikt visueel wordt weergegeven zonder dat hiervoor JS nodig is. Het formulier is opgebouwd met native HTML form elements zoals [`<select>`](https://github.com/SieuwkeSheta/proof-of-concept/blob/a3f676f90529311859af0a856462658533aaec18/views/quick-scan.liquid#L31-L36), [`<input type="radio">`](https://github.com/SieuwkeSheta/proof-of-concept/blob/a3f676f90529311859af0a856462658533aaec18/views/quick-scan.liquid#L68-L84) en [`<input type="number">`](https://github.com/SieuwkeSheta/proof-of-concept/blob/a3f676f90529311859af0a856462658533aaec18/views/quick-scan.liquid#L54-L57), zodat het ook werkt als JavaScript uitstaat.

### CSS
Voor de layout heb ik vooral CSS Grid en Flexbox gebruikt. Daarnaast heb ik [custom properties](https://github.com/SieuwkeSheta/proof-of-concept/blob/a3f676f90529311859af0a856462658533aaec18/public/styles/style.css#L42-L59) toegepast voor dingen zoals kleuren en spacing, zodat ik die makkelijk op één plek kan aanpassen in plaats van overal in de CSS te moeten zoeken. Ook heb ik [`@supports`](https://github.com/SieuwkeSheta/proof-of-concept/blob/a3f676f90529311859af0a856462658533aaec18/public/styles/style.css#L132-L178) gebruikt om te checken of een browser bepaalde CSS-functionaliteit ondersteunt, zodat enhancements alleen worden toegepast in browsers die dit aankunnen.

### JavaScript
Met JavaScript heb ik bepaalde dingen net wat fijner gemaakt, zonder dat de website hier afhankelijk van is. Zo heb ik bijvoorbeeld de [fotopreview](https://github.com/SieuwkeSheta/proof-of-concept/blob/a3f676f90529311859af0a856462658533aaec18/public/scripts/client.js#L2-L32) met JS gemaakt, die laat zien dat je foto geüpload is, maar dit is niet nodig om het formulier te kunnen versturen.

### NodeJS & Express
Voor het verwerken van de formulierdata, waaronder de foto-upload, heb ik [Multer](https://github.com/SieuwkeSheta/proof-of-concept/blob/a3f676f90529311859af0a856462658533aaec18/server.js#L72-L131) gebruikt. Dit is een middleware voor Express waarmee je `multipart/form-data` kunt afhandelen, wat nodig is om bestanden via een formulier te kunnen versturen.

## Installatie
Volg deze stappen om de development omgeving in te richten om aan deze repository te kunnen werken:

Stap 1) installeer de [NodeJS ontwikkelomgeving](https://nodejs.org/en/download). Kies voor NodeJS 24.13.0 (LTS, long-term support), download het installatiebestand en doorloop het installatieproces.

Stap 2) Fork deze repository, *clone* deze op jouw computer en open het in VSCodium/ een code editor.

Stap 3) Open de Terminal in VSCodium, Voer in de terminal het commando `npm install uit` door het in te typen en op enter te drukken.

Stap 4) Om `multipart/form-data` (bestanden) te kunnen POST'en is het handig om [Multer](https://www.npmjs.com/package/multer) te installeren in de terminal. 

Stap 5) Na de installatie is de map `node_modules` aangemaakt, en gevuld met allerlei packages. Start de website door in de terminal het comando `npm start` uit te voeren. Als het goed is, komt hier een melding te staan over het opstarten van de server: Application started on http://localhost:8000 — Open deze URL in je browser

## Bronnen
- [Mijn Figma ontwerpen](https://www.figma.com/design/4zUHXVcRVtgckJ6uqNOvX4/Coding-the-Curbs---Design-Challenge?node-id=0-1&t=y6HrWpO7TYIF44p6-1)
- [FDND Directus database - Coding the Curbs](https://fdnd-agency.directus.app/items/ctc_smartzone)
- [Multer | Middleware for uploading files - @NPMJS](https://www.npmjs.com/package/multer)
- [Liquid Markup - @Modyo Docs](https://docs.modyo.com/en/platform/channels/liquid-markup.html)
- [Building Great Mobile Forms - @Medium](https://uxplanet.org/building-great-mobile-forms-2fa8e9a258cc)
- [::file-selector-button - @MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::file-selector-button)
- [:valid CSS pseudo-class - @MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:valid)
- [@supports - @MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports)
- [Meter element - @MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter)
  
## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
