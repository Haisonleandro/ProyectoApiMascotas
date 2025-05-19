// src/routers/petsRouterhltl.js
import { Router } from "express";
import { verifyTokenhltl } from "../controllers/authControllerhltl.js";
import {
    createPethltl,
    getPetshltl,
    getPetByIdhltl,
    updatePethltl,
    deletePethltl
} from "../controllers/petsControllerhltl.js";
import { subirArchivo } from "../config/multer.js"; 

const routerMascotas = Router();

routerMascotas
    .route("/petshltl")
    .post(subirArchivo.single("photo"), verifyTokenhltl, createPethltl)
    .get(verifyTokenhltl, getPetshltl);

routerMascotas
    .route("/petshltl/:id")
    .get(verifyTokenhltl, getPetByIdhltl)
    .post(subirArchivo.single("photo"), verifyTokenhltl, updatePethltl) 
    .delete(verifyTokenhltl, deletePethltl);

export { routerMascotas as petRouterhltl };
