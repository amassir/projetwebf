import { NextFunction, Request, Response } from 'express';
import Personnel from '../models/personnel';
import Executer from '../models/executer';
import Missions from '../models/missions';
import Caracteriser from '../models/caracteriser';
import Disposer from '../models/disposer';
import Competences from '../models/competences';

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

// Récupération des personnels par compétence
export const getPersonnelByCompetence = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const disposerRecords = await Disposer.findAll({
            where: { idC: id },
            include: [{ model: Personnel }]
        });

        const personnels = disposerRecords.map(record => ({
            idP: record.Personnel.idP,
            prenomP: record.Personnel.prenomP,
            nomP: record.Personnel.nomP,
            dateEmbaucheP: record.Personnel.dateEmbaucheP,
            activiteP: record.Personnel.activiteP,
            statutP: record.Personnel.statutP
        }));

        res.status(200).json(personnels);
    } catch (error) {
        console.error("Erreur lors de la récupération des personnels par compétence :", error);
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
 
// Validation des recommandations de personnels pour une mission
export const validatePersonnelRecommendations = async (req: Request, res: Response) => {
    try {
        const { idM } = req.params;
        const recommendedPersonnels = req.body;

        for (const personnel of recommendedPersonnels) {
            await Executer.create({
                idM,
                idP: personnel.idP,
                dateDebutE: new Date()
            });
        }

        // Vérifiez si toutes les compétences requises pour la mission sont satisfaites
        const requiredCompetences = await Caracteriser.findAll({ where: { idM } });
        const allCompetencesSatisfied = requiredCompetences.every(rc => 
            recommendedPersonnels.some((personnel: any) => 
                personnel.competences.some((pc: any) => pc.idC === rc.idC && pc.aptitude === 'confirmé')
            )
        );

        if (allCompetencesSatisfied) {
            const mission = await Missions.findByPk(idM);
            if (mission) {
                mission.statutM = 'planifiée';
                await mission.save();
            }
        }

        res.status(200).json({ message: 'Recommandations validées avec succès' });
    } catch (error) {
        console.error("Erreur lors de la validation des recommandations :", error);
        res.status(500).json({ error: "Erreur lors de la validation des recommandations" });
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

// Ajout d'une compétence à un personnel
export const addCompetenceToPersonnel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params; 
        const { idC, aptitude } = req.body; 

        // S'assurer que idC est bien une chaîne de caractères
        const idCStr = String(idC);

        // Vérifier si le personnel existe
        const personnel = await Personnel.findByPk(id);
        if (!personnel) {
            res.status(404).json({ error: "Personnel non trouvé" });
            return;
        }

        // Vérifier si la compétence existe
        const competence = await Competences.findByPk(idCStr);
        if (!competence) {
            res.status(404).json({ error: "Compétence non trouvée" });
            return;
        }

        // Vérifier si la compétence est déjà associée au personnel
        const existingRelation = await Disposer.findOne({
            where: { idP: id, idC: idCStr }
        });

        if (existingRelation) {
            res.status(400).json({ error: "Cette compétence est déjà associée à ce personnel" });
            return;
        }

        // Vérifier que aptitude est une valeur valide
        const validAptitudes = ["novice", "confirmé"];
        const aptitudeValide = validAptitudes.includes(aptitude) ? aptitude : "novice"; 

        // Ajouter la compétence au personnel
        const newDisposer = await Disposer.create({
            idP: id,
            idC: idCStr,
            aptitude: aptitudeValide 
        });

        res.status(201).json({ message: "Compétence ajoutée avec succès au personnel", data: newDisposer });

    } catch (error) {
        console.error("Erreur lors de l'ajout de la compétence au personnel :", error);
        next(error);
    }
};

// Suppression d'une compétence d'un personnel
export const removeCompetenceFromPersonnel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id, idC } = req.params;

        // Vérifier si l'association existe
        const association = await Disposer.findOne({
            where: { idP: id, idC }
        });

        if (!association) {
            res.status(404).json({ message: "L'association entre le personnel et la compétence n'existe pas." });
            return;
        }

        // Supprimer l'association
        await association.destroy();
        res.status(200).json({ message: "Compétence dissociée avec succès du personnel." });

    } catch (error) {
        console.error("Erreur lors de la suppression de la compétence du personnel :", error);
        next(error);
    }
};