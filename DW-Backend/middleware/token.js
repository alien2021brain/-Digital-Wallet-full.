const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  console.log('authorization');

  const token = req.cookies.access_token;
  console.log('token', token);

  if (!token) {
    return res.status(400).send('you are not authorized to access this');
  }
  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    console.log(data);
    req.id = data.id;

    return next();
  } catch {
    return res.status(403).send('something went wrong in token');
  }
};

module.exports = authorization;
