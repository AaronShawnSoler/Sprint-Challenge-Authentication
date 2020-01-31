const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const session = require('express-session');
const sessionConfig = {
    name: 'LambdaSchoolSessionAPI', // defaults to sid if not declared
    secret: 'We got a huge secret to keep safe',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false, // true in production
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false, // GDPR laws against saving cooking automatically 
};

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
