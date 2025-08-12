let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let newGameBtn = document.querySelector(".newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameHide = document.querySelector(".newGame");

let turn0 = false;

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Step 8 Enabled all the Button, Remove text, and make color default(White)

const enableAllBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "white";
  }
  msgContainer.classList.add("hide"); //enable hide css again after reset
  newGameHide.classList.add("newGameHide"); //enable newGameHide css again after reset
};

//Step 7

const resetFunction = () => {
  //Set turn0 as same like it started
  turn0 = false;
  enableAllBtn();
};

//Step 10

const enableNewGame = () => {
  newGameBtn.addEventListener("click", resetFunction);
};

//Step 9 New Game Button

const showNewGameBtn = () => {
  newGameHide.classList.remove("newGameHide");
  enableNewGame();
};

//Step 6 Reset  Game Btn

resetBtn.addEventListener("click", resetFunction);

//Step 5

//Disabled all Button after getting winner

const disableAllBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

//Step 4

//Show Winner

const showWinner = (position1) => {
  msg.innerText = `Congratulations the Winner is Player  ${position1}`;
  msgContainer.classList.remove("hide");
  disableAllBtn();
  showNewGameBtn();
};

//Step 3

//Check winning pattern match or not
const checkWinner = () => {
  for (let pattern of winningPattern) {
    // Pattern ma 1 iteration ma 0 postion wala array [[0,1,2] []] aa jayega then 1 inde

    let position1 = boxes[pattern[0]].innerText; // pattern[0]--> yh ek number dega, box[]-->uss number wala box ka val store kr lega
    let position2 = boxes[pattern[1]].innerText;
    let position3 = boxes[pattern[2]].innerText;

    if (position1 != "" && position2 != "" && position3 != "") {
      if (position1 == position2 && position2 == position3) {
        //Show Winner
        showWinner(position1);
      }
    }
  }

  //If loop finishes without finding winner, check for draw

  let isDraw = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    msg.innerText = `Match Draw`;
    msgContainer.classList.remove("hide");
    disableAllBtn();
    showNewGameBtn();
  }
};

//Step 2

//Mark symbol on the button

function makeMark(box) {
  if (turn0) {
    // Turn of 0
    box.innerText = "0";
    box.style.backgroundColor = "#4CAF50"; // greenish-blue
    turn0 = false;
  } else {
    // Turn of X
    box.innerText = "X";
    box.style.backgroundColor = "#FF5252"; // bright red
    turn0 = true;
  }
  box.disabled = true;
  checkWinner();
}

// Step 1

boxes.forEach((box) => {
  box.addEventListener("click", () => makeMark(box));
});
