import { Request, Response, NextFunction } from 'express';
import Missions from '../models/missions';
import Caracteriser from '../models/caracteriser';
import Executer from '../models/executer';
import Disposer from '../models/disposer';
import Personnel from '../models/personnel';
import Competences from '../models/competences';
import { Op } from 'sequelize';

// ✅ Récupérer toutes les missions
export const getMissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const missions = await Missions.findAll();
        res.status(200).json(missions);
    } catch (error) {
        next(error);
    }
};

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


// ✅ Récupérer une mission par ID
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

// ✅ Ajouter une mission
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

// ✅ Modifier le statut d'une mission
export const updateMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { statutM } = req.body;

        const mission = await Missions.findByPk(id);
        if (mission) {
            if (statutM) mission.statutM = statutM;

            await mission.save();
            res.status(200).json(mission);
        } else {
            res.status(404).json({ error: "Mission non trouvée" });
        }
    } catch (error) {
        next(error);
    }
};

// ✅ Supprimer une mission
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

// ✅ Ajouter une compétence à une mission
export const addCompetenceToMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { idC, statutC } = req.body;

        const newCaracteriser = await Caracteriser.create({
            idM: id,
            idC,
            statutC
        });

        res.status(201).json(newCaracteriser);
    } catch (error) {
        next(error);
    }
};

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
            competence: qp.Competence.nomCfr, // ou qp.Competence.nomCen
            aptitude: qp.aptitude // "confirmé" ou "novice"
        }));

        res.status(200).json(recommendedPersonnel);
    } catch (error) {
        console.error("Erreur lors de la recommandation :", error);
        next(error);
    }
};

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
