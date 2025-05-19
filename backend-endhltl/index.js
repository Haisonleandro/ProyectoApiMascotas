import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import dotenv from "dotenv";
import cors from "cors";

import { UserRouterhltl } from "./src/routers/userRouterhltl.js";
import { LoginRouterhltl } from "./src/routers/authRouterhltl.js";
import { genderRouterhltl } from "./src/routers/gendersRouterhltl.js";
import { categoryRouterhltl } from "./src/routers/categoryRouterhltl.js";
import { petRouterhltl } from "./src/routers/petsRouterhltl.js";
import { raceRouterhltl } from "./src/routers/raceRouterhltl.js";
import { reporteRouterhltl } from "./src/routers/reporteRouterhltl.js";

dotenv.config();

const servidor = express();

// Configuración de middlewares
servidor.use(cors());
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos de imágenes
servidor.use("/imagenes", express.static("images"));


const swaggerDoc = YAML.load("./src/docs/swagger.yaml");
servidor.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Registro de rutas
servidor.use(UserRouterhltl);
servidor.use(LoginRouterhltl);
servidor.use(genderRouterhltl);
servidor.use(categoryRouterhltl);
servidor.use(petRouterhltl);
servidor.use(raceRouterhltl);
servidor.use(reporteRouterhltl);


servidor.listen(3000, '0.0.0.0', () => {
    console.log(`Servidor iniciado en : http://192.168.1.2:3000`);
});