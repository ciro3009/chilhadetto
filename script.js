const frasi = [
	{
		testo: "qui le leggi funzionano",
		autore: "Spanio",
		opzioni: ["Spanio", "Rampoldi", "Giacomo", "Matteo"]
	},
	{
		testo: "ianno sei inutile",
		autore: "Rampoldi",
		opzioni: ["Rampoldi", "Spanio", "Giacomo", "Matteo"]
	}
];

let fraseAttuale = 0;

const citazione = document.getElementById("citazione");
const opzioni = document.getElementById("opzioni");
const feedback = document.getElementById("feedback");
const prossimaFrase = document.getElementById("prossima-frase");
const numeroFrase = document.getElementById("numero-frase");
const formFrase = document.getElementById("form-frase");
const messaggioForm = document.getElementById("messaggio-form");
const schermataIniziale = document.getElementById("schermata-iniziale");
const contenutoGioco = document.getElementById("contenuto-gioco");
const iniziaGioco = document.getElementById("inizia-gioco");

function mostraFrase() {
	const frase = frasi[fraseAttuale];

	citazione.textContent = frase.testo;
	numeroFrase.textContent = fraseAttuale + 1;
	feedback.textContent = "";
	feedback.className = "feedback";
	prossimaFrase.classList.add("nascosto");
	opzioni.innerHTML = "";

	frase.opzioni.forEach(function (autore) {
		const bottone = document.createElement("button");
		bottone.type = "button";
		bottone.className = "bottone bottone-opzione";
		bottone.textContent = autore;
		bottone.addEventListener("click", function () {
			controllaRisposta(bottone, autore, frase.autore);
		});
		opzioni.appendChild(bottone);
	});
}

function controllaRisposta(bottone, risposta, rispostaCorretta) {
	if (risposta === rispostaCorretta) {
		bottone.classList.add("corretta");
		feedback.textContent = "Risposta corretta! Grande intuizione.";
		feedback.className = "feedback successo";
		document.querySelectorAll(".bottone-opzione").forEach(function (opzione) {
			opzione.disabled = true;
		});

		if (fraseAttuale < frasi.length - 1) {
			prossimaFrase.classList.remove("nascosto");
		} else {
			feedback.textContent = "Hai completato tutte le frasi!";
		}
	} else {
		bottone.classList.add("sbagliata");
		bottone.disabled = true;
		feedback.textContent = "Non è questa. Riprova!";
		feedback.className = "feedback errore";
	}
}

prossimaFrase.addEventListener("click", function () {
	fraseAttuale += 1;
	mostraFrase();
});

iniziaGioco.addEventListener("click", function () {
	schermataIniziale.classList.add("nascosto");
	contenutoGioco.classList.remove("nascosto");
	contenutoGioco.setAttribute("aria-hidden", "false");
	mostraFrase();
});
