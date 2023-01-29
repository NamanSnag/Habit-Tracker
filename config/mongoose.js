// getting-started.js
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

main()
.then(() => {console.log("mongoose connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/habbit');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}