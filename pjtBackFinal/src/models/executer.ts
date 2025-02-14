import { DataTypes, Model } from "sequelize";
import sequelize from "../bd/bd";
import {Missions} from "./missions";
import {Personnel} from "./personnel";

export class Executer extends Model {
    public idM!: number;
    public idP!: number;
    public dateDebutE!: Date;
    Personnel: any;
}

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
        },},
    {
        sequelize,
        modelName: 'Executer',
        tableName: 'Executer',
        timestamps: false,
    }

);

Executer.belongsTo(Missions, {foreignKey: 'idM'});
Executer.belongsTo(Personnel, {foreignKey: 'idP'})

export default Executer;