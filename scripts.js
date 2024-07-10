const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition =[
    [0,1,2],
    [3,4,5],
    [8,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer= "X";
    gameGrid = ["","" ,"" ,"" ,"" ,"" ,"" ,"" ,""];
    // when a new game is started and this function is called again then we have to reset the whole game and set the whole game empty
    boxes.forEach((box,index) => {
        box.innerText="";
        boxes[index].style.pointerEvents ="all";
        // to remove the green clr after winning and new game'
        box.classList = `box box${index+1}`;
    });
    
    newGamebtn.classList.remove("active");
    // fetching the vlue of current value
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box,index)=> {
    box.addEventListener("click" ,() =>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer; 
        // game grid is the inner logic for the grid of game and boxes is the ui representaion of the game where we are actually setting 
        // the values of X or Y..
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();

        // check if anyone has won or not
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer= "0";
    }
    else{
        currentPlayer = "X";
    }
    // ui update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// function to check if game is over or not
function checkGameOver(){
    let answer= "";
    winningPosition.forEach((position) => {
       if((gameGrid[position[0]]!=="" && gameGrid[position[1]] !=="" && gameGrid[position[2]] !== "") &&
        (gameGrid[position[0]]== gameGrid[position[1]] && gameGrid[position[1]] == gameGrid[position[2]])) {
            
            // check who the winner is
            if(gameGrid[position[0]] == "X"){
                answer = "X";
            }
            else{
                answer = "0";
            }
            // now to stop the game at this point we have to remove pointer events 
            boxes.forEach((box,index)=>{
                box.style.pointerEvents ="none";
            })

            // now we know who the winner is therefore we need to add green colour in the background
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            newGamebtn.classList.add("active");
       }
    });

    // if we have a  winner now 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGamebtn.classList.add("active");
    }
}

newGamebtn.addEventListener("click" , initGame);
