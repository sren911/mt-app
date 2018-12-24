import Router from 'koa-router';
import Cate from '../dbs/models/cate'
import Test from '../dbs/models/test'

let router = new Router({prefix: '/categroy'})

router.get('/crumbs', async (ctx)=>{
  let result = await Cate.findOne({city: ctx.query.city.replace('市', '') || '三亚'})
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
})


export default router;
