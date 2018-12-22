<template>
  <div>

    <el-button
      type="primary"
      @click="getIp">获取ip</el-button>
    <el-button
      type="primary"
      @click="getGeo">获取本地地理位置信息</el-button>
    <div>
      <p>{{ ip }}</p>
      <p>{{ geo }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'blank',
  data () {
    return {
      ip: '127.0.0.1',
      geo: ''
    }
  },
  methods: {
    getIp: async function () {
      let res = await axios.get('https://ifconfig.me/ip')
      if (res) {
        this.ip = res.data
        //console.log(res.data)
      }
    },
    getGeo: async function () {
      let key = '5cb2e83728acea12563c96778be09d73'
      if (this.ip !== '127.0.0.1') {
        let res = await axios.get(`https://restapi.amap.com/v3/ip?ip=${this.ip}&key=${key}`)
        if (res) {
          this.geo = res.data
        }
      }
    }
  }
}
</script>

<style lang="scss">

</style>
