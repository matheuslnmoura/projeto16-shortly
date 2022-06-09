import chalk from 'chalk';
import joi from 'joi';

export default function validadeUrl(req,res, next) {
	const url = req.body;
	const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

	const urlSchema = joi.object({
		url: joi.string().pattern(expression).required()
	});

	const { error } = urlSchema.validate(url, { abortEarly: false });

	if (error) {
		console.log(chalk.bold.red(error));
		return res.status(422).send('Invalid URL');
	}

	next();
}