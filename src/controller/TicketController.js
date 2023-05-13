
const TicketModels = require('../models/TicketModel')
const ticket = require('../models/ticket')

const TambulaTicket = require('../models/tambulaTicketSchema')
const validator = require("../validator/validate")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// var tambola = require('tambola-generator');
var tambola = require('tambola-generator').default;

const createTicket = async (req, res) => {
  try {
    let { tickettype, email, password } = req.body


    if (!tickettype) return res.status(400).send({ status: false, message: 'tickettype is required' })
    if (!email) return res.status(400).send({ status: false, message: 'email required' })
    if (!password) return res.status(400).send({ status: false, message: 'password is required' })

    let uniqueemail = await TicketModels.findOne({ email })
    if (uniqueemail) return res.status(400).send({ status: false, message: 'uniqueemail already taken' })

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createTicket = await TicketModels.create({ tickettype, email, password: hashedPassword })

    return res.status(201).send({ status: true, message: 'Succesfully created', data: createTicket })

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}


const logIn = async function (req, res) {
  try {
    let userName = req.body.email;
    let passwordchange = req.body.password;

    if (!validator.valid(userName)) return res.status(400).send({ status: false, message: "email is required...!" });
    if (!validator.valid(passwordchange)) return res.status(400).send({ status: false, message: "password is required.!" });

    const user = await TicketModels.findOne({ email: userName });
    if (!user) {
      return res.status(400).send({ status: false, message: "username or the password is not correct" });
    }

    const passwordMatch = await bcrypt.compare(passwordchange, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ status: false, message: "username or the password is not correct" });
    }

    let token = jwt.sign(
      {
        userId: user._id.toString(),

      },
      "Ticket Management", { expiresIn: "100d" }
    );
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, message: "Login successful", token: token });
  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}



const createtambulaTicket = async (req, res) => {
  // 1 method
  // try {
    //     const { userId, numberOfTickets } = req.body;

    //     // generate numbers for the tickets
    //     const tickets = [];
    //     for (let i = 0; i < numberOfTickets; i++) {
    //       const numbers = generateNumbers();
    //       tickets.push({ userId, numbers });
    //     }

    //     // create the tickets in the database
    //     const createdTickets = await TambulaTicket.create(tickets);

    //     res.json({ message: 'Tickets created successfully', data: createdTickets });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // };

    // // helper function to generate numbers for a ticket
    // function generateNumbers() {
    //   const numbers = [];
    //   const availableNumbers = Array.from({ length: 90 }, (_, i) => i + 1);

    //   for (let i = 0; i < 9; i++) {
    //     const columnNumbers = [];
    //     for (let j = 0; j < 5; j++) {
    //       const index = Math.floor(Math.random() * availableNumbers.length);
    //       columnNumbers.push(availableNumbers[index]);
    //       availableNumbers.splice(index, 1);
    //     }
    //     numbers.push(columnNumbers);
    //   }

    //   return numbers;



    // 2 method 
    try{

    var Ticket = tambola.generateTickets(2);

    const ticketData = await ticket.create({ ticket: Ticket , user:req.validticket.userId })

    res.status(201).send({ status: true, message: "Tickets created successfully", Ticket });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



const gettambulaTicket = async (req, res) => {
  try {
    const { page, pageSize } = req.query;

    const skip = (page - 1) * pageSize; // 1 -1 * 5 == 0 -> 
    const limit = parseInt(pageSize); // 10

    // find the tickets associated with the user and paginate the results
    const tickets = await ticket.find({}).skip(skip).limit(limit).sort({ createdAt: -1 });

    // count the total number of tickets associated with the user
    const total = await ticket.countDocuments({});

    res.json({ message: 'Tickets fetched successfully', data: tickets, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createTicket, logIn, createtambulaTicket, gettambulaTicket }