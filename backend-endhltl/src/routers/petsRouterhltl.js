import { Router } from "express";
import { verifyTokenhltl } from "../controllers/authControllerhltl.js";
import {
    createPethltl,
    getPetshltl,
    getPetByIdhltl,
    updatePethltl,
    deletePethltl
} from "../controllers/petsControllerhltl.js";
import { upload } from "../config/multer.js";

const routerMascotas = Router();

routerMascotas
    .route("/petshltl")
    .post(upload.single("photo"), verifyTokenhltl, createPethltl)
    .get(verifyTokenhltl, getPetshltl);

routerMascotas
    .route("/petshltl/:id")
    .get(verifyTokenhltl, getPetByIdhltl)
    .post(upload.single("photo"), verifyTokenhltl, updatePethltl)
    .delete(verifyTokenhltl, deletePethltl);

export { routerMascotas as petRouterhltl };