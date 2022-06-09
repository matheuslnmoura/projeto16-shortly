import chalk from 'chalk';

import connection from '../db.js';

export default async function getUrl(req,res) {
	try {
		const urlIdObj = req.params;
		const {id} = urlIdObj;

		const dataBaseUrl = (await connection.query(`
            SELECT urls.id, urls."shortUrl", urls.url
            FROM urls
            WHERE urls.id = ($1)
        `, [id])).rows[0];

		if(!dataBaseUrl) {
			return res.status(404).send('Url not found :(');
		}

		return res.status(200).send(dataBaseUrl);
	} catch (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(500);
	}
}