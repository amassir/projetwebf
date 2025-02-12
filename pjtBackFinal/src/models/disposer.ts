import { DataTypes, Model } from "sequelize";
import sequelize from "../bd/bd";
import {Competences} from "./competences";
import {Personnel} from "./personnel";

export class Disposer extends Model {
    public idP!: number;
    public idC!: number;
    public aptitude!: 'novice' | 'confirmé';
    Competence: any;
}

Disposer.init({
        idP: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Personnel',
                key: 'idP',
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
        aptitude: {
            type: DataTypes.ENUM('novice','confirmé'),
            allowNull: false,
        },},
    {
        sequelize,
        modelName: 'Disposer',
        tableName: 'Disposer',
        timestamps: false,
    }
);

Disposer.belongsTo(Personnel, {foreignKey: 'idP'});
Disposer.belongsTo(Competences, {foreignKey: 'idC'})

export default Disposer;