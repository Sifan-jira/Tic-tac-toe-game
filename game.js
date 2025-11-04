
const container = document.querySelector(".container");
const displayTurn = document.querySelector(".turn-display");
const btn = document.querySelectorAll('.click-btn');
const resetBtn = document.querySelector('.reset-btn');

 displayTurn.textContent = 'The Current turn: X';
//the UI dom manipulation
container.addEventListener('click', (e) => {
    const indexNum= e.target.dataset.index;
    //prevent the click outside of button
    if(indexNum == undefined) return;

    const index = +indexNum;
    const result = gameBoard.makeMove(index);

    const stateBoard = gameBoard.getBoard();
    //update the clicked button
    btn[index].textContent= stateBoard[index];
    btn[index].style.pointerEvents = 'none';

    if(result.status === 'invalid'){
        console.log('the cell already taken');
        return;
    }
    // add class to the display
    displayTurn.className = `turn-display ${result.currentPlayer}-turn`;
    // handle the game score
    if(result.status === 'win'){
       displayTurn.textContent= `Congratulation! ${result.winner} is the winner`;
       disableAllBtn();
    } else if(result.status === 'draw'){
       displayTurn.textContent= `It's draw`;
       disableAllBtn();
    } else if(result.status === 'playing'){
        displayTurn.textContent= `The Current turn: ${result.currentPlayer}`;
    } 
    
});
// prevent all button from clicked
const disableAllBtn = ()=> {
    btn.forEach(button => {
        button.style.pointerEvents = 'none';
    });
}

//reset button
resetBtn.addEventListener('click', ()=> {
    console.log("this reset is clicked")
    gameBoard.resetGame();
    btn.forEach(button => {
        button.textContent = '';
        button.style.pointerEvents = 'auto';
    });
    displayTurn.textContent = 'The current turn: X';
})




// separate the logic of the game from the dom
const gameBoard = (() =>{
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = 'X';
    const getBoard = () => {
        return board;
    } 

    // display the board in in console log
    let printBoard = () =>{
        console.log(`
                     ${board[0]} | ${board[1]} | ${board[2]}
                     ---------
                     ${board[3]} | ${board[4]} | ${board[5]}
                     ---------
                     ${board[6]} | ${board[7]} | ${board[8]}
                `);
    }

    //place mark
    const makeMove = (index) => {
     
    //check if the board is occupied
    if (board[index] !== ""){
        
        return{status:'invalid'};
    }
    board[index] = currentPlayer;

    //check the wins
    if(checkWin()){
        printBoard();
        return{status:'win', winner:currentPlayer};
    }

    // check if all board cell is full
    if(isBoardFull()){
        printBoard();
        return {status:'draw'};
    }
   // switch the players
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    printBoard();
    return{status:'playing', currentPlayer};

}

//check win function
const checkWin = ()=>{
    let winPattern = [
        [0,1,2], [3,4,5], [6,7,8],  //rows
        [0,3,6], [1,4,7], [2,5,8],  // columns
        [0,4,8], [2,4,6]
    ]
    return winPattern.some((pattern) => {
        const [a,b,c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    })
}

const isBoardFull = ()=> {
   return board.every(cell =>cell !== "")
}

const resetGame = ()=> {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 'X';
    console.log('all is cleared');
}

    return{
        getBoard,
        makeMove,
        printBoard,
        resetGame
    }
})();






