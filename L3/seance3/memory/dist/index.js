"use strict";
console.log('Hello');
const emojis = ["🍎", "🍌", "🍒", "🍓", "🍇", "🍉", "🍊", "🍍"];
console.log(afficherCarte(creerJeu()));
function creerJeu() {
    const cartes = new Array;
    const nbEmojis = Object.keys(emojis).length;
    for (let i = 0; i < nbEmojis * 2; i++) {
        cartes.push({
            emoji: emojis[i % nbEmojis],
            visible: false
        });
    }
    shuffleArray(cartes);
    return cartes;
}
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function afficherCarte(tableauDeCartes) {
    if (tableauDeCartes.length !== 16) {
        return;
    }
    // faire un tableau de tableau de string 
    // lire les boolean des cartes
    // afficher en fonctions 
    console.table(tableauDeCartes);
}
