import { Router } from "express";
import { verifyTokenhltl } from "../controllers/authControllerhltl.js";
import { 
    createUserhltl, 
    getUserhltl, 
    getUserByIdhltl, 
    updateUserhltl, 
    deleteUserhltl 
} from "../controllers/userControllerhltl.js";

const routerUsuarios = Router();

routerUsuarios
    .route("/usershltl")
    .post(createUserhltl)
    .get(getUserhltl);

routerUsuarios
    .route("/usershltl/:id")
    .get(verifyTokenhltl, getUserByIdhltl)
    .put(verifyTokenhltl, updateUserhltl)
    .delete(verifyTokenhltl, deleteUserhltl);

export { routerUsuarios as UserRouterhltl };