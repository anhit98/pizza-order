'use strict'; 
const Hapi = require('hapi'); 
const Inert = require('inert');
const Vision = require('vision');
const fs   = require('fs');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./../package');
var publicKEY  = fs.readFileSync('public.key', 'utf8');
require('dotenv').config()

const server = Hapi.server({ port: 3000, host: process.env.DB_HOST }); 

const init = async () => {
    
    const swaggerOptions = {
            info: {
                    title: 'Test API Documentation',
                    version: Pack.version,
                },
            };
        
        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
        ]);
        await server.start(); 
        console.log(`Server running at: ${server.info.uri}`); 
        server.route(require('./../src/routes/category'));
        server.route(require('./../src/routes/product'));
}; 

init().catch(err => {
    console.error('An error happened while initializing the server', {
        err,
    });
    process.exit(1);
});
