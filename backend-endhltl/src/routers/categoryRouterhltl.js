import { Router } from "express";
import { verifyTokenhltl } from "../controllers/authControllerhltl.js";
import { 
    createCategoryhltl, 
    getCategorieshltl, 
    getCategoryByIdhltl, 
    updateCategoryhltl, 
    deleteCategoryhltl 
} from "../controllers/categoryController_hltl.js";

const router = Router();

router
    .route("/categoryhltl")
    .post(verifyTokenhltl, createCategoryhltl)
    .get(verifyTokenhltl, getCategorieshltl);

router
    .route("/categoryhltl/:id")
    .get(verifyTokenhltl, getCategoryByIdhltl)
    .put(verifyTokenhltl, updateCategoryhltl)
    .delete(verifyTokenhltl, deleteCategoryhltl);

export { router as categoryRouterhltl };