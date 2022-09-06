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

    //newgame listener
    let newGameBtn = document.getElementById('newgame_btn');
    newGameBtn.addEventListener('click', newGame)

};

const newGame = function () {
    let radio_pvp = document.querySelector('#select_pvp');
    let p2Label = document.getElementById('p2_label')
    if (radio_pvp.checked) {
        p2Label.innerText = 'Player 2';
        gameType = 'pvp';
    } else {
        p2Label.innerText = 'Computer';
        gameType = 'pvc';
    };

    //remove markers 
    const clearBoard = function () {
        //remove winner lines
        if (document.querySelector('.diagonalLeftTop')){
            const drawnLine = document.getElementsByClassName('diagonalLeftTop');
            drawnLine[0].parentNode.removeChild(drawnLine[0]);
        } else if (document.querySelector('.diagonalLeftBot')) {
            const drawnLine = document.getElementsByClassName('diagonalLeftBot');
            drawnLine[0].parentNode.removeChild(drawnLine[0]);
        } else if (document.querySelector('.horizontalLine')) {
            const drawnLine = document.getElementsByClassName('horizontalLine');
            drawnLine[0].parentNode.removeChild(drawnLine[0]);
        } else if (document.querySelector('.verticalLine')) {
            const drawnLine = document.getElementsByClassName('verticalLine');
            drawnLine[0].parentNode.removeChild(drawnLine[0]);
        }

        //remove markers
        let listOfGameSquares = document.getElementsByClassName('game_square');
        for (let i = 0; i < listOfGameSquares.length; i++) {
            if (listOfGameSquares[i].hasChildNodes()) {
                listOfGameSquares[i].removeChild(listOfGameSquares[i].lastChild);
            };
        };
        //need to also clear board array here
    };

    clearBoard();
    //remove winner highlight
    //add listeners back to squares
};

//gameboard object
let gameBoard = function () {
    //init variables
    let marker = '';
    let colIndex = '';
    let rowIndex = '';
    let boardArray = new Array(3);
    for (let i = 0; i < boardArray.length; i++) {
        boardArray[i] = new Array(3);
    };

    const drawDiagonalLine = function (leftStart) {
            if (leftStart === 'bot'){
                let diagBotLeftTopRight = document.createElement('div');
                diagBotLeftTopRight.classList.add('diagonalLeftBot');
                document.getElementById('game_board').appendChild(diagBotLeftTopRight);
            } else {
                let diagBotLeftTopRight = document.createElement('div');
                diagBotLeftTopRight.classList.add('diagonalLeftTop');
                document.getElementById('game_board').appendChild(diagBotLeftTopRight);
            }
    };
    
    const drawHorizontalLine = function (i) {
        let horizontalLine = document.createElement('div');
        horizontalLine.classList.add('horizontalLine');
        document.getElementById(`row${i}`).appendChild(horizontalLine);
    }

    const drawVerticalLine = function (i) {
        let verticalLine = document.createElement('div');
        verticalLine.classList.add('verticalLine');
        document.getElementById(`square${i}`).appendChild(verticalLine);
    }

    const highlightWinner = function () {
        if (active_player === 'x') {
            document.getElementById('player1').classList.add('win_border');
        } else {
            document.getElementById('player2').classList.add('win_border');
        };
    };

    const removeGameSquareListeners = function () {
        let game_squares = document.querySelectorAll('.game_square');
            for (let i = 0; i < game_squares.length; i++){
                game_squares[i].removeEventListener('click', markBoard);
            };
    }


    const checkWinner = function () {
        //check horizontal winner
        for (let i = 0; i < 3; i++){
            if (boardArray[i][0] === active_player && 
                boardArray[i][1] === active_player &&
                boardArray[i][2] === active_player){
                removeGameSquareListeners();
                drawHorizontalLine(i);
                highlightWinner();

            }
        }
        
        //check vertical winner
        for (let i = 0; i < 3; i++){
            if (boardArray[0][i] === active_player && 
                boardArray[1][i] === active_player &&
                boardArray[2][i] === active_player){
                removeGameSquareListeners();
                drawVerticalLine(i);
                highlightWinner();
            }
        }

        //check top left to bottom right diagonal winner
        if (boardArray[0][0] === active_player && 
            boardArray[1][1] === active_player &&
            boardArray[2][2] === active_player){
            removeGameSquareListeners();
            drawDiagonalLine('top');
            highlightWinner();
        }

        //check top right to bottom left diagonal winner
        if (boardArray[2][0] === active_player && 
            boardArray[1][1] === active_player &&
            boardArray[0][2] === active_player){
            removeGameSquareListeners();
            drawDiagonalLine('bot');
            highlightWinner();
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
// make clear markers function also clear board array as well

// build gameover logic
// Call out winner and end game in check winner function

// build out header interface (PvP & PvC)
// build computer logic
// make it so markers can't be placed twice in the same square
// disable gametype switching midgame







createBoard();
addListeners();
