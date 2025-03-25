import { Request, Response, NextFunction } from 'express';
import Missions from '../models/missions';
import Caracteriser from '../models/caracteriser';
import Executer from '../models/executer';
import Disposer from '../models/disposer';
import Personnel from '../models/personnel';
import Competences from '../models/competences';
import { Op } from 'sequelize';

// Récupération de toutes les missions
export const getMissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const missions = await Missions.findAll();
        res.status(200).json(missions);
    } catch (error) {
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

// Récupération des personnels associés à une mission
export const getPersonnelByMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const mission = await Missions.findByPk(id);
        if (!mission) {
            res.status(404).json({ message: "Mission non trouvée" });
            return;
        }

        const assignedPersonnel = await Executer.findAll({
            where: { idM: id },
            include: [{ model: Personnel, as: 'Personnel' }]
        });

        if (assignedPersonnel.length === 0) {
            res.status(200).json({ message: "Aucun personnel n'est assigné à cette mission" });
            return;
        }

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

// Suppression d'une mission
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

        const idCStr = String(idC);

        const mission = await Missions.findByPk(id);
        if (!mission) {
            res.status(404).json({ error: "Mission non trouvée" });
            return;
        }

        const competence = await Competences.findByPk(idCStr);
        if (!competence) {
            res.status(404).json({ error: "Compétence non trouvée" });
            return;
        }

        const existingRelation = await Caracteriser.findOne({
            where: { idM: id, idC: idCStr }
        });

        if (existingRelation) {
            res.status(400).json({ error: "Cette compétence est déjà associée à cette mission" });
            return;
        }

        const validStatuts = ["satisfait", "non satisfait"];
        const statutValide = validStatuts.includes(statutC) ? statutC : "non satisfait";

        const newCaracteriser = await Caracteriser.create({
            idM: id,
            idC: idCStr,
            statutC: statutValide
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

        const association = await Caracteriser.findOne({
            where: { idM: id, idC }
        });

        if (!association) {
            res.status(404).json({ message: "L'association entre la mission et la compétence n'existe pas." });
            return;
        }

        await association.destroy();
        res.status(200).json({ message: "Compétence dissociée avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression de la compétence de la mission :", error);
        next(error);
    }
};

// Ajout de personnel à une mission
export const addPersonnelToMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { idM, idP } = req.body;

        const mission = await Missions.findByPk(idM);
        const personnel = await Personnel.findByPk(idP);

        if (!mission || !personnel) {
            res.status(404).json({ message: "Mission ou personnel introuvable" });
            return;
        }

        const existingAssignment = await Executer.findOne({
            where: { idM, idP }
        });

        if (existingAssignment) {
            res.status(400).json({ message: "Ce personnel est déjà assigné à cette mission." });
            return;
        }

        await Executer.create({ idM, idP, dateDebutE: new Date() });

        res.status(200).json({ message: "Personnel ajouté à la mission avec succès !" });
    } catch (error) {
        console.error("Erreur lors de l'ajout du personnel à la mission :", error);
        next(error);
    }
};

// Suppression de personnel d'une mission
export const removePersonnelFromMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id, idP } = req.params;

        const association = await Executer.findOne({
            where: { idM: id, idP }
        });

        if (!association) {
            res.status(404).json({ message: "L'association entre la mission et le personnel n'existe pas." });
            return;
        }

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

        const mission = await Missions.findByPk(id);
        if (!mission) {
            res.status(404).json({ message: "Mission non trouvée" });
            return;
        }

        const requiredCompetences = await Caracteriser.findAll({
            where: { idM: id },
            include: [{ model: Competences, as: 'Competence' }]
        });

        if (requiredCompetences.length === 0) {
            res.status(200).json({ message: "Cette mission n'a pas de compétences requises" });
            return;
        }

        const competenceIds = requiredCompetences.map(rc => rc.idC);

        const qualifiedPersonnel = await Disposer.findAll({
            where: { idC: { [Op.in]: competenceIds } },
            include: [
                { model: Personnel, as: 'Personnel' },
                { model: Competences, as: 'Competence' }
            ]
        });

        if (qualifiedPersonnel.length === 0) {
            res.status(404).json({ message: "Aucun personnel qualifié trouvé pour cette mission" });
            return;
        }

        const sortedPersonnel = qualifiedPersonnel.sort((a, b) => {
            if (a.aptitude === "confirmé" && b.aptitude !== "confirmé") return -1;
            if (a.aptitude !== "confirmé" && b.aptitude === "confirmé") return 1;
            return 0;
        });

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

