/* Nursy – Pflegeplanung (Frontend-Demo)
   Modal UI nach Skizze: Anamnese / Vorlagen / Frei definiert
   Hinweis: Demo-Daten, keine Speicherung.
*/

(function () {
  'use strict';

  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  const demoTemplates = [
    // 13 Kategorien – Vorlagen (erweitert, detaillierter)

    // 1 Mobilität
    { atl:'Sich bewegen', kat:'Mobilität', symptom:'Eingeschränkte Mobilität / unsicherer Gang', massnahme:'Mobilisation & Gehtraining', ziel:'Sicheres Gehen', details:[
      'Transfer/Stand/Gangbild einschätzen; Hilfsmittel anpassen.',
      'Kurze Einheiten, Pausen, Sturzprophylaxe integrieren.',
      'Dokumentation: Strecke, Assistenzgrad, Belastbarkeit.'
    ]},
    { atl:'Sich bewegen', kat:'Mobilität', symptom:'Kontrakturgefahr (Immobilität)', massnahme:'Bewegungsübungen (ROM), Lagerung, Aktivierung', ziel:'Beweglichkeit erhalten', details:[
      'ROM nach AO, schmerzadaptiert; Gelenkstellung beachten.',
      'Lagerungswechsel + Positionierung; ggf. Hilfsmittel.',
      'Dokumentation: Schmerz, Bewegungsausmaß, Hautstatus.'
    ]},
    { atl:'Sich bewegen', kat:'Mobilität', symptom:'Transfer unsicher (Bett–Stuhl)', massnahme:'Transfertraining + Anleitung Kinästhetik', ziel:'Sicherer Transfer', details:[
      'Rutschbrett/Standhilfe nach AO; Umgebung vorbereiten.',
      'Ressourcen fördern, klare Schritt-für-Schritt-Anleitung.',
      'Dokumentation: benötigte Hilfe, Risiken, Reaktion.'
    ]},
    { atl:'Sich bewegen', kat:'Mobilität', symptom:'Eingeschränkte Belastbarkeit', massnahme:'Belastungsdosierung, Aktivierung, Pausenplan', ziel:'Belastbarkeit gesteigert', details:[
      'Borg-/Dyspnoe-Skala nutzen; Überforderung vermeiden.',
      'Aktivitäten in Etappen; Ruhephasen strukturieren.',
      'Dokumentation: Aktivitätsdauer, Vitalzeichen falls vorhanden.'
    ]},

    // 2 Körperpflege
    { atl:'Körperpflege', kat:'Körperpflege', symptom:'Teilweise Unterstützung bei Körperpflege', massnahme:'Anleitung + Unterstützung morgens/abends', ziel:'Selbstständigkeit erhalten', details:[
      'Hilfsmittel bereitstellen; Reihenfolge gemeinsam planen.',
      'Intimsphäre wahren, Ressourcen fördern, Pausen anbieten.',
      'Dokumentation: Hilfestufe, Hautbesonderheiten.'
    ]},
    { atl:'Körperpflege', kat:'Körperpflege', symptom:'Mundpflege erschwert (Prothesen)', massnahme:'Mundpflege anleiten/übernehmen, Prothesenpflege', ziel:'Mundschleimhaut intakt', details:[
      'Weiche Bürste/geeignete Pflege; Druckstellen beobachten.',
      'Flüssigkeitszufuhr unterstützen; ggf. Lippenpflege.',
      'Dokumentation: Befund, Beschwerden, Maßnahmen.'
    ]},
    { atl:'Körperpflege', kat:'Körperpflege', symptom:'Intimhygiene benötigt Unterstützung', massnahme:'Intimpflege, Hautschutz, Anleitung', ziel:'Hautreizungen vermeiden', details:[
      'Von sauber nach weniger sauber; sanfte Reinigung, trocken tupfen.',
      'Barrierecreme nach Bedarf; Inko-Material anpassen.',
      'Dokumentation: Rötung, Schmerzen, Verträglichkeit.'
    ]},
    { atl:'Körperpflege', kat:'Körperpflege', symptom:'Hilfebedarf beim An-/Auskleiden', massnahme:'Ankleidetraining, Hilfsmittel, Ressourcenförderung', ziel:'Mehr Selbstständigkeit', details:[
      'Kleidung vorbereiten; betroffene Seite zuerst/zuletzt je nach Situation.',
      'Greifzange/Anziehhilfen; Zeit einplanen.',
      'Dokumentation: Assistenzgrad, Fortschritt.'
    ]},

    // 3 Ernährung & Flüssigkeit
    { atl:'Essen & Trinken', kat:'Ernährung & Flüssigkeit', symptom:'Unzureichende Flüssigkeitsaufnahme', massnahme:'Trinkplan + Erinnerung', ziel:'Ausreichende Hydrierung', details:[
      'Zielmenge nach AO; bevorzugte Getränke berücksichtigen.',
      'Trinkgefäß griffbereit; Erinnerungsintervalle vereinbaren.',
      'Dokumentation: Trinkprotokoll, Exsikkosezeichen.'
    ]},
    { atl:'Essen & Trinken', kat:'Ernährung & Flüssigkeit', symptom:'Mangelernährungsrisiko', massnahme:'Ernährungsprotokoll, Zwischenmahlzeiten', ziel:'Gewicht stabil', details:[
      'Kau-/Schluckprobleme, Übelkeit, Appetit abklären.',
      'Anreicherung (Eiweiß/Energie), kleine Portionen, Snacks.',
      'Dokumentation: Intake, Gewicht, Verträglichkeit.'
    ]},
    { atl:'Essen & Trinken', kat:'Ernährung & Flüssigkeit', symptom:'Dysphagie (Schluckstörung) Verdacht', massnahme:'Konsistenz anpassen, Schlucktraining anleiten', ziel:'Aspirationsrisiko reduziert', details:[
      'Aufrechte Position, kleine Bissen/Schlucke; Nachschluck anleiten.',
      'Getränke ggf. andicken; Ruhe beim Essen.',
      'Dokumentation: Husten/“Verschlucken”, Stimme, Sättigung.'
    ]},
    { atl:'Essen & Trinken', kat:'Ernährung & Flüssigkeit', symptom:'Appetitlosigkeit', massnahme:'Wunschkost, kleine Mahlzeiten, Essbegleitung', ziel:'Energiezufuhr ausreichend', details:[
      'Essenszeiten an Tagesform; Gerüche/Reize reduzieren.',
      'Lieblingsspeisen; soziale Unterstützung/Essbegleitung.',
      'Dokumentation: Portionen, Gründe, Maßnahmenwirkung.'
    ]},
    { atl:'Essen & Trinken', kat:'Ernährung & Flüssigkeit', symptom:'Diabetes: Ernährung unsicher', massnahme:'Ernährungsberatung (AO), Blutzucker-Routine unterstützen', ziel:'BZ-Werte stabiler', details:[
      'Kohlenhydrate erklären; regelmäßige Mahlzeiten fördern.',
      'BZ-Messen/Protokoll unterstützen nach Plan.',
      'Dokumentation: BZ, Hypo-/Hyperzeichen, Schulungsinhalt.'
    ]},

    // 4 Ausscheidung
    { atl:'Ausscheiden', kat:'Ausscheidung', symptom:'Obstipationsrisiko', massnahme:'Flüssigkeit, Bewegung, Ernährung', ziel:'Regelmäßige Ausscheidung', details:[
      'Stuhlgewohnheiten erheben; Bauchstatus beobachten.',
      'Toilettenrhythmus; Ballaststoffe/Bewegung fördern.',
      'Dokumentation: Stuhlprotokoll, Beschwerden, Maßnahmen.'
    ]},
    { atl:'Ausscheiden', kat:'Ausscheidung', symptom:'Harninkontinenz', massnahme:'Toilettentraining, Hautschutz, Hilfsmittel', ziel:'Hautschutz & Sicherheit', details:[
      'Miktionsplan; Trinkverhalten prüfen; Scham reduzieren.',
      'Hautschutz; passendes Inko-Material wählen.',
      'Dokumentation: Episoden, Hautstatus, Akzeptanz.'
    ]},
    { atl:'Ausscheiden', kat:'Ausscheidung', symptom:'Harnwegsinfekt-Risiko', massnahme:'Trinkmenge fördern, Intimhygiene, Beobachtung', ziel:'Infekt vermeiden', details:[
      'Anzeichen: Brennen, Geruch, Fieber, Verwirrtheit beobachten.',
      'Hygiene von vorne nach hinten; Wechsel Inko-Material.',
      'Dokumentation: Symptome, Temperatur, Maßnahmen.'
    ]},
    { atl:'Ausscheiden', kat:'Ausscheidung', symptom:'Stuhlinkontinenz', massnahme:'Hautschutz, Toilettenzeiten, Hilfsmittelmanagement', ziel:'Haut intakt, Würde gewahrt', details:[
      'Schneller Wechsel, sanfte Reinigung, Barrierecreme.',
      'Toilettenzeiten; Ernährung/Medikation prüfen (AO).',
      'Dokumentation: Häufigkeit, Hautstatus, Auslöser.'
    ]},

    // 5 Atmung
    { atl:'Sich bewegen', kat:'Atmung', symptom:'Atemnot bei Belastung', massnahme:'Atemübungen, Pausen, Oberkörper hoch', ziel:'Dyspnoe reduziert', details:[
      'Atemerleichternde Positionen (Kutschersitz) anleiten.',
      'Belastung dosieren; ggf. O2 nach AO/Plan.',
      'Dokumentation: Atemfrequenz, SpO2 (wenn vorhanden), Dyspnoe.'
    ]},
    { atl:'Sich bewegen', kat:'Atmung', symptom:'Sekret / produktiver Husten', massnahme:'Inhalation (AO), Atemtherapie, Flüssigkeit fördern', ziel:'Sekret gelöst', details:[
      'Inhalation nach Plan; Lippenbremse, PEP nach AO.',
      'Ausreichend trinken, wenn möglich; Mobilisation unterstützen.',
      'Dokumentation: Auswurf, Atemgeräusche, Wirkung.'
    ]},
    { atl:'Sich bewegen', kat:'Atmung', symptom:'Atemmuster ineffektiv (flach)', massnahme:'Atemlenkung, Positionierung, Entspannung', ziel:'Tiefere Atmung', details:[
      'Handkontakt zur Atemlenkung; ruhige Umgebung.',
      'Oberkörperhochlagerung; Pausen bei Aktivität.',
      'Dokumentation: Dyspnoe, Anstrengung, Wirkung.'
    ]},

    // 6 Schmerz
    { atl:'Körperpflege', kat:'Schmerz', symptom:'Schmerzen bei Bewegung', massnahme:'Schmerzassessment, Lagerung, Wärme/Kälte nach Bedarf', ziel:'Schmerz < 3/10', details:[
      'NRS vor/nach Maßnahme; Trigger identifizieren.',
      'Entlastung, Wärme/Kälte (AO), Ablenkung/Atmung.',
      'Dokumentation: NRS, Wirkung, Nebenwirkungen.'
    ]},
    { atl:'Körperpflege', kat:'Schmerz', symptom:'Chronischer Schmerz (dauerhaft)', massnahme:'Schmerztagebuch, Aktivitätsplanung, Entspannung', ziel:'Besserer Umgang mit Schmerz', details:[
      'Pacing: Aktivität/Erholung balancieren; Überlastung vermeiden.',
      'Entspannung/Atmung; Edukation nach AO.',
      'Dokumentation: Verlauf, Auslöser, Wirksamkeit.'
    ]},
    { atl:'Körperpflege', kat:'Schmerz', symptom:'Schmerz bei Wundversorgung', massnahme:'Vorbereitung, Analgesie nach AO, atraumatisch versorgen', ziel:'Schmerz reduziert', details:[
      'Zeitpunkt/Analgesie abstimmen; sanftes Vorgehen.',
      'Ablenkung; Verbandmaterial passend wählen.',
      'Dokumentation: Schmerz, Material, Wundstatus.'
    ]},

    // 7 Wunde & Haut
    { atl:'Körperpflege', kat:'Wunde & Haut', symptom:'Dekubitusrisiko', massnahme:'Positionswechsel, Hautkontrolle, Druckentlastung', ziel:'Haut intakt', details:[
      'Risikoeinschätzung; Lagerungsintervall festlegen.',
      'Druckentlastende Hilfsmittel; Haut täglich inspizieren.',
      'Dokumentation: Lokalisation, Hautzustand, Lagerungsplan.'
    ]},
    { atl:'Körperpflege', kat:'Wunde & Haut', symptom:'Dekubitus Grad 1 (Rötung)', massnahme:'Druckentlastung, Hautschutz, Beobachtung', ziel:'Rötung rückläufig', details:[
      'Druck vermeiden; Lagerung anpassen; Reibung reduzieren.',
      'Hautschutz, Feuchtigkeitsmanagement.',
      'Dokumentation: Fläche, Farbe, Wärme, Schmerz.'
    ]},
    { atl:'Körperpflege', kat:'Wunde & Haut', symptom:'Intertrigo-Risiko (Hautfalten)', massnahme:'Hautfalten trocken halten, Schutz, Kontrolle', ziel:'Entzündung vermeiden', details:[
      'Sanft reinigen, gründlich trocknen; ggf. Schutztextilien.',
      'Barriere/Antimykotisch nur nach AO.',
      'Dokumentation: Rötung, Geruch, Juckreiz.'
    ]},
    { atl:'Körperpflege', kat:'Wunde & Haut', symptom:'Hauttrockenheit / Juckreiz', massnahme:'Rückfettende Pflege, Trigger reduzieren', ziel:'Haut geschmeidig', details:[
      'pH-neutrale Reinigung; rückfettend eincremen.',
      'Nägel kurz; Kratzen vermeiden; Kleidung weich.',
      'Dokumentation: Hautzustand, Verträglichkeit.'
    ]},
    { atl:'Körperpflege', kat:'Wunde & Haut', symptom:'Wundheilungsrisiko (z.B. diabetisch)', massnahme:'Wundkontrolle, Druckschutz, Edukation', ziel:'Wunde stabil/verbessert', details:[
      'Druck vermeiden; Fuß-/Wundkontrolle; Hygiene.',
      'BZ-Management nach Plan; Schuhwerk prüfen.',
      'Dokumentation: Wundrand, Exsudat, Geruch, Schmerz.'
    ]},

    // 8 Schlaf & Ruhe
    { atl:'Körperpflege', kat:'Schlaf & Ruhe', symptom:'Schlafstörung (Ein-/Durchschlaf)', massnahme:'Schlafhygiene, Tagesstruktur, Reize reduzieren', ziel:'Erholsamer Schlaf', details:[
      'Abendroutine; Licht/Lärm reduzieren; Tagschlaf dosieren.',
      'Schmerz/Harndrang als Ursache prüfen; Entspannung.',
      'Dokumentation: Schlafprotokoll, Einflussfaktoren.'
    ]},
    { atl:'Körperpflege', kat:'Schlaf & Ruhe', symptom:'Tag-Nacht-Umkehr', massnahme:'Tagesaktivierung, Lichtsteuerung, Routinen', ziel:'Tagesrhythmus stabilisiert', details:[
      'Tagsüber Aktivität/Licht; abends beruhigende Rituale.',
      'Koffein/Spätmahlzeiten reduzieren.',
      'Dokumentation: Ruhezeiten, Aktivität, Wirkung.'
    ]},
    { atl:'Körperpflege', kat:'Schlaf & Ruhe', symptom:'Unruhe nachts (Umherwandern)', massnahme:'Sicherheitscheck, Orientierung, Beruhigung', ziel:'Nächtliche Sicherheit erhöht', details:[
      'Stolperfallen entfernen; Nachtlicht; Klingel erreichbar.',
      'Beruhigende Ansprache; Toilettenangebot.',
      'Dokumentation: Auslöser, Zeiten, Maßnahmen.'
    ]},

    // 9 Psyche & Kommunikation
    { atl:'Kommunizieren', kat:'Psyche & Kommunikation', symptom:'Angst/Unruhe', massnahme:'Orientierung, Gespräch, Struktur', ziel:'Ruhe & Sicherheit', details:[
      'Validieren; ruhige Kommunikation; Trigger identifizieren.',
      'Tagesstruktur sichtbar; Bezugspersonen einbinden.',
      'Dokumentation: Auslöser, Wirkung der Interventionen.'
    ]},
    { atl:'Kommunizieren', kat:'Psyche & Kommunikation', symptom:'Depressive Stimmung / Antrieb vermindert', massnahme:'Aktivierung, Ressourcenarbeit, Gespräche', ziel:'Mehr Antrieb/Teilhabe', details:[
      'Kleine erreichbare Ziele; Tagesplan; Erfolgserlebnisse.',
      'Soziale Kontakte fördern; ggf. Fachstelle nach AO.',
      'Dokumentation: Stimmung, Aktivität, Rückmeldung.'
    ]},
    { atl:'Kommunizieren', kat:'Psyche & Kommunikation', symptom:'Aggression/Abwehr bei Pflege', massnahme:'Deeskalation, Wahlmöglichkeiten, Tempo anpassen', ziel:'Kooperation verbessert', details:[
      'Trigger vermeiden; vorher ankündigen; kurze Schritte.',
      'Validation; Pausen; ggf. Teamabsprachen.',
      'Dokumentation: Situation, Auslöser, erfolgreiche Strategien.'
    ]},

    // 10 Kognition & Orientierung
    { atl:'Kommunizieren', kat:'Kognition & Orientierung', symptom:'Desorientierung (Zeit/Ort)', massnahme:'Orientierungshilfen, Tagesplan, Validation', ziel:'Orientierung verbessert', details:[
      'Uhr/Kalender, Namensschilder, bekannte Gegenstände nutzen.',
      'Kurze klare Sätze; Wiederholungen; Validation.',
      'Dokumentation: Orientierung, Kooperation, Verhalten.'
    ]},
    { atl:'Kommunizieren', kat:'Kognition & Orientierung', symptom:'Gedächtnisprobleme (Vergesslichkeit)', massnahme:'Gedächtnisstützen, Routinen, Reminder', ziel:'Alltag strukturierter', details:[
      'Notizzettel, Checklisten, fixe Abläufe.',
      'Medikamenten-/Termin-Reminder; Angehörige einbinden.',
      'Dokumentation: Selbstständigkeit, Fehlerquellen.'
    ]},
    { atl:'Kommunizieren', kat:'Kognition & Orientierung', symptom:'Delir-Risiko (akute Verwirrtheit)', massnahme:'Reorientierung, Flüssigkeit, Schlaf fördern (AO)', ziel:'Delirzeichen reduziert', details:[
      'Reorientierung häufig; Brille/Hörgerät; Reize dosieren.',
      'Schmerz/Infekt/Dehydratation abklären (AO).',
      'Dokumentation: Verlauf, Auslöser, Beobachtungen.'
    ]},

    // 11 Sicherheit & Sturz
    { atl:'Sich bewegen', kat:'Sicherheit & Sturz', symptom:'Sturzrisiko / Schwindel', massnahme:'Sturzprophylaxe, Hilfsmittel prüfen', ziel:'Stürze vermeiden', details:[
      'Umgebung sichern; rutschfeste Schuhe; Nachtlicht.',
      'Orthostase beachten; langsam aufstehen; Hilfsmittel einstellen.',
      'Dokumentation: Beinahe-Stürze, Maßnahmen, Wirksamkeit.'
    ]},
    { atl:'Sich bewegen', kat:'Sicherheit & Sturz', symptom:'Sturz nach Ereignis (Post-Fall)', massnahme:'Sturzassessment, Umfeldanpassung, Beobachtung', ziel:'Folgestürze vermeiden', details:[
      'Schmerzen/Verletzung prüfen; Arztkontakt nach AO.',
      'Ursachenanalyse; Maßnahmenplan (Umgebung/Hilfsmittel).',
      'Dokumentation: Hergang, Befund, Maßnahmen.'
    ]},
    { atl:'Sich bewegen', kat:'Sicherheit & Sturz', symptom:'Unsichere Medikation (Sedierung)', massnahme:'Beobachtung, Rückmeldung an Arzt (AO), Sicherheitsmaßnahmen', ziel:'Sicherheit erhöht', details:[
      'Schläfrigkeit, Gangunsicherheit beobachten.',
      'Rücksprache nach AO; Sturzprophylaxe verstärken.',
      'Dokumentation: Symptome, Zeiten, Rückmeldungen.'
    ]},

    // 12 Medikation
    { atl:'Essen & Trinken', kat:'Medikation', symptom:'Unregelmäßige Medikamenteneinnahme', massnahme:'Mediplan, Einnahme-Reminder, Kontrolle', ziel:'Adhärenz verbessert', details:[
      'Mediplan erklären; Einnahmezeiten alltagsnah planen.',
      'Pillendose/Reminder; Nebenwirkungen beobachten.',
      'Dokumentation: Einnahme, Auffälligkeiten, Rückmeldung.'
    ]},
    { atl:'Essen & Trinken', kat:'Medikation', symptom:'Nebenwirkungsbeobachtung erforderlich', massnahme:'Monitoring, Symptomcheck, Rückmeldung (AO)', ziel:'Nebenwirkungen früh erkannt', details:[
      'Schwindel, Übelkeit, Obstipation, Müdigkeit etc. beobachten.',
      'Einnahme korrekt; Wechselwirkungen nach AO abklären.',
      'Dokumentation: Symptome, Zeitpunkt, Maßnahmen.'
    ]},
    { atl:'Essen & Trinken', kat:'Medikation', symptom:'Polypharmazie / Einnahme unsicher', massnahme:'Medikationscheck unterstützen (AO), Strukturierung', ziel:'Einnahme sicherer', details:[
      'Sortiersystem; Liste aktuell halten; Doppelmedikation vermeiden (AO).',
      'Apotheke/Arztkontakt nach AO.',
      'Dokumentation: Planversion, Änderungen, Verständnis.'
    ]},

    // 13 Prophylaxen
    { atl:'Körperpflege', kat:'Prophylaxen', symptom:'Thromboserisiko', massnahme:'Aktivierung, Wadenpumpe, Kompression nach AO', ziel:'Thrombose vermeiden', details:[
      'Frühmobilisation; Venengymnastik anleiten.',
      'Kompression/Heparin nur nach AO/Verordnung.',
      'Dokumentation: Schwellung/Schmerz, Umfang, Compliance.'
    ]},
    { atl:'Körperpflege', kat:'Prophylaxen', symptom:'Pneumonieprophylaxe erforderlich', massnahme:'Atemtraining, Mobilisation, Inhalation nach AO', ziel:'Pneumonie vermeiden', details:[
      'Tiefes Durchatmen, Lippenbremse; Positionswechsel.',
      'Mobilisation; Flüssigkeit fördern, wenn möglich.',
      'Dokumentation: Atemstatus, Sekret, Wirkung.'
    ]},
    { atl:'Körperpflege', kat:'Prophylaxen', symptom:'Dekubitusprophylaxe erforderlich', massnahme:'Lagerungsplan, Druckentlastung, Hautpflege', ziel:'Haut intakt', details:[
      'Risikoeinschätzung; Lagerungsintervalle festlegen.',
      'Druckentlastung; Feuchtigkeitsmanagement.',
      'Dokumentation: Hautbefund, Lagerungen, Hilfsmittel.'
    ]},
    { atl:'Körperpflege', kat:'Prophylaxen', symptom:'Kontrakturprophylaxe erforderlich', massnahme:'Bewegung, Positionierung, Aktivierung', ziel:'Kontrakturen vermeiden', details:[
      'Aktive/passive Bewegungen; Alltag integrieren.',
      'Positionierung; Hilfsmittel prüfen.',
      'Dokumentation: Beweglichkeit, Schmerz, Mitarbeit.'
    ]},
  ];



  const demoAnamnese = demoTemplates.slice(0, 6); // Vorschläge aus Anamnese

  const frequencyOptions = ['Bitte wählen', '1x täglich', '2x täglich', '3x täglich', 'Wöchentlich', 'Bei Bedarf'];
  const evalOptions = ['Bitte wählen', 'täglich', 'alle 2 Tage', 'wöchentlich', 'bei Änderung'];

  function getActivePatientLabel() {
    const sel = qs('#patientSelect');
    if (!sel) return 'Name, Geb. Datum';
    const opt = sel.options[sel.selectedIndex];
    return (opt && opt.textContent) ? opt.textContent.trim() : 'Name, Geb. Datum';
  }

  function buildSelect(id, label, options, value = '') {
    const optHtml = options
      .map((t) => `<option value="${escapeHtml(t)}" ${t === value ? 'selected' : ''}>${escapeHtml(t)}</option>`)
      .join('');

    return `
      <label class="pp-field" for="${id}">
        <span class="pp-label">${escapeHtml(label)}</span>
        <select id="${id}" class="pp-control">
          ${optHtml}
        </select>
      </label>
    `;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function modalShell({ title, bodyHtml, footerHtml, wide = true }) {
    return `
      <div class="pp-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
        <div class="pp-modal__panel ${wide ? 'pp-modal__panel--wide' : ''}">
          <div class="pp-modal__header">
            <h2 class="pp-modal__title">${escapeHtml(title)}</h2>
            <button type="button" class="pp-modal__close" data-close aria-label="Schließen">×</button>
          </div>
          <div class="pp-modal__body">${bodyHtml}</div>
          <div class="pp-modal__footer">${footerHtml}</div>
        </div>
      </div>
    `;
  }

  function tableHtml(rows, { checkbox = true } = {}) {
    const head = `
      <div class="pp-table__head">
        ${checkbox ? '<div class="pp-table__cell pp-table__cell--check"></div>' : ''}
        <div class="pp-table__cell"><strong>Symptome</strong></div>
        <div class="pp-table__cell"><strong>Maßnahme</strong></div>
        <div class="pp-table__cell"><strong>Ziel</strong></div>
      </div>
    `;

    const body = rows
      .map((r, i) => `
        <label class="pp-table__row" data-symptom="${escapeHtml(r.symptom)}">
          ${checkbox ? `<div class="pp-table__cell pp-table__cell--check"><input type="checkbox" class="pp-rowcheck" data-rowcheck="${i}"></div>` : ''}
          <div class="pp-table__cell">${escapeHtml(r.symptom)}</div>
          <div class="pp-table__cell">${escapeHtml(r.massnahme)}</div>
          <div class="pp-table__cell">${escapeHtml(r.ziel)}</div>
        </label>
      `)
      .join('');

    return `
      <div class="pp-table" role="table">
        ${head}
        <div class="pp-table__body" role="rowgroup">${body}</div>
      </div>
    `;
  }

  function renderAnamnese() {
    const patient = getActivePatientLabel();

    const top = `
      <div class="pp-modal__top">
        <div class="pp-patientline">
          <span class="pp-muted">akt. Pat.:</span>
          <strong>${escapeHtml(patient)}</strong>
        </div>
        <div class="pp-topgrid">
          ${buildSelect('ppFreq', 'Frequenz', frequencyOptions)}
          ${buildSelect('ppEval', 'Evaluierung', evalOptions)}
        </div>
      </div>
    `;

    const body = `
      ${top}
      <div class="pp-section">
        ${tableHtml(demoAnamnese, { checkbox: true })}
        <p class="pp-hint">Tippe Checkboxen an. „Alles auswählen“ markiert alle Zeilen (Demo).</p>
      </div>
    `;

    const footer = `
      <button type="button" class="pp-btn pp-btn--ghost" data-close>Abbrechen</button>
      <button type="button" class="pp-btn" data-selectall>Alles auswählen</button>
      <button type="button" class="pp-btn pp-btn--primary" data-accept>Übernehmen</button>
    `;

    return modalShell({ title: 'Aus Anamnese übernehmen', bodyHtml: body, footerHtml: footer, wide: true });
  }

  function renderTemplates() {
    const patient = getActivePatientLabel();

    const right = `
      <div class="pp-card">
        <h3 class="pp-card__title">Einstellungen</h3>
        <div class="pp-patientline pp-patientline--small">
          <span class="pp-muted">akt. Pat.:</span>
          <strong>${escapeHtml(patient)}</strong>
        </div>
        <div class="pp-stack">
          ${buildSelect('ppFreq2', 'Frequenz', frequencyOptions)}
          ${buildSelect('ppEval2', 'Evaluierung', evalOptions)}
          ${buildSelect('ppAtl', 'ATL auswählen', ['Bitte wählen', 'Sich bewegen', 'Essen & Trinken', 'Ausscheiden', 'Körperpflege', 'Kommunizieren'])}
          ${buildSelect('ppKat', 'Kategorie', ['Bitte wählen', 'Mobilität', 'Körperpflege', 'Ernährung & Flüssigkeit', 'Ausscheidung', 'Atmung', 'Schmerz', 'Wunde & Haut', 'Schlaf & Ruhe', 'Psyche & Kommunikation', 'Kognition & Orientierung', 'Sicherheit & Sturz', 'Medikation', 'Prophylaxen'])}
          <label class="pp-field">
            <span class="pp-label">Suche</span>
            <input id="ppSearch" class="pp-control" type="text" placeholder="z.B. Sturz, Schmerz, Dekubitus …">
          </label>
          <div class="pp-card" style="padding:12px;border-radius:14px;background:rgba(63,111,232,.04);border:1px solid rgba(63,111,232,.16);">
            <div class="pp-label" style="margin-bottom:6px;">Details</div>
            <div id="ppTplDetail" class="pp-hint" style="margin:0;">Tippe auf eine Vorlage (Zeile), um Details zu sehen.</div>
          </div>
        </div>
      </div>
    `;

    const left = `
      <div class="pp-card">
        <h3 class="pp-card__title">Vorlagenliste</h3>
        <div id="ppTemplateTable">
          ${tableHtml(demoTemplates, { checkbox: true })}
        </div>
        <p class="pp-hint">Filter & Suche wirken sofort. Danach auswählen und übernehmen.</p>
      </div>
    `;

    const body = `
      <div class="pp-grid2">
        ${left}
        ${right}
      </div>
    `;

    const footer = `
      <button type="button" class="pp-btn pp-btn--ghost" data-close>Abbrechen</button>
      <button type="button" class="pp-btn" data-selectall>Alles auswählen</button>
      <button type="button" class="pp-btn pp-btn--primary" data-accept>Übernehmen</button>
    `;

    return modalShell({ title: 'Vorlagen', bodyHtml: body, footerHtml: footer, wide: true });
  }

  function renderFree() {
    const patient = getActivePatientLabel();

    const left = `
      <div class="pp-card">
        <h3 class="pp-card__title">Freie Planung</h3>
        <div class="pp-stack">
          <label class="pp-field">
            <span class="pp-label">Symptom</span>
            <textarea class="pp-control pp-control--ta" rows="3" placeholder="Symptom / Pflegeproblem …"></textarea>
          </label>
          <label class="pp-field">
            <span class="pp-label">Maßnahme</span>
            <textarea class="pp-control pp-control--ta" rows="3" placeholder="Pflegemaßnahmen …"></textarea>
          </label>
          <label class="pp-field">
            <span class="pp-label">Ziel</span>
            <textarea class="pp-control pp-control--ta" rows="3" placeholder="Pflegeziel …"></textarea>
          </label>
        </div>
      </div>
    `;

    const right = `
      <div class="pp-card">
        <h3 class="pp-card__title">Einstellungen</h3>
        <div class="pp-patientline pp-patientline--small">
          <span class="pp-muted">akt. Pat.:</span>
          <strong>${escapeHtml(patient)}</strong>
        </div>
        <div class="pp-topgrid pp-topgrid--tight">
          ${buildSelect('ppFreq3', 'Frequenz', frequencyOptions)}
          ${buildSelect('ppEval3', 'Evaluierung', evalOptions)}
        </div>
        <p class="pp-hint">Demo: keine Speicherung/Logik.</p>
      </div>
    `;

    const body = `
      <div class="pp-grid2 pp-grid2--free">
        ${left}
        ${right}
      </div>
    `;

    const footer = `
      <button type="button" class="pp-btn pp-btn--ghost" data-close>Abbrechen</button>
      <button type="button" class="pp-btn pp-btn--primary" data-accept>Übernehmen</button>
    `;

    return modalShell({ title: 'Frei definiert', bodyHtml: body, footerHtml: footer, wide: false });
  }

  function attachModalHandlers(modalEl) {
    // Close
    qsa('[data-close]', modalEl).forEach((btn) => {
      btn.addEventListener('click', () => closeModal());
    });

    // Click outside panel closes
    modalEl.addEventListener('click', (e) => {
      const panel = qs('.pp-modal__panel', modalEl);
      if (panel && !panel.contains(e.target)) closeModal();
    });

    // Escape closes
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey, { once: true });

    // Select all
    const selectAllBtn = qs('[data-selectall]', modalEl);
    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => {
        qsa('.pp-rowcheck', modalEl).forEach((c) => (c.checked = true));
      });
    }

    // Accept
    const acceptBtn = qs('[data-accept]', modalEl);
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {

        const planBody = document.getElementById('planBody');
        if (!planBody) {
          closeModal();
          return;
        }

        // Frequenz + Evaluierung aus dem aktiven Modal lesen (je nach Dialog-ID)
        const freqEl = qs('#ppFreq, #ppFreq2, #ppFreq3', modalEl);
        const evalEl = qs('#ppEval, #ppEval2, #ppEval3', modalEl);

        const freqValRaw = freqEl ? String(freqEl.value || '').trim() : '';
        const evalValRaw = evalEl ? String(evalEl.value || '').trim() : '';

        const freqVal = (freqValRaw && freqValRaw !== 'Bitte wählen') ? freqValRaw : '';
        const evalVal = (evalValRaw && evalValRaw !== 'Bitte wählen') ? evalValRaw : '';

        function addDays(d, n){
          const x = new Date(d.getTime());
          x.setDate(x.getDate() + n);
          return x;
        }
        const today = new Date();
        const plannedStr = today.toLocaleDateString('de-DE');

        let evalStr = '—';
        if (evalVal === 'täglich') evalStr = addDays(today, 1).toLocaleDateString('de-DE');
        else if (evalVal === 'alle 2 Tage') evalStr = addDays(today, 2).toLocaleDateString('de-DE');
        else if (evalVal === 'wöchentlich') evalStr = addDays(today, 7).toLocaleDateString('de-DE');
        else if (evalVal === 'bei Änderung') evalStr = 'bei Änderung';

        const checked = qsa('.pp-rowcheck:checked', modalEl);

        if (checked.length > 0) {
          checked.forEach(cb => {
            const row = cb.closest('.pp-table__row');
            if (!row) return;

            const cells = qsa('.pp-table__cell', row);
            if (cells.length < 4) return;

            const diagnose = cells[1].textContent.trim();
            const massnahmeBase = cells[2].textContent.trim();
            const ziel = cells[3].textContent.trim();

            const massnahme = freqVal ? `${massnahmeBase} (${freqVal})` : massnahmeBase;

            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td class="pp-date">${plannedStr}</td>
              <td>${diagnose}</td>
              <td>${massnahme}</td>
              <td>${ziel}</td>
              <td class="pp-date pp-date--right">${evalStr}</td>
            `;
            planBody.appendChild(tr);
          });
        } else {
          const textareas = qsa('textarea', modalEl);
          if (textareas.length >= 3) {
            const diagnose = textareas[0].value.trim();
            const massnahmeBase = textareas[1].value.trim();
            const ziel = textareas[2].value.trim();

            const massnahme = freqVal ? `${massnahmeBase} (${freqVal})` : massnahmeBase;

            if (diagnose || massnahmeBase || ziel) {
              const tr = document.createElement('tr');
              tr.innerHTML = `
                <td class="pp-date">${plannedStr}</td>
                <td>${diagnose}</td>
                <td>${massnahme}</td>
                <td>${ziel}</td>
                <td class="pp-date pp-date--right">${evalStr}</td>
              `;
              planBody.appendChild(tr);
            }
          }
        }

        acceptBtn.blur();
        closeModal();
      });
    }
    // Templates: Filter-Logik (ATL + Kategorie + Suche) + Detail-Preview
    const tplWrap = qs('#ppTemplateTable', modalEl);
    const atlSel = qs('#ppAtl', modalEl);
    const katSel = qs('#ppKat', modalEl);
    const searchInp = qs('#ppSearch', modalEl);
    const detailBox = qs('#ppTplDetail', modalEl);

    if (tplWrap && (atlSel || katSel || searchInp)) {
      let lastFiltered = demoTemplates.slice();

      const norm = (s) => String(s || '').toLowerCase().trim();

      const applyFilters = () => {
        const atl = atlSel ? String(atlSel.value || '').trim() : '';
        const kat = katSel ? String(katSel.value || '').trim() : '';
        const q = searchInp ? norm(searchInp.value) : '';

        const atlOk = (atl && atl !== 'Bitte wählen') ? atl : '';
        const katOk = (kat && kat !== 'Bitte wählen') ? kat : '';

        lastFiltered = demoTemplates.filter((t) => {
          const okAtl = !atlOk || t.atl === atlOk;
          const okKat = !katOk || t.kat === katOk;
          const okQ = !q || (norm(t.symptom).includes(q) || norm(t.massnahme).includes(q) || norm(t.ziel).includes(q));
          return okAtl && okKat && okQ;
        });

        tplWrap.innerHTML = tableHtml(lastFiltered, { checkbox: true }) +
          (lastFiltered.length ? '' : '<p class="pp-hint">Keine Treffer – Filter/Suche anpassen.</p>');

        // reset details on rerender
        if (detailBox) detailBox.innerHTML = 'Tippe auf eine Vorlage (Zeile), um Details zu sehen.';
      };

      if (atlSel) atlSel.addEventListener('change', applyFilters);
      if (katSel) katSel.addEventListener('change', applyFilters);
      if (searchInp) searchInp.addEventListener('input', applyFilters);

      tplWrap.addEventListener('click', (e) => {
        const row = e.target && e.target.closest ? e.target.closest('.pp-table__row') : null;
        if (!row || !detailBox) return;

        const sym = row.getAttribute('data-symptom') || '';
        const t = lastFiltered.find(x => x.symptom === sym) || demoTemplates.find(x => x.symptom === sym);
        if (!t) return;

        const bullets = (t.details && t.details.length)
          ? ('<ul style="margin:8px 0 0; padding-left: 18px;">' + t.details.map(d => '<li>' + escapeHtml(d) + '</li>').join('') + '</ul>')
          : '';

        detailBox.innerHTML = ''
          + '<div><strong>' + escapeHtml(t.symptom) + '</strong></div>'
          + '<div class="pp-hint" style="margin:6px 0 0;"><b>Maßnahme:</b> ' + escapeHtml(t.massnahme) + '</div>'
          + '<div class="pp-hint" style="margin:4px 0 0;"><b>Ziel:</b> ' + escapeHtml(t.ziel) + '</div>'
          + '<div class="pp-hint" style="margin:4px 0 0;"><b>ATL/Kategorie:</b> ' + escapeHtml(t.atl) + ' · ' + escapeHtml(t.kat) + '</div>'
          + bullets;
      });

      applyFilters();
    }

  }

  function openModal(kind) {
    const root = qs('#modalRoot');
    if (!root) return;

    let html = '';
    if (kind === 'anam') html = renderAnamnese();
    else if (kind === 'templates') html = renderTemplates();
    else if (kind === 'free') html = renderFree();
    else html = modalShell({ title: 'Hinweis', bodyHtml: '<p>Unbekannter Dialog.</p>', footerHtml: '<button class="pp-btn pp-btn--primary" data-close>OK</button>', wide: false });

    root.innerHTML = html;

    const modalEl = qs('.pp-modal', root);
    if (!modalEl) return;

    // lock scroll
    document.documentElement.classList.add('pp-modal-open');

    // focus close button
    const closeBtn = qs('.pp-modal__close', modalEl);
    if (closeBtn) closeBtn.focus();

    attachModalHandlers(modalEl);
  }

  function closeModal() {
    const root = qs('#modalRoot');
    if (!root) return;
    root.innerHTML = '';
    document.documentElement.classList.remove('pp-modal-open');
  }

  function wireOpenButtons() {
    qsa('[data-open]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const kind = btn.getAttribute('data-open');
        openModal(kind);
      });
    });
  }

  function init() {
    wireOpenButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
