import express, { Request, Response } from 'express';
import personnelRoutes from './routes/personnelRoute';
import competencesRoutes from './routes/competencesRoute';
import missionsRoutes from './routes/missionsRoute';
import executerRoutes from './routes/executerRoute';
import disposerRoutes from './routes/disposerRoute';
import caracteriserRoutes from './routes/caracteriserRoute';
import forumRoutes from './routes/forumRoute';
import AuthRoutes from './routes/authRoute';
import cors from 'cors';
import Missions from './models/missions';
import { updateMissionStatusAutomatically } from './controllers/missionsController';

// Initialisation de l'application express
const app = express();
const port = 3000;

// Configuration du middleware CORS
app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



// Vérification des statuts toutes les 10 secondes
setInterval(async () => {
    console.log('Vérification des statuts des missions...');
    const missions = await Missions.findAll();


    for (const mission of missions) {
        await updateMissionStatusAutomatically(mission);
    }
}, 2000);


// Middleware pour parser les requêtes JSON
app.use(express.json());

// Route de base pour vérifier le bon fonctionnement du serveur
app.get('/', (req, res) => {
    res.send('Le serveur fonctionne !');
});

// Déclaration des routes de l'API
app.use('/api', personnelRoutes);
app.use('/api', competencesRoutes);
app.use('/api', missionsRoutes);
app.use('/api', executerRoutes);
app.use('/api', disposerRoutes);
app.use('/api', caracteriserRoutes);
app.use('/api', forumRoutes);
app.use('/api', AuthRoutes);

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur tourne sur l'adresse http://localhost:${port}`);
});
