import { Router } from 'express';

import validateSignUpData from '../middlewares/signUpValidation.js';
import { signUp } from '../controllers/signUpController.js';

const signUpRouter = Router();

signUpRouter.post('/signup', validateSignUpData, signUp);

export default signUpRouter;