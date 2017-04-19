const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const db = require('./models/contacts.js');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router
router.get('/contacts/:status', db.getAllContacts);
router.get('/single-contact/:user_id', db.getSingleContact);
router.post('/add-contact/', db.createContact);
router.put('/edit-contact/:user_id', db.editContact);
router.delete('/contact/:user_id', db.deleteContact);

app.use(morgan(':method :url :date :remote-addr :status :response-time'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// Serve up content from public directory
app.use(express.static(path.join(__dirname, '/dist')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

http.createServer(app).listen(PORT);
