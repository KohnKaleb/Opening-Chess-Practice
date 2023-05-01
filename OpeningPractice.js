// moves for computer to play in format of [from, to]
var copyCatMovesWhite = [['e2','e4'], ['b1','c3'], ['f1','c4'], ['d1','g4']];
var copyCatMovesBlack = [['e7', 'e5'],['b8', 'c6'], ['f8','c5']];
var viennaGamitMovesWhite = [['e2','e4'], ['b1','c3'], ['f2','f4'],['f4','e5'],['g1','f3']];
var viennaGamitMovesBlack = [['e7','e5'], ['g8','f6'], ['d7','d5'], ['f6','e4']];
var advanceCaroKannMovesWhite = [['e2','e4'], ['d2','d4'], ['e4','e5'], ['g1','f3']];
var advanceCaroKannMovesBlack = [['c7','c6'], ['d7','d5'], ['c8','f5'], ['e7','e6']];
var exchangeCaroKannMovesWhite = [['e2','e4'], ['d2','d4'], ['e4','d5'], ['f1','d3'], ['c2','c3']];
var exchangeCaroKannMovesBlack = [['c7','c6'], ['d7','d5'],  ['c6','d5'],  ['b8','c6'], ['g8','f6']];
var moves = [];
var movesForHint = [];
var hasGameStarted = false;
var fenList = [];
var playingWhite = true;
var  pastFen = '';
var pastPGN = '';
var modal = document.getElementById("wrongGuessModal");
var noOpeningModal = document.getElementById("noOpeningModal");
// nessesary for getFEN method to work
var moveCount = 0;
var computerMove = false


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
    // set game back to starting state
    window.location.reload();
}

// flip the board
document.getElementById("flipBoard").onclick = function flipBoard() {
    abChess.flip();
    playingWhite = !playingWhite;
    computerMove = !computerMove;
}

// close the wrong guess modal
document.getElementById("tryAgain").onclick = function close() {
    modal.style.display = "none";
    window.location.reload();
}

// close the no opening modal
document.getElementById("ok").onclick = function ok() {
    noOpeningModal.style.display = "none";
    window.location.reload();
}

// start the game
document.getElementById("start").onclick = function start() {
    let opening = document.getElementById("opening").value;
    hasGameStarted = true;

    if (opening == "none") {
        alert("Please select an opening");
        return;
    }

    moves = setMoves(opening);
    movesForHint = setMovesForHint(opening);
    fenList = setFen(opening);

    if (!playingWhite) {
        computerMove = true;
        abChess.play(moves[0][0], moves[0][1]);
        playAudio("/sounds/move.mp3");
        ++moveCount;
        moves.shift();
    }
}

// give hint to next move
document.getElementById("hint").onclick = function hint() {
    alert("One of your pieces needs to go to the " + movesForHint[0][1] + " square");
}

/**
 * set the fen list for selected opening
 */
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
        case "viennaGambit":
            if (playingWhite) {
                fen = viennaGamitFenWhite;
            } else {
                fen = viennaGamitFenBlack;
            }
            break;
        case "advanceVariation":
            if (playingWhite) {
                fen = advanceCaroKannFenWhite;
            } else {
                fen = advanceCaroKannFenBlack;
            }
            break;
        case "exchangeVariation":
            if (playingWhite) {
                fen = exchangeCaroKannFenWhite;
            } else {
                fen = exchangeCaroKannFenBlack;
            }
            break;
    }
    return fen;
}

/**
 * sets moves for opening based on users input
 * 
 * @param {*} opening opening user selected to play
 * @returns a list of opening moves for the selected opening
 */
