const categoryService = require('../services/categoryService.js');
const categoryModel = require('../models/category.js')
const trim = require('../funcionConEspacios.js');
const express = require('express');
const app = express.Router();

app.post('/category', async (req, res) => {

    try {
        if (!req.body.name) {
            throw new Error('Falta enviar el name');
        }
        if (await trim.conEspacios(req.body.name)) {
            throw new Error('Los campos requeridos no pueden permanecer con espacios vacios');
        }

        let name = req.body.name.toUpperCase();

        let response = await categoryService.newCategory(name)
        res.status(200).send({
            name: name,
            Id: response.insertId
        });
    } catch (e) {
        console.log(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});


app.get('/category', async (req, res) => {

    try {
        let response = await categoryModel.listCategory(); 
        res.status(200).send({
            response
        });
    } catch (e) {
        console.log(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});


app.get('/category/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let response = await categoryService.categoryID(id);
        res.status(200).send({
            response
        });
    } catch (e) {
        console.log(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});


app.delete('/category/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let response = await categoryService.deleteCategory(id);
        res.status(200).send({
            response: 'Se borro correctamente la category'
        });
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});

app.put('/category/:id', async (req, res) => {
    try {
        console.log(req.body);
        if (!req.params.id ||
            !req.body.name 
            ) {
            throw new Error('Los datos requeridos son obligatorios');
        }
      
        let category = {
            "name": req.body.name.toUpperCase(),
            "id": req.params.id             
        }

        let response = await categoryService.editCategory(category);
        res.status(200).send({
            'id': category.id,
            'name': category.name            
        });
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            "Error": e.message
        });
    }

})

module.exports = app;