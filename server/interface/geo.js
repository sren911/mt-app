import Router from 'koa-router';
import axios from './utils/axios'
import Menu from '../dbs/models/menu'
import Province from '../dbs/models/province'
import {
  AmapKey
} from './utils/keys'

let router = new Router({prefix: '/geo'})

router.get('/getPosition', async (ctx) => {
  // 获取ip
  // let res = await axios.get('https://ifconfig.me/ip')
  let {
    status,
    data: {
      province,
      city
    }
  } = await axios.get(`https://restapi.amap.com/v3/ip?key=${AmapKey}`)
  if (status === 200) {
    ctx.body = {
      province,
      // 为了跟本地数据库一致 这里直接写三亚
      // city
      city: '三亚'
    }
  } else {
    ctx.body = {
      province: '',
      // 为了跟本地数据库一致 这里直接写三亚
      // city: ''
      city: '三亚'
    }
  }

})

router.get('/menu', async (ctx) => {
  const result = await Menu.findOne()
  ctx.body = {
    menu: result.menu
  }
})

router.get('/province', async (ctx) => {
  let province = await Province.find()
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})

// router.get('/provinces/:id', async (ctx) => {
//   let city = await City.findOne({ id: ctx.params.id })
//   ctx.body = {
//     code: 0,
//     city: city.value.map(item => {
//       return {
//         province: item.province,
//         id: item.id,
//         name: item.name
//       }
//     })
//   }
// })

export default router
