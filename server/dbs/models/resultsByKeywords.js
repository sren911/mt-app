import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ResultsByKeywords = new Schema({
  name: {
    type: String // 活动名
  },
  pos: {
    type: String // 属于哪种类型
  },
  city: {
    type: String // 属于哪座城市
  },
  price: {
    type: String // 活动价格
  },
  photoUrl: {
    type: String // 活动封面图
  },
  url: {
    type: String // 点击跳转链接
  }
})

export default mongoose.model('ResultsByKeywords', ResultsByKeywords)
