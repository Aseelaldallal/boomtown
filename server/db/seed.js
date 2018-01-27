

const fs = require('fs');
const util = require('util');
const User = require('../models/user');
const Item = require('../models/item');
const mongoose = require('mongoose');

const readFile = util.promisify(fs.readFile)

const seedDB = () => {
    Promise.all([User.collection.drop(), Item.collection.drop()])
        .then(() => readFile("./db/db.json")).then(file => {
            data = JSON.parse(file);
            insertUsers(data.users);
            insertItems(data.items);
        })
        .catch(err => console.error(err));
}

insertUsers = usersData => {
    User.insertMany(usersData).then(() => {
        console.log('inserted users');
    }).catch(err => {
        console.log("Error inserting users: ", err);
    })
}

insertItems = itemsData => {
    Item.insertMany(itemsData).then(() => {
        console.log('inserted items');
    }).catch(err => {
        console.log("Error inserting items: ", err);
    })
}


module.exports = seedDB;

