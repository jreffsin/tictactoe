//global variables
let active_player = 'x';
let gameType = 'pvp'

const createBoard = function () {
    const game_board = document.getElementById('game_board');
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

        game_board.appendChild(game_row);
    }
};

// adds marker to gameboard
const markBoard = function (e) {
    let marker = document.createElement('img');
    if (active_player === 'x'){
        marker.setAttribute('src', 'Assets/x_icon.svg');
        active_player = 'o';

        //testing something here
        let brett = [...e.target.parentElement.children].indexOf(e.target);
        console.log(brett);

    } else {
        marker.setAttribute('src', 'Assets/o_icon.svg');
        active_player = 'x';

        //testing something here
        let brett = [...e.target.parentElement.children].indexOf(e.target);
        console.log(brett);
    }
    e.target.appendChild(marker);
};

// add click event to squares to turn them into X
const addListeners = function () {
    //click listeners
    let game_squares = document.querySelectorAll('.game_square');
    for (let i = 0; i < game_squares.length; i++){
        game_squares[i].addEventListener('click', markBoard);
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
let boardArray = new Array(3);

for (let i = 0; i < boardArray.length; i++) {
    boardArray[i] = new Array(3);
};

//working on building out board array
//I can index the divs of the gameboard elements from the codes snippets at 22-24 & 30-32

//but I want to make the divs into two dimensional arrays which probably means that I need to
//rework how I create the divs in the create board function (need 3 rows of 3 divs each I think)

//this rework would also require redoing some css

//ultimate goal would be for the function to be able to get exact coordinates for the row and column
//just from pulling index of the div elements
//then I can use those two indeces to loop through a board array and check for winners
//accross rows, columns, and diagonals

//lot of work but it's a better way to set it up I think and keeps things more general


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
