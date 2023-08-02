const handleSingleUpload = (req, res) => {
  console.log(req.connection.remoteAddress, 'ip');
  const { path } = req.file;
  const url = 'http://localhost:8000' + path.replace('public', '');
  res.status(200).send(url);
};

module.exports = { handleSingleUpload };
