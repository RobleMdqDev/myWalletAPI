const accountingService = require('../services/accountingService.js');
const accountingModel = require('../models/accounting.js');
const trim = require('../funcionConEspacios.js');
const express = require('express');
const app = express.Router();

app.post('/accounting', async (req, res) => {
    try {
        if (!req.body.concept ||
            !req.body.amount ||            
            !req.body.type ||
            !req.body.category_id ||
            !req.body.user_id) {
            throw new Error('concept y Categoría son datos obligatorios');
        }
        const concept = trim.conEspacios(req.body.concept);
        const amount = trim.conEspacios(req.body.concept);
        
        if ( concept || amount){
            throw new Error('Los campos requeridos no pueden permanecer vacios');
        }
        
        let accounting = {
            "concept": req.body.concept.toUpperCase(),
            "amount": req.body.amount,
            "type": req.body.type,
            "date": req.body.date,
            "category_id": req.body.category_id,            
            "user_id": req.body.user_id
        }

        let response = await accountingService.newAccounting(accounting);
        res.status(200).send({
            id: response.insertId,
            concept: accounting.concept,
            amount: accounting.amount,
            type: accounting.type,
            date: accounting.date,
            category_id: accounting.category_id,
            user_id: accounting.user_id
        });
    } catch (e) {   
        console.log(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});


app.get('/accounting', async (req, res) => {
    try {
        let response = await accountingModel.listAccounting();
        res.status(200).send({
            response
        });
        console.log(response);
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            error: e.message
        });

    }
    
});

app.get('/accounting/user', async (req, res) => {
    try {
        let response = await accountingModel.listUserAccounting(req.body.user_id);
        res.status(200).send({
            response
        });
        console.log(response);
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            error: e.message
        });

    }
    
});

app.get('/accounting/:id', async (req, res) => {
    try {
        let response = await accountingModel.accountingId(req.params.id);
        if (response.length == 0) {
            throw new Error('No se encuentra ese accounting');
        }
        res.status(200).send({
            response: response
        });
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});

app.get('/accounting/category/:id', async (req, res) => {
    try {
        let response = await accountingModel.categoryAccounting(req.params.id);
        if (response.length == 0) {
            throw new Error('No se encuentra ese accounting');
        }
        res.status(200).send({
            response: response
        });
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});

app.put('/accounting/:id', async (req, res) => {
    try {
        console.log(req.params.id, req.body)
        if (!req.params.id ||
            !req.body.concept ||
            !req.body.amount ||
            !req.body.date ||
            !req.body.type ||
            !req.body.category_id ||
            !req.body.user_id
            ) {
            throw new Error('Los datos requeridos son obligatorios');
        }
        const concept = trim.conEspacios(req.body.concept);
        const amount = trim.conEspacios(req.body.concept);
        
        if ( concept || amount){
            throw new Error('Los campos requeridos no pueden permanecer vacios');
        }
        let accounting = {
            "id": req.params.id, 
            "concept": req.body.concept.toUpperCase(),
            "amount": req.body.amount,
            "date": req.body.date,
            "type": req.body.type,
            "category_id": req.body.category_id,
            "user_id": req.body.user_id,
                        
        }

        let response = await accountingService.editAccounting(accounting);
        res.status(200).send({
            id: accounting.id,
            concept: accounting.concept,
            amount: accounting.amount,
            type: accounting.type,
            date: accounting.date,
            category_id: accounting.category_id,
            user_id: accounting.user_id
        });
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            "Error": e.message
        });
    }

})


app.delete("/accounting/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let response = await accountingService.deleteAccounting(id);

        res.status(200).send({
            response: "Se borro correctamente",
        });
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});

module.exports = app;