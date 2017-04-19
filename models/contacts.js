const pgp = require('pg-promise');
const db = require('../lib/dbconnect');

/* Get all contacts */
function getAllContacts(req, res, next) {
  db.any('SELECT * FROM contacts WHERE status=$1', req.params.status)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
        });
    })
    .catch(err => next(err));
}

/* Add Contact */
/* eslint-disable no-template-curly-in-string */
function createContact(req, res, next) {
  db.none('insert into contacts(first_name, last_name, email, phone_number, status)' +
      'values(${first_name}, ${last_name}, ${email}, ${phone_number}, ${status})',
    req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one contact',
        });
    })
    .catch((err) => {
      res.status(500).send({ error: err.detail, status: 'error' });
      next(err);
    });
}
/* eslint-disable no-template-curly-in-string */

/* Retrieve single contact */
function getSingleContact(req, res, next) {
  db.one('SELECT * FROM contacts WHERE user_id=$1', req.params.user_id)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
        });
    })
    .catch(err => next(err));
}

/* Update contact */
function editContact(req, res, next) {
  db.none('update contacts set first_name=$1, last_name=$2, email=$3, phone_number=$4, status=$5 where user_id=$6',
    [
      req.body.first_name, req.body.last_name, req.body.email, req.body.phone_number,
      req.body.status,
      parseInt(req.params.user_id, 10),
    ])
     .then(() => {
       res.status(200)
         .json({
           status: 'success',
           message: 'Updated Contact',
         });
     })
     .catch((err) => {
       res.status(500)
         .json({
           status: 'error',
           message: err.detail,
         });
       next(err);
     });
}

/* Delete a contact */
function deleteContact(req, res, next) {
  db.result('delete from contacts where user_id = $1', req.params.user_id)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
        });
    })
    .catch(err => next(err));
}

module.exports = {
  getAllContacts,
  deleteContact,
  createContact,
  getSingleContact,
  editContact,
};
