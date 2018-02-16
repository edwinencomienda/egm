import { types } from '../../types'

export const state = {
  apps: []
}

export const getters = {
  apps: state => state.apps
}

export const mutations = {
  [types.partner.PARTNER_APP_SET] (state, payload) {
    let apps = []
    const clusters = payload
    // merge all apps from all clusters
    clusters.forEach(element => {
      apps = [...apps, ...element.apps]
    })
    state.apps = apps
  }
}

export const actions = {
}
