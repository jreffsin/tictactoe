//global variables
let active_player = 'x';
let gameType = 'pvp'

const createBoard = function () {
    const game_board = document.getElementById('game_board');
    for (let i = 0; i < 9; i++){
        let game_square = document.createElement('div');
        game_square.classList.add('game_square');
        game_square.setAttribute('id', `square${i}`);
        game_board.appendChild(game_square);
    }
};

// adds marker to gameboard
const markBoard = function (e) {
    let marker = document.createElement('img');
    if (active_player === 'x'){
        marker.setAttribute('src', 'Assets/x_icon.svg');
        active_player = 'o';
    } else {
        marker.setAttribute('src', 'Assets/o_icon.svg');
        active_player = 'x';
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


// todo:
// build out header interface (PvP & PvC)
// check for winner
// build gameover logic
// build computer logic
// make it so markers can't be placed twice in the same square
// disable gametype switching midgame







createBoard();
addListeners();
