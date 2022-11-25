// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $_BasesSetData: any,
    $_Bases:any
  }
}