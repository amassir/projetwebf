import { DataTypes, Model } from 'sequelize';
import sequelize from '../bd/bd';

// Classe de la table Personnel avec Sequelize
export class Personnel extends Model {
    public idP!: number;
    public nomP!: string;
    public prenomP!: string;
    public dateEmbaucheP!: Date;
    public activiteP!: string;
    public statutP!: string;
}

// Initialisation du modèle Personnel
Personnel.init({
        idP: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nomP: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prenomP: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateEmbaucheP: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        activiteP: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        statutP: {
            type: DataTypes.STRING,
            allowNull: false,
        },},
    {
        sequelize,
        modelName: 'Personnel',
        tableName: 'Personnel',
        timestamps: false,
    }
);

export default Personnel;