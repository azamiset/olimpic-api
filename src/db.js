const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/olimpic-api", {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log(`Connect to database is success`);
}).catch((err) => {
  console.log(err);
})