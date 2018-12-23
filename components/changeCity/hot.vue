<template>
  <div class="m-hcity">
    <el-row>
      <el-col :span="2">
        <span class="name">热门城市：</span>
      </el-col>
      <el-col :span="20">
        <ul>
          <li
            v-for="item in list"
            :key="item.id">{{ item.name==='市辖区'?item.province:item.name }}</li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[]
    }
  },
  async mounted(){
    let {status,data:{hots}}=await this.$axios.get('/geo/hotCity')
    if(status===200){
      this.list=hots
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/hot.scss";
</style>
