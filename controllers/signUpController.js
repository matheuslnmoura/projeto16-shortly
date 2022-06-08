import chalk from 'chalk';
import connection from '../db.js';

export async function signUp(req, res) {
	try {
		console.log('Sucesso');
		res.sendStatus(200);
	} catch (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(500);
	}
}