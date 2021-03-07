'use strict'

// Pedidos de paquetes -----------------------
const express = require('express');
const jwt = require('jsonwebtoken');
const unless = require('express-unless');
const cors = require('cors');

// Requerimiento de carpetas-----------------
const categoryController = require('./controllers/categoryController.js');
const usersController = require('./controllers/usersController.js');

// Declaración del paquete express ----------
const app = express();

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Autenticación (Middleware) ----------
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'Secret', (err, decoded) => {
            if (err) {
                return res.send({
                    mensaje: 'Token inválida'
                });
            } else {
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
};

auth.unless = unless;

app.use('/', auth.unless({
    path: [{
        url: '/login',
        methods: ['POST']
    }, {
        url: '/signin',
        methods: ['POST']
    }]
}));


// Llamada especifica del paquete-----------------
app.use(cors());
app.use(express.json()); //permite el mapeo de la peticion json a object js 
app.use(express.static('public')); // permite uso de la carpeta con el nombre expresado

app.use('/', usersController);
app.use('/', categoryController);


// Establecer puerto  ------------------------
const port = process.env.PORT ? process.env.PORT : 8000;
app.listen(port, () => {
    console.log('Aplicación operativa.\nEscuchando el puerto ' + port)
});



