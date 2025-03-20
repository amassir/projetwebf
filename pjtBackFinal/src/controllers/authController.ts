import { Request, Response } from 'express';
import Utilisateur from '../models/utilisateur';

type T = any

// Inscription
export const register = async (req: Request, res: Response): Promise<T> => {
    try {
        const { nomU, prenomU, emailU, mdpU } = req.body;

        // Vérifier si l'email existe déjà
        const existingUser = await Utilisateur.findOne({ where: { emailU } });
        if (existingUser) {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }

        const newUser = await Utilisateur.create({ 
            nomU, 
            prenomU, 
            emailU, 
            mdpU 
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'inscription." });
    }
};

// Connexion
export const login = async (req: Request, res: Response): Promise<T> => {
    try {
        const { emailU, mdpU } = req.body;

        // Vérifier les informations de connexion
        const user = await Utilisateur.findOne({ where: { emailU, mdpU } });
        if (!user) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect." });
        }

        res.status(200).json({ message: "Connexion réussie.", user });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la connexion." });
    }
};