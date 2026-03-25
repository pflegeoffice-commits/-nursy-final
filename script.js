let __currentEdit = null;
function firstNonCancelled(visits){ return (visits||[]).find(v=>!v.cancelled) || null; }
document.addEventListener('DOMContentLoaded',()=>{});

// Demo Registrierung (Frontend-only)
(function(){
  function showError(form, msg){
    const box = form.querySelector('.form-error');
    if (box){
      box.textContent = msg;
      box.style.display = 'block';
    } else {
      alert(msg);
    }
  }

  // Step 1 -> verify-email
  document.querySelectorAll('form[data-demo-register]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = form.getAttribute('data-demo-register');

      const emails = form.querySelectorAll('input[type="email"]');
      const pw = form.querySelector('input[type="password"][id$="pw"]');
      const pw2 = form.querySelector('input[type="password"][id$="pw2"]');

      if (emails.length >= 2 && emails[0].value.trim().toLowerCase() !== emails[1].value.trim().toLowerCase()){
        showError(form, 'Die E-Mail-Adressen stimmen nicht überein.');
        return;
      }
      if (pw && pw2 && pw.value !== pw2.value){
        showError(form, 'Die Passwörter stimmen nicht überein.');
        return;
      }

      try{ localStorage.setItem('nursy_register_role', role); }catch(e){}
      // Save step-1 inputs for späteres Profil (Demo)
      try{
        if (role === 'care'){
          const data = {
            firstName: document.getElementById('p-vn')?.value || '',
            lastName: document.getElementById('p-nn')?.value || '',
            street: document.getElementById('p-str')?.value || '',
            zip: document.getElementById('p-plz')?.value || '',
            city: document.getElementById('p-ort')?.value || ''
          };
          const existing = JSON.parse(localStorage.getItem('nursy_profile_care_v1') || '{}');
          const fields = Object.assign({}, existing.fields || {}, {
            firstName: data.firstName,
            lastName: data.lastName,
            street: data.street,
            zip: data.zip,
            city: data.city
          });
          localStorage.setItem('nursy_profile_care_v1', JSON.stringify(Object.assign({}, existing, data, {fields})));
        }
      }catch(e){}

      window.location.href = 'verify-email.html';
    });
  });

  // Next step forms
  document.querySelectorAll('form[data-demo-next]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const next = form.getAttribute('data-demo-next');
    const isCancelled = !!(next && next.cancelled);
if (next === 'client'){
        window.location.href = 'dashboard-client.html';
        return;
      }
      if (next === 'care'){

        // Save Pflegekraft Profil/Quali aus Registrierung (Demo)
        try{
          const existing = JSON.parse(localStorage.getItem('nursy_profile_care_v1') || '{}');
          const bio = document.getElementById('p-bio')?.value || '';
          const qualMain = document.getElementById('p-qual-main')?.value || '';
          const qualOther = document.getElementById('p-qual-other')?.value || '';
          const fields = Object.assign({}, existing.fields || {}, {
            bio,
            qualMain,
            qualOther
          });

          // extras
          const extras = [];
          document.querySelectorAll('#extrasList .extras__row').forEach(row => {
            const sel = row.querySelector('.extras__select');
            const other = row.querySelector('.extras__other');
            const name = sel ? sel.value : '';
            const otherVal = other ? other.value : '';
            if (name || otherVal) extras.push({name, other: otherVal});
          });

          localStorage.setItem('nursy_profile_care_v1', JSON.stringify(Object.assign({}, existing, {fields, extras})));
        }catch(e){}

        window.location.href = 'register-care-availability.html';
        return;
      }
      if (next === 'care-finish'){
        // save availability
        const timeInputs = document.querySelectorAll('.avail-time');
        if (timeInputs.length){
          const data = {};
          timeInputs.forEach(inp => {
            const d = inp.dataset.day;
            const s = inp.dataset.slot;
            data[d] = data[d] || {};
            data[d][s] = inp.value || '';
          });
          try{ localStorage.setItem('nursy_availability_v1', JSON.stringify(data)); }catch(e){}
        }
        window.location.href = 'dashboard-care.html';
        return;
      }
    });
  });

  // Verify screen routing
  try{
    const role = localStorage.getItem('nursy_register_role');
    if (role){
      document.querySelectorAll('a[data-verify-next]').forEach(a => {
        a.href = (a.textContent.includes('Pflegekraft') || role === 'care') ? 'register-care-profile.html' : 'register-client-need.html';
      });
    }
  }catch(e){}
})();


