let clicks = 0; //total click count right now


let clickLevel = 1; //indicative of amount of clicks per second

let clickerUpgrade = 0; //indicative of base upgrade count
let clickerUpgrade1Price = 10; //indicative of price for next upgrade, grows per upgrade


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// basic counting for base multiplicative clicker
function ClickCounter() {
    clicks += clickLevel;
    document.getElementById("clicks").innerHTML = clicks;
}

function exponentialPriceGrowth(itemgrowingprice, exponent) {
    return Math.floor(Math.pow((itemgrowingprice * 1.5), exponent));
}

function addClicker() {
    if (clicks >= clickerUpgrade1Price) {
        clicks -= clickerUpgrade1Price;
        clickerUpgrade += 1;
        document.getElementById("clickerUpgrade").innerHTML = clickerUpgrade;
        clickerUpgrade1Price = exponentialPriceGrowth(clickerUpgrade1Price, 1.15); // Increase price for next upgrade
        updateClickCountUpgrade1(); // runs the clicker made in the background
    }
}

async function updateClickCountUpgrade1() {
    await sleep(5000);
    clicks += 1
}


async function ChangeClicker() {
    var x = document.getElementById("myDIV");
    if (x.innerHTML === "Hello") {
        x.innerHTML = "Swapped text!";
    } else {
        x.innerHTML = "Hello";
    }
}