const home = (req, res) => {
  res.render('index');
}

const about = (req, res) => {
  res.render('about');
}

module.exports = { home, about };