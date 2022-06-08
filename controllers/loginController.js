import chalk from 'chalk';
import { query } from 'express';
import { v4 as uuid } from 'uuid';

import connection from '../db.js';


export async function login(req, res) {
	try {
		const loginData = res.locals.user;
		const { id } = loginData;
		const token = uuid();

		await connection.query(`
            UPDATE sessions SET "isValid" = false
            WHERE "userId" = $1 AND "isValid" = true
        `, [id]);

		await connection.query(`
		    INSERT INTO sessions ("userId", token)
		    VALUES($1, $2)
		`, [id, token]);
		
		res.status(200).send({token});
	} catch (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(500);
	}
}