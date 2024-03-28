export class Puissance4{
    #board;
    #currentPlayer;
    #dernierCoup;

    constructor(){
        this.#board = new Array(6).fill().map(() => new Array(7).fill(undefined));
        this.#currentPlayer = 'A';
    }

    play(column){
        let isPlay = false
        let i=5;
        while (i>=0 && this.#board[i][column] !== undefined ) {
            i--;
        }
        if (i !== -1) {
            this.#board[i][column] = this.getCurrentPlayer();
            this.#dernierCoup = [i,column];
            isPlay = true
            this.nextPlayer()
        }
        console.table(this.#board)
        return isPlay

    }
    
    nextPlayer(){
        if (this.#currentPlayer === 'A') {
            this.#currentPlayer = 'B'
        }
        else{
            this.#currentPlayer = 'A'
        }
    }

    getCurrentPlayer(){
        return this.#currentPlayer;
    }

    isWin(){
        let ligneDernierCoup = this.#dernierCoup[0];
        let colonneDernierCoup = this.#dernierCoup[1];
        let win = false;
        let sensVerif = this.getSensVerif();
        let Cx, Cy;
        sensVerif.forEach(tabSens => {
            let cmpt = 0
            for (let i = 1; i < 4; i++) {
                    Cx = Math.floor(eval(ligneDernierCoup+tabSens[0]+i))
                    Cy = Math.floor(eval(colonneDernierCoup+tabSens[1]+i))
                if (Cx >= 0 && Cy >= 0 && Cx < 6 && Cy < 7 && this.#board[ligneDernierCoup][colonneDernierCoup] === this.#board[Cx][Cy] && this.#board[ligneDernierCoup][colonneDernierCoup] !== undefined ){
                    cmpt++;
                }
                if (cmpt === 3) {
                    win = true
                }
            } 
        });
        return win
    }

    isDraw(){
        let isBoardFull = true
        for (let ligne = 0; ligne < this.#board.length; ligne++) {
            for (let colonne = 0; colonne < this.#board[0].length; colonne++) {
                if (this.#board[ligne][colonne] === undefined) {
                    isBoardFull = false
                }
            }
        }

        return (! this.isWin() && isBoardFull)
    }

    getBoard(){
        return this.#board;
    }

    getSensVerif() {
    
        // Définir les symboles disponibles
        var symboles = ["+", "-", "."];
        
        // Initialiser un tableau pour stocker toutes les paires possibles
        var ensembleCouples = [];
        
        // Générer toutes les paires possibles
        for (var i = 0; i < symboles.length; i++) {
            for (var j = 0; j < symboles.length; j++) {
                ensembleCouples.push([symboles[i], symboles[j]]);
            }
        }
        ensembleCouples.pop()
    
        return ensembleCouples
    }
}
