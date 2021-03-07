const accountingService = require('../services/accountingService.js');
const accountingModel = require('../models/accounting.js');
const trim = require('../funcionConEspacios.js'); //funcion para evitar campos vacios 
const express = require('express');
const app = express.Router();

app.post('/accounting', async (req, res) => {
    try {
        if (!req.body.concept ||
            !req.body.amount ||
            !req.body.date ||
            !req.body.type ||
            !req.body.category_id ||
            !req.body.user_id) {
            throw new Error('concept y Categoría son datos obligatorios');
        }
        if (trim.conEspacios(req.body.concept) ||
            trim.conEspacios(req.body.amount) ||
            trim.conEspacios(req.body.date) ){
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
        let response = await accountingModel.listAccountings();
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
        if (trim.conEspacios(req.body.concept) ||
            trim.conEspacios(req.body.amount)
        ) {
            throw new Error('Los campos requeridos no pueden permanecer vacios');
        }
        let accounting = {
            "concept": req.body.concept.toUpperCase(),
            "categoria_id": req.body.categoria_id,
            "amount": req.body.amount,
            "persona_id": req.body.persona_id,
            "id": req.params.id             
        }

        let response = await accountingService.accountingUpdate(accounting);
        res.status(200).send({
            'id': accounting.id,
            'concept': accounting.concept,
            'amount': accounting.amount,
            'categoria_id': accounting.categoria_id,
            'persona_id': accounting.persona_id
        });
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            "Error": e.message
        });
    }

})


app.put('/accounting/prestar/:id', async (req, res) => {
    try {
        if (!req.body.id ||
            !req.body.persona_id) {
            throw new Error('Los datos requeridos son obligatorios');
        }
        if (trim.conEspacios(req.body.id) ||
            trim.conEspacios(req.body.persona_id)) {
            throw new Error('Los campos requeridos no pueden permanecer vacios');
        }
        let datos = {
            "id": req.body.id,
            "persona_id": req.body.persona_id,
            "id_params": req.params.id
        }

        let response = await accountingService.prestaraccounting(datos);
        res.status(200).send({
            "response": "El accounting se presto correctamente"
        });
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            "Error": e.message
        });
    }

});


app.put('/accounting/devolver/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let response = await accountingService.devolveraccounting(id);

        res.status(200).send({
            "response": "El accounting fue devuelto correctamente"
        });
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            "Error": e.message
        });
    }
});


app.delete("/accounting/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let response = await accountingService.borraraccounting(id);

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