// FULL REG FLOW – Demo (Frontend-only)
(function(){
  function showError(form, msg){
    const box = form.querySelector('.form-error');
    if (box){
      box.textContent = msg;
      box.style.display = 'block';
    } else {
      alert(msg);
    }
  }

  // Step 1 register -> verify
  document.querySelectorAll('form[data-demo-register]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = form.getAttribute('data-demo-register');

      const emails = form.querySelectorAll('input[type="email"]');
      const pw = form.querySelector('input[type="password"][id$="pw"]');
      const pw2 = form.querySelector('input[type="password"][id$="pw2"]');

      if (emails.length >= 2 && emails[0].value.trim().toLowerCase() !== emails[1].value.trim().toLowerCase()){
        showError(form, 'Die E-Mail-Adressen stimmen nicht überein.');
        return;
      }
      if (pw && pw2 && pw.value !== pw2.value){
        showError(form, 'Die Passwörter stimmen nicht überein.');
        return;
      }

      try{ localStorage.setItem('nursy_register_role', role); }catch(e){}
      // Save step-1 inputs for späteres Profil (Demo)
      try{
        if (role === 'care'){
          const data = {
            firstName: document.getElementById('p-vn')?.value || '',
            lastName: document.getElementById('p-nn')?.value || '',
            street: document.getElementById('p-str')?.value || '',
            zip: document.getElementById('p-plz')?.value || '',
            city: document.getElementById('p-ort')?.value || ''
          };
          const existing = JSON.parse(localStorage.getItem('nursy_profile_care_v1') || '{}');
          const fields = Object.assign({}, existing.fields || {}, {
            firstName: data.firstName,
            lastName: data.lastName,
            street: data.street,
            zip: data.zip,
            city: data.city
          });
          localStorage.setItem('nursy_profile_care_v1', JSON.stringify(Object.assign({}, existing, data, {fields})));
        }
      }catch(e){}

      window.location.href = 'verify-email.html';
    });
  });

  // Verify continue button routes by role
  const cont = document.getElementById('verifyContinue');
  if (cont){
    cont.addEventListener('click', (e) => {
      // allow default href if storage unavailable
      e.preventDefault();
      let role = null;
      try{ role = localStorage.getItem('nursy_register_role'); }catch(err){}
      window.location.href = (role === 'care') ? 'register-care-profile.html' : 'register-client-need.html';
    });
  }

  // Step forms
  document.querySelectorAll('form[data-demo-next]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const next = form.getAttribute('data-demo-next');
    const isCancelled = !!(next && next.cancelled);
if (next === 'client'){
        window.location.href = 'dashboard-client.html';
        return;
      }
      if (next === 'care'){

        // Save Pflegekraft Profil/Quali aus Registrierung (Demo)
        try{
          const existing = JSON.parse(localStorage.getItem('nursy_profile_care_v1') || '{}');
          const bio = document.getElementById('p-bio')?.value || '';
          const qualMain = document.getElementById('p-qual-main')?.value || '';
          const qualOther = document.getElementById('p-qual-other')?.value || '';
          const fields = Object.assign({}, existing.fields || {}, {
            bio,
            qualMain,
            qualOther
          });

          // extras
          const extras = [];
          document.querySelectorAll('#extrasList .extras__row').forEach(row => {
            const sel = row.querySelector('.extras__select');
            const other = row.querySelector('.extras__other');
            const name = sel ? sel.value : '';
            const otherVal = other ? other.value : '';
            if (name || otherVal) extras.push({name, other: otherVal});
          });

          localStorage.setItem('nursy_profile_care_v1', JSON.stringify(Object.assign({}, existing, {fields, extras})));
        }catch(e){}

        window.location.href = 'register-care-availability.html';
        return;
      }
      if (next === 'care-finish'){
        // save availability
        const timeInputs = document.querySelectorAll('.avail-time');
        if (timeInputs.length){
          const data = {};
          timeInputs.forEach(inp => {
            const d = inp.dataset.day;
            const s = inp.dataset.slot;
            data[d] = data[d] || {};
            data[d][s] = inp.value || '';
          });
          try{ localStorage.setItem('nursy_availability_v1', JSON.stringify(data)); }catch(err){}
        // Save auch im kompakten Key fürs Profil/Dashboard
        try{
          const data2 = {};
          timeInputs.forEach(inp => {
            const d = inp.dataset.day;
            const s = inp.dataset.slot;
            data2[d] = data2[d] || {};
            data2[d][s] = inp.value || '';
          });
          localStorage.setItem('nursy_availability_compact_v1', JSON.stringify(data2));
        }catch(err){}

        }
        window.location.href = 'dashboard-care.html';
        return;
      }
    });
  });
})();


