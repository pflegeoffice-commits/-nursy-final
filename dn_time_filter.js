(function(){
function getBlock(time){
  if(!time) return "all";
  const h = parseInt(time.split(":")[0], 10);
  if(h >= 6 && h < 12) return "morgen";
  if(h >= 12 && h < 18) return "mittag";
  if(h >= 18 && h < 22) return "abend";
  return "nacht";
}

function applyDNFilter(){
  const blockEl = document.getElementById("dnBlockFilter");
  const statusEl = document.getElementById("dnStatusFilter");
  const block = blockEl ? blockEl.value : "all";
  const status = statusEl ? statusEl.value : "all";

  const dnList = document.getElementById("dnList");
  if(!dnList) return;

  const items = Array.from(dnList.querySelectorAll(".dn-item"));

  // 🔥 immer nach Uhrzeit sortieren (auch bei "Alle Zeiten")
  items.sort((a, b) => {
    const ta = a.dataset.time || "";
    const tb = b.dataset.time || "";
    return ta.localeCompare(tb);
  });

  items.forEach(el => {
    const time = el.dataset.time || "";
    const st = el.dataset.status || "open";

    let show = true;

    if(block !== "all" && getBlock(time) !== block) show = false;
    if(status !== "all" && st !== status) show = false;

    el.style.display = show ? "" : "none";
  });
}

function createFilterUI(){
  const head = document.querySelector(".dn-head");
  if(!head) return;
  if(document.querySelector(".dn-filter-bar")) return;

  const filter = document.createElement("div");
  filter.className = "dn-filter-bar";
  filter.innerHTML = `
    <select id="dnBlockFilter" class="doc-select">
      <option value="all">Alle Zeiten</option>
      <option value="morgen">Morgen</option>
      <option value="mittag">Mittag</option>
      <option value="abend">Abend</option>
      <option value="nacht">Nacht</option>
    </select>

    <select id="dnStatusFilter" class="doc-select">
      <option value="all">Alle Status</option>
      <option value="open">Offen</option>
      <option value="done">Durchgeführt</option>
      <option value="notdone">Nicht durchgeführt</option>
    </select>
  `;
  head.appendChild(filter);

  document.getElementById("dnBlockFilter").addEventListener("change", applyDNFilter);
  document.getElementById("dnStatusFilter").addEventListener("change", applyDNFilter);

  applyDNFilter();
}

document.addEventListener("DOMContentLoaded", () => {
  createFilterUI();
  applyDNFilter();
});

document.addEventListener("dn:updated", applyDNFilter);
})();