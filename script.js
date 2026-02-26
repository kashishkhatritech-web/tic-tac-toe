let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let currentPlayer = "O";
let gameActive = true;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Handle Box Click
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || !gameActive) return;

    box.innerText = currentPlayer;

    checkWinner();
    currentPlayer = currentPlayer === "O" ? "X" : "O";
  });
});

// Check Winner
function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return;
    }
  }

  checkDraw();
}

// Show Winner
function showWinner(winner) {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  gameActive = false;
}

// Check Draw
function checkDraw() {
  let allFilled = true;

  boxes.forEach((box) => {
    if (box.innerText === "") {
      allFilled = false;
    }
  });

  if (allFilled) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    gameActive = false;
  }
}

// Reset Game
function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
  });

  currentPlayer = "O";
  gameActive = true;
  msgContainer.classList.add("hide");
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);