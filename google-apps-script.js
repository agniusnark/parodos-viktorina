// ============================================================
// Google Apps Script — Viktorina + Geo žaidimas (v3)
// ============================================================
// SĄRANKA:
//   1. Atidarykite savo Google Sheets dokumentą
//   2. Viršuje: Plėtiniai → Apps Script
//   3. Ištrinkite viską ir įklijuokite šį kodą
//   4. Spauskite 💾 Išsaugoti
//   5. Spauskite "Įdiegti" → "Naujas diegimas"
//      - Vykdyti kaip: Aš
//      - Kas gali pasiekti: Visi
//   6. Patvirtinkite leidimus, nukopijuokite URL
//   7. Įklijuokite tą patį URL į abu failus:
//        viktorina.html → CFG.scriptUrl
//        geoguess.html  → CFG.scriptUrl
//
// Google Sheets dokumente atsiras DU lapai:
//   📄 Geo_Rezultatai  — geo žaidimo rezultatai
//   📄 Quiz_Rezultatai — viktorinos rezultatai
// ============================================================

const SHEETS = {
  geo  : 'Geo_Rezultatai',
  quiz : 'Quiz_Rezultatai',
};

// ── SAUGOTI REZULTATĄ (POST) ─────────────────────────────
function doPost(e) {
  try {
    const d        = JSON.parse(e.postData.contents);
    const gameType = String(d.gameType || 'quiz'); // 'geo' arba 'quiz'
    const sheetName = SHEETS[gameType] || SHEETS.quiz;
    const s        = getSheet(sheetName, gameType);

    if (gameType === 'geo') {
      s.appendRow([
        new Date(),
        String(d.nickname  || 'Žaidėjas'),
        String(d.fullName  || ''),
        String(d.email     || ''),
        Number(d.score     || 0),
        Number(d.total     || 5000),
        String(d.rounds    || ''),
        String(d.timestamp || ''),
      ]);
    } else {
      // quiz (viktorina) — išlaiko senąją struktūrą su telefonu
      s.appendRow([
        new Date(),
        String(d.nickname  || 'Žaidėjas'),
        String(d.fullName  || ''),
        String(d.email     || ''),
        String(d.phone     || ''),
        Number(d.score     || 0),
        Number(d.total     || 28),
        String(d.timestamp || ''),
      ]);
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, err: err.message });
  }
}

// ── GAUTI LYDERIŲ LENTELĘ (GET) ──────────────────────────
function doGet(e) {
  try {
    const gameType  = String((e.parameter && e.parameter.gameType) || 'quiz');
    const sheetName = SHEETS[gameType] || SHEETS.quiz;
    const s         = getSheet(sheetName, gameType);
    const rows      = s.getDataRange().getValues();

    // Stulpelių indeksai skiriasi pagal žaidimo tipą
    const scoreCol = gameType === 'geo' ? 4 : 5; // 0-based po slice(1)

    const scores = rows.slice(1)
      .filter(r => r[1]) // praleidžiame tuščias eilutes
      .map(r => ({
        date    : r[0],
        nickname: String(r[1]),
        score   : Number(r[scoreCol]),
        total   : Number(r[scoreCol + 1]) || (gameType === 'geo' ? 5000 : 28),
      }))
      .sort((a, b) => b.score - a.score || new Date(a.date) - new Date(b.date))
      .slice(0, 200);

    return json(scores);
  } catch (err) {
    return json({ err: err.message });
  }
}

// ── PAGALBINĖ: GAUTI/SUKURTI LAPĄ ───────────────────────
function getSheet(sheetName, gameType) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(sheetName);

  if (!s) {
    s = ss.insertSheet(sheetName);

    let header;
    if (gameType === 'geo') {
      header = ['Data', 'Slapyvardis', 'Vardas Pavardė', 'El. paštas', 'Taškai', 'Iš viso', 'Rungtys (JSON)', 'Laikas'];
    } else {
      header = ['Data', 'Slapyvardis', 'Vardas Pavardė', 'El. paštas', 'Telefonas', 'Taškai', 'Iš viso', 'Laikas'];
    }

    s.appendRow(header);
    const h = s.getRange(1, 1, 1, header.length);
    h.setBackground('#c9954a');
    h.setFontColor('#ffffff');
    h.setFontWeight('bold');
    s.setFrozenRows(1);
  }

  return s;
}

// ── JSON ATSAKYMAS ───────────────────────────────────────
function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
