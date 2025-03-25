import { DataTypes, Model } from 'sequelize';
import sequelize from '../bd/bd';
import Utilisateur from './utilisateur'; 

// Classe de la table Forum avec Sequelize
export class Forum extends Model {
    public idF!: number;
    public titreF!: string;
    public contenuF!: string;
    public votesPositifs!: number;
    public votesNegatifs!: number;
    public idU!: number; 
}

// Initialisation du modèle Forum
Forum.init({
    idF: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titreF: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contenuF: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    votesPositifs: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    votesNegatifs: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
    modelName: 'Forum',
    tableName: 'Forum',
    timestamps: false, 
});

// Association avec les utilisateurs
Forum.belongsTo(Utilisateur, { foreignKey: 'idU', as: 'Utilisateur' });

export default Forum;