// QUALI UI – Pflegekraft Profil (Dropdowns + dynamische Zusatzausbildungen)
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('p-qual-main');
  const otherWrap = document.getElementById('qualOtherWrap');
  if (main && otherWrap){
    const toggleOther = () => {
      const show = main.value === 'Sonstiges';
      otherWrap.style.display = show ? '' : 'none';
    };
    main.addEventListener('change', toggleOther);
    toggleOther();
  }

  const list = document.getElementById('extrasList');
  const addBtn = document.getElementById('addExtra');
  if (list && addBtn){
    const wireRow = (row) => {
      const sel = row.querySelector('.extras__select');
      const other = row.querySelector('.extras__other');
      const remove = row.querySelector('.extras__remove');

      const toggleOther = () => {
        if (!sel || !other) return;
        const show = sel.value === 'Sonstiges';
        other.style.display = show ? '' : 'none';
      };
      if (sel) sel.addEventListener('change', toggleOther);
      toggleOther();

      if (remove){
        remove.addEventListener('click', () => {
          const rows = list.querySelectorAll('.extras__row');
          if (rows.length <= 1){
            // keep at least one row
            if (sel) sel.value = '';
            if (other){ other.value = ''; other.style.display='none'; }
            return;
          }
          row.remove();
        });
      }
    };

    // wire existing row(s)
    list.querySelectorAll('.extras__row').forEach(wireRow);

    addBtn.addEventListener('click', () => {
      const tpl = document.createElement('div');
      tpl.className = 'extras__row';
      tpl.innerHTML = `
        <select class="control extras__select">
          <option value="">Bitte auswählen</option>
          <option>Wundmanagement</option>
          <option>Palliativpflege</option>
          <option>Demenzbegleitung</option>
          <option>Basale Stimulation</option>
          <option>Kinästhetik</option>
          <option>Stomaversorgung</option>
          <option>Diabetesberatung</option>
          <option>Medikamentenmanagement</option>
          <option>Intensiv-/Akutpflege</option>
          <option>Sonstiges</option>
        </select>
        <input class="control extras__other" type="text" placeholder="Sonstiges (optional)" style="display:none;" />
        <button class="control btn extras__remove" type="button">Entfernen</button>
      `;
      list.appendChild(tpl);
      wireRow(tpl);
    });
  }
});


// NAV_DEMO – Navigation Button (Demo)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-action="Navigation starten"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = btn.closest('.today-item');
      const addr = item ? (item.querySelector('.muted')?.textContent || '') : '';
      const url = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addr);
      window.open(url, '_blank');
    });
  });
});


