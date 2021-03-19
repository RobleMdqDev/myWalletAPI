const usersModel = require('../models/users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
	login: async (user) => {

        let response = await usersModel.nameUser(user.user);
        if (response.length == 0) { // Si no me arroja ningun resultado entonces el query esta vacio
            throw new Error('The username is not registered.')
        };
       
        response = await usersModel.passUser(user.user);
        let passverify = bcrypt.compareSync(user.pass, response[0].pass)
        if (passverify == false) {
            throw new Error('Wrong password.')
        };
        
        let email = await usersModel.emailUser(user.user);
        let id = await usersModel.idUser(user.user);
        const tokenData = {
            user: user.user,
            email: email,
            user_id: id
        };
        const token = jwt.sign(tokenData, 'Secret', {
            expiresIn: 60 * 60 * 0.5
        });

        return {token, user_id: id};
	},

	signin: async (user) => {

        let response = await usersModel.email(user.email);
        if (response.length > 0) {
            throw new Error('That user already exists')
        }
        
        response = await usersModel.newUser(user);

        return response;
	}
}

