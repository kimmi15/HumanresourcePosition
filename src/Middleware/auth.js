const jwt = require("jsonwebtoken");
const TicketModels = require('../models/TicketModel')
const mongoose=require('mongoose')
 //==================== [Authentication Middleware]===============================

const Authentication = function (req, res, next) {
    try {
    token = req.headers["x-api-key"];  // snfiufnw9jruoifweref.sdvms9ivfwjvwui.ahis8udciqe
    if (!token) return res.status(400).send({ status: false, msg: "token must be present " })
  
    jwt.verify(token, "Ticket Management",function(err,data){
        if(err) return res.status(401).send({status:false, msg:"token is not valid"})
    
    else {req.validticket = data} 
    // console.log(req.validticket)
    // console.log(data) 
    next()
    })
    } catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}
module.exports.Authentication = Authentication
