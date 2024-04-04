import { Puissance4 } from "./puissance4.js";

let p4 = new Puissance4();

let colonnes = document.querySelectorAll(".column")
let divInfo = document.querySelector("#info")
divInfo.innerHTML = "Tour du Joueur "+p4.getCurrentPlayer();

Array.from(colonnes).forEach((colonne, i) => {
    colonne.addEventListener("click",addJeton)
})

function addJeton(event) {
    let colonne = event.target.parentNode;
    let index = Array.from(colonnes).indexOf(colonne);
    let cases = colonne.children;
    let y = cases.length-1;

    while (cases[y].classList.length > 1) {
        y--;
    }
    if (p4.getCurrentPlayer() === 'A') {
        cases.item(y).classList.add("player-A");
    }
    else{
        cases.item(y).classList.add("player-B");
    }
    console.log(index);
    p4.play(index);

    if (p4.isWin()) {
        divInfo.innerHTML = p4.getCurrentPlayer()+" a gagné !";
        removeListener();
    }
    else if (p4.isDraw()) {
        divInfo.innerHTML = "Partie nulle !";
        removeListener();
    }
    else{
        divInfo.innerHTML = "Tour du Joueur "+p4.getCurrentPlayer();
    }
}

function removeListener() {
    Array.from(colonnes).forEach(colonne => {
            colonne.removeEventListener("click",addJeton);
        })
}