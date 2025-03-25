import { Request, Response } from 'express';
import Forum from '../models/forum';
import Commentaire from '../models/commentaire';
import Utilisateur from '../models/utilisateur';

type T = any;

// Créer un forum
export const createForum = async (req: Request, res: Response): Promise<T> => {
    try {
        const { titreF, contenuF, idU } = req.body;

        // Vérifier que l'utilisateur existe
        const user = await Utilisateur.findByPk(idU);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        // Créer le forum
        const forum = await Forum.create({ titreF, contenuF, idU });
        res.status(201).json(forum);
    } catch (error) {
        console.error('Erreur lors de la création du forum :', error);
        res.status(500).json({ error: "Erreur lors de la création du forum." });
    }
};

// Récupérer tous les forums
export const getForums = async (req: Request, res: Response) => {
    try {
        const forums = await Forum.findAll({
            include: [{ model: Utilisateur, as: 'Utilisateur' }], 
        });
        res.status(200).json(forums);
    } catch (error) {
        console.error('Erreur lors de la récupération des forums :', error);
        res.status(500).json({ error: "Erreur lors de la récupération des forums." });
    }
};

// Créer un commentaire
export const createComment = async (req: Request, res: Response): Promise<T> => {
    try {
        const { contenuC, idU } = req.body;
        const { id } = req.params;

        // Vérifier que le forum existe
        const forum = await Forum.findByPk(id);
        if (!forum) {
            return res.status(404).json({ error: "Forum non trouvé." });
        }

        // Créer le commentaire
        const commentaire = await Commentaire.create({ contenuC, idF: id, idU });
        res.status(201).json(commentaire);
    } catch (error) {
        console.error('Erreur lors de la création du commentaire :', error);
        res.status(500).json({ error: "Erreur lors de la création du commentaire." });
    }
};

// Récupérer les commentaires d'un forum
export const getCommentsByForum = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // ID du forum

        // Récupérer les commentaires associés au forum
        const commentaires = await Commentaire.findAll({
            where: { idF: id },
            include: [{ model: Utilisateur, as: 'Utilisateur' }], 
        });
        res.status(200).json(commentaires);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
        res.status(500).json({ error: "Erreur lors de la récupération des commentaires." });
    }
};