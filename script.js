let totalPercentAddition = 1; //for multiplier upgrades, this is the total percent increase to clicks per click, starts at 1 for 100% of base clicks per click

let clicks = 1000; //total click count right now

let cps = 0;//clicks per second, 

//  let clickMultiplier = 1; //multiplier for clicks per click, starts at 1 for 100% of base clicks per click, increased by multiplier upgrades

let clickLevel = 1; // clicks per click. Upgraded with clickUpgrade
let clickUpgradeClick = 0;
let clickUpgradePrice = 100;

let clickerUpgrade = 0; //indicative of base upgrade count
let clickerUpgrade1Price = 10; //indicative of price for next upgrade, grows per upgrade

let clickerUpgrade2 = 0; //indicative of upgrade2 count
let clickerUpgrade2Price = 75; //indicative of price for next upgrade, grows per upgrade

let clickerUpgrade3 = 0; //indicative of upgrade3 count
let clickerUpgrade3Price = 200; //indicative of price for next upgrade, grows per upgrade

let clickerUpgrade4 = 0; //indicative of upgrade4 count
let clickerUpgrade4Price = 500; //indicative of price for next upgrade, grows per upgrade

let enhancements = {
    e1: false,
    e2: false
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function updateUI() {
    const clicksEl = document.getElementById("clicks");
    if (clicksEl) clicksEl.innerHTML = Math.round(clicks).toLocaleString() + " Clicks per second: " + Math.round(cps * 100).toLocaleString();
    const up1 = document.getElementById("clickerUpgrade");
    if (up1) up1.innerHTML = "Price: " + clickerUpgrade1Price.toLocaleString() + " Count: " + clickerUpgrade;
    const up2 = document.getElementById("clickerUpgrade2");
    if (up2) up2.innerHTML = "Price: " + clickerUpgrade2Price.toLocaleString() + " Count: " + clickerUpgrade2;
    const up3 = document.getElementById("clickerUpgrade3");
    if (up3) up3.innerHTML = "Price: " + clickerUpgrade3Price.toLocaleString() + " Count: " + clickerUpgrade3;
    const up4 = document.getElementById("clickerUpgrade4");
    if (up4) up4.innerHTML = "Price: " + clickerUpgrade4Price.toLocaleString() + " Count: " + clickerUpgrade4;
    const clickUp = document.getElementById("clickUpgrade");
    if (clickUp) clickUp.innerHTML = "Price: " + clickUpgradePrice.toLocaleString() + " Level: " + clickLevel;
    const autoMult = document.getElementById("enhancement1");
    if (autoMult && enhancements.e1) {
        autoMult.innerHTML = "Bought!";
    }
    const autoMult2 = document.getElementById("enhancement2");
    if (autoMult2 && enhancements.e2) {
        autoMult2.innerHTML = "Bought!";
    }
}



setInterval(() => { //cps but it's in milliseconds so that it feels better on the eyes, and for the gameplay aspect of it
    
    cps = 0; //reset cps so that it can be recalculated based on upgrades every millisecond
    cps += clickerUpgrade * (.5/100);
    cps += clickerUpgrade2 * (5/100);
    cps += clickerUpgrade3 * (25/1000);
    cps += clickerUpgrade4 * (125/100);
    cps *= totalPercentAddition; //multiplier upgrades increase cps by increasing the multiplier that cps is multiplied by, so this is where the multiplier upgrades take effect
    clicks += cps;
    updateUI();
}, 1);// more efficient to run this once every millisecond then it is to
//have like two billion async functions running at once :sob:


function exponentialPriceGrowth(itemgrowingprice, exponent) {
    return Math.floor(Math.pow((itemgrowingprice * 1.5), exponent));
}

// basic counting for clicker
function ClickCounter() {
    clicks = clicks + clickLevel;
    updateUI();
}

function clickUpgrade(){ //code for changing clicks per click.
    if (clicks >= clickUpgradePrice) {
        clicks -= clickUpgradePrice;
        clickUpgradePrice = exponentialPriceGrowth(clickUpgradePrice, 1.15);
        
        clickLevel = clickLevel * 2; // Increase clicks per click
        updateUI();
    }
}

function buyEnhancement1(){ //increases all clicks by 10%
    if (enhancements.e1){
        return; // Enhancement already bought, do nothing
    } else if (clicks >= 750) {
        clicks -= 750;
        enhancements.e1 = true;
        totalPercentAddition += 0.2; // Increase total percent addition by 10%
        updateUI();
    }
}

function buyEnhancement2(){ //increases all clicks by 25%
    if (enhancements.e2){
        return; // Enhancement already bought, do nothing
    } else {
    addEnhancementPercent(5000, 0.25, "e2");
    }
}

function addEnhancementPercent(price, percentincrease, enhancementBoughtVariable) { //generic function for buying multiplier upgrades, takes in price, percent increase, and variable to check if enhancement is bought
    if (clicks >= price) {
        clicks -= price;
        enhancements[enhancementBoughtVariable] = true;
        totalPercentAddition += percentincrease; 
        updateUI();
    }
}

function addClicker() { //upgrade 1,    this adds the aysnc function to run in bg, also increases price and updates count
    if (clicks >= clickerUpgrade1Price) {
        clicks -= clickerUpgrade1Price;
        clickerUpgrade += 1;
        clickerUpgrade1Price = exponentialPriceGrowth(clickerUpgrade1Price, 1.1); // Increase price for next upgrade
        updateUI();
        // updateClickCountUpgrade1(); runs the clicker made in the background
    }
}

function addClicker2(){ //upgrade 2, Mouse Spam
    if (clicks >= clickerUpgrade2Price) {
        clicks -= clickerUpgrade2Price;
        clickerUpgrade2 += 1;
        clickerUpgrade2Price = exponentialPriceGrowth(clickerUpgrade2Price, 1.1);
        updateUI();
        // updateClickCountUpgrade2();
    }
}

function addClicker3(){ //upgrade 3, Mouse Spam
    if (clicks >= clickerUpgrade3Price) {
        clicks -= clickerUpgrade3Price;
        clickerUpgrade3 += 1;
        clickerUpgrade3Price = exponentialPriceGrowth(clickerUpgrade3Price, 1.1);
        updateUI();
        // updateClickCountUpgrade3();
    }
}

function addClicker4(){ //upgrade 4, Mouse Spam
    if (clicks >= clickerUpgrade4Price) {
        clicks -= clickerUpgrade4Price;
        clickerUpgrade4 += 1;
        clickerUpgrade4Price = exponentialPriceGrowth(clickerUpgrade4Price, 1.1);
        updateUI();
        // updateClickCountUpgrade4();
    }
}

function changeBackgroundCustom() {
    let customColor = prompt("Enter a custom color (e.g., 'purple' or '#800080'):");
    document.body.style.backgroundColor = customColor;
    updateUI();
}

updateUI();




