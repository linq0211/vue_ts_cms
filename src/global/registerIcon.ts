// 封装了全局注册element Icon的使用，减少main.ts中代码量
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function registerIcon(app: App<Element>) {
  // 通过遍历注册全部的Icon
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default registerIcon
