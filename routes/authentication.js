const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('./../models/user');

const authenticationRouter = new express.Router();

authenticationRouter.get('/sign-up', (req, res) => {
  res.render('sign-up')
})

authenticationRouter.post('/sign-up', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, 10)
    .then(hashAndSalt => {
      return User.create({
        username,
        passwordEncrypted: hashAndSalt
      })
    })
    .then(user => {
      req.session.userId = user._id;
      res.redirect('/');
    })
    .catch(error => {
      //res.redirect('/authentication/sign-up');
      next(error);
    });
});

authenticationRouter.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

authenticationRouter.post('/sign-in', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let user;

  User.findOne({username})
    .then(document => {
      user = document;
      return bcrypt.compare(password, user.passwordEncrypted);
    })
    .then(comparison => {
      console.log(comparison);
      if (comparison) {
        // serializing the user
        req.session.userId = user._id;
        res.redirect('/');
      } else {
        return Promise.reject(new Error('password does not match'));
      }
    })
    .catch(error => next(error));
});


module.exports = authenticationRouter;