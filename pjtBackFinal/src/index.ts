import express, { Request, Response } from 'express';
import personnelRoutes from './routes/personnelRoute';
import competencesRoutes from './routes/competencesRoute';
import missionsRoutes from './routes/missionsRoute';
import executerRoutes from './routes/executerRoute';
import disposerRoutes from './routes/disposerRoute';
import caracteriserRoutes from './routes/caracteriserRoute';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Le serveur fonctionne !');
});

app.use('/api', personnelRoutes);
app.use('/api', competencesRoutes);
app.use('/api', missionsRoutes);
app.use('/api', executerRoutes);
app.use('/api', disposerRoutes);
app.use('/api', caracteriserRoutes);

app.listen(port, () => {
    console.log(`Serveur tourne sur l'adresse http://localhost:${port}`);
});
