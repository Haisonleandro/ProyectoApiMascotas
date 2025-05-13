import { Router } from "express";
import { verifyTokenhltl } from "../controllers/authControllerhltl.js";
import { 
    createGenderhltl, 
    getGendershltl, 
    getGenderByIdhltl, 
    updateGenderhltl, 
    deleteGenderhltl 
} from "../controllers/gendersController_hltl.js";

const genderRouter = Router();

genderRouter
    .route("/genderhltl")
    .post(verifyTokenhltl, createGenderhltl)
    .get(verifyTokenhltl, getGendershltl);

genderRouter
    .route("/genderhltl/:id")
    .get(verifyTokenhltl, getGenderByIdhltl)
    .put(verifyTokenhltl, updateGenderhltl)
    .delete(verifyTokenhltl, deleteGenderhltl);

export { genderRouter as genderRouterhltl };