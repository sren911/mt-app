<template>
  <div class="m-iselect">
    <el-row>
      <el-col :span="2">
        <span class="name">按省份选择：</span>
      </el-col>
      <el-col :span="5">
        <el-select
          v-model="pvalue"
          placeholder="省份">
          <el-option
            v-for="(item, index) in province"
            :key="index"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select
          v-model="cvalue"
          :disabled="!city.length"
          placeholder="城市">
          <el-option
            v-for="(item, index) in city"
            :key="index"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-col>
      <el-col :span="2">
        <span class="name">直接搜索：</span>
      </el-col>
      <el-col :span="5">
        <el-select
          v-model="input_res"
          :remote-method="querySearchAsync"
          :loading="loading"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入内容">
          <el-option
            v-for="(item, index) in cities"
            :key="index"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: [],
      input_res: [],
      cities:[],
      loading: false,
    }
  },
  watch: {
    pvalue: async function (newPvalue) {
      let self = this
      let { status, data: { city } } = await self.$axios.get(`/geo/province/${newPvalue}`)

      if (status === 200) {
        self.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        self.cvalue = ''
      }
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query) {
      let self = this
      if (self.cities.length) {
        self.cities = self.cities.filter(item => item.label.indexOf(query) > -1)
      } else {
        self.loading = true;
        let { status, data: { city } } = await self.$axios.get('/geo/city')
        self.loading = false;
        if (status === 200) {
          self.cities = city.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
          self.cities = self.cities.filter(item => item.label.indexOf(query) > -1)
        } else {
          self.cities = []
        }
      }
    }, 200),
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
