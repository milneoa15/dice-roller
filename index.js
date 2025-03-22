
function onRoll (dicer) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    dicer.innerHTML = "";

    for (var i=0; i<randomNumber; i++) {
        dicer.innerHTML += "<div class='stretchy'><div class='dot'></div></div>"
    }

    dicer.classList.remove(dicer.classList[2]);
    dicer.classList.add("dice-"+randomNumber);
}

function onRoller () {
    onRoll (document.querySelector(".p1"));
    onRoll (document.querySelector(".p2"));
}