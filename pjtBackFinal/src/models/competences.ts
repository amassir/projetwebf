import { DataTypes, Model } from 'sequelize';
import sequelize from '../bd/bd';

// Classe de la table Competences avec Sequelize
export class Competences extends Model {
    public idC!: string;
    public nomCfr!: string;
    public nomCen!: string;
}

// Initialisation du modèle Competences
Competences.init({
        idC: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        nomCen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nomCfr: {
            type: DataTypes.STRING,
            allowNull: false,
        },},
    {
        sequelize,
        modelName: 'Competences',
        tableName: 'Competences',
        timestamps: false,
    }
);

export default Competences;