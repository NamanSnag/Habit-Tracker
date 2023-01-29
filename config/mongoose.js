// getting-started.js
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

main()
.then(() => {console.log("mongoose connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://naman-123:Ynag123@cluster0.ewv2nsm.mongodb.net/habitDb');
}