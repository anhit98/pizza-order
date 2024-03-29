'use strict'; 
const Hapi = require('hapi'); 
const Inert = require('inert');
const Vision = require('vision');
const fs   = require('fs');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./../package');
var publicKEY  = fs.readFileSync('public.key', 'utf8');
require('dotenv').config();
const Authentication = require("./plugin/user");
const port=process.env.PORT || 3002
const server = Hapi.server({ port: port, host: process.env.HOST }); 


const init = async () => {
    const swaggerOptions = {
            info: {
                    title: 'Pizza Order API Documentation',
                    version: Pack.version,
                },
            };
        
        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            },
            Authentication
        ]);
        await server.start(); 
        require("./models/topping");
        require("./models/style");
        server.route(require('./../src/routes/category'));
        server.route(require('./../src/routes/product'));
        server.route(require('./../src/routes/order'));
        server.route(require('./../src/routes/style'));
        server.route(require('./../src/routes/topping'));
        server.route(require('./../src/routes/price'));
        server.route(require('./../src/routes/contact'));
}; 

init().catch(err => {
    console.error('An error happened while initializing the server', {
        err,
    });
    process.exit(1);
});
