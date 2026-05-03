let clicks = 0; //total click count right now

let clickLevel = 1; // clicks per click. Upgraded with clickUpgrade
let clickUpgradeClick = 0;
let clickUpgradePrice = 100;

let clickerUpgrade = 0; //indicative of base upgrade count
let clickerUpgrade1Price = 10; //indicative of price for next upgrade, grows per upgrade

let clickerUpgrade2 = 0; //indicative of upgrade2 count
let clickerUpgrade2Price = 75; //indicative of price for next upgrade, grows per upgrade

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function updateUI() {
    const clicksEl = document.getElementById("clicks");
    if (clicksEl) clicksEl.innerHTML = Math.round(clicks);
    const up1 = document.getElementById("clickerUpgrade");
    if (up1) up1.innerHTML = "Price: " + clickerUpgrade1Price + " Count: " + clickerUpgrade;
    const up2 = document.getElementById("clickerUpgrade2");
    if (up2) up2.innerHTML = "Price: " + clickerUpgrade2Price + " Count: " + clickerUpgrade2;
    const clickUp = document.getElementById("clickUpgrade");
    if (clickUp) clickUp.innerHTML = "Price: " + clickUpgradePrice + " Level: " + clickLevel;
}

// basic counting for clicker
async function ClickCounter() {
    clicks = clicks + clickLevel;
    updateUI();
}

function exponentialPriceGrowth(itemgrowingprice, exponent) {
    return Math.floor(Math.pow((itemgrowingprice * 1.5), exponent));
}

function clickUpgrade(){ //code for changing clicks per click.
    if (clicks >= clickUpgradePrice) {
        clicks -= clickUpgradePrice;
        clickUpgradePrice = exponentialPriceGrowth(clickUpgradePrice, 1.1);
        
        clickLevel += 1; // Increase clicks per click
        updateUI();
    }
}


function addClicker() { //upgrade 1,    this adds the aysnc function to run in bg, also increases price and updates count
    if (clicks >= clickerUpgrade1Price) {
        clicks -= clickerUpgrade1Price;
        clickerUpgrade += 1;
        clickerUpgrade1Price = exponentialPriceGrowth(clickerUpgrade1Price, 1.1); // Increase price for next upgrade
        updateUI();
        updateClickCountUpgrade1(); // runs the clicker made in the background
    }
}

function addClicker2(){ //upgrade 2, Mouse Spam
    if (clicks >= clickerUpgrade2Price) {
        clicks -= clickerUpgrade2Price;
        clickerUpgrade2 += 1;
        clickerUpgrade2Price = exponentialPriceGrowth(clickerUpgrade2Price, 1.1);
        updateUI();
        updateClickCountUpgrade2();
    }
}

async function updateClickCountUpgrade2() {
    while (true) {
        await sleep(100);
        clicks += 0.5;
        updateUI();
    }
    
}


async function updateClickCountUpgrade1() {
    while (true) {
        await sleep(1000);
        clicks += 1;
        updateUI();
    }
    
}

function changeBackgroundCustom() {
    let customColor = prompt("Enter a custom color (e.g., 'purple' or '#800080'):");
    document.body.style.backgroundColor = customColor;
    updateUI();
}

updateUI();