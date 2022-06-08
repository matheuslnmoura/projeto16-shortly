import chalk from 'chalk';
import joi from 'joi';

import connection from '../db.js';


export default async function validateSignUpData(req, res, next) {
	const signUpData = req.body;
    
	const signUpDataSchema = joi.object({
		name: joi.string().required(),
		email: joi.string().email().required(),
		password: joi.string().required(),
		confirmPassword: joi.string().required().valid(joi.ref('password')),
	});

	const { error } = signUpDataSchema.validate(signUpData, { abortEarly: false });

	if (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(400);
	}

	const databaseEmail = await checkDatabaseForEmail(signUpData);
	if(databaseEmail.length > 0) {
		console.log(chalk.bold.red('Existing Email'));
		return res.status(409).send('This email has already been registred. Try to login instead.');
	}

	res.locals.user = signUpData;
	next();
}

async function checkDatabaseForEmail(signUpData) {

	const {email} = signUpData;

	const databaseEmail = (await connection.query(`
        SELECT users.id FROM users
        WHERE users.email = $1
    `, [email])).rows;
	return databaseEmail;
}