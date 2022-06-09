import chalk from 'chalk';
import { nanoid } from 'nanoid';

import connection from '../db.js';


export default async function shortenURL(req,res) {
	try {
		const url = req.body.url;
		const shortUrl = nanoid(6);
		const userIdObj = res.locals.user;
		const {userId} = userIdObj;

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