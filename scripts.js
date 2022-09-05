//global variables
let active_player = 'x';
let gameType = 'pvp'

const createBoard = function () {
    const boardWrapper = document.getElementById('game_board');
    for (let j = 0; j < 3; j++){
        let k = 3 * j;
        let game_row = document.createElement('div');
        game_row.classList.add('game_row');
        game_row.setAttribute('id', `row${j}`);

        for (let i = 0; i < 3; i++){
            let game_square = document.createElement('div');
            game_square.classList.add('game_square');
            game_square.setAttribute('id', `square${i + k}`);
            game_row.appendChild(game_square);
        }

        boardWrapper.appendChild(game_row);
    }
};

// add click event to squares to turn them into X
const addListeners = function () {
    //click listeners
    let game_squares = document.querySelectorAll('.game_square');
    for (let i = 0; i < game_squares.length; i++){
        game_squares[i].addEventListener('click', gameBoard.markBoard);
    };

    //switch listener
    let newGameBtn = document.getElementById('newgame_btn');
    newGameBtn.addEventListener('click', switchGame)

};

// switch game between PvP and PvC

const switchGame = function () {
    let radio_pvp = document.querySelector('#select_pvp');
    let p2Label = document.getElementById('p2_label')
    if (radio_pvp.checked) {
        p2Label.innerText = 'Player 2';
        gameType = 'pvp';
    } else {
        p2Label.innerText = 'Computer';
        gameType = 'pvc';
    };
};

//building out module to map gameboard (not currently working 9/4)
let gameBoard = function () {
    //init variables
    let marker = '';
    let colIndex = '';
    let rowIndex = '';
    let boardArray = new Array(3);
    for (let i = 0; i < boardArray.length; i++) {
        boardArray[i] = new Array(3);
    };

    const checkWinner = function () {
        //check horizontal winner
        for (let i = 0; i < 3; i++){
            if (boardArray[i][0] === active_player && 
                boardArray[i][1] === active_player &&
                boardArray[i][2] === active_player){
                console.log(`${active_player} wins in row ${i}`);
            }
        }
        
        //check vertical winner
        for (let i = 0; i < 3; i++){
            if (boardArray[0][i] === active_player && 
                boardArray[1][i] === active_player &&
                boardArray[2][i] === active_player){
                console.log(`${active_player} wins in column ${i}`);
            }
        }

        //check top left to bottom right diagonal winner
        if (boardArray[0][0] === active_player && 
            boardArray[1][1] === active_player &&
            boardArray[2][2] === active_player){
            console.log(`${active_player} wins in diagonal top left to bot right`);
        }

        //check top right to bottom left diagonal winner
        if (boardArray[2][0] === active_player && 
            boardArray[1][1] === active_player &&
            boardArray[0][2] === active_player){
            console.log(`${active_player} wins in diagonal bot left to top right`);
        }
    };

    const markBoard = function (e) {
        marker = document.createElement('img');
        if (active_player === 'x'){
            //marking piece in dom
            marker.setAttribute('src', 'Assets/x_icon.svg');
    
            //marking piece in board array
            colIndex = [...e.target.parentElement.children].indexOf(e.target);
            rowIndex = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement);
            boardArray[rowIndex][colIndex] = active_player;
            checkWinner();
            active_player = 'o';
        } else {
            //marking piece in dom
            marker.setAttribute('src', 'Assets/o_icon.svg');

            //marking piece in board array
            colIndex = [...e.target.parentElement.children].indexOf(e.target);
            rowIndex = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement);
            boardArray[rowIndex][colIndex] = active_player;
            checkWinner();
            active_player = 'x';
        }
        e.target.appendChild(marker);
    };

    return {
        markBoard
    };
}();


// todo:
// build out header interface (PvP & PvC)
// build out objects for each square (adjacent squares and direction)
// check for winner
// build gameover logic
// build computer logic
// make it so markers can't be placed twice in the same square
// disable gametype switching midgame







createBoard();
addListeners();
