const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Répertoire des fichiers statiques
const staticDir = path.join(__dirname, '..', 'dist/ekinoxx/browser');
app.use(express.static(staticDir));

// Envoie le fichier index.html pour toutes les autres requêtes
app.get('*', (req, res) => {
    const filePath = path.join(staticDir, 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(err.status).end();
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
