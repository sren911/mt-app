import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    async nuxtServerInit({
      commit
    }, {req, app}) {
      // getPosition
      const { status: status_getPosition, data: { province, city } } = await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition',status_getPosition === 200 ? { city, province }:{ city: '', province: '' })
      // menu
      const { status: status_menu, data: { menu } } = await app.$axios.get('/geo/menu')
      commit('home/setMenu', status_menu === 200 ? menu : [])
      // search
      const { status: status_hotPlace, data: { result } } = await app.$axios.get('/search/hotPlace', {
        params: {
          city: app.store.state.geo.position.city.replace('市', '')
        }
      })
      commit('home/setHotPlace', status_hotPlace === 200 ? result : [])
    }
  }
})

export default store