// PROFILE_PAGE_FIXED – Profil anzeigen/bearbeiten + Dashboard-Fill (Demo via localStorage)
(function(){
  var PROFILE_KEY = 'nursy_profile_care_v1';
  var PHOTO_KEY = 'nursy_profile_photo_v1';
  var GBR_KEY = 'nursy_gbr_files_v1';
  var AVAIL_KEY = 'nursy_availability_compact_v1';

  function safeGet(key){ try{ return localStorage.getItem(key); }catch(e){ return null; } }
  function safeSet(key,val){ try{ localStorage.setItem(key,val); return true; }catch(e){ return false; } }

  function updateAvatar(el, dataUrl){
    if (!el) return;
    if (dataUrl){
      el.innerHTML = '';
      el.style.backgroundImage = 'url(' + dataUrl + ')';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.color = 'transparent';
    } else {
      el.style.backgroundImage = '';
      el.innerHTML = '<span>Foto</span>';
      el.style.color = '';
    }
  }

  function labelFromAvailability(av, offsetDays){
    var days = ["So","Mo","Di","Mi","Do","Fr","Sa"];
    var d = new Date();
    d.setDate(d.getDate() + (offsetDays || 0));
    var key = days[d.getDay()];
    var slot = av && av[key];
    var prefix = (offsetDays === 1) ? "" : "Heute";
    if (slot && (slot.start || slot.end)){
      var s = slot.start || "—";
      var e = slot.end || "—";
      return (prefix ? (prefix + " ") : "") + s + "–" + e;
    }
    return prefix + " —";
  }

  function parseJSON(raw){
    try{ return raw ? JSON.parse(raw) : null; }catch(e){ return null; }
  }

  document.addEventListener('DOMContentLoaded', function(){
    // Fill dashboard if ids exist
    var nameEl = document.getElementById('dashName');
    var bezEl = document.getElementById('dashBezirk');
    var todayEl = document.getElementById('dashTodayTime');
    var tomorrowEl = document.getElementById('dashTomorrowTime');
    var avatarEl = document.getElementById('dashAvatar');

    var p = parseJSON(safeGet(PROFILE_KEY));
    if (p){
      if (nameEl) nameEl.textContent = (p.firstName || 'Test') + ' ' + (p.lastName || 'Pflegekraft');
      if (bezEl) bezEl.textContent = p.districtLabel || p.district || '—';
    }

    var photo = safeGet(PHOTO_KEY);
    if (avatarEl) updateAvatar(avatarEl, photo);

    var av = parseJSON(safeGet(AVAIL_KEY));
    if (av){
      if (todayEl) todayEl.textContent = labelFromAvailability(av, 0);
      if (tomorrowEl) tomorrowEl.textContent = labelFromAvailability(av, 1);
    }
  });

  document.addEventListener('DOMContentLoaded', function(){
    // Profile page if form exists
    var form = document.getElementById('profileForm');
    if (!form) return;

    var msg = document.getElementById('profileMsg');
    function flash(t){
      if (!msg) return;
      msg.style.display = 'block';
      msg.textContent = t;
      window.setTimeout(function(){ msg.style.display='none'; }, 2200);
    }

    // Elements
    var avatarPreview = document.getElementById('avatarPreview');
    var photoInput = document.getElementById('photoInput');
    var removePhoto = document.getElementById('removePhoto');

    var district = document.getElementById('district');
    var districtOtherWrap = document.getElementById('districtOtherWrap');
    var districtOther = document.getElementById('districtOther');
    var bezirkLabel = document.getElementById('bezirkLabel');

    var qualMain = document.getElementById('qualMain');
    var qualOtherWrap = document.getElementById('qualOtherWrap');
    var qualOther = document.getElementById('qualOther');

    var extrasList = document.getElementById('extrasList');
    var addExtra = document.getElementById('addExtra');

    var gbrFront = document.getElementById('gbrFront');
    var gbrBack = document.getElementById('gbrBack');
    var gbrFrontStatus = document.getElementById('gbrFrontStatus');
    var gbrBackStatus = document.getElementById('gbrBackStatus');

    var todayPill = document.getElementById('todayTimePill');
    var tomorrowPill = document.getElementById('tomorrowTimePill');

    var saveProfileBtn = document.getElementById('saveProfileTop');
    var saveTimesBtn = document.getElementById('saveTimes');

    // Photo
    updateAvatar(avatarPreview, safeGet(PHOTO_KEY));
    if (removePhoto){
      removePhoto.addEventListener('click', function(){
        safeSet(PHOTO_KEY, '');
        updateAvatar(avatarPreview, null);
        flash('Foto entfernt.');
      });
    }
    if (photoInput){
      photoInput.addEventListener('change', function(){
        var file = photoInput.files && photoInput.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(){
          var dataUrl = String(reader.result || '');
          safeSet(PHOTO_KEY, dataUrl);
          updateAvatar(avatarPreview, dataUrl);
          flash('Foto gespeichert.');
        };
        reader.readAsDataURL(file);
      });
    }

    function toggleDistrict(){
      var show = district && district.value === 'Sonstiges';
      if (districtOtherWrap) districtOtherWrap.style.display = show ? '' : 'none';
      if (!show && districtOther) districtOther.value = '';
    }
    function toggleQual(){
      var show = qualMain && qualMain.value === 'Sonstiges';
      if (qualOtherWrap) qualOtherWrap.style.display = show ? '' : 'none';
      if (!show && qualOther) qualOther.value = '';
    }
    function updateBezirkLabel(){
      if (!bezirkLabel) return;
      if (!district){ bezirkLabel.textContent = '—'; return; }
      bezirkLabel.textContent = (district.value === 'Sonstiges') ? (districtOther && districtOther.value ? districtOther.value : '—') : (district.value || '—');
    }
    if (district){
      district.addEventListener('change', function(){ toggleDistrict(); updateBezirkLabel(); });
      toggleDistrict(); updateBezirkLabel();
    }
    if (districtOther){
      districtOther.addEventListener('input', updateBezirkLabel);
    }
    if (qualMain){
      qualMain.addEventListener('change', toggleQual);
      toggleQual();
    }

    // Extras dynamic rows
    function wireRow(row){
      var sel = row.querySelector('.extras__select');
      var other = row.querySelector('.extras__other');
      var remove = row.querySelector('.extras__remove');

      function toggle(){
        if (!sel || !other) return;
        other.style.display = (sel.value === 'Sonstiges') ? '' : 'none';
        if (sel.value !== 'Sonstiges') other.value = '';
      }
      if (sel) sel.addEventListener('change', toggle);
      toggle();

      if (remove){
        remove.addEventListener('click', function(){
          var rows = extrasList.querySelectorAll('.extras__row');
          if (rows.length <= 1){
            if (sel) sel.value = '';
            if (other){ other.value=''; other.style.display='none'; }
            return;
          }
          row.remove();
        });
      }
    }
    if (extrasList){
      var existingRows = extrasList.querySelectorAll('.extras__row');
      for (var i=0;i<existingRows.length;i++) wireRow(existingRows[i]);
    }
    if (addExtra && extrasList){
      addExtra.addEventListener('click', function(){
        var row = document.createElement('div');
        row.className = 'extras__row';
        row.innerHTML = ''
          + '<select class="control extras__select">'
          + '<option value="">Bitte auswählen</option>'
          + '<option>Wundmanagement</option>'
          + '<option>Palliativpflege</option>'
          + '<option>Demenzbegleitung</option>'
          + '<option>Basale Stimulation</option>'
          + '<option>Kinästhetik</option>'
          + '<option>Stomaversorgung</option>'
          + '<option>Diabetesberatung</option>'
          + '<option>Medikamentenmanagement</option>'
          + '<option>Intensiv-/Akutpflege</option>'
          + '<option>Sonstiges</option>'
          + '</select>'
          + '<input class="control extras__other" type="text" placeholder="Sonstiges (optional)" style="display:none;" />'
          + '<button class="control btn extras__remove" type="button">Entfernen</button>';
        extrasList.appendChild(row);
        wireRow(row);
      });
    }

    // GBR status store file names
    function loadGbrStatus(){
      var g = parseJSON(safeGet(GBR_KEY)) || {};
      if (gbrFrontStatus) gbrFrontStatus.textContent = g.frontName ? ('Hochgeladen: ' + g.frontName) : 'Noch nicht hochgeladen';
      if (gbrBackStatus) gbrBackStatus.textContent = g.backName ? ('Hochgeladen: ' + g.backName) : 'Noch nicht hochgeladen';
    }
    loadGbrStatus();

    function handleGbrChange(){
      var g = parseJSON(safeGet(GBR_KEY)) || {};
      var ff = gbrFront && gbrFront.files && gbrFront.files[0];
      var bf = gbrBack && gbrBack.files && gbrBack.files[0];
      if (ff) g.frontName = ff.name;
      if (bf) g.backName = bf.name;
      safeSet(GBR_KEY, JSON.stringify(g));
      loadGbrStatus();
      flash('Nachweise aktualisiert.');
    }
    if (gbrFront) gbrFront.addEventListener('change', handleGbrChange);
    if (gbrBack) gbrBack.addEventListener('change', handleGbrChange);

    // Availability load/save
    var timeInputs = document.querySelectorAll('.avail-time');

    var dayChecks = document.querySelectorAll('.avail-check');

    function setRowEnabled(dayKey, enabled){
      // enable/disable both time inputs for a day
      for (var i=0;i<timeInputs.length;i++){
        var inp = timeInputs[i];
        if (inp.getAttribute('data-day') === dayKey){
          inp.disabled = !enabled;
          if (!enabled) inp.value = '';
        }
      }
    }

    // Toggle per day
    for (var c=0;c<dayChecks.length;c++){
      (function(chk){
        chk.addEventListener('change', function(){
          var dayKey = chk.getAttribute('data-day');
          setRowEnabled(dayKey, chk.checked);
        });
      })(dayChecks[c]);
    }


    function loadAvailability(){
      var av = parseJSON(safeGet(AVAIL_KEY)) || parseJSON(safeGet('nursy_availability_v1')) || null;
      if (!av) return;
      for (var i=0;i<timeInputs.length;i++){
        var inp = timeInputs[i];
        var day = inp.getAttribute('data-day');
        var slot = inp.getAttribute('data-slot');
        if (av[day] && typeof av[day][slot] === 'string'){
          inp.value = av[day][slot];
        
      // Sync checkboxes (enable rows only if there is a time)
      for (var c=0;c<dayChecks.length;c++){
        var chk = dayChecks[c];
        var dayKey = chk.getAttribute('data-day');
        var has = false;
        for (var i=0;i<timeInputs.length;i++){
          var inp = timeInputs[i];
          if (inp.getAttribute('data-day') === dayKey && (inp.value && inp.value.trim())){
            has = true; break;
          }
        }
        chk.checked = has;
        setRowEnabled(dayKey, has);
      }

}
      }
      if (todayPill) todayPill.textContent = labelFromAvailability(av, 0);
      if (tomorrowPill) tomorrowPill.textContent = labelFromAvailability(av, 1);
    }

    function saveAvailability(){
      var av = {};
      // Initialize all days from checkboxes
      for (var c=0;c<dayChecks.length;c++){
        var dayKey = dayChecks[c].getAttribute('data-day');
        av[dayKey] = {start:'', end:''};
      }
      // Save only enabled inputs
      for (var i=0;i<timeInputs.length;i++){
        var inp = timeInputs[i];
        var day = inp.getAttribute('data-day');
        var slot = inp.getAttribute('data-slot');
        if (!av[day]) av[day] = {};
        av[day][slot] = (inp.disabled ? '' : (inp.value || ''));
      }
      safeSet(AVAIL_KEY, JSON.stringify(av));
      if (todayPill) todayPill.textContent = labelFromAvailability(av, 0);
      if (tomorrowPill) tomorrowPill.textContent = labelFromAvailability(av, 1);
      flash('Zeiten gespeichert.');
    }


    // Profile load/save
    function collectExtras(){
      var extras = [];
      if (!extrasList) return extras;
      var rows = extrasList.querySelectorAll('.extras__row');
      for (var i=0;i<rows.length;i++){
        var sel = rows[i].querySelector('.extras__select');
        var other = rows[i].querySelector('.extras__other');
        var name = sel ? sel.value : '';
        var otherVal = other ? other.value : '';
        if (name || otherVal) extras.push({name:name, other:otherVal});
      }
      return extras;
    }

    function loadProfile(){
      var p = parseJSON(safeGet(PROFILE_KEY));
      if (!p) return;
      var fields = p.fields || {};
      for (var id in fields){
        var el = document.getElementById(id);
        if (el) el.value = fields[id];
      }
      // rebuild extras if present
      if (extrasList && p.extras && p.extras.length){
        extrasList.innerHTML = '';
        for (var i=0;i<p.extras.length;i++){
          var row = document.createElement('div');
          row.className='extras__row';
          row.innerHTML = ''
            + '<select class="control extras__select">'
            + '<option value="">Bitte auswählen</option>'
            + '<option>Wundmanagement</option>'
            + '<option>Palliativpflege</option>'
            + '<option>Demenzbegleitung</option>'
            + '<option>Basale Stimulation</option>'
            + '<option>Kinästhetik</option>'
            + '<option>Stomaversorgung</option>'
            + '<option>Diabetesberatung</option>'
            + '<option>Medikamentenmanagement</option>'
            + '<option>Intensiv-/Akutpflege</option>'
            + '<option>Sonstiges</option>'
            + '</select>'
            + '<input class="control extras__other" type="text" placeholder="Sonstiges (optional)" style="display:none;" />'
            + '<button class="control btn extras__remove" type="button">Entfernen</button>';
          extrasList.appendChild(row);
          var sel = row.querySelector('.extras__select');
          var other = row.querySelector('.extras__other');
          if (sel) sel.value = p.extras[i].name || '';
          if (other) other.value = p.extras[i].other || '';
          wireRow(row);
        }
      }
      toggleDistrict(); toggleQual(); updateBezirkLabel();
    }

    function saveProfile(){
      if (!form.checkValidity()){
        form.reportValidity();
        return;
      }
      var firstName = document.getElementById('firstName') ? document.getElementById('firstName').value : '';
      var lastName = document.getElementById('lastName') ? document.getElementById('lastName').value : '';
      var districtVal = district ? district.value : '';
      var districtLabel = (districtVal === 'Sonstiges') ? (districtOther && districtOther.value ? districtOther.value : '—') : (districtVal || '—');

      var fields = {
        firstName:firstName,
        lastName:lastName,
        street: document.getElementById('street') ? document.getElementById('street').value : '',
        zip: document.getElementById('zip') ? document.getElementById('zip').value : '',
        city: document.getElementById('city') ? document.getElementById('city').value : '',
        district: districtVal,
        districtOther: districtOther ? districtOther.value : '',
        bio: document.getElementById('bio') ? document.getElementById('bio').value : '',
        qualMain: qualMain ? qualMain.value : '',
        qualOther: qualOther ? qualOther.value : ''
      };

      safeSet(PROFILE_KEY, JSON.stringify({
        firstName:firstName,
        lastName:lastName,
        district: districtVal,
        districtLabel: districtLabel,
        fields: fields,
        extras: collectExtras()
      }));

      if (bezirkLabel) bezirkLabel.textContent = districtLabel;
      flash('Profil gespeichert.');
    }

    if (saveProfileBtn) saveProfileBtn.addEventListener('click', saveProfile);
    if (saveTimesBtn) saveTimesBtn.addEventListener('click', saveAvailability);

    // Init
    loadProfile();
    loadAvailability();
  });
})();

