import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Lucy = new Schema({
  name: {
    type: String,
    require: true
  }
})
export default mongoose.model('Lucy', Lucy)
