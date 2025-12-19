
const DEFAULT_NAME = "Sendy Ferry Setyawan";

function $(id){ return document.getElementById(id); }

function setWelcomeName(name){
  const span = $("displayName");
  if (span) span.textContent = name;
}

function formatCurrentTime(){
  return new Date().toString();
}

function getSelectedGender(){
  const radios = document.querySelectorAll('input[name="gender"]');
  for (const r of radios) if (r.checked) return r.value;
  return "";
}

function renderOutput({ name, dob, gender, message }){
  const box = $("outputText");
  if (!box) return;

  box.innerHTML = `
    <div><b>Current time</b> : ${formatCurrentTime()}</div>
    <br />
    <div><b>Nama</b> : ${escapeHtml(name)}</div>
    <div><b>Tanggal Lahir</b> : ${escapeHtml(dob)}</div>
    <div><b>Jenis Kelamin</b> : ${escapeHtml(gender)}</div>
    <div><b>Pesan</b> : ${escapeHtml(message)}</div>
  `;
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

(function init(){
  const saved = localStorage.getItem("visitor_name");
  setWelcomeName(saved || DEFAULT_NAME);
})();

const form = $("messageForm");
const errorBox = $("errorBox");

if (form){
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (errorBox) errorBox.textContent = "";

    const name = $("name").value.trim();
    const dob = $("dob").value;
    const gender = getSelectedGender();
    const message = $("messageText").value.trim();

    const errors = [];
    if (!name) errors.push("Nama wajib diisi.");
    if (!dob) errors.push("Tanggal lahir wajib diisi.");
    if (!gender) errors.push("Pilih jenis kelamin.");
    if (!message) errors.push("Pesan wajib diisi.");
    if (message && message.length < 5) errors.push("Pesan minimal 5 karakter.");

    if (errors.length){
      if (errorBox) errorBox.textContent = errors.join(" ");
      return;
    }

    localStorage.setItem("visitor_name", name);
    setWelcomeName(name);

    renderOutput({ name, dob, gender, message });

    $("messageText").value = "";
  });
}
