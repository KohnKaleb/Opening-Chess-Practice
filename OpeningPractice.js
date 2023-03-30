// moves for computer to play in format of [from, to]
var copyCatMovesWhite = [['e2','e4'], ['b1','Nc3'], ['Bf1','Bc4'], ['Qd1','Qg4']];
var copyCatMovesBlack = [['e7', 'e5'],['Nb8', 'Nc6'], ['Bf8','Bc5']];
var viennaGamitMovesWhite = [['e2','e4'], ['Nb1','Nc3'], ['f2','f4'],['f4','e5'],['Ng1','Nf3']];
var viennaGamitMovesBlack = [['e7','e5'], ['Ng8','Nf6'], ['d7','d5'], ['Nf6','e4']];
var advanceCaroKannMovesWhite = [['e2','e4'], ['d2','d4'], ['e4','e5'], ['Ng1','Nf3']];
var advanceCaroKannMovesBlack = [['c7','c6'], ['d7','d5'], ['Bc8','Bf5'], ['e7','e6']];
var exchangeCaroKannMovesWhite = [['e2','e4'], ['d2','d4'], ['e4','d5'], ['Bf1','Bd3'], ['c2','c3']];
var exchangeCaroKannMovesBlack = [['c7','c6'], ['d7','d5'],  ['c6','d5'],  ['Nb8','Nc6'], ['Ng8','Nf6']];
var moves = [];
var fenList = [];
var playingWhite = true;
var moveCount = 0;

// fen to check if user correctly played next move
var copyCatFenWhite = ['rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    'rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2',
    'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR b KQkq - 3 3',
    'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P1Q1/2N5/PPPP1PPP/R1B1K1NR b KQkq - 5 4'
];
var copyCatFenBlack = ['rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
    'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3',
    'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR w KQkq - 4 4',
];
var viennaGamitFenWhite = ['rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    'rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2',
    'rnbqkb1r/pppp1ppp/5n2/4p3/4PP2/2N5/PPPP2PP/R1BQKBNR b KQkq f3 0 3',
    'rnbqkb1r/ppp2ppp/5n2/3pP3/4P3/2N5/PPPP2PP/R1BQKBNR b KQkq - 0 4',
    'rnbqkb1r/ppp2ppp/8/3pP3/4n3/2N2N2/PPPP2PP/R1BQKB1R b KQkq - 1 5'
];
var viennaGamitFenBlack = ['rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
    'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3',
    'rnbqkb1r/ppp2ppp/5n2/3pp3/4PP2/2N5/PPPP2PP/R1BQKBNR w KQkq d6 0 4',
    'rnbqkb1r/ppp2ppp/8/3pP3/4n3/2N5/PPPP2PP/R1BQKBNR w KQkq - 0 5'
];
var advanceCaroKannFenWhite = ['rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    'rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2',
    'rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
    'rn1qkbnr/pp2pppp/2p5/3pPb2/3P4/5N2/PPP2PPP/RNBQKB1R b KQkq - 2 4'
];
var advanceCaroKannFenBlack = ['rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3',
    'rn1qkbnr/pp2pppp/2p5/3pPb2/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 1 4',
    'rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 5'
];
var exchangeCaroKannFenWhite = ['rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    'rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2',
    'rnbqkbnr/pp2pppp/2p5/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
    'rnbqkbnr/pp2pppp/8/3p4/3P4/3B4/PPP2PPP/RNBQK1NR b KQkq - 1 4',
    'r1bqkbnr/pp2pppp/2n5/3p4/3P4/2PB4/PP3PPP/RNBQK1NR b KQkq - 0 5'
];
var exchangeCaroKannFenBlack = ['rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3',
    'rnbqkbnr/pp2pppp/8/3p4/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4',
    'r1bqkbnr/pp2pppp/2n5/3p4/3P4/3B4/PPP2PPP/RNBQK1NR w KQkq - 2 5',
    'r1bqkb1r/pp2pppp/2n2n2/3p4/3P4/2PB4/PP3PPP/RNBQK1NR w KQkq - 1 6'
];

var abChess = {};

var options = {
    animated: false
};

// basic chessboard setup
abChess = new AbChess("chessboard", options);
abChess.setFEN();

// reset pieces on the board
document.getElementById("newGame").onclick = function newGame() {
    abChess.reset();
    abChess.setFEN();
    moves = [];
    fenList = [];
    moveCount = 0;
}

// flip the board
document.getElementById("flipBoard").onclick = function flipBoard() {
    abChess.flip();
    playingWhite = !playingWhite;
}

// start the game
document.getElementById("start").onclick = function start() {
    let opening = document.getElementById("opening").value;

    if (opening == "none") {
        alert("Please select an opening");
        return;
    }

    moves = setMoves(opening);
    fenList = setFen(opening);

    if (!playingWhite) {
        abChess.play(moves[0][0], moves[0][1]);
        ++moveCount;
        moves.shift();
    }
}

// give hint to next move
document.getElementById("hint").onclick = function hint() {

}

// set the fen list for selected opening
function setFen(opening) {
    let fen = [];
    switch (opening) {
        case "copyCat":
            if (playingWhite) {
                fen = copyCatFenWhite;
            } else {
                fen = copyCatFenBlack;
            }
            break;
        case "viennaGamit":
            if (playingWhite) {
                fen = viennaGamitFenWhite;
            } else {
                fen = viennaGamitFenBlack;
            }
            break;
        case "advanceCaroKann":
            if (playingWhite) {
                fen = advanceCaroKannFenWhite;
            } else {
                fen = advanceCaroKannFenBlack;
            }
            break;
        case "exchangeCaroKann":
            if (playingWhite) {
                fen = exchangeCaroKannFenWhite;
            } else {
                fen = exchangeCaroKannFenBlack;
            }
            break;
    }
    return fen;
}

// set the moves for the selected opening
function setMoves(opening) {
    let moves = [];
    switch (opening) {
        case "copyCat":
            if (playingWhite) {
                moves = copyCatMovesBlack;
            } else {
                moves = copyCatMovesWhite;
            }
            break;
        case "viennaGamit":
            if (playingWhite) {
                moves = viennaGamitMovesBlack;
            } else {
                moves = viennaGamitMovesWhite;
            }
            break;
        case "advanceCaroKann":
            if (playingWhite) {
                moves = advanceCaroKannMovesBlack;
            } else {
                moves = advanceCaroKannMovesWhite;
            }
            break;
        case "exchangeCaroKann":
            if (playingWhite) {
                moves = exchangeCaroKannMovesBlack;
            } else {
                moves = exchangeCaroKannMovesWhite;
            }
            break;
    }
    return moves;
}

function checkFEN(fenList) { 
    let fen = abChess.getFEN(moveCount);
    if (fen == fenList[0]) {
        return true;
    }
    return false;
}

function nextStep() {
    ++moveCount;
    let currentFen = abChess.getFEN(moveCount);
    if (currentFen == fenList[0]) {
        abChess.play(moves[0][0], moves[0][1]);
        ++moveCount;
        moves.shift();
        fenList.shift();
        return;
    } else {
        alert("Wrong move! Try again.");
        abChess.setFEN(pastFEN);
    }
}

abChess.onMovePlayed(nextStep);