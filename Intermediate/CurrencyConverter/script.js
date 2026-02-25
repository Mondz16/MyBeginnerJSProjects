const API_KEY = "fca_live_oBnrwnGF2Lzv0HuASEOhWoQs4TqYVCbs5F4ExlB5";

document.addEventListener("DOMContentLoaded" , () => {
    const amountValue = document.getElementById("amount");
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const baseCurrency = document.getElementById("base-currency");
    const convertBtn = document.getElementById("convert-btn");
    const result = document.getElementById("result");
    const latestRatesHolder = document.getElementById("latest-rates");

    initialize();

    convertBtn.addEventListener('click', async (e) => {
        result.innerHTML = "";
        const amount = amountValue.value.trim();
        const selectedFromCurrency = fromCurrency.options[fromCurrency.selectedIndex].text;
        const selectedToCurrency = toCurrency.options[toCurrency.selectedIndex].text;

        var convertedCurrency = await convertCurrency(amount, selectedFromCurrency,  selectedToCurrency);
        result.innerHTML =
        `
            ${amount} ${selectedFromCurrency} = ${convertedCurrency} ${selectedToCurrency}
        `;
    });

    baseCurrency.addEventListener('change' , async (e) => {
        const baseCurrencyValue = baseCurrency.options[baseCurrency.selectedIndex].text;
        displayLatestCurrencyValue(baseCurrencyValue);
    });

    function initialize(){
        displayLatestCurrencyValue("AUD");
        setupCurrencyConverter();
    }

    async function setupCurrencyConverter(){
        const response = await fetchLatestCurrencyValue();
        const {data} = response;

        fromCurrency.innerHTML = "";
        toCurrency.innerHTML = "";
        for(const [currency, value] of Object.entries(data)){
            const currencyItem = document.createElement('option');
            currencyItem.value = currency;
            currencyItem.textContent = currency;

            fromCurrency.append(currencyItem);
            toCurrency.append(currencyItem.cloneNode(true));
            baseCurrency.append(currencyItem.cloneNode(true));
        }
    }


    async function displayLatestCurrencyValue(currency){
        try {
            const response = await fetchLatestCurrencyValue(currency);
            const {data} = response; 

            latestRatesHolder.innerHTML = "";
            for(const [currency, value] of Object.entries(data)){
                const currencyItem = document.createElement('li');
                currencyItem.className = "currency-holder";
                currencyItem.innerHTML = 
                `
                    <span>${currency}<span>
                    <p>${value.toFixed(3)}</p>
                `;

                latestRatesHolder.append(currencyItem);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async function convertCurrency(value,fromCurrency, toCurrency){
        try {
            console.log("Fetching data....");
            const response = await fetchLatestCurrencyValue(fromCurrency);
            const {data} = response;
            const convertedCurrency = value * data[toCurrency];
            return convertedCurrency.toFixed(2);
        } catch (error) {
            throw new Error(error);
        }
    }

    async function fetchLatestCurrencyValue(currency){
        try{
            console.log("Fetching data....");
            if(currency === undefined || currency === "" || currency === null)
                currency = "USD";
            const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${currency}`;
            const response = await fetch(url);
            const data = response.json();

            return data;
        }
        catch(error){
            throw new Error(error);
        }
    }
});