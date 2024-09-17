"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('Hello');
const emojis = ["🍎", "🍌", "🍒", "🍓", "🍇", "🍉", "🍊", "🍍"];
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
    document.body.innerHTML = "";
    const carte_container = document.createElement('div');
    carte_container.classList.add('carte-container');
    document.body.appendChild(carte_container);
    tableauDeCartes.forEach(carte => {
        const carteDiv = document.createElement('div');
        carte.visible ? carteDiv.textContent = carte.emoji : null;
        carteDiv.classList.add('carte');
        carte_container.appendChild(carteDiv);
    });
}
function clickOnCard() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            const listener = (event) => {
                //@ts-ignore
                if (!event.target.classList.contains('carte')) {
                    return;
                }
                //@ts-ignore
                const index = Array.from(event.target.parentNode.children).indexOf(event.target);
                resolve(index);
                document.removeEventListener('click', listener);
            };
            document.addEventListener('click', listener);
        });
    });
}
const jeuDeCartes = creerJeu();
const carteRetourner = {};
const dernièresCartesRetournées = new Array();
function boucleJeu() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            afficherCarte(jeuDeCartes);
            const index = yield clickOnCard();
            jeuDeCartes[index].visible = true;
            carteRetourner[index] = jeuDeCartes[index];
            if (dernièresCartesRetournées.length === 2) {
                console.log(testPairEgal());
                if (!testPairEgal()) {
                    dernièresCartesRetournées.forEach(carte => {
                        carte.visible = false;
                    });
                    afficherCarte(jeuDeCartes);
                }
                ;
                dernièresCartesRetournées.pop();
                dernièresCartesRetournées.pop();
            }
            ;
            dernièresCartesRetournées.push(carteRetourner[index]);
        }
    });
}
function testPairEgal() {
    return dernièresCartesRetournées[0].emoji === dernièresCartesRetournées[1].emoji;
}
boucleJeu();
