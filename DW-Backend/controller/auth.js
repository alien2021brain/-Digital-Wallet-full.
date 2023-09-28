const db = require('../connection/connection.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

const login = (req, res) => {
  const q = 'SELECT * FROM users WHERE username=?';
  db.query(q, [req.body.username], (err, rows) => {
    if (rows.length == 0) return res.status(400).send('user not found');
    const hash = rows[0].password;

    bcrypt.compare(req.body.password, hash, function (err, result) {
      if (err) return res.status(400).send('password donot match');
      else if (result == true) {
        const { password, ...rest } = rows[0];
        console.log(rest.id, 'id');
        const token = jwt.sign(
          { id: rest.idusers, phoneno: rest.phoneno },
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

// Generate a random OTP
function generateOTP() {
  return randomstring.generate({ length: 4, charset: 'numeric' });
}

const register = (req, res) => {
  console.log('user', req.body);

  // Generate OTP
  const otp = generateOTP();
  console.log('otp', otp);
  // const date = Math.floor(new Date().getTime() / 1000);
  // console.log("date", date);

  const query = 'SELECT * FROM users WHERE username=? ';
  db.query(query, [req.body.username], (err, result) => {
    if (result.length)
      return res.status(400).send('username already registered');

    const q =
      'INSERT INTO users (`username`,`email`, `phoneno`, `password`, `profile`,`isVerified`,`otp`) VALUES (?)';

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      const values = [
        req.body.username,
        req.body.email,
        req.body.phoneno,
        hash,
        req.body.profile,
        0,
        otp,
      ];
      db.query(q, [values], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res
            .status(500)
            .json({ message: 'Error inserting user into the database.' });
        } else {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '1111sachin2021@gmail.com', // Replace with your Gmail email address
              pass: 'wmmeqmudxhdtcnib', // Replace with your Gmail password
            },
          });

          const mailOptions = {
            from: '1111sachin2021@gmail.com', // Replace with your Gmail email address
            to: req.body.email, // User's email address from the request body
            subject: 'OTP Verification',
            text: `Your OTP for signup is: ${otp}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending OTP email: ', error);
              res
                .status(500)
                .json({ error: 'An error occurred while sending OTP' });
            } else {
              console.log('OTP email sent successfully: ', info.response);
              res
                .status(200)
                .json({ message: 'User signed up successfully. OTP sent.' });
            }
          });
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
        }
      });
    });
  });
};
const otpVerification = (req, res) => {
  const { email, otp } = req.body;
  const q = 'SELECT otp,isVerified FROM users WHERE email=?';
  db.query(q, email, (err, result) => {
    if (err) return res.status(400).send(`something went wrong ${err}`);

    if (result.length == 0) return res.status(400).send('email not match');
    const targetOtp = result[0].otp;
    if (otp == targetOtp) {
      const q1 = 'UPDATE users SET isVerified=true,otp=null WHERE email=?';
      db.query(q1, email, (err, finalData) => {
        if (err) return res.status(400).send(`something went wrong ${err}`);
        const q2 = 'SELECT isVerified FROM users WHERE email=? ';
        db.query(q2, email, (err, resultotp) => {
          if (err) return res.status(400).send(`something went wrong ${err}`);
          return res.status(200).send(resultotp);
        });
      });
    } else {
      return res.status(400).send('otp do not match');
    }
  });
};

module.exports = { register, login, otpVerification };
