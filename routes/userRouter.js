const express = require('express');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');

const userRouter = new express.Router();

userRouter.get('/', routeGuard, (req, res, next) => {
  const userId = req.session.userId;
  User.findById(userId)
    .then((user) => {
      res.render('profile', { user });
    })
    .catch((error) => next(error));
});

userRouter.get('/edit', routeGuard, (req, res, next) => {
  const userId = req.session.userId;
  User.findById(userId)
    .then((user) => {
      console.log(user)
      res.render('edit', { user });
    })
    .catch((error) => next(error));
});

userRouter.post('/edit', (req, res, next) => {
  const name = req.body.name;
  User.update({name: name})
    .then((user) => res.redirect('/profile'))
    .catch((error) => next(error));
});

module.exports = userRouter;
