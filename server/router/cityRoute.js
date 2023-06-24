import { Router } from "express";
import { createCity, getUser, populateUser } from "../controllers/mongo.js";

const router = Router();

router.post('/createCity', createCity);
router.get('/getUser', getUser);
router.get('/populateUser', populateUser);

export default router;