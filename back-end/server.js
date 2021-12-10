const express = require ('express');
const bodyParser = require('body-parser')
const server = express();


const drugRoute = require('./routes/drug');
const diseaseRoute = require('./routes/disease');
const interactionRoute = require('./routes/interaction');
const catchAllRoute = require('./routes/catchAll');

const port = 5000;






server.use(bodyParser.json());

server.use('/',drugRoute)
server.use('/',diseaseRoute)
server.use('/',interactionRoute)
server.use(catchAllRoute)

server.listen(port,console.log('server listening to 5000'))