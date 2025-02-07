import { Request, Response } from 'express';
import Executer from '../models/executer';

// Récupération de toutes les exécutions
export const getExecuter = async (req: Request, res: Response) => {
    try {
        const executions = await Executer.findAll();
        res.status(200).json(executions);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données des exécutions" });
    }
};

// Ajout d'une nouvelle exécution
export const addExecuter = async (req: Request, res: Response) => {
    try {
        const { idM, idP, dateDebutE } = req.body;
        const newExecuter = await Executer.create({
            idM,
            idP,
            dateDebutE
        });
        res.status(201).json(newExecuter);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout d'une exécution" });
    }
};

// Suppression d'une exécution avec son identifiant
export const deleteExecuter = async (req: Request, res: Response) => {
    try {
        const { idM, idP } = req.params;
        const executer = await Executer.findOne({ where: { idM, idP } });
        if (executer) {
            await executer.destroy();
            res.status(200).json({ message: "Exécution supprimée avec succès" });
        } else {
            res.status(404).json({ error: "Exécution non trouvée" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de l'exécution" });
    }
};