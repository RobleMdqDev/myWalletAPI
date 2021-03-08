const conexion = require('../db.js');

module.exports = {
	nameCategory: async (name) => {
		let response = await conexion.query(
			'SELECT id FROM categories WHERE name = ?', [name]);
		return response;
	},
	newCategory: async (name) => {
		let response = await conexion.query(
			'INSERT INTO categories (name) VALUE (?)', [name]);
		return response;
	},
	categoryId: async (id) => {
		let response = await conexion.query(
			'SELECT * FROM categories WHERE id = ?', [id]);
		return response;
	},
	listCategory: async () => {
		let response = await conexion.query(
			'SELECT * FROM categories');
		return response;
	},	
	deleteCategory: async (id) => {
		let response = await conexion.query(
			'DELETE FROM categories WHERE id = ?', [id]);
		return response;
	},
	editCategory: async (category) => {
		let response = await conexion.query(
			'UPDATE categories SET name = ? WHERE id = ?',[category.name, category.id]
		);
		return response;
	}
}