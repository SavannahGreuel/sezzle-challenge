// const express = require('express');
// const cors = require('cors');

// const db = require('../data/dbConfig')

// const app = express();
// const http = require('http')
// const socketIO = require('socket.io')


// const server = http.createServer(app)


// app.use(express.json());
// app.use(cors());

// // sanity check endpoint
// server.get('/', (req, res) => {
//     res.status(200).json({ api: 'up and running' });
//     console.log(`Server is ALIVE`);
// });

// //GET all users and calculations:
// server.get('/calculations', (req,res) => {
//     db('users')
//     .then(users => res.status(200).json(users))
//     .catch(err => res.status(500).json(err));
// })

// //POST a users latest calculation
// server.post('/user/calculations', (req, res) => {
//     const calculation = req.body;
  
//     db('users')
//       .insert(calculation)
//       .then(name => {
//         res.status(201).json({message: "added calculation with the id of", name});
//       })
//       .catch(err => {
//         res.status(500).json({ message: 'Error inserting', err });
//       });
//   });

// module.exports = server;