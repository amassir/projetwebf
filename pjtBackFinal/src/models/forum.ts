import { DataTypes, Model } from 'sequelize';
import sequelize from '../bd/bd';
import Utilisateur from './utilisateur'; 

export class Forum extends Model {
    public idF!: number;
    public titreF!: string;
    public contenuF!: string;
    public votesPositifs!: number;
    public votesNegatifs!: number;
    public idU!: number; 
}

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
    timestamps: true, 
});
Forum.belongsTo(Utilisateur, { foreignKey: 'idU', as: 'Utilisateur' });

export default Forum;