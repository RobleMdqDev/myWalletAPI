const conexion = require('../db.js');

module.exports = {
    conceptAccounting: async (concept) => {
        const response = await conexion.query(
            'SELECT concept FROM accounting WHERE concept = ?', [concept]);
        return response;
    },
    categoryAccounting: async (id) => {
		let response = await conexion.query(
			'SELECT * FROM accounting WHERE category_id = ?', [id]);
		return response;
	},
    idAccounting: async (accounting) => {
		let response = await conexion.query(
			'SELECT * FROM accounting WHERE id = ?', [accounting]);
            console.log({respSQL: accounting})
		return response;
	},
    newAccounting: async (accounting) => {
        const response = await conexion.query(
            'INSERT INTO accounting (concept, amount, type, date, category_id, user_id) VALUE (?,?,?,?,?,?)', [accounting.concept, accounting.amount, accounting.type, accounting.date, accounting.category_id, accounting.user_id]);
        return response;
    },
    listAccounting: async () => {
        const response = await conexion.query(
            'SELECT * FROM accounting ORDER BY date DESC');
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