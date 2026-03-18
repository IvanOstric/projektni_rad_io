function validEmailBasic(email) {
  const at = email.indexOf("@");
  if (at === -1) return "Nedostaje znak @.";

  const prije = email.substring(0, at);
  const poslije = email.substring(at + 1);

  if (prije.length < 2) return "Treba barem 2 znaka prije @.";
  if (poslije.length < 2) return "Treba barem 2 znaka nakon @.";

  const dot = poslije.indexOf(".");
  if (dot === -1) return "Nedostaje točka nakon @.";

  const nakonTocke = poslije.substring(dot + 1);
  if (nakonTocke.length < 2) return "Treba barem 2 znaka nakon točke.";

  return "";
}

function postaviDatumICitat() {
  const elDatum = document.getElementById("danasDatum");
  const elCitat = document.getElementById("citatDana");

  if (!elDatum || !elCitat) return;

  const danas = new Date();
  elDatum.textContent = danas.toLocaleDateString("hr-HR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const citati = [
    "Mir vama.",
    "Ne bojte se.",
    "Budite postojani u dobru.",
    "Činite dobro jedni drugima.",
    "Ustrajte u molitvi."
  ];

  const index = danas.getDate() % citati.length;
  elCitat.textContent = citati[index];
}

function initKontaktForma() {
  const forma = document.getElementById("kontaktForma");
  if (!forma) return;

  const status = document.getElementById("status");

  const zadnje = localStorage.getItem("kontaktZadnje");
  if (zadnje && status) {
    status.textContent = "Zadnji poslani upit: " + zadnje;
  }

  forma.addEventListener("submit", (e) => {
    e.preventDefault();

    const ime = document.getElementById("ime").value.trim();
    const email = document.getElementById("email").value.trim();
    const poruka = document.getElementById("poruka").value.trim();

    if (ime === "") {
      alert("Molimo unesite ime i prezime.");
      return;
    }
    if (poruka.length < 10) {
      alert("Poruka treba imati barem 10 znakova.");
      return;
    }

    const emailErr = validEmailBasic(email);
    if (emailErr !== "") {
      alert("E-mail nije ispravan: " + emailErr);
      return;
    }

    const data = {
      ime: ime,
      email: email,
      poruka: poruka,
      vrijeme: new Date().toLocaleString("hr-HR")
    };

    localStorage.setItem("kontaktData", JSON.stringify(data));
    localStorage.setItem("kontaktZadnje", data.vrijeme);

    if (status) status.textContent = "Spremljeno: " + data.vrijeme;

    forma.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  postaviDatumICitat();
  initKontaktForma();
});
