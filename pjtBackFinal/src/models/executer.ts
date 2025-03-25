import { DataTypes, Model } from "sequelize";
import sequelize from "../bd/bd";
import {Missions} from "./missions";
import {Personnel} from "./personnel";

// Classe de la table Executer avec Sequelize
export class Executer extends Model {
    public idM!: number;
    public idP!: number;
    public dateDebutE!: Date;
    Personnel: any;
    Mission: any;
}

// Initialisation du modèle Executer
Executer.init({
        idM: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Missions',
                key: 'idM',
            },
            onDelete: 'CASCADE',
        },
        idP: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Personnel',
                key: 'idP',
            },
            onDelete: 'CASCADE',
        },
        dateDebutE: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, 
        },},
    {
        sequelize,
        modelName: 'Executer',
        tableName: 'Executer',
        timestamps: false,
    }

);

// Association avec les missions et les personnels
Executer.belongsTo(Missions, { foreignKey: 'idM', as: 'Mission' });
Executer.belongsTo(Personnel, { foreignKey: 'idP', as: 'Personnel' });

export default Executer;