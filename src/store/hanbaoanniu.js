import { defineStore } from 'pinia'

export const usehanbaoStore = defineStore('hanbaoanniu', {
  state: () => ({
    collapse: false
  }),
  actions: {
    setcollapse() {
      this.collapse = !this.collapse
    }
  }
})