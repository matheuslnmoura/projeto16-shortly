import { Router } from 'express';

import validateLoginData from '../middlewares/loginValidation.js';
import { login } from '../controllers/loginController.js';

const loginRouter = Router();

loginRouter.post('/signin', validateLoginData, login);

export default loginRouter;