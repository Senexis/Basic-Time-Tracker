const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let userId;
let token = null;
const name = "Users Test User";
const updatedName = "Updated Test User";
const email = "users-test@user.com";
const password = "1234";

chai.use(chaiHttp)
describe('User API interface', () => {
    it('should create a user', function (done) {
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
    it('should fail to post the same user', function (done) {
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
    it('should login with a created user', function (done) {
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
    it('should get all users when logged in', function (done) {
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
    it('should get self when logged in', function (done) {
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
    it('should update a user when logged in', function (done) {
        chai.request(server)
            .put('/api/users/' + userId)
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                name: updatedName
            })
            .end(function (err, res) {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.text.should.contain(updatedName)
                done()
            })
    })
    it('should delete a user when logged in', function (done) {
        chai.request(server)
            .delete('/api/users/' + userId)
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .end(function (err, res) {
                res.should.have.status(204);
                done();
            })
    })
    it('should fail to make requests with a deleted user', function (done) {
        chai.request(server)
            .get('/api/users')
            .set('Authorization', token)
            .end(function (err, res) {
                res.should.have.status(401)
                done()
            })
    })
    it('should fail to login with a deleted user', function (done) {
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