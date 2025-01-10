import { Router } from "express";
import { getMain, getProductTypes, createProductType} from "../controllers/admin";


import { checkRole } from "../middlewares/checkrole";
import { checkJwt } from "../middlewares/checkjwt";

const router = Router();

router.get('/',[checkJwt, checkRole(["admin"])], getMain);
router.get('/getproducttypes',[checkJwt, checkRole(["admin"])], getProductTypes);
router.post('/createproducttype',[checkJwt, checkRole(["admin"])], createProductType);



export default router;