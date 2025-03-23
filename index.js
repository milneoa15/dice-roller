
function displayWinner (p1, p2) {
    var title = document.querySelector("h1");

    if (p1 == 0) {
        title.innerHTML = "Dice Simulator";
    } else if (p1 > p2) {
        title.innerHTML = "Player 1 Wins!";
    } else if (p2 > p1) {
        title.innerHTML = "Player 2 Wins!";
    } else {
        title.innerHTML = "It's a Draw!";
    }
}

function changeDice (dicer, randomNumber) {
    dicer.innerHTML = "";

    for (var i=0; i<randomNumber; i++) {
        dicer.innerHTML += "<div class='stretchy'><div class='dot'></div></div>"
    }

    dicer.classList.remove(dicer.classList[2]);
    dicer.classList.add("dice-"+randomNumber);
}

function onRoll (dicer) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    changeDice (dicer, randomNumber);

    return randomNumber;
}

function onRoller () {
    p1 = onRoll (document.querySelector(".p1"));
    p2 = onRoll (document.querySelector(".p2"));

    displayWinner (p1, p2);
}

function resetPage () {
    changeDice (document.querySelector(".p1"), 1);
    changeDice (document.querySelector(".p2"), 1);

    displayWinner (0, 0);
}