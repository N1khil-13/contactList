const { name } = require('ejs');
const { response } = require('express');
const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// // Middleware 1 

// app.use(function (req, res, next) {
//     // req.myName = "Nikhil";
//     // console.log("middleware 1 is called");
//     next();
// });

// // Middleware 2

// app.use(function (req, res, next) {
//     // console.log("My name is", req.myName);
//     // console.log("middleware 2 is called");
//     next();
// });

var contactList = [
    {
        name: "Nikhil",
        phone: "1010101010"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "CN",
        phone: "55555"
    }
]

app.get('/', function (req, res) {


    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log("error fetching contacts from db");
            return;
        }
        return res.render('home', {
            title: "Contacts list",
            contact_list: contacts
        });
    });
    // console.log(req.myName);
});

app.get('/practice', function (req, res) {
    return res.render('practice', { title: "Let's play with ejs" });
});

app.post('/create-contact', function (req, res) {
    // return res.redirect('/practice');
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log('error in creating a contact');
        }
        console.log('*****', newContact);
        return res.redirect('back');
    });

    // return res.redirect('back');
});

app.get('/delete-contact', function (req, res) {
    // console.log(req.params);
    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }
    // console.log('Testing');
    let id = req.query.id;
    // console.log(id);

    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('Failed to delete contact from db');
            // console.log(err);
            return;
        }

        return res.redirect('back');
    });


});


app.listen(port, function (err) {
    if (err) { console.log('Error in running the server!', err); }

    console.log('Server is running on port', port);
})
