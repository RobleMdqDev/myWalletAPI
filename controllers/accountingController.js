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
            throw new Error('Please enter all data');
        }
        const concept = trim.conEspacios(req.body.concept);
        const amount = trim.conEspacios(req.body.concept);
        
        if ( concept || amount){
            throw new Error('Required fields cannot remain empty');
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
        res.send({
            status: 413,
            message: e.message
        });
    }
});


app.get('/accounting', async (req, res) => {
    try {
        let response = await accountingModel.listAccounting();
        res.status(200).send({
            status: 200,
            response
        });
        console.log(response);
    } catch (e) {
        console.error(e.message);
        res.send({
            status: 413,
            message: e.message
        });

    }
    
});

app.get('/accounting/list/:type&:id&:pg', async (req, res) => {
    try {
        let response = await accountingModel.listAccountingPg(req.params.type, parseInt(req.params.pg), req.params.id);
        res.status(200).send({
            status: 200,
            response
        });
        console.log(req.params.type, req.params.pg, req.params.id);
    } catch (e) {
        console.error(e.message);
        res.send({
            status: 413,
            message: e.message
        });

    }
});

app.get('/accounting/list/:type&:id', async (req, res) => {
    try {
        let response = await accountingModel.listAccounting(req.params.type, req.params.id);
        res.status(200).send({
            status: 200,
            response
        });
        
    } catch (e) {
        console.error(e.message);
        res.send({
            status: 413,
            message: e.message
        });

    }
});

app.get('/accounting/user/:user_id', async (req, res) => {
    try {
        let response = await accountingModel.listUserAccounting(req.params.user_id);
        res.status(200).send({
            response
        });
        console.log(response);
    } catch (e) {
        console.error(e.message);
        res.send({
            status: 413,
            message: e.message
        });

    }
    
});

app.get('/accounting/:id', async (req, res) => {
    try {
        let response = await accountingModel.idAccounting(req.params.id);
        if (response.length == 0) {
            throw new Error("That operation wasn't found");
        }
        res.status(200).send({
            response: response
        });
    } catch (e) {
        console.error(e.message);
        res.send({
            status: 413,
            message: e.message
        });
    }
});

app.get('/accounting/category/:id', async (req, res) => {
    try {
        let response = await accountingModel.categoryAccounting(req.params.id);
        if (response.length == 0) {
            throw new Error("That category wasn't found");
        }
        res.send({
            status: 200,
            response: response
        });
    } catch (e) {
        console.error(e.message);
        res.send({
            status: 413,
            message: e.message
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
            throw new Error('Please enter all data');
        }
        const concept = trim.conEspacios(req.body.concept);
        const amount = trim.conEspacios(req.body.concept);
        
        if ( concept || amount){
            throw new Error('Required fields cannot remain empty');
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
        res.send({
            status: 413,
            message: e.message
        });
    }

})


app.delete("/accounting/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let response = await accountingService.deleteAccounting(id);

        res.status(200).send({
            response: "Removed successfully",
        });
    } catch (e) {
        console.error(e.message);
        res.send({
            status: 413,
            message: e.message
        });
    }
});

module.exports = app;