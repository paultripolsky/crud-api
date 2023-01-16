import * as fs from 'fs/promises'

async function writeDataToFile(filename, content) {
	try {
		await fs.writeFile(filename, JSON.stringify(content), {encoding: 'utf-8'});
	} catch (e) {
		console.log(e)
	}
}

function getPostData(req) {
	return new Promise((resolve, reject) => {
		try {
			let body = ''
			req.on('data', (chunk) => {
				body += chunk.toString()
			})
			req.on('end', () => {
				resolve(body)
			})
		} catch (e) {
			console.log(e)
		}
	})
}

const statusCodes = {
	ok: 200,
	created: 201,
	noContent: 204,
	badRequest: 400,
	notFound: 404,
	serverError: 500
}

export {writeDataToFile, getPostData, statusCodes}