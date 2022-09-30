const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);
const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const { Knex } = require('knex');
const bcrypt = require('bcryptjs');



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("API Is functional")
})
app.post('/users/login', (req, res) => {
    console.log(req.body)
    if (req.body.Username != undefined) {
        knex
            .select('*')
            .from('users')
            .where('Username', req.body.Username)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => res.status(404).send(err))
    } else {
        res.status(406).send("Password Incorrect")
    }
})

app.post('/users', (req, res) => {
    console.log(req.body)
    if (req.body.PasswordHash != undefined && req.body.Username != undefined) {
        knex
            .select('*')
            .from('users')
            .where('Username', req.body.Username)
            .then(data => {
                if (data.length > 0) {
                    console.log(data)
                    res.status(404).send({ message: "Entry already exists" })
                } else {
                    knex('users')
                        .insert({
                            FirstName: req.body.FirstName,
                            LastName: req.body.LastName,
                            Username: req.body.Username,
                            PasswordHash: req.body.PasswordHash
                        })
                        .then(data => res.status(201).send({ success: true }))
                        .catch(err => res.status(406).send(err))
                }
            })
    } else {
        res.status(200).send("Password Incorrect")
    }
})

app.get('/users', (req, res) => {
    knex
        .select('*')
        .from('users')
        .then(data => res.status(200).send(data))
        .catch(err => res.status(503).send(err))
})

app.get('/inventory', (req, res) => {
    knex
        .select('*')
        .from('item')
        .then(data => res.status(200).send(data))
        .catch(err => res.status(503).send(err))
})


app.post('/inventory/seeitem', (req, res) => {
    console.log(req.body)
    if (req.body.UserId) {
        knex
            .select('*')
            .from('item')
            .where('UserId', parseInt(req.body.UserId))
            .then(data => res.status(200).send(data))
            .catch(err => res.status(503).send(err))
    } else {
        res.status(404).send({ err: "UserID not sent" })
    }
})


//updates item in database
app.patch('/inventory', (req, res) => {
    console.log(req.body)
    knex
        .select('*')
        .from('item')
        .where('UserId', parseInt(req.body.UserId))
        .andWhere('ItemName', req.body.ItemName)
        .update({
            Description: req.body.Description,
            Quantity: parseInt(req.body.Quantity)
        })
        .then(data => res.status(201).send({ success: true }))
        .catch(err => res.status(404).send(err))
})


//this is really a .delete, needing to push information to delete by so used a post instead
app.delete('/inventory', (req, res) => {
    console.log(req.body)
    knex
        .select('*')
        .from('item')
        .where('UserId', parseInt(req.body.UserId))
        .andWhere('ItemName', req.body.ItemName)
        .del()
        .then(() => res.status(201).send({ success: true }))
        .catch((err) => res.status(404).send(err))
})

//adds item into database
app.post('/inventory/additem', (req, res) => {
    console.log(req.body)
    if (req.body.UserId != undefined && req.body.Quantity != undefined && req.body.ItemName != undefined && req.body.Description != undefined) {
        knex
            .select('*')
            .from('item')
            .where('ItemName', req.body.ItemName)
            .andWhere('UserId', req.body.UserId)
            .then(data => {
                if (data.length > 0) {
                    res.status(200).send({ err: "Entry already inside database" })
                } else {
                    knex('item')
                        .insert({
                            UserId: req.body.UserId,
                            ItemName: req.body.ItemName,
                            Description: req.body.Description,
                            Quantity: parseInt(req.body.Quantity)
                        })
                        .then(() => res.status(201).send({ success: true }))
                        .catch(err => res.status(406).send(err))
                }
            })
    } else {
        res.status(200).send("Error in posting please attempt again.")
    }
})



app.listen(process.env.PORT || port, () => {
    console.log(`Listening for server on Port: ${port}`)
})