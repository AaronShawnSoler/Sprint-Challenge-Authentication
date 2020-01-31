const server = require('./server');
const request = require('supertest');
const db = require('../database/dbConfig');

//tell jest to use mock version of restricted middleware
const auth = require('../auth/authenticate-middleware');
jest.mock('../auth/authenticate-middleware.js');

beforeEach(async () => {
    return await db.migrate.rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run());
});

describe('User register', () => {
    it('sends status 201', async () => {
        const res = await request(server).post('/api/auth/register').send({username: 'chris', password: 'lambdateamlead'});
        expect(res.status).toBe(201);
    });
    it('Successfully posts user to database', async () => {
        const res = await request(server).post('/api/auth/register').send({username: 'chris', password: 'lambdateamlead'});
        expect(res.body).toEqual([ 4 ]);
    })
});

describe('User login', () => {
    it('sends status 200', async () => {
        const res = await request(server).post('/api/auth/login').send({username: 'aaron', password: 'secret_password'});
        expect(res.status).toBe(200);
    });
    it('denies unauthorized user', async () => {
        const res = await request(server).post('/api/auth/login').send({username: 'aaron', password: 'password'});
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: 'Wrong password!'});
    })
});

describe('Get jokes', () => {
    it('sends status 200', async () => {
        const res = await request(server).get('/api/jokes');
        expect(res.status).toBe(200);
    });
    it('gets 20 jokes', async () => {
        const res = await request(server).get('/api/jokes');
        expect(res.body.length).toBe(20);
    })
});