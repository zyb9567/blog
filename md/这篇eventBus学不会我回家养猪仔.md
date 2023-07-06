![R-C.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51557e63f9754756bab91b6d05202ec6~tplv-k3u1fbpfcp-watermark.image?)

## 需求：
实现多组件间的数据传递（vue一级一级的传递太繁琐）引出封装``EventBus``

## 事件总线EventBus 

- eventMap  事件对象，存放订阅的名称和事件
- $on 监听事件
- $emit 触发事件
-  $off 取消订阅

## 原理

利用观察者模式，
1. 定义eventMap  事件对象，存储观察者;
2. $on 注册观察者
3. $emit 通知观察者

## 实现
```
// 创建一个事件总线类
class EventBus {
      constructor () {
        this.eventMap = {} // 事件对象，存放订阅的名称和事件
      }

      // 2、监听事件
      $on(eventName, eventFn){
        const eventFns = this.eventMap[eventName]
        if (!eventFns) { // 说明没有订阅过
          eventFns = []
          this.eventMap[eventName] = eventFns
        } 
        eventFns.push(eventFn) // 将事件存入对应的事件名称中
      }

      // 3、触发事件
      $emit(eventName, ...args){
        const eventFns = this.eventMap[eventName] || []
        if(!eventFns) return // 说明没有订阅过
        // 遍历执行事件
        eventFns.forEach(eventFn => {
          eventFn(...args)
        });
      }

      // 4、移除事件

      $off(eventName,eventFn){
        const eventFns = this.eventMap[eventName] 
        if(!eventFns) return // 说明没有订阅过
        for (let index = 0; index < eventFns.length; index++) {
          if (eventFns[index] === eventFn){
            eventFns.splice(index, 1)
            break;
          }
        }

        // 如果移除后，当前事件名称下没有事件了，则删除该事件名称
        if (eventFns.length === 0) {
          delete this.eventMap[eventName]
        }
      }

     
    }

```

## EventBus使用

```
  // 创建EventBus实例
  const eventBus = new EventBus()

  function aa(...args) {
    console.log(...args);
  }

  // 监听事件aa
  eventBus.$on('test', aa)
  
  const btn = document.querySelector('#btn')
  btn.addEventListener('click', () => {
    eventBus.$emit('test', 1, 2) // 触发事件
  })

  // 2秒取消订阅事件
  setTimeout(() => {
    eventBus.$off('test', aa)
  }, 2000)
```