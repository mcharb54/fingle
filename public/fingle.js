let round = 1;
let npcNumber;
let npcFingers;
let userSelectedFingers = [];

function updateRoundInfo(userGuess) {
    const roundInfo = document.getElementById("roundInfo");
    if (round === 1) {
        roundInfo.style.display = "block";
        roundInfo.innerText = "Round 1: How many fingers am I holding up?";
    } else if (round === 2) {
        roundInfo.style.display = "block";
        roundInfo.innerText = `Correct! The answer was ${userGuess}. \n Which fingers am I holding up?`;
    }
    else if (round === 3) {
        roundInfo.style.display = "none";
    }
}

function generateNPCNumber() {
    npcNumber = Math.floor(Math.random() * 5) + 1;
}

function generateNPCFingers() {
    const fingers = ["Thumb", "Index", "Middle", "Ring", "Pinky"];
    npcFingers = [];
    for (let i = 0; i < npcNumber; i++) {
        const randomIndex = Math.floor(Math.random() * fingers.length);
        npcFingers.push(fingers.splice(randomIndex, 1)[0]);
    }
}

function submitGuess() {
    const userGuess = document.getElementById("userGuess").value;
    const result = document.getElementById("result");

    if (round === 1) {
        if (parseInt(userGuess) === npcNumber) {
            round = 2;
            updateRoundInfo(userGuess);
            generateNPCFingers();
            document.getElementById("round1").style.display = "none";
            document.getElementById("round2").style.display = "block";
            document.getElementById("welcome").style.display = "none"; // Hide welcome info
        } else {
            document.getElementById("round1").style.display = "none"; // Hide the round 1 div
            document.getElementById("roundInfo").style.display = "none";
            document.getElementById("gameOver").style.display = "block";
            document.getElementById("welcome").style.display = "none"; // Hide welcome info
        }
    }
}

function submitFingerSelection() {
    const result = document.getElementById("result");
    userSelectedFingers.sort();
    npcFingers.sort();

    if (arraysEqual(npcFingers, userSelectedFingers)) {
        result.innerText = "Congratulations! You win!";
    } else {
        result.innerText = `Wrong! The correct finger combination was ${npcFingers.join(", ")}.`;
        document.getElementById("round2").style.display = "none"; // Hide the round 2 div
        document.getElementById("gameOver").style.display = "block";
    }
}


function toggleFinger(finger) {
    const button = document.getElementById(finger.toLowerCase());
    if (userSelectedFingers.includes(finger)) {
        userSelectedFingers = userSelectedFingers.filter(f => f !== finger);
        button.classList.remove("pressed");
    } else {
        userSelectedFingers.push(finger);
        button.classList.add("pressed");
    }
}

function resetGame() {
    round = 1;
    userSelectedFingers = [];
    generateNPCNumber();
    updateRoundInfo();
    document.getElementById("round1").style.display = "block";
    document.getElementById("round2").style.display = "none";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("result").innerText = "";
    document.getElementById("userGuess").value = "";
    document.getElementById("welcome").style.display = "block"; // Show welcome info

    const fingerButtons = document.querySelectorAll("#round2 button");
    for (const button of fingerButtons) {
        button.classList.remove("pressed");
    }
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

generateNPCNumber();
updateRoundInfo();
