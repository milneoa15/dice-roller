document.addEventListener("DOMContentLoaded", () => {
    const diceCountInput = document.getElementById("dice-count");
    const diceSidesInput = document.getElementById("dice-sides");
    const rollButton = document.querySelector('[data-action="roll"]');
    const resetButton = document.querySelector('[data-action="reset"]');
    const player1Container = document.getElementById("player1-dice");
    const player2Container = document.getElementById("player2-dice");
    const player1Total = document.getElementById("player1-total");
    const player2Total = document.getElementById("player2-total");
    const resultMessage = document.getElementById("result-message");

    const DEFAULT_COUNT = 2;
    const DEFAULT_SIDES = 6;

    function clampValue(input) {
        const min = Number(input.min) || 0;
        const max = Number(input.max) || Infinity;
        let value = Number(input.value);

        if (Number.isNaN(value)) {
            value = min || 1;
        }

        value = Math.min(Math.max(value, min), max);
        input.value = value;
        return value;
    }

    function rollDie(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    function rollDiceSet(count, sides) {
        return Array.from({ length: count }, () => rollDie(sides));
    }

    function renderDice(container, values, sides) {
        container.innerHTML = "";

        values.forEach((value) => {
            const die = document.createElement("div");
            die.className = "die";
            die.setAttribute("aria-label", `${value} rolled on a ${sides}-sided die`);

            const dieValue = document.createElement("span");
            dieValue.className = "die__value";
            dieValue.textContent = value;

            die.appendChild(dieValue);
            container.appendChild(die);
        });
    }

    function sum(values) {
        return values.reduce((total, value) => total + value, 0);
    }

    function displayWinner(total1, total2) {
        if (total1 > total2) {
            resultMessage.textContent = "Player 1 takes the win!";
        } else if (total2 > total1) {
            resultMessage.textContent = "Player 2 triumphs!";
        } else {
            resultMessage.textContent = "It's a draw!";
        }
    }

    function performRoll() {
        const diceCount = clampValue(diceCountInput);
        const diceSides = clampValue(diceSidesInput);

        const player1Rolls = rollDiceSet(diceCount, diceSides);
        const player2Rolls = rollDiceSet(diceCount, diceSides);

        renderDice(player1Container, player1Rolls, diceSides);
        renderDice(player2Container, player2Rolls, diceSides);

        const total1 = sum(player1Rolls);
        const total2 = sum(player2Rolls);

        player1Total.textContent = total1;
        player2Total.textContent = total2;

        displayWinner(total1, total2);
    }

    function renderPlaceholder() {
        renderDice(player1Container, Array(DEFAULT_COUNT).fill("?"), DEFAULT_SIDES);
        renderDice(player2Container, Array(DEFAULT_COUNT).fill("?"), DEFAULT_SIDES);
        player1Total.textContent = 0;
        player2Total.textContent = 0;
        resultMessage.textContent = "Roll the dice to begin the duel.";
    }

    function reset() {
        diceCountInput.value = DEFAULT_COUNT;
        diceSidesInput.value = DEFAULT_SIDES;
        renderPlaceholder();
    }

    rollButton.addEventListener("click", performRoll);
    resetButton.addEventListener("click", reset);

    renderPlaceholder();
});
