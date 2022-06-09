import { Router } from 'express';

import getUrl from '../controllers/urlsController.js';

const urlRouter = Router();

urlRouter.get('/urls/:id', getUrl);

export default urlRouter;