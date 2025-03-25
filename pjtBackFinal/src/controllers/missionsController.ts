import { Request, Response, NextFunction, RequestHandler } from 'express';
import Missions from '../models/missions';
import Caracteriser from '../models/caracteriser';
import Executer from '../models/executer';
import Disposer from '../models/disposer';
import Personnel from '../models/personnel';
import Competences from '../models/competences';
import { Op } from 'sequelize';

// Récupéreration de toutes les missions
export const getMissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const missions = await Missions.findAll();
        res.status(200).json(missions);
    } catch (error) {
        next(error);
    }
};

// Récupération des compétences associées à une mission
export const getPersonnelByMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        // Vérifier si la mission existe
        const mission = await Missions.findByPk(id);
        if (!mission) {
            res.status(404).json({ message: "Mission non trouvée" });
            return;
        }

        // Récupérer les personnels assignés à cette mission
        const assignedPersonnel = await Executer.findAll({
            where: { idM: id },
            include: [{ model: Personnel, as: 'Personnel' }]
        });

        // Vérifier si aucun personnel n'est affecté à cette mission
        if (assignedPersonnel.length === 0) {
            res.status(200).json({ message: "Aucun personnel n'est assigné à cette mission" });
            return;
        }

        // Construire la réponse avec les données des personnels
        const personnelList = assignedPersonnel.map(execution => ({
            idP: execution.Personnel.idP,
            nom: execution.Personnel.nomP,
            prenom: execution.Personnel.prenomP,
        }));

        res.status(200).json(personnelList);
    } catch (error) {
        console.error("Erreur lors de la récupération des personnels de la mission :", error);
        next(error);
    }
};


// Récupération d'une mission par son identifiant
export const getMissionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const mission = await Missions.findByPk(id);
        if (mission) {
            res.status(200).json(mission);
        } else {
            res.status(404).json({ error: 'Mission non trouvée' });
        }
    } catch (error) {
        next(error);
    }
};

// Ajouter une mission
export const addMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        next(error);
    }
};

// Mise à jour d'une mission
export const updateMission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nomM, descriptionM, dateDebutM, dateFinM, statutM, anomalieM } = req.body;

        const mission = await Missions.findByPk(id);

        if (!mission) {
            res.status(404).json({ error: "Mission non trouvée" });
            return;
        }

        if (nomM) mission.nomM = nomM;
        if (descriptionM) mission.descriptionM = descriptionM;
        if (dateDebutM) mission.dateDebutM = new Date(dateDebutM);
        if (dateFinM) mission.dateFinM = new Date(dateFinM);
        if (statutM) mission.statutM = statutM;
        if (anomalieM) mission.anomalieM = anomalieM;

        await mission.save();

        res.status(200).json(mission);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la mission :", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la mission" });
    }
};

// Suppression d'une mission avec son identifiant
export const deleteMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        next(error);
    }
};

// Ajout d'une compétence à une mission
export const addCompetenceToMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params; 
        const { idC, statutC } = req.body; 

        // S'assurer que idC est bien une chaîne de caractères
        const idCStr = String(idC);

        // Vérifier si la mission existe
        const mission = await Missions.findByPk(id);
        if (!mission) {
            res.status(404).json({ error: "Mission non trouvée" });
            return;
        }

        // Vérifier si la compétence existe
        const competence = await Competences.findByPk(idCStr);
        if (!competence) {
            res.status(404).json({ error: "Compétence non trouvée" });
            return;
        }

        // Vérifier si la compétence est déjà associée à la mission
        const existingRelation = await Caracteriser.findOne({
            where: { idM: id, idC: idCStr }
        });

        if (existingRelation) {
            res.status(400).json({ error: "Cette compétence est déjà associée à cette mission" });
            return;
        }

        // Vérifier que statutC est une valeur valide
        const validStatuts = ["satisfait", "non satisfait"];
        const statutValide = validStatuts.includes(statutC) ? statutC : "non satisfait"; 

        // Ajouter la compétence à la mission
        const newCaracteriser = await Caracteriser.create({
            idM: id,
            idC: idCStr,
            statutC: statutValide // Assurer une valeur correcte
        });

        res.status(201).json({ message: "Compétence ajoutée avec succès à la mission", data: newCaracteriser });

    } catch (error) {
        console.error("Erreur lors de l'ajout de la compétence à la mission :", error);
        next(error);
    }
};

// Suppression d'une compétence d'une mission
export const removeCompetenceFromMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id, idC } = req.params;

        // Vérifier si l'association existe
        const association = await Caracteriser.findOne({
            where: { idM: id, idC }
        });

        if (!association) {
            res.status(404).json({ message: "L'association entre la mission et la compétence n'existe pas." });
            return;
        }

        // Supprimer l'association
        await association.destroy();
        res.status(200).json({ message: "Compétence dissociée avec succès." });

    } catch (error) {
        console.error("Erreur lors de la suppression de la compétence de la mission :", error);
        next(error);
    }
};

