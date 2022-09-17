class Ui {
    constructor() {
        this.result = document.querySelector("#result");
    }

    // make a template for show coins in index html page
    showCoins(coinData) {
        coinData.forEach((coin) => {
            this.result.innerHTML += `
            <li class="list-group-item my-2 rounded-2 fs-10 coin-item text-white">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="fs-8 ms-3">${coin.rank}</span>
                        <img src="${coin.logo_url}" class="ms-13" style="width: 30px; height:30px;" />
                        <span class="ms-1 fs-11 name" style="font-weight: 700">${coin.name}</span>
                        <span class="ms-1 text-muted fs-9" style="font-weight: 400">${coin.symbol}</span>
                    </div>
                    <div style='width:51rem;' class="d-flex justify-content-between align-items-center">
                        <span class="fs-8 " style="font-weight: 500">$ ${parseFloat(coin.price).toFixed(2)}</span>

                        <div style="width:42rem" class="d-flex justify-content-between align-items-center">
                            <span class="${
                                (parseFloat(coin["1d"].price_change_pct) * 100).toFixed(2) >= 0 ? "greenPrc" : "redPrc"
                            } fs-8 ">${(parseFloat(coin["1d"].price_change_pct) * 100).toFixed(2)} %</span>
                            
                            <div style="width:36rem" class="d-flex justify-content-between align-items-center">     
                                <span class="${
                                    (parseFloat(coin["30d"].price_change_pct) * 100).toFixed(2) >= 0 ? "greenPrc" : "redPrc"
                                } fs-8">${(parseFloat(coin["30d"].price_change_pct) * 100).toFixed(2)} %</span>

                                <div class="d-flex justify-content-between align-items-center" style="width:27rem">
                                    <span class="fs-8 " style="font-weight: 400">$${
                                        // Nine Zeroes for Billions
                                        Math.abs(Number(coin["1d"].volume)) >= 1.0e9
                                            ? (Math.abs(Number(coin["1d"].volume)) / 1.0e9).toFixed(2) + " B"
                                            : // Six Zeroes for Millions
                                            Math.abs(Number(coin["1d"].volume)) >= 1.0e6
                                            ? (Math.abs(Number(coin["1d"].volume)) / 1.0e6).toFixed(2) + " M"
                                            : // Three Zeroes for Thousands
                                            Math.abs(Number(coin["1d"].volume)) >= 1.0e3
                                            ? (Math.abs(Number(coin["1d"].volume)) / 1.0e3).toFixed(2) + " K"
                                            : Math.abs(Number(coin["1d"].volume))
                                    }</span>
                                    
                                    <div class="d-flex justify-content-between align-items-center" style="width:16rem">
                                        <span class="fs-8 " style="font-weight: 400">$${
                                            // Nine Zeroes for Billions
                                            Math.abs(Number(coin["30d"].volume)) >= 1.0e9
                                                ? (Math.abs(Number(coin["30d"].volume)) / 1.0e9).toFixed(2) + " B"
                                                : // Six Zeroes for Millions
                                                Math.abs(Number(coin["30d"].volume)) >= 1.0e6
                                                ? (Math.abs(Number(coin["30d"].volume)) / 1.0e6).toFixed(2) + " M"
                                                : // Three Zeroes for Thousands
                                                Math.abs(Number(coin["30d"].volume)) >= 1.0e3
                                                ? (Math.abs(Number(coin["30d"].volume)) / 1.0e3).toFixed(2) + " K"
                                                : Math.abs(Number(coin["30d"].volume))
                                        }</span>
                                        <div style="width:6rem">
                                            <span class="fs-8 " style="font-weight: 400">$${
                                                // Nine Zeroes for Billions
                                                Math.abs(Number(coin.market_cap)) >= 1.0e9
                                                    ? (Math.abs(Number(coin.market_cap)) / 1.0e9).toFixed(2) + " B"
                                                    : // Six Zeroes for Millions
                                                    Math.abs(Number(coin.market_cap)) >= 1.0e6
                                                    ? (Math.abs(Number(coin.market_cap)) / 1.0e6).toFixed(2) + " M"
                                                    : // Three Zeroes for Thousands
                                                    Math.abs(Number(coin.market_cap)) >= 1.0e3
                                                    ? (Math.abs(Number(coin.market_cap)) / 1.0e3).toFixed(2) + " K"
                                                    : Math.abs(Number(coin.market_cap))
                                            }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            `;
        });
    }

    searchBox(searchInput, coinsName) {
        // listen for user events
        searchInput.addEventListener("keyup", (event) => {
            const { value } = event.target;

            // get user search input converted to lowercase
            const searchQuery = value.toLowerCase();

            for (const nameElement of coinsName) {
                // store name text and convert to lowercase
                let name = nameElement.textContent.toLowerCase();

                // compare current name to search input
                if (name.includes(searchQuery)) {
                    // found name matching search, display it
                    nameElement.className = "ms-1 fs-11 name";
                } else {
                    // no match, don't display name
                    nameElement.parentElement.parentElement.parentElement.className = "d-none";
                }
            }
        });
    }

    // Print All message need to show
    printMessage(message, className) {
        // creat div
        const div = document.createElement("div");
        // append class list to div
        div.className = className;
        // apend message to  the div
        div.appendChild(document.createTextNode(message));
        // access to the div  tha wnat to show message card
        const result = document.querySelector(".messages");
        // append div to the result
        result.appendChild(div);

        // remove message after 3second
        this.removeMessage();
    }

    // remove message after 3second
    removeMessage() {
        setTimeout(() => {
            document.querySelector(".messages div").remove();
        }, 3000);
    }

    // Showing result of API
    createTemplate(result, currency) {
        // check  if exist previous result, then need to remove first
        const prevResult = document.querySelector("#exchangeResult div");
        if (prevResult) {
            prevResult.remove();
        }

        // check the name of currency
        let currencyName;
        if (currency == "USD") {
            currencyName = "Dollar";
        }
        if (currency == "GBP") {
            currencyName = "Pound";
        }
        if (currency == "EUR") {
            currencyName = "Euro";
        }
        if (currency == "JPY") {
            currencyName = "Yen";
        }
        if (currency == "CHY") {
            currencyName = "Yuan";
        }
        if (currency == "TRY") {
            currencyName = "Turkish Lira";
        }
        if (currency == "KRW") {
            currencyName = "Won";
        }

        // create template for show
        let HTMLTemplate = `
        <div class= "card coin-item text-white text-center mx-auto mt-3">
            <h2 class="mx-auto text-altdark">Result</h2>
            <img class="mx-auto mb-2" style="width: 110px ; height: 110px;" src="${result.logo_url}">
            <p class="fs-8 mb-0" style="font-weight: 700"><span class="text-altdark">The Price of ${
                result.name
            } from ${currencyName} is :</span> ${parseFloat(result.price).toFixed(2)}</p>
            <p class="fs-8 mb-0 " style="font-weight: 700"><span class="text-altdark">Rank :</span> ${parseFloat(result.rank)}</p>
            <p class="${
                (parseFloat(result["1h"].price_change) * 100).toFixed(2) >= 0 ? "greenPrc" : "redPrc"
            } fs-8 mb-0" style="font-weight: 700"><span class="text-altdark">Last Hour :</span> ${parseFloat(
            result["1h"].price_change
        ).toFixed(2)}</p>
            <p class="${
                (parseFloat(result["1d"].price_change) * 100).toFixed(2) >= 0 ? "greenPrc" : "redPrc"
            } fs-8 mb-0" style="font-weight: 700"><span class="text-altdark">Last Day : </span>${parseFloat(
            result["1d"].price_change
        ).toFixed(2)}</p>
            <p class="${
                (parseFloat(result["7d"].price_change) * 100).toFixed(2) >= 0 ? "greenPrc" : "redPrc"
            } fs-8 mb-0" style="font-weight: 700"><span class="text-altdark">Last Week : </span>${parseFloat(
            result["7d"].price_change
        ).toFixed(2)}</p>
            <p class="${
                (parseFloat(result["30d"].price_change) * 100).toFixed(2) >= 0 ? "greenPrc" : "redPrc"
            } fs-8 mb-0" style="font-weight: 700"><span class="text-altdark">Last Month : </span>${parseFloat(
            result["30d"].price_change
        ).toFixed(2)}</p>
        </div>
        `;
        // showing spinner for 2second
        this.showSpinner();
        // show the result after spinner
        this.showResult(HTMLTemplate);
    }

    // show spinner before showing result
    showSpinner() {
        const spinnerGif = document.createElement("img");
        spinnerGif.className = "w-75";
        spinnerGif.src = "../Assets/loader.gif";
        // append spinner to html
        document.querySelector(".spinner").appendChild(spinnerGif);
    }

    // showing the result of api
    showResult(HTMLTemplate) {
        setTimeout(() => {
            // remove spinner
            document.querySelector(".spinner img").remove();

            // access to the result tag
            const resultDiv = document.querySelector("#exchangeResult");
            // append to the resultDiv
            resultDiv.innerHTML = HTMLTemplate;
        }, 3000);
    }
}
