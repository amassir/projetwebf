import { Router } from 'express';
import { getPersonnel, getPersonnelById, getPersonnelByMission, getPersonnelByCompetence, addPersonnel, validatePersonnelRecommendations, updatePersonnel, deletePersonnel, addCompetenceToPersonnel, removeCompetenceFromPersonnel } from '../controllers/personnelController';

// Initialisation du router
const router = Router();

/* Routes avec GET*/
// Route pour récupérer tous les personnels
router.get('/personnel', getPersonnel);

// Route pour récupérer un personnel par son identifiant
router.get('/personnel/:id', getPersonnelById);

// Route pour récupérer tous les personnels d'une mission
router.get('/missions/:id/personnel', getPersonnelByMission);

// Route pour récupérer tous les personnels d'une compétence
router.get('/personnel/competence/:id', getPersonnelByCompetence);

/* Routes avec POST*/
// Route pour ajouter un personnel
router.post('/personnel', addPersonnel);

// Route pour valider les recommandations de personnel
router.post('/missions/:id/validate', validatePersonnelRecommendations);

// Route pour ajouter une compétence à un personnel
router.post('/personnel/:id/competences', addCompetenceToPersonnel);

/* Routes avec PUT*/
// Route pour modifier un personnel
router.put('/personnel/:id', updatePersonnel);

/* Routes avec DELETE*/
// Route pour supprimer un personnel
router.delete('/personnel/:id', deletePersonnel);

// Route pour supprimer une compétence d'un personnel
router.delete('/personnel/:id/competences/:idC', removeCompetenceFromPersonnel);

export default router;