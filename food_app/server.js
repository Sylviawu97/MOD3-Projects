/* eslint-disable no-undef */
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const Fruit = require('./Models/Fruit.js');
const Veggie = require('./Models/Veggie.js');
// now I can use process.env.VARIABLE_NAME
// when my server starts, I want to connect to my database
require('./config/database.js')
const app = express();
app.use(express.json());


// GET DATA
app.get('/fruits', async (req, res) => {
    let databaseResponse = await Fruit.find();
    res.send(databaseResponse)
});

// CREATE DATA
app.post('/fruits', async (req, res) => {
    console.log(req.body);
    let databaseResponse = await Fruit.create(req.body);
    res.send(databaseResponse)
})

// UPDATE DATA
app.put('/fruits/:idOfFruit/:newName', async (req, res) => {
    // step 1 - get information from request (params, queries, req.body)
    const idOfFruit = req.params.idOfFruit;
    const newName= req.params.newName;
    // step 2 use information to make an update request to collection
    let databaseResponse = await Fruit.findByIdAndUpdate(idOfFruit, {name: newName})
    res.send(databaseResponse)
})

// DELETE DATA
app.delete('/fruits/:idOfFruit', async (req, res) => {
    const idOfFruit = req.params.idOfFruit;
    let databaseResponse = await Fruit.findByIdAndDelete(idOfFruit)
    res.send(databaseResponse)
})

// Create a new Veggie
app.post('/create_veggie', async (req, res) => {
    try {
      const veggie = await Veggie.create(req.body);
      res.status(201).json(veggie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create veggie' });
    }
  });
  
  // Get all Veggies
  app.get('/veggies', async (req, res) => {
    try {
      const veggies = await Veggie.find();
      res.status(200).json(veggies);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve veggies' });
    }
  });
  
  // Get a specific Veggie by name
  app.get('/veggie/:veggieName', async (req, res) => {
    try {
      const veggie = await Veggie.findOne({ name: req.params.veggieName });
      if (!veggie) {
        return res.status(404).json({ error: 'Veggie not found' });
      }
      res.status(200).json(veggie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve veggie' });
    }
  });

app.listen(4001, () => {
    console.log("listening on 4001")
})
