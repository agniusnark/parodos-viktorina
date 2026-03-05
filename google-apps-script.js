// ============================================================
// Google Apps Script — Viktorinos lyderių lentelė (v2)
// ============================================================
// SĄRANKA:
//   1. Atidarykite naują Google Sheets dokumentą
//   2. Viršuje: Plėtiniai → Apps Script
//   3. Ištrinkite viską ir įklijuokite šį kodą
//   4. Spauskite 💾 Išsaugoti
//   5. Spauskite "Įdiegti" → "Najas diegimas"
//      - Vykdyti kaip: Aš
//      - Kas gali pasiekti: Visi
//   6. Patvirtinkite leidimus, nukopijuokite URL
//   7. Įklijuokite URL į viktorina.html → CFG.scriptUrl
// ============================================================

const SHEET = 'Rezultatai';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const s = getSheet();
    s.appendRow([
      new Date(),
      String(d.nickname || 'Žaidėjas'),
      String(d.fullName || ''),
      String(d.email    || ''),
      String(d.phone    || ''),
      Number(d.score    || 0),
      Number(d.total    || 10),
      String(d.timestamp || '')
    ]);
    return json({ ok: true });
  } catch(err) {
    return json({ ok: false, err: err.message });
  }
}

function doGet(e) {
  try {
    const s    = getSheet();
    const rows = s.getDataRange().getValues();

    // Praleidžiame antraštės eilutę (row 0)
    // SVARBU: lyderių lentelėje grąžiname TIK slapyvardį (nickname)
    // Vardas, pavardė, el. paštas ir telefonas — konfidencialūs
    const scores = rows.slice(1)
      .filter(r => r[1]) // filtruojame tuščias
      .map(r => ({
        date    : r[0],
        nickname: String(r[1]),
        score   : Number(r[5]),
        total   : Number(r[6]) || 10
      }))
      .sort((a, b) => b.score - a.score || new Date(a.date) - new Date(b.date))
      .slice(0, 200); // top 200

    return json(scores);
  } catch(err) {
    return json({ err: err.message });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(SHEET);
  if (!s) {
    s = ss.insertSheet(SHEET);
    // Antraštė
    s.appendRow(['Data', 'Žaidėjo vardas', 'Vardas Pavardė', 'El. paštas', 'Telefonas', 'Taškai', 'Iš viso', 'Laikas']);
    const h = s.getRange(1, 1, 1, 8);
    h.setBackground('#c9954a');
    h.setFontColor('#ffffff');
    h.setFontWeight('bold');
  }
  return s;
}

function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
