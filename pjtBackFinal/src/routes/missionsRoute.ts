import { Router } from 'express';
import { getMissions, addMission, addCompetenceToMission, updateMissionStatut,addPersonnelToMission, deleteMission, getMissionById, recommendPersonnelForMission, getPersonnelByMission, removeCompetenceFromMission, updateMission, removePersonnelFromMission } from '../controllers/missionsController';



// Initialisation du router
const router = Router();

/* Routes avec GET*/
// Route pour récupérer toutes les missions
router.get('/missions', getMissions);

// Route pour récupérer une mission par son identifiant
router.get('/missions/:id', getMissionById);

// Route pour récupérer tous les personnels d'une mission
router.get('/missions/:id/personnels', getPersonnelByMission);

// Route pour mettre à jour le statut d'une mission
router.put('/missions/:id', updateMissionStatut);

// Route pour recommander du personnel pour une mission
router.get('/missions/:id/recommendations', recommendPersonnelForMission);

/* Routes avec POST*/
// Route pour ajouter une mission
router.post('/missions', addMission);

// Route pour ajouter une compétence à une mission
router.post('/missions/:id/competences', addCompetenceToMission);

// Route pour ajouter un personnel à une mission
router.post('/missions/:id/personnels', addPersonnelToMission);

/* Routes avec PUT*/
// Route pour modifier une mission
router.put("/missions/:id", updateMission);

/* Routes avec DELETE*/
// Route pour supprimer une mission
router.delete('/missions/:id', deleteMission);

// Route pour supprimer une compétence d'une mission
router.delete('/missions/:id/competences/:idC', removeCompetenceFromMission);

// Route pour supprimer un personnel d'une mission
router.delete('/missions/:id/personnels/:idP', removePersonnelFromMission);

export default router;
