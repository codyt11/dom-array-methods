const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch a random user
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

//add new object to data arr
function addData(obj){
    data.push(obj);

    updateDOM();
}

//Update DOM
function updateDOM(providedData = data){
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//format money as function
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//sort by richest
function sortByRichest(){
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

//double money
function doubleMoney(){
    data = data.map((user) => {
        return { ...user, money: user.money * 2 }
    });
    updateDOM();
}

//show millionaires
function showmillionaires(){
    data = data.filter(user => user.money >= 1000000);
    
    updateDOM();
}

//total wealth
function totalWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    // document.body.contains(document.getElementById('wealthEl')
    
    const wealthEl = document.createElement('div');
    wealthEl.setAttribute('id', 'wealthTotal');
    wealthEl.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    if(document.getElementById('wealthTotal')){
        null;
    }else{
        main.appendChild(wealthEl);
    }
}

//event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showmillionaires);
calculateWealthBtn.addEventListener('click', totalWealth);