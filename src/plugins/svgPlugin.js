import { getSvg } from '../services/svg.service.js'

export default {
  install: (app) => {
    app.config.globalProperties.$getSvg = (key) => {
      return getSvg(key)
    }
  },
}
