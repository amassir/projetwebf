import { Request, Response } from 'express';
import Missions from '../models/missions';

// Récupération de toutes les missions
export const getMissions = async (req: Request, res: Response) => {
    try {
        const missions = await Missions.findAll();
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données des missions" });
    }
};

// Ajout d'une nouvelle mission
export const addMission = async (req: Request, res: Response) => {
    try {
        const { nomM, descriptionM, dateDebutM, dateFinM, statutM, anomalieM } = req.body;
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