let buttons = document.querySelectorAll(".box");
let btn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer =  document.querySelector(".msg-container");
let msg =  document.querySelector("#msg");

let turnO = true; //playerX , playerO
let count = 0;

const winPatterns = [ [0,1,2],
                       [3,4,5],
                       [6,7,8],
                       [0,3,6],
                       [1,4,7],
                       [2,5,8],
                       [0,4,8],
                       [2,4,6]
                    ];

const resetGame = () => {
        turnO = true;
        count = 0;
        enableButtons();
        msgContainer.classList.add("hide");
        msg.innerHTML = ""; 
};

buttons.forEach((box) => {
    box.addEventListener("click", () =>{
        
        if (turnO) {
            box.innerHTML = "O";
             box.style.color = "red";
            turnO = false;
         }
         else{
            box.innerHTML = "X";
            box.style.color = "green";
            turnO = true;
         }
         box.disabled = true;
         count++;

         let isWinner= checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerHTML = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableButtons();
};


const disableButtons = () => {
    for (let button of buttons) {
        button.disabled = true;
    }
};


const enableButtons = () => {
    for (let button of buttons) {
        button.disabled = false;
        button.innerHTML = "";
    }
};

const showWinner = (winner) => {
     msg.innerHTML = `Congratulations🥳Winner is ${winner}`;
     msgContainer.classList.remove("hide");
     disableButtons();
};

const checkWinner = () =>{
    for (let pattern of winPatterns){
       
        let post1val = buttons[pattern[0]].innerText;
        let post2val = buttons[pattern[1]].innerText;
        let post3val = buttons[pattern[2]].innerText;
       
        if(post1val !="" && post2val != "" && post3val !=""){
            if(post1val === post2val && post2val === post3val){
                showWinner(post1val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
btn.addEventListener("click", resetGame);
