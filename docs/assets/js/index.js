/**
 * JavaScript für die "index.html"
 * 
 * Stellt Funktionalität für die Formulareingabe bereit.
 * 
 * Speichert die gesetzten Werte in den localStorage.
 */

/*====================================================================================*/
// -- Elemente des Forms --

const form = document.getElementById("donationForm");
const dropoffRadio = document.getElementById("dropoff");
const pickupRadio = document.getElementById("pickup");

const addressGroup = document.getElementById("addressGroup");
const zipGroup = document.getElementById("zipGroup");

const addressInput = document.getElementById("address");
const zipInput = document.getElementById("zip");

/*====================================================================================*/
// -- Anzeigen / verstecken der Eingabefelder, je nach Art der Abgabe --

// Initialer Zustand
toggleAddressFields();

// Event-Listener für das Umschalten
dropoffRadio.addEventListener("change", toggleAddressFields);
pickupRadio.addEventListener("change", toggleAddressFields);

/**
 * Zeigt / versteckt Adressfelder
 */
function toggleAddressFields() {
    if (pickupRadio.checked) {
        addressGroup.style.display = "block";
        zipGroup.style.display = "block";
        addressInput.required = true;
        zipInput.required = true;
    } else {
        addressGroup.style.display = "none";
        zipGroup.style.display = "none";
        addressInput.required = false;
        zipInput.required = false;
    }
}

/*====================================================================================*/
// -- Formularübertragung --

/**
 * Formular absenden
 */
form.addEventListener("submit", function(e) {
    
    // Standardverhalten unterdrücken
    e.preventDefault();

    // Hole die Werte aus dem Formular
    const type = document.querySelector('input[name="type"]:checked').value;
    const clothing = document.getElementById("clothing").value;
    const region = document.getElementById("region").value;
    const address = addressInput.value.trim();
    const zip = zipInput.value.trim();

    // Validiere die Pflichtfelder (müssen bei jedem Submit angegeben werden)
    if (!clothing || !region) {
        showToast("Bitte alle Pflichtfelder ausfüllen.");
        return;
    }

    // Validierungslogik bei "Abholung durch Sammelfahrzeug" (PLZ in der Nähe der Geschäftsstelle)
    if (type === "pickup") {

        // Sollten die Adressdaten nicht eingegeben worden sein
        if (!address || !zip || zip.length != 5) {
            showToast("Bitte Adresse und PLZ angeben.");
            return;
        }

        // Postleitzahl-Check (erste 2 Ziffern müssen gleich sein)
        const officeZipPrefix = document.getElementById("zipNumber").textContent.substring(0, 2);
        if (zip.substring(0, 2) !== officeZipPrefix) {
            showToast("Die Abholadresse liegt nicht im Einzugsgebiet der Geschäftsstelle.");
            return;
        }
    }

    // Daten im localStorage speichern (für Übergabe an "confirmation.html")
    localStorage.setItem(
        "donation",
        JSON.stringify({
            type,
            clothing,
            region,
            address,
            zip
        })
    );

    // Weiterleitung an "confirmation.html"
    window.location.href = "confirmation.html";
});

/*====================================================================================*/
// -- Toast --

/**
 * Zeigt eine Fehler-Toast-Nachricht an.
 * @param {string} message - Die Nachricht, die anzeigt werden soll (neben Warndreieck).
 */
function showToast(message) {

    // Toast-Elemente auf der Seite
    const toastElement = document.getElementById("errorToast");
    const toastMessage = document.getElementById("toastMessage");

    // Setzen der Nachricht im Toast
    toastMessage.innerHTML = "&#9888;&nbsp;";
    toastMessage.textContent += message;

    // Anzeigen (nach 3 Sekunden verschwindet Toast automatisch)
    const toast = new bootstrap.Toast(toastElement, { delay: 3000});
    toast.show();
}
