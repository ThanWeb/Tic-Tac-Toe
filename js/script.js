window.addEventListener("load", function(){
    const sessionStorageKey = "PLAYERS_TURN";
    const preGameDiv = document.querySelector(".pre-game");
    sessionStorage.removeItem(sessionStorageKey);
    preGameDiv.classList.remove("hidden");
    console.clear();
});

const player = ["circle", "cross"];
const startButton = document.getElementById("start");
const sessionStorageKey = "PLAYERS_TURN";
const message = document.querySelector(".congratulationsStatement");
let boxes = document.querySelectorAll(".box");
let index = 0;
let gameOver = 0;

startButton.addEventListener("click", function(){
    document.querySelector(".pre-game").classList.add("hidden");
});

for(let i = 0; i < boxes.length; i++){
    boxes[i].addEventListener("click", function(){
        if(gameOver == 0){
            message.innerText = ". . .";
            if(boxes[i].innerText == "O" || boxes[i].innerText == "X"){
                message.innerText = "Choose Another Box";
            }
            else{
                boxes[i].style.color = "black";
                if(index % 2 == 0)
                    boxes[i].innerText = "O";
                else
                    boxes[i].innerText = "X";
                
                index++;
                turnsCheck(index);
                boxes[i].style.color= "white";
                boxes[i].classList.toggle("closed");
            }

            if(getResult() == 1){
                if(index % 2 == 0)
                    message.innerText = "Player 2 Menang";
                else
                    message.innerText = "Player 1 Menang";
                message.classList.remove("congratulationsStatement");
                gameOver = 1;
            }
            if(getResult() == 0 && index >= 9){
                message.innerText = "Permainan Imbang";
                message.classList.remove("congratulationsStatement");
                gameOver = 1;
            }
        }        
    });
}

function getResult(){
    // Horizontal
    if(boxes[0].innerText == boxes[1].innerText && boxes[1].innerText == boxes[2].innerText){
        drawLine(1);
        return 1;
    }
    else if(boxes[3].innerText == boxes[4].innerText && boxes[4].innerText == boxes[5].innerText){
        drawLine(2);
        return 1;
    }
    else if(boxes[6].innerText == boxes[7].innerText && boxes[7].innerText == boxes[8].innerText){
        drawLine(3);
        return 1;
    }

    // Vertical
    else if(boxes[0].innerText == boxes[3].innerText && boxes[3].innerText == boxes[6].innerText){
        drawLine(4);
        return 1;
    }
    else if(boxes[1].innerText == boxes[4].innerText && boxes[4].innerText == boxes[7].innerText){
        drawLine(5);
        return 1;
    }
    else if(boxes[2].innerText == boxes[5].innerText && boxes[5].innerText == boxes[8].innerText){
        drawLine(6);
        return 1;
    }

    // Diagonal
    else if(boxes[0].innerText == boxes[4].innerText && boxes[4].innerText == boxes[8].innerText){
        drawLine(7);
        return 1;
    }
    else if(boxes[2].innerText == boxes[4].innerText && boxes[4].innerText == boxes[6].innerText){
        drawLine(8);
        return 1;
    }
    return 0;
}

function turnsCheck(x){
    const sessionStorageKey = "PLAYERS_TURN";
    if(typeof(Storage) !== "undefined"){
        if (sessionStorage.getItem(sessionStorageKey) === null)
            sessionStorage.setItem(sessionStorageKey, 1);
        else
            sessionStorage.setItem(sessionStorageKey, x);
    }else
        alert("Browser yang Anda gunakan tidak mendukung Web Storage");
}

function drawLine(id){
    switch (id) {
        case 1:
            boxes[0].classList.add("horizontal");
            boxes[1].classList.add("horizontal");
            boxes[2].classList.add("horizontal");
            break;

        case 2:
            boxes[3].classList.add("horizontal");
            boxes[4].classList.add("horizontal");
            boxes[5].classList.add("horizontal");
            break;

        case 3:
            boxes[6].classList.add("horizontal");
            boxes[7].classList.add("horizontal");
            boxes[8].classList.add("horizontal");
            break;
    
        case 4:
            boxes[0].classList.add("vertical");
            boxes[3].classList.add("vertical");
            boxes[6].classList.add("vertical");           
            break;

        case 5:
            boxes[1].classList.add("vertical");
            boxes[4].classList.add("vertical");
            boxes[7].classList.add("vertical");           
            break;

        case 6:
            boxes[2].classList.add("vertical");
            boxes[5].classList.add("vertical");
            boxes[8].classList.add("vertical");           
            break;

        case 7:
            boxes[0].classList.add("diagonal-left");
            boxes[4].classList.add("diagonal-left");
            boxes[8].classList.add("diagonal-left");
            break;

        case 8:
            boxes[2].classList.add("diagonal-right");
            boxes[4].classList.add("diagonal-right");
            boxes[6].classList.add("diagonal-right");            
            break;

        default:
            break;
    }
}

restart.addEventListener("click", function(){
    let sessionStorageKey = "PLAYERS_TURN";
    sessionStorage.removeItem(sessionStorageKey);

    let boxes = document.querySelectorAll(".box");
    for(i = 0; i < boxes.length; i++){
        boxes[i].classList.add("closed");
        boxes[i].classList.remove("horizontal", "vertical", "diagonal-left", "diagonal-right");
        boxes[i].innerText = i + 1;
        boxes[i].style.color = "var(--darkblue)";
    }

    const message = document.querySelector(".message");
    message.classList.add("congratulationsStatement");
    message.innerText = "...";
    gameOver = 0;
    index = 0;
    console.clear();
});
