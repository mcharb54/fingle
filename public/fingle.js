let round = 1;
let npcNumber;
let npcFingers;
let userSelectedFingers = [];

function updateRoundInfo(userGuess) {
    const roundInfo = document.getElementById("roundInfo");
    if (round === 1) {
        roundInfo.style.display = "block";
        roundInfo.innerText = "Round 1: How many fingers am I holding up?";
    } else
        if (round === 2) {
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

function selectRound1Number(number) {
    const buttons = document.querySelectorAll("#round1 button:not(#submitGuess)");
    buttons.forEach((button, index) => {
        if (index + 1 === number) {
            button.classList.add("pressed");
        } else {
            button.classList.remove("pressed");
        }
    });
    round1SelectedNumber = number;
}

function submitGuess() {
    const result = document.getElementById("result");
    generateNPCFingers();

    if (round === 1) {
        if (round1SelectedNumber === npcNumber) {
            round = 2;
            updateRoundInfo(round1SelectedNumber);
            document.getElementById("round1").style.display = "none";
            document.getElementById("round2").style.display = "block";
            document.getElementById("welcome").style.display = "none"; // Hide welcome info
        } else {
            result.innerText = `Wrong! The correct answer was ${npcNumber}: (${npcFingers.join(", ")}).`;
            document.getElementById("welcome").style.display = "none"; // Hide welcome info
            document.getElementById("round1").style.display = "none"; // Hide the round 1 div
            document.getElementById("roundInfo").style.display = "none"; // Hide roundInfo
            document.getElementById("gameOver").style.display = "block";
        }
    }
}


function submitFingerSelection() {
    const result = document.getElementById("result");
    userSelectedFingers.sort();
    npcFingers.sort();

    document.getElementById("roundInfo").style.display = "none"; // Hide round info after guess

    if (arraysEqual(npcFingers, userSelectedFingers)) {
        document.getElementById("round2").style.display = "none"; // Hide the round 2 div
        document.getElementById("winningMessage").style.display = "block"; // Show winning message
    } else {
        result.innerText = `Wrong! The correct answer was ${npcNumber}: (${npcFingers.join(", ")}).`;
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
    // Existing reset code
  
    // Remove 'pressed' class from Round 1 buttons
    const round1Buttons = document.querySelectorAll("#round1 button");
    round1Buttons.forEach((button) => {
      button.classList.remove("pressed");
    });
  
    // Remove 'pressed' class from Round 2 buttons
    const round2Buttons = document.querySelectorAll("#round2 button");
    round2Buttons.forEach((button) => {
      button.classList.remove("pressed");
    });
  
    // Reset round1SelectedNumber
    round1SelectedNumber = null;
  }

function resetGame() {
    round = 1;
    userSelectedFingers = [];
    generateNPCNumber();
    updateRoundInfo();
    document.getElementById("welcome").style.display = "block";
    document.getElementById("round1").style.display = "block";
    // Remove 'pressed' class from Round 1 buttons
    const round1Buttons = document.querySelectorAll("#round1 button");
    round1Buttons.forEach((button) => {
        button.classList.remove("pressed");
    });
    document.getElementById("round2").style.display = "none";
    // Remove 'pressed' class from Round 2 buttons
    const round2Buttons = document.querySelectorAll("#round2 button");
    round2Buttons.forEach((button) => {
        button.classList.remove("pressed");
    });
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("winningMessage").style.display = "none"; // Hide winning message
    document.getElementById("result").innerText = "";
    document.getElementById("userGuess").value = "";
    document.getElementById("welcome").style.display = "block"; // Show welcome info
    // Reset round1SelectedNumber
    round1SelectedNumber = null;

    const fingerButtons = document.querySelectorAll("#round2 button");
    for (const button of fingerButtons) {
        button.classList.remove("pressed");
    }
}


function arraysEqual(a, b) {
    // Sort the arrays
    a.sort();
    b.sort();
  
    // Check if both arrays have the same length and values in the same order
    return a.length === b.length && a.every((val, index) => val === b[index]);
  }
  
generateNPCNumber();
updateRoundInfo();
