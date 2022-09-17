// Classes
const ui = new Ui();
const cryptoApi = new CryptoApi();

// Variables
const form = document.querySelector("#form");

// Eventlistener
eventListeners();
function eventListeners() {
    form.addEventListener("submit", getExc);
}

// functions

// get values from api
function getExc(e) {
    e.preventDefault();
    // Read values after submit the form
    const currency = document.querySelector("#currency").value;
    const cryptocurrency = document.querySelector("#cryptocurrency").value;

    // Validate fields
    if (currency === "" || cryptocurrency === "") {
        ui.printMessage("All the fields need to Complete", "alert alert-danger w-50 mx-auto text-center mt-3");
    } else {
        cryptoApi.getForExchange(currency, cryptocurrency).then((data) => ui.createTemplate(data.resultApi[0], currency));
    }
}
