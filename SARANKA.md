# Viktorinos žaidimo sąranka

## 📁 Failų struktūra

```
viktorina/
├── viktorina.html          ← Pagrindinis žaidimas
├── google-apps-script.js   ← Backend kodas (Google Sheets)
├── SARANKA.md              ← Ši instrukcija
└── images/
    ├── 1_eglinis_tetervas.jpg
    ├── 2_baltasis_kurtinukas.jpg
    ├── 3_kea.jpg
    ├── 4_kojote.jpg
    ├── 5_erelis_sede.jpg
    ├── 6_erelis_skrenda.jpg
    ├── 7_geltonakis_pingvinas.jpg
    ├── 8_geltonakis_pingvinas_2.jpg
    ├── 9.jpg               ← Jūsų 9-asis gyvūnas
    └── 10.jpg              ← Jūsų 10-asis gyvūnas
```

---

## 1️⃣  Nuotraukų pridėjimas

Nukopijuokite savo nuotraukas į `images/` aplanką su tiksliai tokiais pavadinimais kaip nurodyta aukščiau.

> **Patarimas:** Nuotraukos geriausiai atrodo santykiu 4:3 arba 3:2.
> Rekomenduojamas dydis: 1200×900 px, max 500 KB (greitesniam krovimui).

---

## 2️⃣  Klausimų 9 ir 10 papildymas

Atidarykite `viktorina.html` teksto redaktoriuje ir raskite šią vietą:

```javascript
// ⬇️ PAPILDYKITE klausimus 9–10, kai turėsite daugiau nuotraukų:
{
  image   : "images/9.jpg",
  question: "KLAUSIMAS 9 — pakeiskite šį tekstą",
  ...
```

Pakeiskite klausimą, atsakymus ir teisingą indeksą (0=A, 1=B, 2=C, 3=D).

---

## 3️⃣  Lyderių lentelės sąranka (Google Sheets)

### Žingsniai:

1. Eikite į [sheets.google.com](https://sheets.google.com) → sukurkite naują dokumentą
2. Viršuje: **Plėtiniai → Apps Script**
3. Ištrinkite viską, kas yra, ir įklijuokite `google-apps-script.js` turinį
4. Spauskite 💾 (Išsaugoti)
5. Spauskite **„Įdiegti" → „Naujas diegimas"**:
   - Tipas: Žiniatinklio programa
   - Vykdyti kaip: **Aš**
   - Kas gali pasiekti: **Visi**
6. Patvirtinkite leidimus (gali prašyti Google paskyros patvirtinimo)
7. Nukopijuokite rodomą **URL** (atrodo taip: `https://script.google.com/macros/s/ABC.../exec`)

### URL įklijavimas į žaidimą:

Atidarykite `viktorina.html`, raskite:

```javascript
scriptUrl: "",
```

Ir įklijuokite:

```javascript
scriptUrl: "https://script.google.com/macros/s/JŪSŲ_URL_ČIA/exec",
```

---

## 4️⃣  Talpinimas internete (GitHub Pages — nemokama)

1. Sukurkite nemokamą paskyrą [github.com](https://github.com)
2. Sukurkite naują **repository** (pvz. `parodos-viktorina`)
3. Įkelkite visus failus iš `viktorina/` aplanko
4. Eikite į **Settings → Pages → Source: main branch**
5. Po kelių minučių žaidimas bus pasiekiamas adresu:
   `https://JŪSŲ_VARDAS.github.io/parodos-viktorina/viktorina.html`

Šį adresą galite siųsti dalyviams el. paštu arba kaip QR kodą parodos metu!

---

## 5️⃣  Parodos pabaigoje — nugalėtojo paskelbimas

Atidarykite savo Google Sheets dokumentą — ten matysite visų dalyvių rezultatus. Lentelė automatiškai rūšiuoja pagal taškus.

---

## ⚙️  Papildomi nustatymai

`viktorina.html` viršuje esančiame `CFG` objekte galite keisti:

```javascript
const CFG = {
  exhibitionName: "Fotografijų paroda 2026",  // Parodos pavadinimas
  prize         : "50€ vertės foto spaudinį", // Prizas
  scriptUrl     : "",                          // Google Apps Script URL
};
```
