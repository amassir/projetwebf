import { Request, Response } from 'express';
import Forum from '../models/forum';
import Utilisateur from '../models/utilisateur';
import Commentaire from '../models/commentaire';

type T = any;

// Récupérer toutes les discussions
export const getDiscussions = async (req: Request, res: Response) => {
    try {
        const discussions = await Forum.findAll({
            include: [
                { model: Utilisateur, attributes: ['prenomU', 'nomU'] },
                { model: Commentaire, include: [{ model: Utilisateur, attributes: ['prenomU', 'nomU'] }] }
            ],
        });
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des discussions" });
    }
};

// Ajouter une nouvelle discussion
export const addDiscussion = async (req: Request, res: Response): Promise<T> => {
    try {
        const { titreF, contenuF, idU} = req.body;
        const votesPositifs  = 0;
        const votesNegatifs = 0;
        if (!titreF || !contenuF || !idU) {
            return res.status(400).json({ error: "Tous les champs sont requis" });
        }
        const newDiscussion = await Forum.create({ 
            titreF, 
            contenuF,
            votesPositifs,
            votesNegatifs, 
            idU });
        res.status(201).json(newDiscussion);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de la discussion" });
    }
};

// Récupérer une discussion par ID
export const getDiscussionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const discussion = await Forum.findByPk(id, {
            include: [{ model: Utilisateur, attributes: ['prenomU', 'nomU'] }],
        });
        if (discussion) {
            res.status(200).json(discussion);
        } else {
            res.status(404).json({ error: "Discussion non trouvée" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la discussion" });
    }
};

// Ajouter un commentaire
export const addCommentaire = async (req: Request, res: Response): Promise<T> => {
    try {
        const { contenuC, idF, idU } = req.body;
        if (!contenuC || !idF || !idU) {
            return res.status(400).json({ error: "Tous les champs sont requis" });
        }
        const newCommentaire = await Commentaire.create({ contenuC, idF, idU });
        res.status(201).json(newCommentaire);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du commentaire" });
    }
};

// Gérer les votes d'une discussion
export const voteDiscussion = async (req: Request, res: Response): Promise<T> => {
    try {
        const { id, voteType } = req.params;
        const discussion = await Forum.findByPk(id);

        if (!discussion) {
            return res.status(404).json({ error: "Discussion non trouvée" });
        }

        if (voteType === 'up') {
            discussion.votesPositifs += 1;
        } else if (voteType === 'down') {
            discussion.votesNegatifs += 1;
        }

        await discussion.save();
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du vote" });
    }
};