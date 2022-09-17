// Classes
const ui = new Ui();
const cryptoApi = new CryptoApi();

// Variables
// get search bar element

let searchInput = document.querySelector("#box");
let coinsName = document.getElementsByClassName("name");
let updateButton = document.querySelector("#update");

const coinDom = document.querySelector("#result");


// EventListeners
eventListeners();

function eventListeners() {
    // send data when dom loaded
    document.addEventListener("DOMContentLoaded", getDataFromApi);
    document.addEventListener("DOMContentLoaded", sendForBox);
    updateButton.addEventListener("click", updateInfo);
}

// Functions

// function for
function getDataFromApi() {
    cryptoApi.getData().then((data) => {
        const cryptoData = data.cryptoJson;
        ui.showCoins(cryptoData);
    });
}

function sendForBox() {
    ui.searchBox(searchInput, coinsName);
}

function updateInfo() {
    while (coinDom.firstChild) {
        coinDom.firstChild.remove();
    }
    getDataFromApi();
}
