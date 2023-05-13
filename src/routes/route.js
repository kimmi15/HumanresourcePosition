const express = require("express")
const route = express.Router();
const commnMid = require("../Middleware/auth")

const { createTicket ,logIn,createtambulaTicket,gettambulaTicket} = require('../controller/TicketController')

route.post("/create", createTicket)

route.post('/logIn',logIn)

route.post('/creatTicket',commnMid.Authentication,createtambulaTicket)

route.get('/gettambulaTicket',commnMid.Authentication,gettambulaTicket)


module.exports = route