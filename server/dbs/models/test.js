import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Test = new Schema({
  name: {
    type: String,
    require: true
  }
})
export default mongoose.model('Test', Test)

