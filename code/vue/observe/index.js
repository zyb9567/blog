import { arrayMethods } from './array'

class Observe {
  constructor(value) {
    if(Array.isArray(value)) {
      value.__proto__ = arrayMethods
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  observeArray(items) {
    for(let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }

  walk(data) {
    let kyes = Object.keys(data)
    for (let i = 0; i < kyes.length; i++) {
      let key = kyes[i]
      let value = data[key]
      defineReactive(data, key, value)
    }
  }
}

// Object.defineProperty数据劫持核心 兼容性在ie9以及以上

function defineReactive(data, key, value) {
  observe(value); // 递归关键
  Object.defineProperty(data, key, {
    get() {
      console.log('get', value)
      return value
    },
    set(newValue) {
       console.log('set', newValue)
       if (newValue === value) return
       data[key] = newValue
    }
  })

}

export function observe(value) {
  // 如果传过来的数据是对象或者是数组， 进行属性劫持
  if (
    Object.prototype.toString.call(value) === "[object Object]" ||
    Array.isArray(value)
  ) {
    return new Observer(value);
  }
}