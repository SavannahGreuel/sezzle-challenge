const express = require('express');
const http = require('http')
const socketIO = require('socket.io')
const axios = require('axios')
const port = process.env.PORT || 9000;
const cors = require('cors');


const app = express();

const server = http.createServer(app)

const db = require('./data/dbConfig')


const io = socketIO(server)


app.use(express.json());
app.use(cors());

// sanity check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ api: 'up and running' });
    console.log(`Server is ALIVE`);
});

//GET all users and calculations:
app.get('/calculations', (req,res) => {
    db('users')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
})

//POST a users latest calculation
app.post('/user/calculations', (req, res) => {
    const calculation = req.body;
    
    db('users')
    .insert(calculation)
    .then(name => {
        res.status(201).json({message: "added calculation with the id of", name});
    })
    .catch(err => {
        res.status(500).json({ message: 'Error inserting', err });
    });
});

const getApiAndEmit = async socket => {
    try {
      const res = await axios.get(
        "https://guarded-hamlet-96437.herokuapp.com/calculations"
      ); // Getting the data from DarkSky
      socket.emit("FromAPI", res.data); // Emitting a new message. It will be consumed by the client
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };

let interval;

io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`\n***** Listening on port ${port} *****\n`));

module.exports = server;