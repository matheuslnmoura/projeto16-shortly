import connection from '../db.js';

export default async function validateToken(req,res,next) {
	const authorization = req.headers.authorization;
	const token = authorization?.replace('Bearer ', '');

	if(!token) {
		return res.status(401).send('Validation token not send');
	}

	const dataBaseToken = (await connection.query(`
        SELECT sessions.id, sessions."userId"
        FROM sessions
        WHERE sessions.token = $1 AND sessions."isValid" = true
    `, [token])).rows;

	if(dataBaseToken.length === 0 ) {
		return res.status(401).send('Invalid Token. Please Login Again');
	}

	const {userId} = dataBaseToken[0];

	res.locals.user = {userId};
	next();
}