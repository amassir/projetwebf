import { Router } from 'express';
import { getCompetences,getCompetencesByPersonnel, addCompetence, deleteCompetence, getCompetencesByMission, getCompetenceById } from '../controllers/competencesController';

// Initialisation du router
const router = Router();

/* Routes avec GET*/
// Route pour récupérer toutes les compétences
router.get('/competences', getCompetences);

// Route pour récupérer une compétence par son identifiant
router.get('/competences/:id', getCompetenceById);

// Route pour récupérer toutes les compétences d'un personnel
router.get("/personnel/:id/competences", getCompetencesByPersonnel);

// Route pour récupérer toutes les compétences d'une mission
router.get("/missions/:id/competences", getCompetencesByMission);

/* Routes avec POST*/
// Route pour ajouter une compétence
router.post('/competences', addCompetence);

/* Routes avec DELETE*/
// Route pour supprimer une compétence
router.delete('/competences/:id', deleteCompetence);

export default router;