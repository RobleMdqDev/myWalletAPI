const conexion = require('../db.js');

module.exports = {
    conceptAccounting: async (concept) => {
        const response = await conexion.query(
            'SELECT concept FROM accounting WHERE concept = ?', [concept]);
        return response;
    },
    categoryAccounting: async (id, user_id) => {
		let response = await conexion.query(
            'SELECT accounting.id, accounting.concept, accounting.amount, accounting.date, accounting.type, accounting.category_id, accounting.user_id, categories.name FROM accounting INNER JOIN categories ON (categories.id = accounting.category_id) WHERE (category_id = ? && user_id = ?) ORDER BY date DESC', [id, user_id]);
			
		return response;
	},
    idAccounting: async (accounting) => {
		let response = await conexion.query(
			'SELECT * FROM accounting WHERE id = ?', [accounting]);
            
		return response;
	},
    newAccounting: async (accounting) => {
        const response = await conexion.query(
            'INSERT INTO accounting (concept, amount, type, date, category_id, user_id) VALUE (?,?,?,?,?,?)', [accounting.concept, accounting.amount, accounting.type, accounting.date, accounting.category_id, accounting.user_id]);
        return response;
    },
    listAccounting: async (type, id) => {
        const response = await conexion.query(
            'SELECT accounting.id, accounting.concept, accounting.amount, accounting.date, accounting.type, accounting.category_id, accounting.user_id, categories.name FROM accounting INNER JOIN categories ON (categories.id = accounting.category_id) WHERE (type = ? && user_id = ?) ORDER BY date DESC', [type, id]);
        return response;
    },
    listAccountingPg: async (type, pg, id) => {
        const response = await conexion.query(
            'SELECT accounting.id, accounting.concept, accounting.amount, accounting.date, accounting.type, accounting.category_id, accounting.user_id, categories.name FROM accounting INNER JOIN categories ON (categories.id = accounting.category_id) WHERE (type = ? && user_id = ?) ORDER BY date DESC LIMIT ?', [type, id, pg]);
            
        return response;
    },
    listUserAccounting: async (id) => {
        const response = await conexion.query(
            'SELECT * FROM accounting WHERE user_id = ? ORDER BY date DESC ', [id]);
        return response;
    },
    editAccounting: async (accounting) => {
        const response = await conexion.query('UPDATE accounting SET concept = ?, amount = ?, type = ?, date = ?, category_id = ?, user_id = ? WHERE id = ?', [accounting.concept, accounting.amount, accounting.type, accounting.date, accounting.category_id, accounting.user_id, accounting.id]);
        return response;
    },
    
    deleteAccounting: async (id) => {
        const response = await conexion.query("DELETE FROM accounting WHERE id = ?", [id]);
        return response;
    }
}