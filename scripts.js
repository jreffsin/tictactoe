//next step: make gameboard responsive while maintaining aspect ratio

//global variables
let active_player = 'x';

const populateBoard = function () {
    const game_board = document.getElementById('game_board');
    for (let i = 0; i < 9; i++){
        let game_square = document.createElement('div');
        game_square.classList.add('game_square');
        game_square.setAttribute('id', `square${i}`);
        game_board.appendChild(game_square);
    }
};

// adds X to gameboard
const addX = function (e) {
    let marker = document.createElement('img');
    if (active_player === 'x'){
        marker.setAttribute('src', 'Assets/x_icon.svg');
        active_player = 'o';
    } else {
        marker.setAttribute('src', 'Assets/o_icon.svg');
        active_player = 'x';
    }
    marker.setAttribute('width', '100px');
    e.target.appendChild(marker);
    console.log('something');
};

// add click event to squares to turn them into X
const addClickListeners = function () {
    let game_squares = document.querySelectorAll('.game_square');

    for (let i = 0; i < game_squares.length; i++){
        game_squares[i].addEventListener('click', addX);
    };
};

// function that determines last placed piece and changes next game piece
// computer logic






populateBoard();
addClickListeners();
