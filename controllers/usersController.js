import chalk from 'chalk';

import connection from '../db.js';

export async function getUser(req,res) {
	try {
		const userId = req.params.id;
		const tokenUserIdObj = res.locals.user;
		const {userId: tokenUserId} = tokenUserIdObj;

		if(parseInt(userId) !== parseInt(tokenUserId)) {
			return res.status(401).send('Invalid token!');
		}

		const dataBaseUser = (await connection.query(`
            SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount"
            FROM urls
            JOIN users ON urls."userId" = users.id
            WHERE users.id = ($1)
            GROUP BY users.id, users.name
        `, [userId])).rows[0];

		const dataBaseUrls = (await connection.query(`
            SELECT id, "shortUrl", url, "visitCount"
            FROM urls
            WHERE urls."userId" = ($1)
        `, [userId])).rows;

		const responseObj = { 
			...dataBaseUser,
			shortenedUrls: dataBaseUrls
		};

		return res.status(200).send(responseObj);
	} catch (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(500);
	}
}

export async function getUsersRank(req,res) {
	try {
		const dataBaseRank = (await connection.query(`
            SELECT users.id, users.name, COUNT(urls.id), COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
            FROM urls
            RIGHT JOIN users ON urls."userId" = users.id
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10
        `)).rows;

		return res.status(200).send(dataBaseRank);
	} catch (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(500);
	}
}