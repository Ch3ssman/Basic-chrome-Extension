let myLeads = []
const inputEl = document.querySelector("#input-el")
const inputButton = document.querySelector("#button-el");
const ulEl = document.querySelector("#ul-el"); 
const resetEl = document.querySelector("#reset-el");
const tabEl = document.querySelector("#tabbtn-el")

const myLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(myLocalStorage)
if (myLocalStorage) {
    myLeads = myLocalStorage;
    renderLeads(myLeads)
}

tabEl.addEventListener("click", function() {
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

resetEl.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    ulEl.innerHTML = "";
})

inputButton.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = '';
    myLeads = JSON.stringify(myLeads);
    localStorage.setItem("myLeads", myLeads);
    myLeads = JSON.parse(myLeads);
    renderLeads(myLeads);
})

function renderLeads(leads) {
    let listItems = '';
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a> </li>";
        // Use back ticks ` to help convert to html and ${} to fill the javascript = template literals/strings
        listItems += `
        <li> 
            <a href="${leads[i]}" target="_blank">${leads[i]}</a>
        </li>
        `
    console.log(listItems)
    ulEl.innerHTML = listItems;
    }
}