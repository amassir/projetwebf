import { Request, Response } from 'express';
import Personnel from '../models/personnel';
import Executer from '../models/executer';

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
        const { nomP, prenomP, dateEmbaucheP, activiteP, statutP } = req.body;
        const newPersonnel = await Personnel.create({
            nomP,
            prenomP,
            dateEmbaucheP,
            activiteP,
            statutP
        });
        res.status(201).json(newPersonnel);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout d'un personnel" });
    }
};

// Récupération d'un personnel par son identifiant
export const getPersonnelById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const personnel = await Personnel.findByPk(id);
        if (personnel) {
            res.status(200).json(personnel);
        } else {
            res.status(404).json({ error: 'Personnel non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du personnel" });
    }
};

// Récupération des personnels assignés à une mission
export const getPersonnelByMission = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const executerRecords = await Executer.findAll({
            where: { idM: id },
            include: [{ model: Personnel }],
        });

        const personnels = executerRecords.map(record => ({
            idP: record.Personnel.idP,
            prenomP: record.Personnel.prenomP,
            nomP: record.Personnel.nomP,
            dateEmbaucheP: record.Personnel.dateEmbaucheP,
            activiteP: record.Personnel.activiteP,
            statutP: record.Personnel.statutP
        }));

        res.status(200).json(personnels);
    } catch (error) {
        console.error("Erreur lors de la récupération des personnels :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des données des personnels" });
    }
};

// Mise à jour du statut d'un personnel
export const updatePersonnel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { prenomP, nomP, dateEmbaucheP, activiteP, statutP } = req.body;
        const personnel = await Personnel.findByPk(id);
        if (personnel) {
            if (prenomP) personnel.prenomP = prenomP;
            if (nomP) personnel.nomP = nomP;
            if (dateEmbaucheP) personnel.dateEmbaucheP = new Date(dateEmbaucheP); 
            if (activiteP) personnel.activiteP = activiteP;
            if (statutP) personnel.statutP = statutP;

            await personnel.save();
            res.status(200).json(personnel);
        } else {
            res.status(404).json({ error: "Personnel non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du personnel" });
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