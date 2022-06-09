import chalk from 'chalk';
import joi from 'joi';

export default function validadeUrl(req,res, next) {
	const urlObj = req.body;
	const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

	let {url} = urlObj;

	if(!(url.startsWith('https://') || url.startsWith('http://') || url.startsWith('www.')) ) {
		const urlObjSchema = joi.object({
			url: joi.string().domain().required()
		});
	
		const { error } = urlObjSchema.validate(urlObj, { abortEarly: false });
	
		if (error) {
			console.log(chalk.bold.red(error));
			return res.status(422).send('Invalid URL');
		}
		url = `https://${url}`;
	} else {
		const urlObjSchema = joi.object({
			url: joi.string().pattern(expression).required()
		});
	
		const { error } = urlObjSchema.validate(urlObj, { abortEarly: false });
	
		if (error) {
			console.log(chalk.bold.red(error));
			return res.status(422).send('Invalid URL');
		}
		
		if(url.startsWith('www.')) {
			url = `https://${url}`;
		}
	}
	
	res.locals.user = {...res.locals.user, url};
	next();
}