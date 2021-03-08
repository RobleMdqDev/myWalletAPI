const conexion = require('../db.js');

module.exports = {
	nameUser: async (user) => {
		var response = await conexion.query(
			'SELECT * from users WHERE user = ?', 
			[user]);
		return response;
	},
	passUser: async (user) => {
		var response = await conexion.query(
			'SELECT pass FROM users WHERE user = ?', 
			[user]);
		return response;
	},
	emailUser: async (user) => {
		var response = await conexion.query(
			'SELECT email FROM users WHERE user = ?', 
			[user]);
		return response;
	},
	email: async (email) => {
		var response = await conexion.query(
			'SELECT email FROM users WHERE email = ?', 
			[email]);
		return response;
	},
	idUser: async (user) => {
		var response = await conexion.query(
			'SELECT id FROM users WHERE id = ?', 
			[user]);
		return response;
	},
	newUser: async (user) => {
		var response = await conexion.query(
			'INSERT INTO users (user, pass, email) VALUE (?,?,?)', 
			[user.user, user.pass, user.email]);
		return response;
	}
}