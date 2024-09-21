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
const emojis = ["🍎", "🍌", "🍒", "🍓", "🍇", "🍉", "🍊", "🍍"];
let jeuDeCartes;
const carteRetourner = {};
const dernièresCartesRetournées = new Array();
function creerJeu() {
    const cartes = new Array;
    const nbEmojis = emojis.length;
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
function boucleJeu() {
    return __awaiter(this, void 0, void 0, function* () {
        const delay = wait(30000);
        let isTimeUps = false;
        delay.then(() => isTimeUps = true);
        while (!isTimeUps) {
            const index = yield clickOnCard();
            // si la carte cliqué n'est pas visible, on la rend visible puis on l'ajoute à dernièresCartesRetournées
            if (jeuDeCartes[index].visible == false) {
                jeuDeCartes[index].visible = true;
                carteRetourner[index] = jeuDeCartes[index];
                afficherCarte(jeuDeCartes);
                dernièresCartesRetournées.push(carteRetourner[index]);
            }
            // si dernièresCartesRetournées contient deux cartes, on regarde si ce sont des paires, 
            // si elles ne sont pas paires on les masques
            // enfin on vide dernièresCartesRetournées 
            if (dernièresCartesRetournées.length === 2) {
                if (!testPairEgal()) {
                    yield wait(400);
                    dernièresCartesRetournées.forEach(carte => {
                        carte.visible = false;
                    });
                    afficherCarte(jeuDeCartes);
                }
                ;
                dernièresCartesRetournées.length = 0;
            }
            ;
            // on regarde si le joueur a gagné
            if (main()) {
                break;
            }
        }
    });
}
function testPairEgal() {
    return dernièresCartesRetournées[0].emoji === dernièresCartesRetournées[1].emoji;
}
function wait(timeInMs) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, timeInMs);
        });
    });
}
function main() {
    let drapeau = true;
    jeuDeCartes.forEach(carte => {
        carte.visible == false ? drapeau = false : null;
    });
    return drapeau;
}
function displayTimer() {
    let time = 30.0;
    const timer = setInterval(() => {
        time -= 0.1;
        document.title = "Memory : " + time.toFixed(1) + "s";
        if (time <= 0) {
            clearInterval(timer);
        }
    }, 100);
    return timer;
}
function jouerJeu() {
    return __awaiter(this, void 0, void 0, function* () {
        jeuDeCartes = creerJeu();
        afficherCarte(jeuDeCartes);
        const timer = displayTimer();
        yield boucleJeu();
        clearInterval(timer);
        const div = document.createElement("div");
        main() == true ? div.innerText = "Bravo 👏" : div.innerText = "Peut être une prochaine fois 😉";
        jeuDeCartes.forEach(carte => carte.visible = false);
        afficherCarte(jeuDeCartes);
        document.body.appendChild(div);
        document.body.appendChild(createReplayButton());
    });
}
function createReplayButton() {
    const button = document.createElement("button");
    button.innerText = "Rejouer";
    button.addEventListener("click", function () {
        jouerJeu();
    });
    return button;
}
jouerJeu();
