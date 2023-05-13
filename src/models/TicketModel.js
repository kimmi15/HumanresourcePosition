const mongoose = require('mongoose')
const Ticketchema = new mongoose.Schema({
    tickettype: {
        type: String,
        required: true,
        trim: true,
      
    },
      email: {
        type: String,
        required: true,
      
      },
      password: {
        type: String,
        required: true
      }, 
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Ticket', Ticketchema)