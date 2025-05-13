import { Router } from "express";
import { verifyTokenhltl } from "../controllers/authControllerhltl.js";
import { 
    createRacehltl, 
    getRaceshltl, 
    getRaceByIdhltl, 
    updateRacehltl, 
    deleteRacehltl 
} from "../controllers/racesControllerhltl.js";

const routerRazas = Router();

routerRazas
    .route("/racehltl")
    .post(verifyTokenhltl, createRacehltl)
    .get(verifyTokenhltl, getRaceshltl);

routerRazas
    .route("/racehltl/:id")
    .get(verifyTokenhltl, getRaceByIdhltl)
    .put(verifyTokenhltl, updateRacehltl)
    .delete(verifyTokenhltl, deleteRacehltl);

export { routerRazas as raceRouterhltl };