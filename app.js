const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const socketIO = require('socket.io');
const redisAdapter = require('socket.io-redis');

const app = express();
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

const port = process.env.PORT || '3035';
app.set('port', port);



const server = http.createServer(app);

const io = socketIO(server);
io.adapter(redisAdapter({
    host: 'mq',
    port: 6379
}));

const sioc = require('socket.io-client');




const nodemailer = require("nodemailer");
const ejs = require('ejs');
const fs = require('fs');

const {
    body,
    validationResult,
    sanitizeBody,
    check
} = require('express-validator');

const template = fs.readFileSync('./email.html', {
    encoding: 'utf-8'
});
const username = fs.readFileSync('/run/secrets/smtp_user', {
    encoding: 'utf-8'
});
const password = fs.readFileSync('/run/secrets/smtp_pass', {
    encoding: 'utf-8'
});

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
<<<<<<< HEAD
                user: "anthony.lewis.rawlins@gmail.com",
=======
                user: username,
>>>>>>> d99db264eb8d30e1d9394c850a0281aebf640b27
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
                'success': true
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
