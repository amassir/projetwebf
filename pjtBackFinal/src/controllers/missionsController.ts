import { Request, Response } from 'express';
import Missions from '../models/missions';
import Caracteriser from '../models/caracteriser';
import Executer from '../models/executer';
import Disposer from '../models/disposer';

// Récupération de toutes les missions
export const getMissions = async (req: Request, res: Response) => {
    try {
        const missions = await Missions.findAll();
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données des missions" });
    }
};

// Récupération d'une mission par son identifiant
export const getMissionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mission = await Missions.findByPk(id);
        if (mission) {
            res.status(200).json(mission);
        } else {
            res.status(404).json({ error: 'Mission non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la mission" });
    }
};

// Ajout d'une nouvelle mission
export const addMission = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: "Erreur lors de l'ajout d'une mission" });
    }
};

// Mise à jour du statut d'une mission
export const updateMission = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: "Erreur lors de la mise à jour de la mission" });
    }
};

// Suppression d'une mission avec son identifiant
export const deleteMission = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: "Erreur lors de la suppression d'une mission" });
    }
};

// Ajout de compétences à une mission
export const addCompetenceToMission = async (req: Request, res: Response) => {
    try {
        const { idM, idC, statutC } = req.body;
        const newCaracteriser = await Caracteriser.create({
            idM,
            idC,
            statutC
        });
        res.status(201).json(newCaracteriser);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de la compétence à la mission" });
    }
};

// Ajout de personnels à une mission
export const addPersonnelToMission = async (req: Request, res: Response) => {
    try {
        const { idM, idP, dateDebutE } = req.body;
        const newExecuter = await Executer.create({
            idM,
            idP,
            dateDebutE
        });

        // Vérifiez si toutes les compétences requises pour la mission sont satisfaites
        const requiredCompetences = await Caracteriser.findAll({ where: { idM } });
        const personnelCompetences = await Disposer.findAll({ where: { idP } });

        const allCompetencesSatisfied = requiredCompetences.every(rc => 
            personnelCompetences.some(pc => pc.idC === rc.idC && pc.aptitude === 'confirmé')
        );

        if (allCompetencesSatisfied) {
            const mission = await Missions.findByPk(idM);
            if (mission) {
                mission.statutM = 'planifiée';
                await mission.save();
            }
        }

        res.status(201).json(newExecuter);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du personnel à la mission" });
    }
};

