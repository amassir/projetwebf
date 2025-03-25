import { DataTypes, Model } from 'sequelize';
import sequelize from '../bd/bd';

// Classe de la table Utilisateur avec Sequelize
export class Utilisateur extends Model {
    public idU!: number;
    public prenomU!: string;
    public nomU!: string;
    public emailU!: string;
    public mdpU!: string;
}

// Initialisation du modèle Utilisateur
Utilisateur.init({
    idU: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    prenomU: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nomU: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailU: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mdpU: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Utilisateur',
    tableName: 'Utilisateur',
    timestamps: false,
});

export default Utilisateur;