const emojis : Array<string> = ["🍎", "🍌", "🍒", "🍓","🍇","🍉", "🍊", "🍍"];
let jeuDeCartes : Array<Carte>;
const carteRetourner : Record<number, Carte> = {};
const dernièresCartesRetournées : Array<Carte> = new Array();

type Carte = {
    emoji : string,  
    visible : boolean
};

function creerJeu() : Array<Carte> { 
    const cartes : Array<Carte> = new Array<Carte>;
    const nbEmojis : number = emojis.length;
    
    for (let i = 0; i < nbEmojis*2; i++) {
        cartes.push({
            emoji : emojis[i%nbEmojis], 
            visible : false
        })
    }    
    shuffleArray(cartes)
    return cartes;
}
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array : Array<any>) : void {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function afficherCarte(tableauDeCartes:Array<Carte>) : void{
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


/**
 * Renvoie une `Promise` qui `resolve` quand une carte a été cliquée. Le contenu de la Promise est l'index de cette carte dans le tableau.
 */
type CardIndex = number;
async function clickOnCard(): Promise<CardIndex> {
	return new Promise((resolve) => {
		const listener = (event: MouseEvent) => {
			//@ts-ignore
			if (!event.target.classList.contains('carte')) {
				return;
			}
			//@ts-ignore
			const index = Array.from(event.target.parentNode.children).indexOf(
				event.target as HTMLElement
			);
			resolve(index);
			document.removeEventListener('click', listener);
		};
		document.addEventListener('click', listener);
	});
}

async function boucleJeu() {
    const delay : Promise<boolean> = wait(30000);
    let isTimeUps : boolean = false;
    delay.then(()=> isTimeUps = true)
    while (!isTimeUps) {

        const index = await clickOnCard();

        // si la carte cliqué n'est pas visible, on la rend visible puis on l'ajoute à dernièresCartesRetournées
        if (jeuDeCartes[index].visible == false){
            jeuDeCartes[index].visible = true;
            carteRetourner[index] = jeuDeCartes[index]
            afficherCarte(jeuDeCartes);
            dernièresCartesRetournées.push(carteRetourner[index])
        } 
        
        // si dernièresCartesRetournées contient deux cartes, on regarde si ce sont des paires, 
        // si elles ne sont pas paires on les masques
        // enfin on vide dernièresCartesRetournées 
        if (dernièresCartesRetournées.length === 2) {
            if(! testPairEgal()){
                await wait(400);
                dernièresCartesRetournées.forEach(carte => {
                    carte.visible = false;
                });
                afficherCarte(jeuDeCartes);
            };
            dernièresCartesRetournées.length = 0;  
        };   
        // on regarde si le joueur a gagné
        if (main()) {
            break;
        }        
    }    
}
    
function testPairEgal() : boolean {
    return dernièresCartesRetournées[0].emoji === dernièresCartesRetournées[1].emoji;
 }

async function wait(timeInMs : number) : Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        setTimeout(()=>{
            resolve(true);
        }, timeInMs)
    })
 }

function main() : boolean {
    let drapeau : boolean = true;
    jeuDeCartes.forEach(carte => {
        carte.visible == false ? drapeau = false : null;
    });
   return drapeau;
}

function displayTimer() {
    let time : number = 30.0;
    const timer = setInterval(()=>{
        time -= 0.1;
        document.title = "Memory : " + time.toFixed(1)+"s"
        if (time <= 0) {
            clearInterval(timer); 
        }
    },100)
    return timer;
}

async function jouerJeu() {
    jeuDeCartes = creerJeu();

    afficherCarte(jeuDeCartes);
    const timer = displayTimer();
    
    await boucleJeu();
    clearInterval(timer);
    
    const div = document.createElement("div");
    main() == true ? div.innerText = "Bravo 👏" : div.innerText = "Peut être une prochaine fois 😉";
    
    jeuDeCartes.forEach(carte => carte.visible = false);
    afficherCarte(jeuDeCartes);
    
    document.body.appendChild(div);
    document.body.appendChild(createReplayButton());
}

function createReplayButton() : HTMLButtonElement{
    const button = document.createElement("button");
    button.innerText = "Rejouer"
    button.addEventListener("click", function() {
        jouerJeu();
    });

    return button;
}

jouerJeu();