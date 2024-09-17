console.log('Hello');

const emojis : Array<string> = ["🍎", "🍌", "🍒", "🍓","🍇","🍉", "🍊", "🍍"];

type Carte = {
    emoji : string,  
    visible : boolean
};






function creerJeu() : Array<Carte> { 
    const cartes : Array<Carte> = new Array<Carte>;
    const nbEmojis : number = Object.keys(emojis).length;
    
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


const jeuDeCartes = creerJeu();
const carteRetourner : Record<number, Carte> = {};
const dernièresCartesRetournées : Array<Carte> = new Array();
async function boucleJeu() {
    while (true) {
        afficherCarte(jeuDeCartes);
        
        const index = await clickOnCard();
        jeuDeCartes[index].visible = true;
        
        carteRetourner[index] = jeuDeCartes[index]
        
        if (dernièresCartesRetournées.length === 2) {
            console.log(testPairEgal());
            
            if(! testPairEgal()){
                dernièresCartesRetournées.forEach(carte => {
                    carte.visible = false;
                });
                afficherCarte(jeuDeCartes);
                
            };
                
            dernièresCartesRetournées.pop()
            dernièresCartesRetournées.pop()
                
            };
            dernièresCartesRetournées.push(carteRetourner[index])
            
        }
        
    }
 

 function testPairEgal() : boolean {
    return dernièresCartesRetournées[0].emoji === dernièresCartesRetournées[1].emoji;
 }

 boucleJeu();

