import { Router } from 'express';

import { signUp } from '../controllers/signUpController.js';

const signUpRouter = Router();

signUpRouter.post('/signup', signUp);

export default signUpRouter;