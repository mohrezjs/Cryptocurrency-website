class CryptoApi {
    // get data form Api
    async getData() {
        // url link
        let url =
            "https://api.nomics.com/v1/currencies/ticker?key=fef8afb50c029fe90ad4581f9bc4f913ad57dfe1&ids=&interval=1d,30d&convert=USD&per-page=100&page=1";
        const cryptoResponse = await fetch(url);
        const cryptoJson = await cryptoResponse.json();
        return {
            cryptoJson,
        };
    }
    async getForExchange(currency , cryptocurrency) {
        // url link
        let url =
            `https://api.nomics.com/v1/currencies/ticker?key=fef8afb50c029fe90ad4581f9bc4f913ad57dfe1&ids=${cryptocurrency}&interval=1h,1d,7d,30d&convert=${currency}&per-page=100&page=1`;
        
        // fetch url
        const response = await fetch(url);
        
        // return json
        const resultApi = await response.json();
        return {
            resultApi,
        };
    }
}
