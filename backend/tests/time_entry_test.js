const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let userId, timeEntryId, clientId;
let token = null;
const name = "Time Entry Test User";
const email = "time-entry-test@user.com";
const password = "1234";
const color = "#ffffff";
const notes = "Test Entry Test Notes";
const notes2 = "Updated Entry Test Notes";

chai.use(chaiHttp);

describe('Time Entry API interface', () => {
    before(function (done) {
        // create a test user for this test
        chai.request(server)
            .post('/api/users/sign-up')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: email,
                password: password,
                name: name
            })
            .end(function (err, res) {
                res.should.have.status(200);

                // sign in with the created user
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

                        // create a test client for this
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
            })
    })
    after(function (done) {
        // delete the created test client
        chai.request(server)
            .delete('/api/clients/' + clientId)
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .end(function (err, res) {
                res.should.have.status(204);

                // delete the created test user
                chai.request(server)
                    .delete('/api/users/' + userId)
                    .set('Authorization', token)
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .end(function (err, res) {
                        res.should.have.status(204);
                        done();
                    })
            })
    })

    it('should create a time-entry', function (done) {
        chai.request(server)
            .post('/api/time-entries')
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                client: clientId,
                notes: notes
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                timeEntryId = res.body._id;
                done()
            })
    })
    it('should require a client when creating a time-entry', function (done) {
        chai.request(server)
            .post('/api/time-entries')
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end(function (err, res) {
                res.should.have.status(500)
                done()
            })
    })
    it('should get all time-entries', function (done) {
        chai.request(server)
            .get('/api/time-entries')
            .set('Authorization', token)
            .end(function (err, res) {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.text.should.contain(clientId)
                done()
            })
    })
    it('should get specific time-entries', function (done) {
        chai.request(server)
            .get('/api/time-entries/' + timeEntryId)
            .set('Authorization', token)
            .end(function (err, res) {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.text.should.contain(clientId)
                done()
            })
    })
    it('should update a time-entry', function (done) {
        chai.request(server)
            .put('/api/time-entries/' + timeEntryId)
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                notes: notes2
            })
            .end(function (err, res) {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.text.should.contain(notes2)
                done()
            })
    })
    it('should delete a time-entry', function (done) {
        chai.request(server)
            .delete('/api/time-entries/' + timeEntryId)
            .set('Authorization', token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .end(function (err, res) {
                res.should.have.status(204);
                done();
            })
    })
})