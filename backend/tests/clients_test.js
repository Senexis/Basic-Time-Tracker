const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let userId;
let clientId;
let token = null;
const name = "Client Test User";
const name2 = "Client Test User 2";
const email = "client-test@user.com";
const password = "1234";
const color = "#ffffff";
const invalidColor = "invalid";

chai.use(chaiHttp);

describe('Client API interface', () => {
    before(function (done) {
        chai.request(server)
            .post('/api/users/sign-up')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: email,
                password: password,
                name: name
            })
            .end(function (err, res) {
                chai.request(server)
                    .post('/api/users/sign-in')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({
                        email: email,
                        password: password
                    })
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('_id');
                        res.body.should.have.property('token');
                        userId = res.body._id;
                        token = res.body.token;
                        done();
                    })
            })
    })
    after(function (done) {
        chai.request(server)
            .delete('/api/users/' + userId)
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .end(function (err, res) {
                res.should.have.status(204);
                done();
            })
    })

    it('should create a client', function (done) {
        chai.request(server)
            .post('/api/clients')
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                name: name,
                color: color
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                clientId = res.body._id;
                done()
            })
    })
    it('should require a name when creating a client', function (done) {
        chai.request(server)
            .post('/api/clients')
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end(function (err, res) {
                res.should.have.status(500)
                done()
            })
    })
    it('should require a unique name when creating a client', function (done) {
        chai.request(server)
            .post('/api/clients')
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                name: name,
                color: color
            })
            .end(function (err, res) {
                res.should.have.status(500)
                done()
            })
    })
    it('should require a valid color when creating a client', function (done) {
        chai.request(server)
            .post('/api/clients')
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                name: name2,
                color: invalidColor
            })
            .end(function (err, res) {
                res.should.have.status(500)
                done()
            })
    })
    it('should get all clients', function (done) {
        chai.request(server)
            .get('/api/clients')
            .set('Authorization', token)
            .end(function (err, res) {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.text.should.contain(name)
                done()
            })
    })
    it('should get specific clients', function (done) {
        chai.request(server)
            .get('/api/clients/' + clientId)
            .set('Authorization', token)
            .end(function (err, res) {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.text.should.contain(name)
                done()
            })
    })
    it('should update a client', function (done) {
        chai.request(server)
            .put('/api/clients/' + clientId)
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                name: name2
            })
            .end(function (err, res) {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.text.should.contain(name2)
                done()
            })
    })
    it('should delete a client', function (done) {
        chai.request(server)
            .delete('/api/clients/' + clientId)
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .end(function (err, res) {
                res.should.have.status(204);
                done();
            })
    })
})