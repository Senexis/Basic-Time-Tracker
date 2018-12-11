const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

before((done) => {
  const mongodbUrl = 'mongodb://localhost/users-test' // Local enviroment
  //var mongodbUrl ='mongodb://@ds117164.mlab.com:17164/studdit_db'; //Live DB link

  mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    // auth: {
    //   user: config.userName,
    //   password: config.pwd
    // }
  });

  var conn = mongoose.connection;
  conn.on('error', console.error.bind(console, 'MongoDB connection error:'));

  conn.once('open', () => {
    console.log('MongoDB connected.')
    done();
  });


  beforeEach((done) => {
    const {comments, threads } = mongoose.connection.collections;
      comments.drop(() => {
        threads.drop(() => {
          done();
        });
      });
  });
});