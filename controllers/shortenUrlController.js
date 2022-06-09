import chalk from 'chalk';
import { nanoid } from 'nanoid';

import connection from '../db.js';


export default async function shortenURL(req,res) {
	try {
		const {url} = res.locals.user;
		const shortUrl = nanoid(6);
		const {userId} = res.locals.user;

		await connection.query(`
		    INSERT INTO urls ("shortUrl", url, "userId")
		    VALUES ($1, $2, $3)
		`, [shortUrl, url, userId]);

		res.status(201).send({shortUrl});
	} catch (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(500);
	}
}