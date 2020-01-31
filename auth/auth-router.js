const router = require('express').Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const db = require('../database/dbConfig')

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  db('users').insert(user)
    .then(saved => res.status(201).json(saved))
    .catch(error => res.status(500).json(error));

});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;

  db('users').where('username', username).first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: 'Welcome!'});
      } else {
        res.status(401).json({ message: 'Wrong password!'})
      }
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
