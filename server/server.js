const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const path = require('path');
const auth = require('./controllers/authorization')


const register = require('./controllers/register');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host : process.env.POSTGRES_HOST,
    user : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD,
    database : 'smart-brain'
  }
  // connection: process.env.POSTGRES_URI
});
console.log('hahahha')
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(express.json({strict: false}));
app.use(morgan('combined')) // latest version of exressJS now comes with Body-Parser!

app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=> { res.send(db.users) })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db)})
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res)})

app.listen(8000, ()=> {
  console.log('app is running on port 8000');
})