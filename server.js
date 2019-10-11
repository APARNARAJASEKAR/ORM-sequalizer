var http = require('http');
var path = require("path");
var express = require('express');
const Sequelize = require('sequelize');
var app = express();
var bodyParser = require('body-parser');
const Model = Sequelize.Model;
var express = require('express');
var app = express();
const pug = require('pug');
var pick = require('lodash.pick');
const _ = require("lodash");



app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));


// const sequelize = new Sequelize('postgres://postgres:postgres@example.com:5432/myDb');
const sequelize = new Sequelize('users_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'

});

var users_data = sequelize.define('users_data', {

    name: {
        type: Sequelize.STRING
    },

    email: {
        type: Sequelize.STRING
    },

    experience: {
        type: Sequelize.INTEGER
    }
}, {


});

var roles_data = sequelize.define('roles_data', {

    role: {
        type: Sequelize.STRING

    }
});

sequelize.sync();

users_data.belongsToMany(sequelize.models.roles_data, { as: 'User', through: 'userRole' });

users_data.hasMany(roles_data, { as: 'Roles' });
roles_data.belongsTo(users_data);


app.use(express.static(path.join(__dirname, '/views/public')));



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, '/views/clinicial.html'));



});


app.post('/register_clinician', function(req, res) {
    console.log("----------post method called--------");
    console.log(req.body);
    return users_data.create({

        name: req.body.name,
        email: req.body.email,
        experience: req.body.experience,


    }).then((usersdata) => {

        // users_data.addRoles_data(roles_data, { status: 'started' }).then(() => {
        console.log("Clinician added successfully");
        var role = req.body.roles;
        console.log("------>rolelength", role.length);

        role.forEach(function(role) {
            roles_data.create({

                role: role
            }).then((rolesdata) => {
                console.log("-------->rolesdata", rolesdata);
                console.log("-------->rolesdata", rolesdata.id);
                console.log("-------------->userdata", usersdata);
                console.log("-------------->userdata", usersdata.id);
                usersdata.addUser(rolesdata.id);

            })
        });
    }).catch((err) => {
        console.log("err...........", err);


    })

});

app.get('/display_all', function(req, res) {
    console.log("--------display value method calls-------- ");

    users_data.findAll({
        attributes: ['id', 'name', 'email', 'experience'],
        include: [{
            model: roles_data,
            as: 'User',
            attribute: ['role']

        }]

    }).then(function(users_data) {
        console.log("---------data view------", JSON.stringify(users_data));
        console.log(users_data);
        console.log("---------id of userdata------------", JSON.stringify(users_data[1]));
        var pick = _.pick(users_data, ['email']);
        console.log(pick);
        // users_data.User.role = users_data.User.role.toString();
        res.render("display", {
            userdata: users_data[1]
        });



    }).catch((err) => {
        console.log(err);
    });
});








app.listen(3000, function() {


    console.log("server is running at the port 3000");
});