import {findAll, findById, create, update, remove} from '../models/userModel.mjs'
import {getPostData, statusCodes} from "../utils.mjs";

async function getAllUsers(req, res) {
	try {
		const users = await findAll()
		res.writeHead(statusCodes.ok, {'Content-Type': 'application/json'})
		res.end(JSON.stringify(users))
	} catch (e) {
		res.writeHead(statusCodes.serverError, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({message:  `Server Error: ${e}` }))
	}
}

async function getUser(req, res, id) {
	try {
		const user = await findById(id)
		if (!user) {
			res.writeHead(statusCodes.notFound, {'Content-Type': 'application/json'})
			res.end(JSON.stringify({message: 'User Not Found'}))
		} else {
			res.writeHead(statusCodes.ok, {'Content-Type': 'application/json'})
			res.end(JSON.stringify(user))
		}
	} catch (e) {
		res.writeHead(statusCodes.serverError, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({message:  `Server Error: ${e}` }))
	}
}

async function createUser(req, res) {
	try {
		const body = await getPostData(req)
		const { username, age, hobbies } = JSON.parse(body.toString())
		const user = {username, age, hobbies}
		const newUser = await create(user)
		res.writeHead(statusCodes.created, {'Content-Type': 'application/json'})
		res.end(JSON.stringify(newUser))
	} catch (e) {
		res.writeHead(statusCodes.serverError, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({message:  `Server Error: ${e}` }))
	}
}

async function updateUser(req, res, id) {
	try {
		const user = await findById(id)
		if(!user) {
			res.writeHead(404, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ message: 'User Not Found' }))
		} else {
			const body = await getPostData(req)
			const { username, age, hobbies } = JSON.parse(body.toString())
			const userData = {
				username: username || user.username,
				age: age || user.age,
				hobbies: hobbies || user.hobbies
			}
			const updatedUser = await update(id, userData)
			res.writeHead(statusCodes.ok, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify(updatedUser))
		}
	} catch (e) {
		res.writeHead(statusCodes.serverError, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({message:  `Server Error: ${e}` }))
	}
}

async function removeUser(req, res, id) {
	try {
		const user = await findById(id)
		if (!user) {
			res.writeHead(statusCodes.notFound, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ message: 'User Not Found' }))
		} else {
			await remove(id)
			res.writeHead(statusCodes.noContent, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ message: `User ${id} removed` }))
		}
	} catch (e) {
		res.writeHead(statusCodes.serverError, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({message:  `Server Error: ${e}` }))
	}
}

export {getAllUsers, getUser, createUser, updateUser, removeUser}