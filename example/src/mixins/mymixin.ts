import type { App } from 'vue'
export const val1 = {
  data() {
    return {
      val1: 'testsdfsdf',
    }
  },
}

export function addShortKey(Vue: App) {
  let activeCompPath = '' // 当前选中组件的路径
  let firstComp = true // 当前组件是否为本次触发事件的第一个组件
  document.body.addEventListener('mouseup', () => {
    firstComp = true // 重置事件循环
  })
  // 监听鼠标事件
  document.body.addEventListener('keydown', (e) => {
    console.log(activeCompPath)
    if (!activeCompPath) return
    if (e.altKey) {
      switch (e.key) {
        case '1': // Alt +1
          // 将路径复制到粘贴板，
          // handleCopy(activeCompPath, msgUtil)
          console.log(activeCompPath)
          e.preventDefault()
          break
        case '2': // Alt + 2
          // TODO...
          break
        case '3': // Alt + 3
          // TODO...
          break
        case '4': // Al4 + 4
          // 配置按钮权限配置功能,抛出事件,参数为buttons
          // 管理员权限判断由外部控制
          // popAclConfigPage((buttons) => {
          //   getOption('onAclAction')(buttons) // 抛出方法
          // }, activeCompPath)
          e.preventDefault()
      }
    }
  })
  Vue.mixin({
    mounted() {
      let filePath = ''
      if (
        this.$options !== undefined // 排除根组件
        && this.$options.__file !== undefined // 排除内置组件
        && !/^(Jeecg|jeecg|El)/.test(this.$options.name) // 排除 element-ui 和 jeecg-ui 的组件
      )
        filePath = this.$options.__file

      this.__filePath = filePath
      if (this.__filePath !== '')
        this.$el.parentElement.addEventListener('mousedown', this.__setActiveCompPath)
    },
    beforeUnmount() {
      // 注意：有的Vue内置组件不存在$el
      if (this.__filePath !== '' && this.$el)
        this.$el.parentElement.removeEventListener('mousedown', this.__setActiveCompPath)
    },
    methods: {
      __setActiveCompPath() {
        if (firstComp === true) {
          activeCompPath = this.__filePath
          firstComp = false
        }
      },
    },
  })
}

export function dict(Vue: App) {
  Vue.mixin({
    data() {
      if (this.$options === undefined || this.$options.jeecgdicts === undefined || this.$options.jeecgdicts === null)
        return {}

      // const jeecgdicts = new JeecgDict() // 初始化JeecgDict实例
      const jeecgdicts = { aa: 11 } // 初始化JeecgDict实例
      // jeecgdicts.owner = this // 绑定当前实例对象
      return {
        jeecgdicts,
      }
    },
    created() {
      console.log(this.jeecgdicts)
      console.log(this)
      // if (!(this.jeecgdicts instanceof JeecgDict))
      //   return
      console.log(this.$options.jeecgdicts)

      // options.onCreated && options.onCreated(this.jeecgdicts);
      // 初始化数据字典数据
      // this.$options.jeecgdicts：组件传入的jeecgdicts属性，格式：{ types: ['data1', 'data2', ...] }
      // this.jeecgdicts.init(this.$options.jeecgdicts)
      // .then(() => {
      //   console.log(this.jeecgdicts);
      //   // options.onReady && options.onReady(this.jeecgdicts);
      //   this.$nextTick(() => {
      //     this.$emit('dictReady', this.jeecgdicts)
      //     if (this.$options.methods && this.$options.methods.onDictReady instanceof Function) {
      //       this.$options.methods.onDictReady.call(this, this.jeecgdicts)
      //     }
      //   });
      // });
    },
  })
}
