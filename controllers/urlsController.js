import chalk from 'chalk';

import connection from '../db.js';

export async function getUrl(req,res) {
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

export async function openUrl(req, res) {
	try {
		const shortUrlObj = req.params;
		const {shortUrl} = shortUrlObj;

		const dataBaseUrl = (await connection.query(`
		    SELECT urls.url, urls."visitCount"
		    FROM urls
		    WHERE urls."shortUrl" = ($1)
		`, [shortUrl])).rows[0];

		if(!dataBaseUrl) {
			return res.status(404).send('Url not found :(');
		}

		const {url: redirectUrl, visitCount} = dataBaseUrl; 
		updateVisitCount(shortUrl, visitCount);

		return res.redirect(200, redirectUrl);

	} catch (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(500);
	}
}

async function updateVisitCount(shortUrl, visitCount) {
	visitCount++;
	await connection.query(`
	    UPDATE urls SET "visitCount" = ($1)
        WHERE "shortUrl" = ($2)
	`, [visitCount, shortUrl]);

}