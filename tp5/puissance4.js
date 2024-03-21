class Puissance4{
    #board;
    #currentPlayer;
    #dernierCoup;

    constructor(){
        this.#board = [];
        this.#currentPlayer = 'A';
        for (let index = 0; index < 6; index++) {
            this.#board.push(new Array(7))
        }
        console.table(this.#board);
    }

    play(column){
        let isPlay = false
        let i=5;
        while (this.#board[i][column] !== undefined && i>=0) {
            i--;
        }
        if (i !== -1) {
            this.#board[i][column] = this.getCurrentPlayer();
            this.#dernierCoup = [i,column];
            isPlay = true
            this.nextPlayer()
        }
        console.table(this.#board)
        console.log("isWin : "+this.isWin());
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
        
        let ligneDernierCoup = console.log(this.#dernierCoup[0]);
        let colonneDernierCoup = console.log(this.#dernierCoup[1]);
        let win = true;
        //ligne droite
        for (let i = 1; i <= 4; i++) {
            if (this.#board[ligneDernierCoup][colonneDernierCoup] !== this.#board[ligne+i][column]){
                win = false;
            }
        }
        return win
        
        
        /*let cmpt = 1
        let win = false
        // vérifie les victoires en ligne
        this.#board.forEach(ligne => {
            for (let index = 0; index < ligne.length-1; index++) {
                if (ligne[index] === ligne[index+1] && ligne[index] !== undefined){
                    cmpt++;
                }
                else{
                    cmpt = 1;
                }
                if (cmpt === 4){
                    win = true
                }
            }
        })
        // vérifie les victoires en colonne
        for (let column=0; column<this.#board[0].length; column++){
            for (let ligne=0; ligne<this.#board.length-1; ligne++){
                if (this.#board[ligne][column] === this.#board[ligne+1][column] && this.#board[ligne][column] !== undefined){
                    cmpt++;
                }
                else{
                    cmpt = 1;
                }
                if (cmpt === 4){
                    win = true
                }
                
            }
        }

        // vérifie les victoires en diagonal


        return win

        */
    }

    isDraw(){

    }

    getBoard(){

    }
}

let puissance4 = new Puissance4();