// TEST_ACCOUNTS_LOGIN – Login via Test-Accounts (Frontend-only, robust)
(function(){
  var TEST_ACCOUNTS = {
    care: { email: 'care@test.at', password: 'Test1234!', dashboard: 'dashboard-care.html' },
    client: { email: 'client@test.at', password: 'Test1234!', dashboard: 'dashboard-client.html' }
  };

  function norm(s){ return String(s || '').trim().toLowerCase(); }

  function ensureDemoDataForCare(){
    try{
      var key = 'nursy_profile_care_v1';
      if (!localStorage.getItem(key)){
        localStorage.setItem(key, JSON.stringify({
          firstName: 'Test',
          lastName: 'Pflegekraft',
          district: 'Linz',
          districtLabel: 'Linz',
          fields: {
            firstName: 'Test',
            lastName: 'Pflegekraft',
            street: 'Hauptstraße 12',
            zip: '4020',
            city: 'Linz',
            district: 'Linz',
            bio: 'DGKP (Demo) – Schwerpunkt Wundmanagement & Akutpflege.',
            qualMain: 'DGKP',
            qualOther: ''
          },
          extras: [{name:'Wundmanagement', other:''}, {name:'Intensiv-/Akutpflege', other:''}]
        }));
      }
      var avKey = 'nursy_availability_compact_v1';
      if (!localStorage.getItem(avKey)){
        localStorage.setItem(avKey, JSON.stringify({
          Mo:{start:'08:00', end:'16:00'},
          Di:{start:'08:00', end:'16:00'},
          Mi:{start:'', end:''},
          Do:{start:'08:00', end:'16:00'},
          Fr:{start:'08:00', end:'12:00'},
          Sa:{start:'', end:''},
          So:{start:'', end:''}
        }));
      }
    }catch(e){}
  }

  function ensureDemoDataForClient(){
    try{
      var key = 'nursy_profile_client_v1';
      if (!localStorage.getItem(key)){
        localStorage.setItem(key, JSON.stringify({
          firstName: 'Test',
          lastName: 'Klient',
          fields: { firstName:'Test', lastName:'Klient', street:'Musterweg 3', zip:'4040', city:'Linz' }
        }));
      }
    }catch(e){}
  }

  function showErr(form, text){
    var err = form ? form.querySelector('.form-error') : null;
    if (err){
      err.textContent = text;
      err.style.display = 'block';
    } else {
      alert(text);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    var form = document.querySelector('form[data-login-role]');
    if (!form) return;

    var role = form.getAttribute('data-login-role') || 'care';
    var emailInput = document.getElementById('loginEmail');
    var passInput = document.getElementById('loginPassword');

    var useBtn = document.querySelector('[data-action="use-test"]');
    var loginBtn = document.querySelector('[data-action="login-test"]');

    function fillTest(){
      var t = TEST_ACCOUNTS[role];
      if (!t) return;
      if (emailInput) emailInput.value = t.email;
      if (passInput) passInput.value = t.password;
    }

    if (useBtn) useBtn.addEventListener('click', fillTest);

    if (loginBtn) loginBtn.addEventListener('click', function(){
      fillTest();
      // trigger submit reliably
      var submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) submitBtn.click();
      else form.dispatchEvent(new Event('submit', {cancelable:true}));
    });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var t = TEST_ACCOUNTS[role];
      if (!t){
        showErr(form, 'Kein Test-Account für diese Rolle gefunden.');
        return;
      }

      var emailVal = emailInput ? emailInput.value : '';
      var passVal = passInput ? passInput.value : '';

      var ok = (norm(emailVal) === norm(t.email)) && (String(passVal || '') === t.password);

      if (!ok){
        showErr(form, 'Login fehlgeschlagen. Bitte E-Mail/Passwort prüfen.');
        return;
      }

      try{ localStorage.setItem('nursy_logged_in_role', role); }catch(e){}
      if (role === 'care') ensureDemoDataForCare();
      if (role === 'client') ensureDemoDataForClient();

      window.location.href = t.dashboard;
    });
  });
})();
  // Patients page (Alle ansehen) – Demo: Heute + alle aktiven
  (function(){
    var todayList = document.getElementById('patientsTodayList');
    var activeList = document.getElementById('patientsActiveList');
    if (!todayList || !activeList) return;

    var TODAY = (function(){
      var d = new Date();
      var y = d.getFullYear();
      var m = String(d.getMonth()+1).padStart(2,'0');
      var da = String(d.getDate()).padStart(2,'0');
      return y + '-' + m + '-' + da;
    })();

    var PAT_KEY = 'nursy_patients_v1';

    function esc(s){
      return String(s == null ? '' : s)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#39;');
    }


    function ensureDemoPatients(){
      try{
        if (localStorage.getItem(PAT_KEY)) return;
        localStorage.setItem(PAT_KEY, JSON.stringify([
          {id:'p1', name:'Patient 1', address:'Hauptstraße 12, 4020 Linz', active:true, visits:[{date:TODAY, from:'12:00', to:'13:00'}]},
          {id:'p2', name:'Patient 2', address:'Musterweg 3, 4040 Linz', active:true, visits:[{date:TODAY, from:'15:00', to:'16:00'}]},
          {id:'p3', name:'Patient 3', address:'Bahnhofstraße 8, 4020 Linz', active:true, visits:[{date:(function(){var d=new Date(); d.setDate(d.getDate()+1); var y=d.getFullYear(); var m=String(d.getMonth()+1).padStart(2,'0'); var da=String(d.getDate()).padStart(2,'0'); return y+'-'+m+'-'+da;})(), from:'09:30', to:'10:15'}]}
        ]));
      }catch(e){}
    }

    function loadPatients(){
      ensureDemoPatients();
      try{ return JSON.parse(localStorage.getItem(PAT_KEY) || '[]') || []; }catch(e){ return []; }
    }

    function row(p, timeText, cancelled){
      var div = document.createElement('div');
      div.className = 'patient-row' + (cancelled ? ' is-cancelled' : '');
      var statusLabel = cancelled ? 'Storniert' : 'Aktiv';
      var statusClass = cancelled ? 'is-cancelled' : 'is-active';

      div.innerHTML = ''+
        '<div class="patient-info">'+
          '<div class="patient-name">'+esc(p.name)+'</div>'+
          '<div class="patient-address">'+esc(p.address)+'</div>'+
        '</div>'+
        '<div class="patient-time'+(cancelled ? ' is-cancelled' : '')+'">'+esc(timeText || '—')+'</div>'+
        '<span class="status-pill '+statusClass+'">'+statusLabel+'</span>'+
        '<div class="patient-actions">'+
          '<button class="control btn small secondary" type="button" data-action="nav">Navigation</button>'+
          '<button class="control btn small primary" type="button" data-action="msg">Nachricht</button>'+
          '<button class="control btn small '+(cancelled ? 'success' : 'danger')+'" type="button" data-action="cancel">'+(cancelled ? 'Stornierung aufheben' : 'Stornieren')+'</button>'+
        '</div>';

      return div;
    }

    function nextTime(p){
      var v = (p.visits || []).slice().sort(function(a,b){
        return (a.date + a.from).localeCompare(b.date + b.from);
      });
      if (!v.length) return { text: '—', cancelled:false };
      // prefer today if exists
      for (var i=0;i<v.length;i++){
        if (v[i].date === TODAY) return { text: v[i].from + '–' + v[i].to, cancelled: !!v[i].cancelled };
      }
      return { text: v[0].from + '–' + v[0].to, cancelled: !!v[0].cancelled };
    }

    function render(){
      var patients = loadPatients().filter(function(p){ return p && p.active; });

      // Today
      todayList.innerHTML = '';
      var today = [];
      for (var i=0;i<patients.length;i++){
        var p = patients[i];
        var v = (p.visits||[]).find(function(x){ return x.date === TODAY; });
        if (v) today.push({p:p, v:v});
      }
      var tCount = document.getElementById('patientsTodayCount');
      if (tCount) tCount.textContent = String(today.length);
      var tEmpty = document.getElementById('patientsTodayEmpty');
      if (tEmpty) tEmpty.style.display = today.length ? 'none' : 'block';
      for (var i=0;i<today.length;i++){
        todayList.appendChild(row(today[i].p, today[i].v.from + '–' + today[i].v.to, !!today[i].v.cancelled));
      }

      // Active
      activeList.innerHTML = '';
      var aCount = document.getElementById('patientsActiveCount');
      if (aCount) aCount.textContent = String(patients.length);
      var aEmpty = document.getElementById('patientsActiveEmpty');
      if (aEmpty) aEmpty.style.display = patients.length ? 'none' : 'block';
      for (var i=0;i<patients.length;i++){
        var nt = nextTime(patients[i]);
        activeList.appendChild(row(patients[i], nt.text, !!nt.cancelled));
      }
    }

    var resetBtn = document.getElementById('patientsResetDemo');
    if (resetBtn){
      resetBtn.addEventListener('click', function(){
        try{ localStorage.removeItem(PAT_KEY); }catch(e){}
        render();
      });
    }

    render();
  })();


