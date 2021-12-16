const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let directorSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   numMovies: {
      type: Number,
      required: true
   },
   awarded: {
      type: Boolean,
      required: true
   }
})
module.exports = mongoose.model('Director', directorSchema);