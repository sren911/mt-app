export default {
  dbs: 'mongodb://admin:123456@127.0.0.1:27017/mt?authSource=admin',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '2654251815@qq.com'
    },
    get pass() {
      return 'cjufpylhlcdvdigd'
    },
    get code() {
      return () => {
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 1000
      }
    }
  }
}
