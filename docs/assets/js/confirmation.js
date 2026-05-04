/**
 * JavaScript für die "confirmation.html"
 * 
 * Liest die gesetzten Werte aus dem localStorage aus und zeigt diese an.
 * 
 * Sollten keine Werte vorhanden sein, wird eine Fehlermeldung angezeigt.
 */

// Auslesen des localStorage
const data = JSON.parse(localStorage.getItem("donation"));

// Prüfe, ob Daten übergeben wurden
if (data) {
    // -- Daten vorhanden => Erfolgsmeldung + anzeigen der Formulardaten --

    // Zeige die Erfolgsmeldung (div) an
    document.getElementById("success").classList.remove("d-none");

    // Die Seitenelemente auslesen und Daten anzeigen
    document.getElementById("conf-clothing").textContent = data.clothing;
    document.getElementById("conf-region").textContent = data.region;
    document.getElementById("conf-type").textContent = data.type === "pickup" ? "Abholung" : "Übergabe vor Ort";

    // Je nach Abgabe-Art die Adresse anzeigen
    if (data.type === "pickup") {
        document.getElementById("conf-address").textContent = data.address + " | " + data.zip;
    } else {
        document.getElementById("conf-address-row").style.display = "none";
    }

    // Datum generieren und anzeigen
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    document.getElementById("conf-datetime").textContent = `${day}.${month}.${year} um ${hours}:${minutes} Uhr`;

    // Speicher leeren
    localStorage.clear();
} else {
    // -- Keine Daten vorhanden => Fehlermeldung --

    // Zeige die Fehlermeldung (div) an
    document.getElementById("failure").classList.remove("d-none");

    // Speicher leeren
    localStorage.clear();
}