function getPatientsSafe(){
  try{
    const raw = localStorage.getItem("nursy_demo_patients_v1") || localStorage.getItem("NURSY_DEMO_PATIENTS") || localStorage.getItem("patients") || localStorage.getItem("PATIENTS");
    if(!raw) return null;
    return JSON.parse(raw);
  }catch(e){ return null; }
}

function savePatientsSafe(patients){
  try{ localStorage.setItem("nursy_demo_patients_v1", JSON.stringify(patients)); }catch(e){}
}

function findVisit(patients, patientId, date){
  const p = (patients||[]).find(x => x.id === patientId);
  if(!p) return {p:null,v:null};
  const v = (p.visits||[]).find(x => x.date === date);
  return {p,v};
}

function updateCancelButton(){
  const btn = document.getElementById("timeCancel");
  if(!btn || !__currentEdit) return;
  const patients = (typeof loadPatients === "function") ? loadPatients() : (getPatientsSafe() || []);
  const {v} = findVisit(patients, __currentEdit.patientId, __currentEdit.date);
  const cancelled = !!(v && v.cancelled);
  btn.textContent = cancelled ? "Stornierung aufheben" : "Auftrag stornieren";
  btn.onclick = () => toggleCancel();
}

function toggleCancel(){
  if(!__currentEdit) return;
  const patients = (typeof loadPatients === "function") ? loadPatients() : (getPatientsSafe() || []);
  const {v} = findVisit(patients, __currentEdit.patientId, __currentEdit.date);
  if(!v) return;

  if(!v.cancelled){
    if(!confirm("Diesen Auftrag wirklich stornieren?")) return;
    v.cancelled = true;
  } else {
    if(!confirm("Stornierung aufheben und Auftrag wieder aktivieren?")) return;
    v.cancelled = false;
  }

  if (typeof savePatients === "function") savePatients(patients);
  else savePatientsSafe(patients);

  // Falls es eine Render-Funktion gibt, aktualisieren
  if (typeof renderPatients === "function") renderPatients();
  if (typeof render === "function") render();

  updateCancelButton();
}
