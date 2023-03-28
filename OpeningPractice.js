var abChess = {};
        var options = {
            animated: false
        };
        
abChess = new AbChess("chessboard", options);
abChess.setFEN();

document.getElementById("newGame").onclick = function newGame() {
    abChess.reset();
}

document.getElemenyById("flipBoard").onclick = function flipBoard() {
    abChess.flip();
}