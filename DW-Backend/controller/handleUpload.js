const handleSingleUpload = (req, res) => {
  const { path } = req.file;
  const url = path.replace('public', '');
  url
    ? res.status(200).send(`http://192.168.29.11:8000${url}`)
    : res.status(404).send('something went wrong');
};

module.exports = { handleSingleUpload };
