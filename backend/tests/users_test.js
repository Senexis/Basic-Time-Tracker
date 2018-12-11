const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let userId;
let token = null;
const name = "Test User";
const email = "test@user.com";
const password = "1234";

chai.use(chaiHttp)
describe('User API interface', () => {
    it('should create user', function (done) {
        chai.request(server)
            .post('/api/users/sign-up')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: email,
                password: password,
                name: name
            })
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })
    })
    it('should fail to post same user', function (done) {
        chai.request(server)
            .post('/api/users/sign-up')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: email,
                password: password,
                name: name
            })
            .end(function (err, res) {
                res.should.have.status(403)
                done()
            })
    })
    it('should login with created user', function (done) {
        chai.request(server)
            .post('/api/users/sign-in')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: email,
                password: password
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('token');
                token = res.body.token;
                done();
            })
    })
    it('should GET self user', function (done) {
        chai.request(server)
            .get('/api/users/self')
            .set('Authorization', token)
            .end(function (err, res) {
                res.should.have.status(200)
                res.body.should.be.a('object')
                userId = res.body._id
                done()
            })
    })
    it('should GET all users', function (done) {
        chai.request(server)
            .get('/api/users')
            .set('Authorization', token)
            .end(function (err, res) {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.text.should.contain(email)
                done()
            })
    })
    it('should DELETE /api/users/ correctly', function (done) {
        chai.request(server)
            .delete('/api/users/' + userId)
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .end(function (err, res) {
                res.should.have.status(204);
                done();
            })
    })
    it('should fail to make requests with deleted user', function (done) {
        chai.request(server)
            .get('/api/users')
            .set('Authorization', token)
            .end(function (err, res) {
                res.should.have.status(401)
                done()
            })
    })
    it('should fail to login with deleted user', function (done) {
        chai.request(server)
            .post('/api/users/sign-in')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: email,
                password: password
            })
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            })
    })
})