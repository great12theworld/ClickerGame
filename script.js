let clicks = 0;

function ClickCounter() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
}


function ChangeClicker() {
    var x = document.getElementById("myDIV");
    if (x.innerHTML === "Hello") {
        x.innerHTML = "Swapped text!";
    } else {
        x.innerHTML = "Hello";
    }
}