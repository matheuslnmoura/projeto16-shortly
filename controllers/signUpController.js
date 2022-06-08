import chalk from 'chalk';
import bcrypt from 'bcrypt';

import connection from '../db.js';

export async function signUp(req, res) {
	try {
		const signUpData = res.locals.user;
		const { name, email, password } = signUpData;
		const cryptPassword = bcrypt.hashSync(password, 10);
		await connection.query(`
            INSERT INTO users (name, email, password)
            VALUES($1, $2, $3)
        `, [name, email, cryptPassword]);
        
		res.sendStatus(201);
	} catch (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(500);
	}
}