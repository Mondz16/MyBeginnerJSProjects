
let finance = JSON.parse(localStorage.getItem('finance')) || [];

document.addEventListener("DOMContentLoaded", () => {
    const totalExpense = document.getElementById("expense-total");
    const totalIncome = document.getElementById("income-total");
    const title = document.getElementById("title");
    const source = document.getElementById("source");
    const amount = document.getElementById("amount");
    const note = document.getElementById("note");
    const addButton = document.getElementById("add-button");
    const financeHolder = document.getElementById("finance-holder");
    const errorMessage = document.getElementById("error-message");

    renderFinances();

    addButton.addEventListener('click', (e) => {
        addFinance();
    });

    function renderFinances(){
        financeHolder.innerHTML = "";
        finance.forEach(item => {
            console.log(item);
            
            const newItem = document.createElement("li");
            newItem.setAttribute("data-id", item.id);
            newItem.innerHTML =
            `
                <span class="${item.category}">${item.title} - ${item.amount}</span>
                <p>${item.note}</p>
                <button>Delete</button>
            `;

            newItem.querySelector('button').addEventListener('click', e => {
                removeFinance();
                newItem.remove();
            });

            financeHolder.append(newItem);
        });

        totalExpense.textContent = `$${getTotal('Expense').toFixed(2)}`;
        totalIncome.textContent = `$${getTotal('Income').toFixed(2)}`;
    }

    function addFinance(){
        if(title.value === "" || amount.value === "" || amount.value <= 0){
            errorMessage.classList.remove("hidden");
            if(amount.value <= 0){
                errorMessage.textContent = "The amount must be greater than 0!";
            }
            else{
                errorMessage.textContent = "You must fill in all the fields!";
            }   
            setTimeout(() => {
                errorMessage.classList.add("hidden");
            }, 3000);
            return;
        }

        errorMessage.classList.add("hidden");
        const newFinance = {
            id: Date.now(),
            title: title.value,
            category: source.options[source.selectedIndex].text,
            amount: amount.value,
            note: note.value
        }

        finance.push(newFinance);
        saveFinance();
        renderFinances();
        console.log(`Added new finance: ${newFinance}`);
    }

    function removeFinance(id){
        finance = finance.filter(x => x.id == id);
        saveFinance();
    }

    function getTotal(category){
        let filteredFinance = finance.filter(x => x.category === category);
        let total = 0;
        filteredFinance.forEach(item => {
            total += parseFloat(item.amount);
        })
        console.log(`Get Total ${category} = ${total}`);
        return total;
    }

    function saveFinance(){
        localStorage.setItem('finance', JSON.stringify(finance));
    }
});