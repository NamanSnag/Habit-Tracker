// getting-started.js
const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_LINK;

mongoose.set('strictQuery', false);

main()
.then(() => {console.log("mongoose connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl);
}