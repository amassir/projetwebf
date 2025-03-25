import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Configuration de dotenv
dotenv.config();

// Connexion à la base de données
const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: Number(process.env.DB_PORT),
        logging: false,
    }
);

// Test de la connexion
sequelize.authenticate().then(() => {
    console.log("Connexion établie avec la base de données");
}).catch((error) => {
    console.log("Erreur de connexion avec la base de données", error);
});


export default sequelize;
