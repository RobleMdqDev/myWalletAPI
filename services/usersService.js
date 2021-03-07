const usersModel = require('../models/users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
	login: async (user) => {

        let response = await usersModel.nameUser(user.user);
        if (response.length == 0) { // Si no me arroja ningun resultado entonces el query esta vacio
            throw new Error('El nombre de user no esta registrado')
        };
       
        response = await usersModel.passUser(user.user);
        let passverify = bcrypt.compareSync(user.pass, response[0].pass)
        if (passverify == false) {
            throw new Error('Contraseña incorrecta')
        };
        
        let email = await usersModel.emailUser(user.user);
        let id = await usersModel.idUser(user.user);
        const tokenData = {
            nombre: user.user,
            email: email,
            user_id: id
        };
        const token = jwt.sign(tokenData, 'Secret', {
            expiresIn: 60 * 60 * 24
        });

        return token;
	},

	signin: async (user) => {

        let response = await usersModel.nameUser(user.user);
        if (response.length > 0) {
            throw new Error('Nombre de user existente')
        }
        
        response = await usersModel.newUser(user);

        return response;
	}
}

