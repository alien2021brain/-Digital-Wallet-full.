const db = require('../connection/connection.js');
const updateUserProfile = (req, res) => {
  console.log('update');
  const q = 'UPDATE users SET profile = ? WHERE idusers = ?';
  console.log(req.body.profile, req.id);
  db.query(q, [req.body.profile, req.id], (err, result) => {
    if (err) return res.status(400).send(err);
    else {
      const q = 'SELECT profile from users WHERE idusers = ?';
      db.query(q, [req.id], (err, result) => {
        return res
          .status(200)
          .json({ msg: 'User profile updated', data: result });
      });
    }
  });
};

module.exports = { updateUserProfile };
