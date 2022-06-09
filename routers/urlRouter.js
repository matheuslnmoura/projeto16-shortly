import { Router } from 'express';

import {getUrl, openUrl} from '../controllers/urlsController.js';

const urlRouter = Router();

urlRouter.get('/urls/:id', getUrl);
urlRouter.get('/urls/open/:shortUrl', openUrl);

export default urlRouter;