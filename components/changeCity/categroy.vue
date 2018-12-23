<template>
  <div class="m-categroy">
    <el-row>
      <el-col :span="3">
        <span class="name">按拼音首字母选择：</span>
      </el-col>
      <el-col :span="21">
        <ul>
          <li
            v-for="item in list"
            :key="item.word"
            :class="{ disabled: !item.show }">
            <a
              :href="'#city-'+item.word">{{ item.word }}</a>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row
      v-for="item in block"
      :key="item.title">
      <dl
        class="m-categroy-section">
        <dt :id="'city-'+item.title">{{ item.title }}</dt>
        <dd>
          <span
            v-for="c in item.city"
            :key="c">{{ c }}</span>
        </dd>
      </dl>
    </el-row>

  </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
  data(){
    return {
      list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block:[]
    }
  },
  watch: {
    block: function () {
      let self = this
      let newList = []
      this.list.forEach(item => {
        let newItem = {}
        let show = false
        self.block.forEach(b_item => {
          if (b_item.title === item) {
            show = true
          }
        })
        newItem = {
          word: item,
          show: show
        }
        newList.push(newItem)
      })
      this.list = newList
    }
  },
  async mounted(){
    let self=this;
    let blocks=[]
    let {status,data:{city}}=await self.$axios.get('/geo/city');
    if(status===200){
      let p
      let c
      let d={}
      city.forEach(item=>{
        p=pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
        c=p.charCodeAt(0)
        if(c>96&&c<123){
          if(!d[p]){
            d[p]=[]
          }
          d[p].push(item.name)
        }
      })
      for(let [k,v] of Object.entries(d)){
        blocks.push({
          title:k.toUpperCase(),
          city:v
        })
      }
      blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
      self.block=blocks
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/categroy.scss"
</style>
