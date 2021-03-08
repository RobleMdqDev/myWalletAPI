const usersService = require('../services/usersService.js');
const trim = require('../funcionConEspacios.js'); //funcion para evitar campos vacios 
const express = require('express');
const bcrypt = require('bcrypt');
const app = express.Router();

 
app.post('/signin', async(req, res) => {
    try {
        if (!req.body.user || 
            !req.body.pass || 
            !req.body.email){
            throw new Error('Required fields cannot remain empty');
        }
        if (trim.conEspacios(req.body.user) ||
            trim.conEspacios(req.body.pass) ||
            trim.conEspacios(req.body.email)){
            throw new Error('Required fields cannot remain empty');
        }

        const passEncript = await bcrypt.hash(req.body.pass, 10);
        let user = {
            "user": req.body.user,
            "email": req.body.email.toUpperCase(),
            "pass": passEncript,            
        }

        let response = await usersService.signin(user);

        res.status(200).send({ message: "Successful registration" }); 
    } catch (e) {
        res.status(414).send({ message: e.message });
    }
});


app.post('/login', async(req, res) => {
    try {
        if (!req.body.user ||
            !req.body.pass) {
            throw new Error('Required fields cannot remain empty')
        }

        let user = {
            "user": req.body.user,
            "pass": req.body.pass
        }
        let response = await usersService.login(user);
        
        res.status(200).send({
            token: response
        });
    } catch (e) {
        console.log(e.message);
        res.status(414).send({ message: e.message });
    }
});

module.exports = app;