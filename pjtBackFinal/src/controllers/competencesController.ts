import { Request, Response } from 'express';
import Competences from '../models/competences';
import { Disposer } from "../models/disposer";
import Caracteriser from '../models/caracteriser';

// Récupération de toutes les compétences
export const getCompetences = async (req: Request, res: Response) => {
    try {
        const competences = await Competences.findAll();
        res.status(200).json(competences);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données des compétences" });
    }
};

// Récupération d'une compétence par son identifiant
export const getCompetenceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const competence = await Competences.findByPk(id);
        if (competence) {
            res.status(200).json(competence);
        } else {
            res.status(404).json({ error: 'Compétence non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la compétence" });
    }
};

// Récupération des compétences d'un personnel avec son identifiant
export const getCompetencesByPersonnel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const disposerRecords = await Disposer.findAll({
            where: { idP: id },
            include: [{ model: Competences }],
        });

        const competences = disposerRecords.map(record => ({
            idC: record.Competence.idC,
            nomCfr: record.Competence.nomCfr,
            nomCen: record.Competence.nomCen,
            aptitude: record.aptitude
        }));

        res.status(200).json(competences);
    } catch (error) {
        console.error("Erreur lors de la récupération des compétences :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des données des compétences" });
    }
};

export const getCompetencesByMission = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const executerRecords = await Caracteriser.findAll({
            where: { idM: id },
            include: [{ model: Competences }],
        });

        const competences = executerRecords.map(record => ({
            idC: record.Competence.idC,
            nomCfr: record.Competence.nomCfr,
            nomCen: record.Competence.nomCen,
            statutC: record.statutC
        }));

        res.status(200).json(competences);
    } catch (error) {
        console.error("Erreur lors de la récupération des compétences :", error);
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