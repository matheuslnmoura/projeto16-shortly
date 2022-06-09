import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';

import signUpRouter from './routers/signUpRouter.js';
import loginRouter from './routers/loginRouter.js';
import shortenUrlRouter from './routers/shortenUrlRouter.js';


const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(signUpRouter);
app.use(loginRouter);
app.use(shortenUrlRouter);


// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
	// eslint-disable-next-line no-undef
	console.log(chalk.bold.blue('Server running on port ', process.env.PORT));
});