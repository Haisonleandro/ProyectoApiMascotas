import { Router } from "express";
import { loginUserhltl } from "../controllers/authControllerhltl.js";

const authRouter = Router();

authRouter.post("/loginhltl", loginUserhltl);

export { authRouter as LoginRouterhltl };