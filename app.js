const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const app = express();
const socketIO = require('socket.io');
const server = http.createServer(app);
const sioc = require('socket.io-client');
const io = socketIO(server);
const redisAdapter = require('socket.io-redis');

const uuidv4 = require('uuid/v4');
const moment = require('moment');

app.use(express.static(path.join(__dirname, 'dist/atlas/')));

app.use(function (req, res, next) {
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });
    next();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/atlas/index.html'))
});

const port = process.env.PORT || '4200';
app.set('port', port);

// io.adapter(redisAdapter({
//     host: 'mq',
//     port: 6379
// }));

const {
    body,
    validationResult,
    sanitizeBody,
    check
} = require('express-validator');

const template = fs.readFileSync('./email.html', {
    encoding: 'utf-8'
});
// const username = fs.readFileSync('/run/secrets/smtp_user', {
//     encoding: 'utf-8'
// });
// const password = fs.readFileSync('/run/secrets/smtp_pass', {
//     encoding: 'utf-8'
// });

const username = 'anthony.lewis.rawlins@gmail.com';
const password = 'cxmkafxzqzvqnijw';

const true_emails = [
{name: "Hamish", email: '"Hamish Clarke" <hamishc@uow.edu.au>'},
{name: "Anthony", email: '"Anthony Rawlins" <anthony_rawlins@uow.edu.au>'},
{name: "Brett", email: '"Brett Cirulis" <brett.cirulis@uom.edu.au>'},
{name: "Trent", email: '"Trent Penman" <trent.penman@uom.edu.au>'},
{name: "Ross", email: '"Ross Bradstock" <rossb@uow.edu.au>'},
{name: "Owen", email: '"Owen Price" <oprice@uom.edu.au>'},
{name: "Matthias", email: '"Matthias Boer" <M.Boer@westernsydney.edu.au>'}
];

app.use(express.json());

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// Set up Auth0 configuration
const authConfig = {
  domain: "bnhcrclfmc.au.auth0.com",
  audience: "http://prescribedburnatlas.science/api"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

// var securedRoutes = require('express').Router();
//
// securedRoutes.get('ena', (req, res) => {
//   res.send({
//     msg: "ENA Object."
//   });
// });
//
// securedRoutes.use(checkJwt);
//
// // Define an endpoint that must be called with an access token
// app.get("/assets/secure", securedRoutes);

io.on("connection", socket => {
    console.log('New client connected');

    let previousId;
    const safeJoin = currentId => {
        socket.leave(previousId);
        socket.join(currentId);
        previousId = currentId;
    };

    socket.on('sendmail', (message) => {

        check(message.first_name).trim().escape();
        check(message.last_name).trim().escape();
        check(message.address).isEmail();
        check(message.message).trim().escape();

        let to_group = [];

        for (m in message.member) {
            for(te in true_emails) {
                if(true_emails[te].name == message.member[m].firstname) {
                    to_group.push(true_emails[te].email);
                }
            }
        }

        console.log(to_group);

        var mail_data = {
            "to": '"contact_form@prescribedburnatlas.science" <anthony.lewis.rawlins@gmail.com>',
            'cc': to_group.join(', '),
            "subject": "Nodemailer test script for PBA - Please ignore",
            'enq_from_firstname': message.first_name,
            'enq_from_surname': message.last_name,
            'enq_from_email': message.address,
            'enq_to': to_group.join(', '),
            'message': message.message
        }

        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "anthony.lewis.rawlins@gmail.com",
                user: username,
                pass: password
            }
        });

        console.log(mail_data);

        var mailOptions = {
            from: '"Prescribed Burning Atlas" <contact-form@prescribedburnatlas.science>',
            to: mail_data.to,
            replyTo: '"Prescribed Burning Atlas" <noreply@prescribedburnatlas.science>',
            subject: mail_data.subject,
            html: ejs.render(template, mail_data)
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            socket.emit("response", {
                success: true,
                message: mail_data
            });
        });


    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log('Atlas Server running on', port);
});
