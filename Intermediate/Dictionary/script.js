

document.addEventListener("DOMContentLoaded" , () => {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const resultHolder = document.getElementById("result");

    searchBtn.addEventListener('click', e => {
        console.log(`Searching for a word...`);
        displayResult();
    });

    async function displayResult(){
        const word = searchInput.value.trim();

        const result = await fetchDictionaryResult(word);
        console.log(`Displaying data: ${result.status}`);
        resultHolder.innerHtml = "";
        if(result.status == 404){
            console.log(`No word found: ${result.data.message}`);
            resultHolder.innerHTML =
            `
                <span>${result.data.message}</span>
            `;

            return;
        }

        let element = 
        `
            <h2>${result.data.word}</h2>
            <span>${result.data.phonetic} - ${result.data.meanings[0].partOfSpeech}</span>
            <ul>
        `

        result.data.meanings[0].definitions.forEach(word => {
            element += `<li>${word.definition}</li>`
        });

        element += 
        `
            </ul>
            <p class="synonyms">Synonmys: ${result.data.meanings[0].synonyms}</p>
            <p class="antonyms">Antonyms: ${result.data.meanings[0].antonyms.length <= 0 ? "none" : result.data.meanings[0].antonyms }</p>
        `

        resultHolder.innerHTML = element;
    }

    async function fetchDictionaryResult(word){
        try {
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            return {
                status: response.status,
                data: response.status == 200 ? data[0] : data
            };
        } catch (error) {   
            throw new Error(error);
        }
    }
})