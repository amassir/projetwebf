import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

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

sequelize.authenticate().then(() => {
    console.log("Connexion établie avec la base de données");
}).catch((error) => {
    console.log("Erreur de connexion avec la base de données", error);
});


export default sequelize;
