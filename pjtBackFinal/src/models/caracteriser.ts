import { DataTypes, Model } from 'sequelize';
import sequelize from '../bd/bd';
import {Competences} from "./competences";
import {Missions} from "./missions";

// Classe de la table Caracteriser avec Sequelize
export class Caracteriser extends Model {
    public idM!: number;
    public idC!: string;
    public statutC!: 'non satisfait' | 'satisfait';
    Competence: any;
}

// Initialisation du modèle Caracteriser
Caracteriser.init({
        idM: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Missions',
                key: 'idM',
            },
            onDelete: 'CASCADE',
        },
        idC: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: 'Competences',
                key: 'idC',
            },
            onDelete: 'CASCADE',
        },
        statutC: {
            type: DataTypes.ENUM('non satisfait','satisfait'),
            allowNull: false,
        },},
    {
        sequelize,
        modelName: 'Caracteriser',
        tableName: 'Caracteriser',
        timestamps: false,
    }
);

// Association avec les compétences et les missions
Caracteriser.belongsTo(Missions, {foreignKey: 'idM'});
Caracteriser.belongsTo(Competences, {foreignKey: 'idC'})

export default Caracteriser;