import { VueConstructor } from 'vue'

export function getParent<S extends Vue, T extends VueConstructor<S>>(vm: Vue, type: T): S {
  let e = vm.$parent
  while (e) {
    if (e.constructor === type) {
      return e as S
    }
    e = e.$parent
  }
  throw new Error(`Parent ${type} is not found.`)
}
