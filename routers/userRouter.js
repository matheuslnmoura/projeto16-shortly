import { Router } from 'express';

import {getUser} from '../controllers/usersController.js';
import validateToken from '../middlewares/tokenValidation.js';


const usersRouter = Router();

usersRouter.get('/users/:id', validateToken, getUser);
export default usersRouter;