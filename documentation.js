/* Patientenauswahl + DURCHFÜHRUNGSNACHWEIS */
(function () {
  const patientStore = [
    {
      id:'p3',
      name:'Patient 3',
      dob:'01.01.1950',
      carePlan:[
        {id:'pp1', titel:'Blutdruck und Puls kontrollieren', funktion:'Vitalzeichenkontrolle', frequenz:4},
        {id:'pp2', titel:'Mobilisation', funktion:'Mobilisation', frequenz:2},
        {id:'pp3', titel:'Medikamente geben', funktion:'Medikamentengabe', frequenz:3},
        {id:'pp4', titel:'Flüssigkeitsbilanz', funktion:'Dokumentation', frequenz:1}
      ]
    },
    {
      id:'p4',
      name:'Patient 4',
      dob:'12.07.1944',
      carePlan:[
        {id:'pp1', titel:'BZ Kontrolle', funktion:'Kontrolle', frequenz:4},
        {id:'pp2', titel:'Insulin verabreichen', funktion:'Medikamentengabe', frequenz:3},
        {id:'pp3', titel:'Lagerung', funktion:'Lagerung', frequenz:2},
        {id:'pp4', titel:'Hautinspektion', funktion:'Beobachtung', frequenz:1}
      ]
    }
  ];

  let selectedPatientId = 'p3';
  const dnState = {};

  function getSelectedPatient(){
    return patientStore.find(p => p.id === selectedPatientId) || patientStore[0];
  }

  function getTimes(freq){
    if(freq === 1) return ['08:00'];
    if(freq === 2) return ['08:00','20:00'];
    if(freq === 3) return ['08:00','14:00','20:00'];
    if(freq === 4) return ['08:00','12:00','16:00','20:00'];
    return ['08:00'];
  }

  function populatePatientSelect(){
    const select = document.getElementById('patientSelect');
    if(!select) return;
    select.innerHTML = '';
    patientStore.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.name} – ${p.dob}`;
      if(p.id === selectedPatientId) opt.selected = true;
      select.appendChild(opt);
    });
  }

  function updateSelectedPatientHeader(){
    const p = getSelectedPatient();
    const nameEl = document.getElementById('patientName');
    const dobEl = document.getElementById('patientDob');
    if(nameEl) nameEl.textContent = p.name;
    if(dobEl) dobEl.textContent = p.dob;
  }

  function renderDN(){
    const container = document.getElementById('dnList');
    const subtitle = document.getElementById('dnSubtitle');
    if(!container) return;

    const patient = getSelectedPatient();
    if(subtitle) subtitle.textContent = `Pflegeplanung für ${patient.name}`;

    container.innerHTML = '';

    const entries = [];

    patient.carePlan.forEach((m, i) => {
      const zeiten = getTimes(m.frequenz);
      zeiten.forEach((zeit, j) => {
        entries.push({ m, i, j, zeit });
      });
    });

    entries.sort((a, b) => a.zeit.localeCompare(b.zeit));

    entries.forEach(({ m, i, j, zeit }) => {
      const key = `${patient.id}_${i}_${j}`;

      if(!dnState[key]){
        dnState[key] = {status:'', reason:''};
      }

      const state = dnState[key];
      const status = state.status;
      const reason = state.reason || '';
      const showReason = status === 'notdone';
      const reasonMissing = showReason && reason.trim() === '';

      const item = document.createElement('div');
      item.className = 'dn-item';
      item.dataset.time = zeit;
      item.dataset.status = status || 'open';
      item.innerHTML = `
          <div class="dn-row">
            <div class="dn-time">${zeit}</div>
            <div>
              <div class="dn-title">${m.titel}</div>
              <div class="dn-meta">Funktion: ${m.funktion} · Frequenz: ${m.frequenz}x täglich</div>
            </div>
            <div class="dn-buttons">
              <button class="dn-status-btn done ${status === 'done' ? 'active' : ''}" data-key="${key}" data-status="done" type="button">Durchgeführt</button>
              <button class="dn-status-btn notdone ${status === 'notdone' ? 'active' : ''}" data-key="${key}" data-status="notdone" type="button">Nicht durchgeführt</button>
            </div>
          </div>
          ${showReason ? `
            <div class="dn-reason">
              <textarea data-reason="${key}" placeholder="Grund angeben...">${reason}</textarea>
              ${reasonMissing ? '<small>Bei "nicht durchgeführt" muss ein Grund angegeben werden.</small>' : ''}
            </div>
          ` : ''}
        `;
      container.appendChild(item);
    });

    document.querySelectorAll('.dn-status-btn').forEach(btn => {
      btn.onclick = () => {
        const key = btn.dataset.key;
        const status = btn.dataset.status;
        dnState[key].status = status;
        if(status === 'done'){
          dnState[key].reason = '';
        }
        renderDN();
      };
    });

    document.querySelectorAll('[data-reason]').forEach(area => {
      area.oninput = () => {
        const key = area.dataset.reason;
        dnState[key].reason = area.value;
        const card = area.closest('.dn-item');
        const msg = card ? card.querySelector('small') : null;
        if(msg){
          msg.style.display = area.value.trim() ? 'none' : 'block';
        }
      };
    });

    document.dispatchEvent(new CustomEvent('dn:updated'));
  }

  const selectPatientBtn = document.getElementById('selectPatientBtn');
  const patientModal = document.getElementById('patientModal');
  const patientSelect = document.getElementById('patientSelect');
  const savePatientSelection = document.getElementById('savePatientSelection');
  const closePatientSelection = document.getElementById('closePatientSelection');
  const patientBackdrop = document.querySelector('[data-close-patient]');

  if(selectPatientBtn){
    selectPatientBtn.onclick = () => {
      populatePatientSelect();
      if(patientModal) patientModal.hidden = false;
    };
  }

  if(closePatientSelection){
    closePatientSelection.onclick = () => {
      if(patientModal) patientModal.hidden = true;
    };
  }

  if(patientBackdrop){
    patientBackdrop.onclick = () => {
      if(patientModal) patientModal.hidden = true;
    };
  }

  if(savePatientSelection){
    savePatientSelection.onclick = () => {
      selectedPatientId = patientSelect.value;
      updateSelectedPatientHeader();
      renderDN();
      if(patientModal) patientModal.hidden = true;
    };
  }

  updateSelectedPatientHeader();
  renderDN();
})();
