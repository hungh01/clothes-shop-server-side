import { Router } from "express";
import { getMain } from "../controllers/admin";

import { checkRole } from "../middlewares/checkrole";
import { checkJwt } from "../middlewares/checkjwt";

const router = Router();

router.get('/',[checkJwt, checkRole(["admin"])], getMain);

export default router;