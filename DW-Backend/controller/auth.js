const db = require('../connection/connection.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const login = (req, res) => {
  const q = 'SELECT * FROM users WHERE username=?';
  db.query(q, [req.body.username], (err, rows) => {
    if (rows.length == 0) return res.status(400).send('user not found');
    const hash = rows[0].password;

    bcrypt.compare(req.body.password, hash, function (err, result) {
      if (err) return res.status(400).send('password donot match');
      else if (result == true) {
        const { password, ...rest } = rows[0];
        const token = jwt.sign(
          { id: rest.id, phoneno: rest.phoneno },
          process.env.JWT_KEY
        );
        return res
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .status(200)
          .json({ message: 'Logged in successfully 😊 👌', ...rest });
      }
    });
  });
};

const register = (req, res) => {
  const query = 'SELECT * FROM users WHERE username=? ';
  db.query(query, [req.body.username], (err, result) => {
    if (result.length)
      return res.status(400).send('username already registered');

    const q =
      'INSERT INTO users (`username`,`email`, `phoneno`, `password`, `profile`,`isVerified`) VALUES (?)';

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      const values = [
        req.body.username,
        req.body.email,
        req.body.phoneno,
        hash,
        req.body.profile,
        0,
      ];
      db.query(q, [values], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res
            .status(500)
            .json({ message: 'Error inserting user into the database.' });
        }

        // Fetch the inserted user's information from the database
        const userId = result.insertId; // Assuming the primary key column is 'id'
        const getUserQuery = 'SELECT * FROM users WHERE idusers = ?';
        db.query(getUserQuery, [userId], (err, userResult) => {
          if (err) {
            console.error('Error fetching user:', err);
            return res
              .status(500)
              .json({ message: 'Error fetching user from the database.' });
          }

          // User successfully inserted, respond with user information
          const user = userResult[0]; // Assuming the query returns a single user row
          return res.status(200).json({
            action: 'success',
            user: {
              isVerified: user.isVerified, // Fix the typo here (isVerfied -> isVerified)
              email: user.email,
              // Include other user fields as needed
            },
          });
        });
      });
    });
  });
};

module.exports = { register, login };
