# Parodos žaidimų sąranka

Du žaidimai veikia **tuo pačiu metu** per visą parodą.

```
viktorina/
├── index.html               ← Pagrindinis puslapis (pasirinkimas)
├── viktorina.html           ← 1. Viktorina (28 klausimai su atsakymais)
├── geoguess.html            ← 2. Geografijos žaidimas (GeoGuessr stilius)
├── google-apps-script.js    ← Google Sheets backend (v3 — abu žaidimai)
├── SARANKA.md               ← Ši instrukcija
└── images/
    └── (visos nuotraukos)
```

---

## 1️⃣ Google Apps Script — SVARBU: atnaujinti

Kadangi scenarijus buvo atnaujintas (v3), reikia jį įkelti iš naujo.

**Žingsniai:**
1. Atidarykite savo Google Sheets dokumentą
2. Viršuje: **Plėtiniai → Apps Script**
3. Ištrinkite **viską** ir įklijuokite `google-apps-script.js` turinį
4. Spauskite 💾 **Išsaugoti**
5. Spauskite **„Diegti" → „Tvarkyti diegimus"**
6. Prie esamo diegimo spauskite ✏️ **Redaguoti** → pasirinkite naują versiją → **Įdiegti**
   > ⚠️ Naudokite **esamą diegimą** (ne naują!) — tada URL išlieka tas pats ir nieko nereikia keisti HTML failuose.

**Rezultatas Google Sheets:** atsiras **du lapai**:
- `Geo_Rezultatai` — geografijos žaidimo rezultatai
- `Quiz_Rezultatai` — viktorinos rezultatai

---

## 2️⃣ Google Maps API raktas (Street View)

Geografijos žaidimas naudoja **Google Street View** 360° panoramas. Tam reikia API rakto.

**Žingsniai:**
1. Eikite į [Google Cloud Console](https://console.cloud.google.com)
2. Sukurkite naują projektą (arba naudokite esamą)
3. Eikite į **APIs & Services → Library**
4. Įjunkite **Maps JavaScript API** (tai apima ir Street View)
5. Eikite į **APIs & Services → Credentials**
6. Spauskite **Create Credentials → API Key**
7. Nukopijuokite raktą

**Rakto įrašymas:**
Atidarykite `geoguess.html`, raskite eilutę:
```javascript
googleApiKey : "ĮRAŠYK_SAVO_API_RAKTĄ_ČIA",
```
Pakeiskite į savo raktą:
```javascript
googleApiKey : "AIzaSy..._jūsų_raktas",
```

**Kaina:** Google suteikia **$200/mėn. nemokamų kreditų** — tai ~28 000 Street View užklausų. Parodai to daugiau nei pakanka.

**Svarbu — API rakto apsauga:**
- Cloud Console → API Key → **Restrict key**
- Pridėkite HTTP referer ribojimą: `https://JŪSŲ_VARDAS.github.io/*`
- Tai apsaugos nuo neteisėto naudojimo

> 💡 **Jei API rakto nėra** — žaidimas vis tiek veiks! Vietoj Street View bus rodoma statinė gyvūno nuotrauka.

---

## 3️⃣ Failų įkėlimas į internetą (GitHub Pages)

1. Sukurkite nemokamą paskyrą [github.com](https://github.com)
2. Sukurkite naują **repository** (pvz. `parodos-zaidimas`)
3. Įkelkite **visus failus** iš `viktorina/` aplanko (įskaitant `images/` aplanką)
4. Eikite į **Settings → Pages → Source: main branch / root**
5. Po kelių minučių žaidimai bus pasiekiami:

| Žaidimas | URL |
|---|---|
| Pagrindinis puslapis | `https://JŪSŲ_VARDAS.github.io/parodos-zaidimas/` |
| Viktorina | `https://JŪSŲ_VARDAS.github.io/parodos-zaidimas/viktorina.html` |
| Geografija | `https://JŪSŲ_VARDAS.github.io/parodos-zaidimas/geoguess.html` |

---

## 4️⃣ QR kodų generavimas

Rekomenduojama turėti **tris QR kodus**:

| QR kodas | Nukreipia į | Kur naudoti |
|---|---|---|
| **Pagrindinis** | `index.html` | Pagrindinė stotelė galerijoje |
| **Viktorina** | `viktorina.html` | Prie viktorinos stotelės |
| **Geografija** | `geoguess.html` | Prie geo žaidimo stotelės |

Naudokite nemokamą generatorių: [qr-code-generator.com](https://www.qr-code-generator.com)

---

## 5️⃣ Rezultatų peržiūra parodos metu

Atidarykite Google Sheets — rezultatai atsiranda realiu laiku:
- `Geo_Rezultatai` — geografijos čempionai (taškai iš 5000)
- `Quiz_Rezultatai` — viktorinos čempionai (taškai iš 28)

---

## 6️⃣ Konfigūracijos keitimas

Abiejų žaidimų pradžioje yra `CFG` objektas — keiskite pagal poreikį:

**viktorina.html:**
```javascript
const CFG = {
  exhibitionName : "Fotografijų paroda 2026",
  prize          : "50€ vertės FotoFoto kuponą",
  scriptUrl      : "https://script.google.com/...",
};
```

**geoguess.html:**
```javascript
const CFG = {
  exhibitionName : "Fotografijų paroda 2026",
  scriptUrl      : "https://script.google.com/...",
  googleApiKey   : "AIzaSy..._jūsų_raktas",
  svRadius       : 50000,  // Paieškos spindulys metrais (50 km)
};
```

> `svRadius` — kiek metrų nuo tikslios koordinatės ieškoti artimiausios Street View panoramos. Laukinėje gamtoje (Fiordland, Jukonas) kartais artimiausia panorama bus kelyje, ne pačioje vietoje. 50 km turėtų pakakti daugumai vietų.
