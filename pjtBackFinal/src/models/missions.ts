import { DataTypes, Model } from 'sequelize';
import sequelize from '../bd/bd';

export class Missions extends Model {
    public idM!: number;
    public nomM!: string;
    public descriptionM!: string;
    public dateDebutM!: Date;
    public dateFinM!: Date;
    public statutM!: 'en préparation' | 'planifiée' | 'en cours' | 'terminée';
    public anomalieM!: string;
}

Missions.init({
        idM: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nomM: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptionM: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateDebutM: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dateFinM: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        statutM: {
            type: DataTypes.ENUM('en préparation','planifiée','en cours','terminée'),
            allowNull: false,
        },
        anomalieM: {
            type: DataTypes.STRING,
        },},
    {
        sequelize,
        modelName: 'Missions',
        tableName: 'Missions',
        timestamps: false,
    }
)

export default Missions;