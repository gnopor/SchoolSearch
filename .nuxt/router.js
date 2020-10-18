import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3a01415e = () => interopDefault(import('../pages/consultation/index.vue' /* webpackChunkName: "pages/consultation/index" */))
const _1d7529d0 = () => interopDefault(import('../pages/ecole/index.vue' /* webpackChunkName: "pages/ecole/index" */))
const _4438934a = () => interopDefault(import('../pages/eleve/index.vue' /* webpackChunkName: "pages/eleve/index" */))
const _018669bc = () => interopDefault(import('../pages/consultation/_id/index.vue' /* webpackChunkName: "pages/consultation/_id/index" */))
const _07c5285d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/consultation",
    component: _3a01415e,
    name: "consultation"
  }, {
    path: "/ecole",
    component: _1d7529d0,
    name: "ecole"
  }, {
    path: "/eleve",
    component: _4438934a,
    name: "eleve"
  }, {
    path: "/consultation/:id",
    component: _018669bc,
    name: "consultation-id"
  }, {
    path: "/",
    component: _07c5285d,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
