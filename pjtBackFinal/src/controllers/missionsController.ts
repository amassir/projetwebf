import { Request, Response, NextFunction } from 'express';
import Missions from '../models/missions';
import Caracteriser from '../models/caracteriser';
import Executer from '../models/executer';
import Disposer from '../models/disposer';
import Personnel from '../models/personnel';
import Competences from '../models/competences';
import { Op } from 'sequelize';

// ✅ Récupérer toutes les missions
export const getMissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const missions = await Missions.findAll();
        res.status(200).json(missions);
    } catch (error) {
        next(error);
    }
};

// ✅ Récupérer une mission par ID
export const getMissionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const mission = await Missions.findByPk(id);
        if (mission) {
            res.status(200).json(mission);
        } else {
            res.status(404).json({ error: 'Mission non trouvée' });
        }
    } catch (error) {
        next(error);
    }
};

// ✅ Ajouter une mission
export const addMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { nomM, descriptionM, dateDebutM, dateFinM, anomalieM } = req.body;
        const statutM = "en préparation";
        const newMission = await Missions.create({
            nomM,
            descriptionM,
            dateDebutM,
            dateFinM,
            statutM,
            anomalieM
        });
        res.status(201).json(newMission);
    } catch (error) {
        next(error);
    }
};

// ✅ Modifier le statut d'une mission
export const updateMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { statutM } = req.body;

        const mission = await Missions.findByPk(id);
        if (mission) {
            if (statutM) mission.statutM = statutM;

            await mission.save();
            res.status(200).json(mission);
        } else {
            res.status(404).json({ error: "Mission non trouvée" });
        }
    } catch (error) {
        next(error);
    }
};

// ✅ Supprimer une mission
export const deleteMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const mission = await Missions.findByPk(id);
        if (mission) {
            await mission.destroy();
            res.status(200).json({ message: "Mission effacée" });
        } else {
            res.status(404).json({ error: 'Mission non trouvée' });
        }
    } catch (error) {
        next(error);
    }
};

// ✅ Ajouter une compétence à une mission
export const addCompetenceToMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { idC, statutC } = req.body;

        const newCaracteriser = await Caracteriser.create({
            idM: id,
            idC,
            statutC
        });

        res.status(201).json(newCaracteriser);
    } catch (error) {
        next(error);
    }
};

// ✅ Ajouter un personnel à une mission
export const addPersonnelToMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { idP, dateDebutE } = req.body;

        const newExecuter = await Executer.create({
            idM: id,
            idP,
            dateDebutE
        });

        res.status(201).json(newExecuter);
    } catch (error) {
        next(error);
    }
};

// ✅ Recommandation de personnel pour une mission
export const recommendPersonnelForMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        // Récupérer les compétences requises pour la mission
        const requiredCompetences = await Caracteriser.findAll({
            where: { idM: id },
            include: [{ model: Competences, as: 'Competence' }]
        });

        if (!requiredCompetences.length) {
            res.status(404).json({ message: "Aucune compétence requise pour cette mission" });
            return;
        }

        const competenceIds = requiredCompetences.map(rc => rc.idC);

        // Rechercher le personnel ayant ces compétences avec une aptitude "confirmé"
        const qualifiedPersonnel = await Disposer.findAll({
            where: { idC: { [Op.in]: competenceIds }, aptitude: 'confirmé' },
            include: [
                { model: Personnel, as: 'Personnel' },
                { model: Competences, as: 'Competence' }
            ]
        });

        if (!qualifiedPersonnel.length) {
            res.status(404).json({ message: "Aucun personnel qualifié trouvé" });
            return;
        }

        // Construire la liste des recommandations
        const recommendedPersonnel = qualifiedPersonnel.map(qp => ({
            idP: qp.Personnel.idP,
            nom: qp.Personnel.nomP, 
            prenom: qp.Personnel.prenomP, 
            competence: qp.Competence.nomCfr // ou `qp.Competence.nomCen` selon la langue
        }));

        res.status(200).json(recommendedPersonnel);
    } catch (error) {
        console.error("Erreur lors de la recommandation :", error);
        next(error); // Utilisation de NextFunction pour une meilleure gestion des erreurs
    }
};
