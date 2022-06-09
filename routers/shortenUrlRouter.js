import { Router } from 'express';

import validateToken from '../middlewares/tokenValidation.js';
import validadeUrl from '../middlewares/urlValidation.js';
import shortenURL from '../controllers/shortenUrlController.js';

const shortenUrlRouter = Router();

shortenUrlRouter.post('/urls/shorten', validateToken, validadeUrl, shortenURL);

export default shortenUrlRouter;