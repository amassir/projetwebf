import { Request, Response } from 'express';
import Caracteriser from '../models/caracteriser';

// Récupération de toutes les caractérisations
export const getCaracteriser = async (req: Request, res: Response) => {
    try {
        const caracterisations = await Caracteriser.findAll();
        res.status(200).json(caracterisations);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données des caractérisations" });
    }
};

// Ajout d'une nouvelle caractérisation
export const addCaracteriser = async (req: Request, res: Response) => {
    try {
        const { idM, idC, statutC } = req.body;
        const newCaracteriser = await Caracteriser.create({
            idM,
            idC,
            statutC
        });
        res.status(201).json(newCaracteriser);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout d'une caractérisation" });
    }
};

// Suppression d'une caractérisation avec son identifiant
export const deleteCaracteriser = async (req: Request, res: Response) => {
    try {
        const { idM, idC } = req.params;
        const caracteriser = await Caracteriser.findOne({ where: { idM, idC } });
        if (caracteriser) {
            await caracteriser.destroy();
            res.status(200).json({ message: "Caractérisation supprimée avec succès" });
        } else {
            res.status(404).json({ error: "Caractérisation non trouvée" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la caractérisation" });
    }
};