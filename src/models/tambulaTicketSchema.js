const mongoose = require('mongoose');

const tambulaTicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  numbers: [[Number]], // 2D array to store the numbers in the ticket
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TambulaTicket', tambulaTicketSchema);