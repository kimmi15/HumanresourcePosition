const mongoose = require('mongoose');

const ticket = new mongoose.Schema({
  ticket: Array,
  user:String // 2D array to store the numbers in the ticket
},{timestamps:true});

module.exports = mongoose.model('ticket', ticket);