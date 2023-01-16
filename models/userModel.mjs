import users from '../data/users.json' assert {type: "json"}
import {writeDataToFile} from "../utils.mjs";

function findAll() {
	return new Promise((resolve) => {
		resolve(users)
	})
}

function findById(id) {
	return new Promise((resolve) => {
		const user = users.find(user => user.id === id)
		resolve(user)
	})
}

async function create(user) {
	return new Promise((resolve) => {
		const newUser = {id: Date.now().toString(), ...user}
		users.push(newUser)
		writeDataToFile('./data/users.json', users)
		resolve(newUser)
	})
}

async function update(id, user) {
	return new Promise((resolve) => {
		const index = users.findIndex(user => user.id === id)
		users[index] = {id, ...user}
		writeDataToFile('./data/users.json', users);
		resolve(users[index])
	})
}

async function remove(id) {
	return new Promise((resolve) => {
		let filteredUsers = users.filter(p => p.id !== id)
		writeDataToFile('./data/users.json', filteredUsers)
		resolve()
	})
}

export {findAll, findById, create, update, remove}