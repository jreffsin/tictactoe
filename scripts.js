//init global variables
let active_player = 'x';
let gameType = 'pvp'
let compTurn = 0;

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

const listeners = function () {
    //click listeners
    const addGameSquareListeners = function () {
        let game_squares = document.querySelectorAll('.game_square');
        for (let i = 0; i < game_squares.length; i++){
            game_squares[i].addEventListener('click', gameBoard.markBoard);
        };
    };

    //newgame listener
    const addNewBtnListener = function () {
        let newGameBtn = document.getElementById('newgame_btn');
        newGameBtn.addEventListener('click', newGame)
    };

    return {
        addGameSquareListeners,
        addNewBtnListener
    }
} ();

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
    gameBoard.clearBoard();

    //add listeners back to squares
    listeners.addGameSquareListeners();

    //remove highlight from winner
    if (active_player === 'o') {
        document.getElementById('player1').classList.remove('win_border');
    } else {
        document.getElementById('player2').classList.remove('win_border');
    };

    //reset globals
    active_player = 'x'
    compTurn = 0;
};

let gameBoard = function () {
    //init variables
    let marker = '';
    let colIndex = '';
    let rowIndex = '';
    let boardArray = [];

    const initBoardArray = function () {
        boardArray = new Array(3);
        for (let i = 0; i < 3; i++) {
            boardArray[i] = new Array(3);
            for (let j = 0; j < 3; j++){
                boardArray[i][j] = '-'
            }
        };
    };

    initBoardArray();

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

    const checkCompWin = function () {
        let winChecker = '';
        let won = false;

        //check rows for winning move
        if (won == false){
            for (let i = 0; i < 3; i++){
                winChecker = '';
                for (let j = 0; j < 3; j++){
                    winChecker += boardArray[i][j]
                }
                if (winChecker == 'oo-'){
                    markCompMove(i,2);
                    won = true;
                    break
                } else if (winChecker == 'o-o'){
                    markCompMove(i,1);
                    won = true;
                    break
                } else if (winChecker == '-oo'){
                    markCompMove(i,0);
                    won = true;
                    break
                }
            }
        }

        //check columns for blocking move
        if (won == false){
            for (let i = 0; i < 3; i++){
                winChecker = '';
                for (let j = 0; j < 3; j++){
                    winChecker += boardArray[j][i]
                }
                if (winChecker == 'oo-'){
                    markCompMove(2,i);
                    won = true;
                    break
                } else if (winChecker == 'o-o'){
                    markCompMove(1,i);
                    won = true;
                    break
                } else if (winChecker == '-oo'){
                    markCompMove(0,i);
                    won = true;
                    break
                }
            }
        }

        //check diagonals for blocking move
        if (won == false){
            winChecker = '';

            for (let i = 0; i < 3; i++){
                winChecker += boardArray[i][i];
            }
                if (winChecker == 'oo-'){
                    markCompMove(2,2);
                    won = true;
                } else if (winChecker == 'o-o'){
                    markCompMove(1,1);
                    won = true;
                } else if (winChecker == '-oo'){
                    markCompMove(0,0);
                    won = true;
                }
        }

        if (won == false){
            winChecker = '';
            
            for (let i = 0; i < 3; i++){
                winChecker += boardArray[2-i][i];
            }
                if (winChecker == 'oo-'){
                    markCompMove(0,2);
                    won = true;
                } else if (winChecker == 'o-o'){
                    markCompMove(1,1);
                    won = true;
                } else if (winChecker == '-oo'){
                    markCompMove(2,0);
                    won = true;
                }
        }

        //if no winner placed, proceed to checking for block
        if (won == false){
            checkCompBlock();
        };
    };

    const checkCompBlock = function () {
        let blockChecker = '';
        let blocked = false;

        //check rows for blocking move
        if (blocked == false){
            for (let i = 0; i < 3; i++){
                blockChecker = '';
                for (let j = 0; j < 3; j++){
                    blockChecker += boardArray[i][j]
                }
                if (blockChecker == 'xx-'){
                    markCompMove(i,2);
                    blocked = true;
                    break
                } else if (blockChecker == 'x-x'){
                    markCompMove(i,1);
                    blocked = true;
                    break
                } else if (blockChecker == '-xx'){
                    markCompMove(i,0);
                    blocked = true;
                    break
                }
            }
        }

        //check columns for blocking move
        if (blocked == false){
            for (let i = 0; i < 3; i++){
                blockChecker = '';
                for (let j = 0; j < 3; j++){
                    blockChecker += boardArray[j][i]
                }
                if (blockChecker == 'xx-'){
                    markCompMove(2,i);
                    blocked = true;
                    break
                } else if (blockChecker == 'x-x'){
                    markCompMove(1,i);
                    blocked = true;
                    break
                } else if (blockChecker == '-xx'){
                    markCompMove(0,i);
                    blocked = true;
                    break
                }
            }
        }

        //check diagonals for blocking move
        if (blocked == false){
            blockChecker = '';

            for (let i = 0; i < 3; i++){
                blockChecker += boardArray[i][i];
            }
                if (blockChecker == 'xx-'){
                    markCompMove(2,2);
                    blocked = true;
                } else if (blockChecker == 'x-x'){
                    markCompMove(1,1);
                    blocked = true;
                } else if (blockChecker == '-xx'){
                    markCompMove(0,0);
                    blocked = true;
                }
        }

        if (blocked == false){
            blockChecker = '';
            
            for (let i = 0; i < 3; i++){
                blockChecker += boardArray[2-i][i];
            }
                if (blockChecker == 'xx-'){
                    markCompMove(0,2);
                    blocked = true;
                } else if (blockChecker == 'x-x'){
                    markCompMove(1,1);
                    blocked = true;
                } else if (blockChecker == '-xx'){
                    markCompMove(2,0);
                    blocked = true;
                }
        }

        // on turn 2 if no block exists take edgecase moves
        if (blocked == false && compTurn === 2){
            turnTwoCompMoves();
        }
    };

    const turnTwoCompMoves = function () {
        let markerNotPlaced = true;
        let emptyRow = 3;
        let emptyColumn = 3;

        // if human has taken opposite corners, take random edge
        if ((boardArray[0][0] == 'x' && boardArray[2][2] == 'x') ||
                (boardArray[0][2] == 'x' && boardArray[2][0] == 'x')){
                let num1 = Math.floor(Math.random() * 4);
                if (num1 == 0){
                    markCompMove(0,1);
                } 
                else if (num1 == 1){
                    markCompMove(1,0);
                }
                else if (num1 == 2){
                    markCompMove(1,2);
                }
                else {
                    markCompMove(2,1);
                }
        }
        // else if human has taken corner and non-adjacent edge, take edge in empty row or column
        else {
            let emptyCheck = '';

            //if empty row exists place in middle of row
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++){
                    emptyCheck += boardArray[i][j];
                }
                if (emptyCheck == 'xox'){
                    let num1 = Math.floor(Math.random() * 2) * 2;
                    let num2 = Math.floor(Math.random() * 2) * 2;
                    markCompMove(2 - num1,2 - num2);
                    markerNotPlaced = false;
                }
                else if (emptyCheck == '---'){
                    emptyRow = i
                } 
                emptyCheck = '';
            }
            if (markerNotPlaced && emptyRow != 3) {
                markCompMove(emptyRow,1)
            }

            //if empty column exists place in middle of column
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++){
                    emptyCheck += boardArray[j][i];
                }
                if (emptyCheck == 'xox'){
                    let num1 = Math.floor(Math.random() * 2) * 2;
                    let num2 = Math.floor(Math.random() * 2) * 2;
                    markCompMove(2 - num1,2 - num2);
                    markerNotPlaced = false;
                }
                else if (emptyCheck == '---'){
                    emptyColumn = i
                } 
                emptyCheck = '';
            }
            if (markerNotPlaced && emptyColumn != 3) {
                markCompMove(1,emptyColumn)
            }

        }

    };

    const markCompMove = function (x, y) {
        //mark dom
        let marker = document.createElement('img');
        marker.setAttribute('src', 'Assets/o_icon.svg');
        document.querySelector(`#row${x} :nth-child(${y + 1})`).appendChild(marker);

        //mark move in boardArray
        boardArray[x][y] = 'o';
        checkWinner();
        active_player = 'x';
    }

    const takeCompTurn = function () {

        // turn 1
        if (compTurn === 1) {

            // if human non-center start, take center
            // else take random corner
            if (boardArray[1][1] != 'x'){
                markCompMove(1,1);
            } else {
                let num1 = Math.floor(Math.random() * 2) * 2;
                let num2 = Math.floor(Math.random() * 2) * 2;
                markCompMove(2 - num1,2 - num2);
            }
        }

        // turns after 1
        if (compTurn > 1) {
            checkCompWin();
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
            boardArray[rowIndex][colIndex] = 'x';
            checkWinner();
            active_player = 'o';
            compTurn++;
        } else {
            //marking piece in dom
            marker.setAttribute('src', 'Assets/o_icon.svg');

            //marking piece in board array
            colIndex = [...e.target.parentElement.children].indexOf(e.target);
            rowIndex = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement);
            boardArray[rowIndex][colIndex] = 'o';
            checkWinner();
            active_player = 'x';
        }
        e.target.appendChild(marker);
        
        //take computer turn if relevant
        if (gameType === 'pvc') {
            takeCompTurn();
        };

        //need to remove listener from marked square in dom
    };

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

        //remove markers from dom
        let listOfGameSquares = document.getElementsByClassName('game_square');
        for (let i = 0; i < listOfGameSquares.length; i++) {
            if (listOfGameSquares[i].hasChildNodes()) {
                listOfGameSquares[i].removeChild(listOfGameSquares[i].lastChild);
            };
        };

        //remove markers from boardArray
        initBoardArray();

        //remove listeners from all game squares
        removeGameSquareListeners();
    };

    return {
        markBoard,
        clearBoard,
        checkWinner,
        boardArray,
        // initBoardArray
    };
}();

createBoard();
listeners.addGameSquareListeners();
listeners.addNewBtnListener();

// todo:
// build out turn 3 and turn 4 edge case moves

// build gameover logic
// Call out winner and end game in check winner function

// build out header interface (PvP & PvC)
// build computer logic
// make it so markers can't be placed twice in the same square
// disable gametype switching midgame
