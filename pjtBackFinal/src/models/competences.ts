import { DataTypes, Model } from 'sequelize';
import sequelize from '../bd/bd';

export class Competences extends Model {
    public idC!: number;
    public nomCfr!: string;
    public nomCen!: string;
}

Competences.init({
        idC: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true,
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