import { Router } from "express"
import * as userController from "../controllers/userController.js";
const router = new Router();

router.post('/reg', userController.reg );
router.post('/login', userController.login);
router.post('/logout', userController.logout );

router.get('/activate/:link', userController.activate );
router.get('/refresh', userController.refresh );
router.get('/users', userController.getUsers);

export default router;

