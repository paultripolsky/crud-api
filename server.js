import * as http from 'http';
import * as dotenv from 'dotenv'
dotenv.config()

import {createUser, getAllUsers, getUser, updateUser, removeUser} from "./controllers/userController.mjs";
import {statusCodes} from "./utils.mjs";

const server =  http.createServer(async (req, res) => {
	if (req.url === '/api/users' && req.method === 'GET') {
		await getAllUsers(req, res)
	} else if (req.url.match(/\/api\/users\/(\d+)/) && req.method === 'GET') {
		const id = req.url.split('/')[3]
		await getUser(req, res, id)
	} else if (req.url.match(/\/api\/users\/\d+/) && req.method === 'PUT') {
		const id = req.url.split('/')[3];
		await updateUser(req, res, id);
	} else if (req.url.match(/\/api\/users\/\d+/) && req.method === 'DELETE') {
		const id = req.url.split('/')[3];
		await removeUser(req, res, id);
	} else if (req.url === '/api/users' && req.method === 'POST') {
		await createUser(req, res)
	} else {
		res.writeHead(statusCodes.notFound, {'Content-Type': 'application/json'})
		res.end(JSON.stringify('Route not found'))
	}
})
const PORT = process.env.PORT || 8000
server.listen(PORT, () => {console.log(`Server running on PORT ${PORT}`)})