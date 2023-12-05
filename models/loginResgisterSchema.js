const mongoose = require('mongoose');

const userLogin = new mongoose.Schema({
  username: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  password: {
    type: String,
  
  }
});

const userCred = mongoose.model('userCred', userLogin);

module.exports = userCred;