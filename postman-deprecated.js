const express = require('express');
const app = require('express')();
const http = require('http');
const socketIO = require('socket.io');
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

<<<<<<< HEAD
const password = fs.readFileSync('./config/smtp.txt', {
=======
const username = fs.readFileSync('/run/secrets/smtp_user', {
    encoding: 'utf-8'
});
const password = fs.readFileSync('/run/secrets/smtp_pass', {
>>>>>>> d99db264eb8d30e1d9394c850a0281aebf640b27
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

const port = process.env.PORT || '5050';
app.set('port', port);

const server = http.Server(app);
const io = socketIO(server);

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

//Listening
server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
