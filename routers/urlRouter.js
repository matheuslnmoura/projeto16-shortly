import { Router } from 'express';

import {getUrl, openUrl} from '../controllers/urlsController.js';
import validateToken from '../middlewares/tokenValidation.js';

const urlRouter = Router();

urlRouter.get('/urls/:id', getUrl);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.delete('/urls/:id', validateToken, getUrl);

export default urlRouter;