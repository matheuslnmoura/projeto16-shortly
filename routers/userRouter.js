import { Router } from 'express';

import {getUser, getUsersRank} from '../controllers/usersController.js';
import validateToken from '../middlewares/tokenValidation.js';


const usersRouter = Router();

usersRouter.get('/users/:id', validateToken, getUser);
usersRouter.get('/ranking', getUsersRank);

export default usersRouter;