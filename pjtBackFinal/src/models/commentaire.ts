import { DataTypes, Model } from 'sequelize';
import sequelize from '../bd/bd';
import Forum from './forum';
import Utilisateur from './utilisateur';

export class Commentaire extends Model {
    public idO!: number;
    public contenuC!: string;
    public idF!: number;
    public idU!: number;
}

Commentaire.init({
    idO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contenuC: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    idF: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Forum',
            key: 'idF',
        },
        onDelete: 'CASCADE',
    },
    idU: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Utilisateur',
            key: 'idU',
        },
        onDelete: 'CASCADE',
    },
}, {
    sequelize,
    modelName: 'Commentaire',
    tableName: 'Commentaire',
    timestamps: false,
});

Commentaire.belongsTo(Forum, { foreignKey: 'idF', as: 'Forum' });
Commentaire.belongsTo(Utilisateur, { foreignKey: 'idU', as: 'Utilisateur' });

export default Commentaire;