// Suppression d'un personnel d'une mission
export const removePersonnelFromMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id, idP } = req.params;

        // Vérifier si l'association existe
        const association = await Executer.findOne({
            where: { idM: id, idP }
        });

        if (!association) {
            res.status(404).json({ message: "L'association entre la mission et le personnel n'existe pas." });
            return;
        }

        // Supprimer l'association
        await association.destroy();
        res.status(200).json({ message: "Personnel dissocié avec succès." });

    } catch (error) {
        console.error("Erreur lors de la suppression du personnel de la mission :", error);
        next(error);
    }
};

// Recommander du personnel pour une mission
export const recommendPersonnelForMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        // Vérifier si la mission existe
        const mission = await Missions.findByPk(id);
        if (!mission) {
            res.status(404).json({ message: "Mission non trouvée" });
            return;
        }

        // Récupérer les compétences requises pour la mission
        const requiredCompetences = await Caracteriser.findAll({
            where: { idM: id },
            include: [{ model: Competences, as: 'Competence' }]
        });

        // Si la mission existe mais n'a pas de compétences associées
        if (requiredCompetences.length === 0) {
            res.status(200).json({ message: "Cette mission n'a pas de compétences requises" });
            return;
        }

        const competenceIds = requiredCompetences.map(rc => rc.idC);

        // Rechercher le personnel ayant ces compétences
        const qualifiedPersonnel = await Disposer.findAll({
            where: { idC: { [Op.in]: competenceIds } },
            include: [
                { model: Personnel, as: 'Personnel' },
                { model: Competences, as: 'Competence' }
            ]
        });

        // Vérifier si aucun personnel n'est qualifié
        if (qualifiedPersonnel.length === 0) {
            res.status(404).json({ message: "Aucun personnel qualifié trouvé pour cette mission" });
            return;
        }

        // Trier d'abord les "confirmés", puis les "novices"
        const sortedPersonnel = qualifiedPersonnel.sort((a, b) => {
            if (a.aptitude === "confirmé" && b.aptitude !== "confirmé") return -1;
            if (a.aptitude !== "confirmé" && b.aptitude === "confirmé") return 1;
            return 0;
        });

        // Construire la liste des recommandations
        const recommendedPersonnel = sortedPersonnel.map(qp => ({
            idP: qp.Personnel.idP,
            nom: qp.Personnel.nomP,
            prenom: qp.Personnel.prenomP,
            competence: qp.Competence.nomCfr, 
            aptitude: qp.aptitude 
        }));

        res.status(200).json(recommendedPersonnel);
    } catch (error) {
        console.error("Erreur lors de la recommandation :", error);
        next(error);
    }
};

// Ajoute d'un personnel à une mission
export const addPersonnelToMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { idM, idP } = req.body;

        const mission = await Missions.findByPk(idM);
        const personnel = await Personnel.findByPk(idP);

        if (!mission || !personnel) {
            res.status(404).json({ message: "Mission ou personnel introuvable" });
            return;
        }

        // Vérifier si le personnel est déjà affecté à cette mission
        const existingAssignment = await Executer.findOne({
            where: { idM, idP }
        });

        if (existingAssignment) {
            res.status(400).json({ message: "Ce personnel est déjà assigné à cette mission." });
            return;
        }

        // Ajouter l'entrée dans la table "Executer" avec une date de début
        await Executer.create({ idM, idP, dateDebutE: new Date() });

        res.status(200).json({ message: "Personnel ajouté à la mission avec succès !" });
    } catch (error) {
        console.error("Erreur lors de l'ajout du personnel à la mission :", error);
        next(error);
    }
};

// Assigner du personnel à une mission
export const assignPersonnelToMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { idM, idP } = req.body;

        const mission = await Missions.findByPk(idM);
        const personnel = await Personnel.findByPk(idP);
        if (!mission || !personnel) {
            res.status(404).json({ message: "Mission ou personnel introuvable" });
            return;
        }

        const alreadyAssigned = await Executer.findOne({ where: { idM, idP } });
        if (alreadyAssigned) {
            res.status(400).json({ message: "Le personnel est déjà assigné à cette mission" });
            return;
        }

        // Assigner avec une date de début
        await Executer.create({ idM, idP, dateDebutE: new Date() });

        res.status(201).json({ message: "Personnel assigné avec succès" });
    } catch (error) {
        console.error("Erreur lors de l'assignation du personnel :", error);
        next(error);
    }
};
