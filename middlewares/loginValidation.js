import chalk from 'chalk';
import joi from 'joi';
import bcrypt from 'bcrypt';


import connection from '../db.js';


export default async function validateLoginData(req, res, next) {
	const loginData = req.body;
    
	const loginDataSchema = joi.object({
		email: joi.string().email().required(),
		password: joi.string().required(),
	});

	const { error } = loginDataSchema.validate(loginData, { abortEarly: false });

	if (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(422);
	}

	const databaseUser = await checkDatabaseForEmail(loginData);
	if(databaseUser.length === 0) {
		console.log(chalk.bold.red('Email not found'));
		return res.status(409).send('This email is not registred yet. Try to sign up instead.');
	}
	
	const { password } = loginData;
	const { id, password: hashPassword } = databaseUser[0];

	const isValidPassword = bcrypt.compareSync(password, hashPassword);

	if (!isValidPassword) {
		console.log(chalk.bold.red('Incorrect Password'));
		return res.status(401).send('Incorrect Password');
	}
    
    

	res.locals.user = {id};
	next();
}

async function checkDatabaseForEmail(loginData) {

	const {email} = loginData;

	const databaseUser = (await connection.query(`
        SELECT * FROM users
        WHERE users.email = $1
    `, [email])).rows;
	return databaseUser;
}