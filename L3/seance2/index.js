// Importation des modules nécessaires : Express et fs (à compléter)
const express = require('express');
const fs = require('fs'); // Complétez ici en important le module fs

// Créez une application Express (à compléter)
const app = express(); // Complétez en initialisant l'application Express

// Définissez un port pour votre serveur
const PORT = 3000;

// Route principale qui renvoie un message de bienvenue
app.get('/', (req, res) => {
    res.send('Bienvenue sur votre serveur Node.js avec Express et fs !');
});

// Route qui lit le contenu du fichier data.txt et l'affiche (à compléter)
app.get('/readfile', (req, res) => {
    // Utilisez fs pour lire le fichier data.txt (à compléter)
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            // Gérez l'erreur ici (à compléter)
            res.status(500).send('Erreur lors de la lecture du fichier');
        } else {
            // Envoyez le contenu du fichier en réponse (à compléter)
            res.end(data); // Complétez ici pour envoyer le contenu du fichier via res
        }
    });
});

app.get('/download', (req, res)=>{
    res.download('./data.txt')
    
})

app.get('/accueil', (req,res)=>{
    res.sendFile("/home/tmalespi/TP-Techno-Web/L3/seance2/index.html")
})

// Démarrez le serveur pour qu'il écoute sur le port défini (à compléter)
app.listen(PORT, () => { // Complétez avec le port sur lequel votre serveur va écouter
    console.log(`Serveur démarré sur le port ${PORT}`);
});
