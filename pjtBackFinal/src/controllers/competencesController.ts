import { Request, Response } from 'express';
import Competences from '../models/competences';

// Récupération de toutes les compétences
export const getCompetences = async (req: Request, res: Response) => {
    try {
        const competences = await Competences.findAll();
        res.status(200).json(competences);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données des compétences" });
    }
};

// Ajout d'une nouvelle compétence
export const addCompetence = async (req: Request, res: Response) => {
    try {
        const { nomCfr, nomCen } = req.body;
        const newCompetence = await Competences.create({
            nomCfr,
            nomCen
        });
        res.status(201).json(newCompetence);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout d'une compétence" });
    }
};

// Suppression d'une compétence avec son identifiant
export const deleteCompetence = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const competence = await Competences.findByPk(id);
        if (competence) {
            await competence.destroy();
            res.status(200).json({ message: "Compétence effacée" });
        } else {
            res.status(404).json({ error: 'Compétence non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression d'une compétence" });
    }
};