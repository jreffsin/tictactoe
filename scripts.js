//next step: make gameboard responsive while maintaining aspect ratio

const populateBoard = function () {
    const game_board = document.getElementById('game_board');
    for (let i = 0; i < 9; i++){
        let game_square = document.createElement('div');
        game_square.classList.add('game_square');
        game_square.setAttribute('id', `square${i}`);
        game_board.appendChild(game_square);
    }
};








populateBoard();

