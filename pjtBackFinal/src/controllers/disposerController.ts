import { Request, Response } from 'express';
import Disposer from '../models/disposer';

// Récupération de toutes les dispositions
export const getDisposer = async (req: Request, res: Response) => {
    try {
        const dispositions = await Disposer.findAll();
        res.status(200).json(dispositions);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données des dispositions" });
    }
};

// Ajout d'une nouvelle disposition
export const addDisposer = async (req: Request, res: Response) => {
    try {
        const { idP, idC, aptitude } = req.body;
        const newDisposer = await Disposer.create({
            idP,
            idC,
            aptitude
        });
        res.status(201).json(newDisposer);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout d'une disposition" });
    }
};

// Suppression d'une disposition avec son identifiant
export const deleteDisposer = async (req: Request, res: Response) => {
    try {
        const { idP, idC } = req.params;
        const disposer = await Disposer.findOne({ where: { idP, idC } });
        if (disposer) {
            await disposer.destroy();
            res.status(200).json({ message: "Disposition supprimée avec succès" });
        } else {
            res.status(404).json({ error: "Disposition non trouvée" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la disposition" });
    }
};