// Mettre à jour le statut d'une mission
export const updateMissionStatut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;


        // Récupérer la mission par son ID
        const mission = await Missions.findByPk(id);
        if (!mission) {
            res.status(404).json({ error: 'Mission non trouvée.' });
            return;
        }


        // Gestion automatique du statut en fonction des conditions et du statut actuel
        switch (mission.statutM) {
            case 'en préparation': {
                // Vérifier si des compétences et des personnels sont assignés
                const competences = await Caracteriser.findAll({ where: { idM: id } });
                const personnels = await Executer.findAll({ where: { idM: id } });


                if (competences.length > 0 && personnels.length > 0) {
                    mission.statutM = 'planifiée';
                    await mission.save();
                    res.status(200).json({ message: 'La mission est maintenant planifiée.', mission });
                } else {
                    res.status(400).json({ error: 'La mission doit avoir des compétences et des personnels assignés pour être planifiée.' });
                }
                break;
            }


            case 'planifiée': {
                // Vérifier si la date de début est atteinte pour passer à "en cours"
                if (new Date() >= new Date(mission.dateDebutM)) {
                    mission.statutM = 'en cours';
                    await mission.save();
                    res.status(200).json({ message: 'La mission est maintenant en cours.', mission });
                } else {
                    res.status(400).json({ error: 'La mission ne peut pas être mise en cours avant la date de début.' });
                }
                break;
            }


            case 'en cours': {
                // Vérifier si la date de fin est atteinte pour passer à "terminée"
                if (new Date() >= new Date(mission.dateFinM)) {
                    mission.statutM = 'terminée';
                    await mission.save();
                    res.status(200).json({ message: 'La mission est maintenant terminée.', mission });
                } else {
                    res.status(400).json({ error: 'La mission ne peut pas être terminée avant la date de fin.' });
                }
                break;
            }


            case 'terminée': {
                res.status(400).json({ error: 'La mission est déjà terminée et ne peut pas être modifiée.' });
                break;
            }


            default: {
                res.status(400).json({ error: 'Statut de la mission non reconnu.' });
                break;
            }
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de la mission:', error);
        next(error);
    }
};


// Mise à jour automatique du statut d'une mission
export const updateMissionStatusAutomatically = async (mission: Missions): Promise<void> => {
    const today = new Date();

    if (today >= new Date(mission.dateFinM)) {
        if (mission.statutM !== 'terminée') {
            mission.statutM = 'terminée';
            await mission.save();
            console.log(`Mission ${mission.idM} est maintenant terminée.`);
        }
        return;
    }

    switch (mission.statutM) {
        case 'en préparation': {
            const competences = await Caracteriser.findAll({ where: { idM: mission.idM } });
            const personnels = await Executer.findAll({ where: { idM: mission.idM } });

            if (competences.length > 0 && personnels.length > 0) {
                mission.statutM = 'planifiée';
                await mission.save();
            }
            break;
        }

        case 'planifiée': {
            if (today >= new Date(mission.dateDebutM)) {
                mission.statutM = 'en cours';
                await mission.save();
            }
            break;
        }

        case 'en cours': {
            if (today >= new Date(mission.dateFinM)) {
                mission.statutM = 'terminée';
                await mission.save();
            }
            break;
        }
    }
};