import { Request, Response } from 'express';
import Personnel from '../models/personnel';

// Récupération de tous les personnels
export const getPersonnel = async (req: Request, res: Response) => {
    try {
        const personnels = await Personnel.findAll();
        res.status(200).json(personnels);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données des personnels" });
    }
};

// Ajout d'un nouveau personnel
export const addPersonnel = async (req: Request, res: Response) => {
    try {
        const { prenomP, nomP, dateEmbaucheP, activiteP, statutP } = req.body;
        const newPersonnel = await Personnel.create({
            prenomP,
            nomP,
            dateEmbaucheP,
            activiteP,
            statutP
        });
        res.status(201).json(newPersonnel);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout d'un personnel" });
    }
};

// Suppression d'un personnel avec son identifiant
export const deletePersonnel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const personnel = await Personnel.findByPk(id);
        if (personnel) {
            await personnel.destroy();
            res.status(200).json({ message: "Personnel effacé " });
        } else {
            res.status(404).json({ error: 'Personnel non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression d'un personnel" });
    }
};