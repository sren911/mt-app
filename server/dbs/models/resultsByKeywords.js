import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ResultsByKeywords = new Schema({
  name: {
    type: String // 酒店名
  },
  province: {
    type: String // 属于哪种类型
  },
  city:{
    type:String // 属于哪座城市
  },
  price:{
    type:Number // 酒店价格
  },
  areaCode:{
    type:String
  },
  tel:{
    type:String
  },
  area:{
    type:String
  },
  addr:{
    type:String
  },
  type:{
    type:String
  },
  module:{
    type:String
  },
  longitude:{
    type:Number
  },
  latitude:{
    type:Number
  }
})

export default mongoose.model('ResultsByKeywords', ResultsByKeywords)
