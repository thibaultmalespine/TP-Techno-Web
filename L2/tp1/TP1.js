function Catégorie(hauteur) {
    if(hauteur < 2){
        console.log("véhicule léger");
    }
    else if(2 <= hauteur && hauteur < 3){
        console.log("véhicule intermédiaire");
    }
    else{
        console.log("poids lourd");
    }
}


function guess() {
    const nombre = Math.ceil(Math.random() * 10);
    
    let guess; 
    
    while (parseInt(guess) !== nombre) {
        guess = prompt("Entrez un nombre entre 1 et 10");
    }
    
    alert("Bravo !");
}


function factoriel(nombre) {
    if (Number.isInteger(nombre) ){
        if (nombre === 1) {
            return 1;
        }
        else {
            return nombre * factoriel(nombre-1)
        }
    }
    else{
        console.log("le nombre doit être un entier !");
    }
}

function moyenne(tab) {
    const somme = tab.reduce((accumulator, currentValue) =>  accumulator + currentValue
    )
    
    return (somme / tab.length);
}

const couleurs = ["rouge", "vert", "bleu", "jaune", "orange", "violet", "rose", "marron", "gris", "noir", "blanc", "turquoise", "indigo", "beige", "fuchsia", "cyan", "corail", "chocolat", "bordeaux", "aquamarine", "auburn", "argent", "améthyste", "ambre", "émeraude", "ivoire", "lavande", "lilas", "magenta", "mauve", "olive", "or", "pourpre", "saumon", "sépia", "sienna", "tan", "turquoise", "vermillon", "violet", "zinzolin"];

function searchColor(query) {
    return result = couleurs.filter((couleur) => couleur.includes(query))
}

function ligne(nb){
    if (Number.isInteger(nb) ){
        for (let index = 0; index < nb; index++) {
            document.write('*');
        }
    }
}

function triangle(nb) {
    for (let index = 1; index <= nb; index++) {
        ligne(index);
        document.write('<br/>');
    }
}

function carré(coté) {
    for (let y = 0; y <coté; y++) {
        for (let x = 0; x <coté; x++) {
            if(y === 0 || x === 0 || y === coté-1 || x === coté-1){
                document.write(`*`)
            }
            else{
                document.write(" - ")
            }
        }
        document.write("<br/>")
    }
}

function diamond(n) {
	function diamondLine(i) {
		if (i === 1) {
			document.write(" ".repeat(n - i + 1) + "*");
			document.write("<br/>");
			return;
		}
		document.write("&nbsp;".repeat(n - i + 1) + "*" + "&nbsp;".repeat(2 * i - 3) + "*");
		document.write("<br/>");
	}
	
	for (let i = 1; i < n; i++) {
		diamondLine(i);
	}
	diamondLine(n);
	for (let i = n - 1; i > 0; i--) {
		diamondLine(i);
	}
}