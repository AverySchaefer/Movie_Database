const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let movieSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   dirBy: {
      type: String,
      required: true
   },
   year: {
      type: Number,
      required: true
   },
   format: {
       type: String,
       required: true
   },
   seen: {
       type: Boolean,
       required: false
   },
   score: {
       type: Number,
       required: false
   },
   genre: {
       type: String,
       required: false
   }
})
module.exports = mongoose.model('Movie', movieSchema);