function setMovesForHint(opening) {
    let movesCopy = [];
    switch (opening) {
        case "copyCat":
            if (playingWhite) {
                movesCopy = copyCatMovesWhite;
            } else {
                movesCopy = copyCatMovesBlack;
            }
            break;
        case "viennaGambit":
            if (playingWhite) {
                movesCopy = viennaGamitMovesWhite;
            } else {
                movesCopy = viennaGamitMovesBlack;
            }
            break;
        case "advanceVariation":
            if (playingWhite) {
                movesCopy = advanceCaroKannMovesWhite;
            } else {
                movesCopy = advanceCaroKannMovesBlack;
            }
            break;
        case "exchangeVariation":
            if (playingWhite) {
                movesCopy = exchangeCaroKannMovesWhite;
            } else {
                movesCopy = exchangeCaroKannMovesBlack;
            }
            break;
    }
    return movesCopy;
}


/**
 * sets the moves for the selected opening
 * 
 * @param {*} opening user selected to play
 * @returns a list of opening moves for the selected opening
 */
function setMoves(opening) {
    let movesCopy = [];
    switch (opening) {
        case "copyCat":
            if (playingWhite) {
                movesCopy = copyCatMovesBlack;
            } else {
                movesCopy = copyCatMovesWhite;
            }
            break;
        case "viennaGambit":
            if (playingWhite) {
                movesCopy = viennaGamitMovesBlack;
            } else {
                movesCopy = viennaGamitMovesWhite;
            }
            break;
        case "advanceVariation":
            if (playingWhite) {
                movesCopy = advanceCaroKannMovesBlack;
            } else {
                movesCopy = advanceCaroKannMovesWhite;
            }
            break;
        case "exchangeVariation":
            if (playingWhite) {
                movesCopy = exchangeCaroKannMovesBlack;
            } else {
                movesCopy = exchangeCaroKannMovesWhite;
            }
            break;
    }
    return movesCopy;
}

function checkFEN(fenList) { 
    let fen = abChess.getFEN(moveCount);
    if (fen == fenList[0]) {
        return true;
    }
    return false;
}

/**
 * sets the next moves for computer or user
 * 
 * @returns void
 */
function nextStep() {
    // check if game has started
    if (!hasGameStarted) {
        noOpeningModal.style.display = "block";
        return;
    }
    // does't need to check move if it's computers turn
    if (computerMove) {
        computerMove = false;
        return;
    }
    
    ++moveCount;
    let currentFen = abChess.getFEN(moveCount);
    // check that user made the correct move
    if (currentFen == fenList[0]) {
        playAudio("/sounds/move-self.mp3");
        pastFen = currentFen;
        computerMove = true;
        if (moves.length == 0) {
            document.getElementById("successMsg").innerHTML = "<img src='/images/CheckMark.jpg'>" + "You won!";
            document.getElemenyById("successMsg").style.margin = 0;
            document.getElemenyById("successMsg").style.position = "absolute";
            document.getElemenyById("successMsg").style.top = "50%";
            document.getElemenyById("successMsg").style.transform = "translateY(-50%)";
            playAudio("/sounds/mixkit-achievement-bell-600.wav");
            return;
        }

        abChess.play(moves[0][0], moves[0][1]);
        playAudio("/sounds/move-self.mp3");
        ++moveCount;
        pastPGN = abChess.getPGN();
        moves.shift();
        fenList.shift();
        movesForHint.shift();
        if (fenList.length == 0) {
            document.getElementById("successMsg").innerHTML = "<img src='/images/CheckMark.jpg'>" + "You won!";
            playAudio("/sounds/mixkit-achievement-bell-600.wav");
            return;
        }
        return;
    } else {
        //TODO set game back to state of last move
        modal.style.display = "block";
        playAudio("/sounds/wronganswer-37702.mp3");
        --moveCount;
        
        // setPgn instead() of setFEN() to reset the board
        abChess.setPGN(pastPGN);
    }
}

function playAudio(mp3File) {
    var audio = document.createElement('audio');
    audio.src = mp3File;
    audio.play();
}

// listens for continuation of game
abChess.onMovePlayed(nextStep);