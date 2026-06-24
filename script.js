const saldoText = document.getElementById("saldo");
const submitBtn = document.getElementById("submit");
const submitBtnK = document.getElementById("submitK");
const masukanText = document.getElementById("masukan");
const pengeluaranText = document.getElementById("pengeluaran");
const riwayat = document.getElementById("riwayat");
const resetBtn = document.getElementById("reset-btn-confirm");

let saldo = Number(localStorage.getItem("saldo")) || 0;
let masukan = Number(localStorage.getItem("masukan")) || 0;
let pengeluaran = Number(localStorage.getItem("pengeluaran")) || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];

function renderHistory() {
  riwayat.innerHTML = ``;

  history.forEach((item) => {
    const div = document.createElement("div");

    div.className = "p-3 mb-2";

    div.innerHTML = `
    <div>${item.type} Rp. ${item.amount}</div>
    <div class="opacity-20">${item.date}</div>

    <div class="divider my-1"></div>
`;

    riwayat.appendChild(div);
  });
}

function addHistory(type, amount) {
  history.unshift({
    type,
    amount,
    date: new Date().toLocaleString("id-ID"),
  });

  localStorage.setItem("history", JSON.stringify(history));

  renderHistory();
}

function updateSaldo() {
  saldoText.textContent = "Rp." + saldo;
}

function updateMasukan() {
  masukanText.textContent = "Rp." + masukan;
}

function updatePengeluaran() {
  pengeluaranText.textContent = "Rp." + pengeluaran;
}

submitBtn.addEventListener("click", () => {
  const nominal = Number(document.getElementById("nominal").value);

  if (nominal <= 0) {
    return;
  } else {
    saldo += nominal;
    masukan += nominal;
    addHistory("+", nominal);
    localStorage.setItem("saldo", saldo);
    localStorage.setItem("masukan", masukan);
  }

  updateSaldo();
  updateMasukan();
});

submitBtnK.addEventListener("click", () => {
  const nominalK = Number(document.getElementById("nominalK").value);

  if (nominalK <= 0) {
    return;
  } else if (nominalK <= saldo) {
    saldo -= nominalK;
    pengeluaran += nominalK;
    addHistory("-", nominalK);
    localStorage.setItem("saldo", saldo);
    localStorage.setItem("pengeluaran", pengeluaran);
  }

  updateSaldo();
  updatePengeluaran();
});

resetBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

console.log(history);
updateSaldo();
updateMasukan();
updatePengeluaran();
renderHistory();
