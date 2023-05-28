


![R-C.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dec6b7c99a53401c92a7883520fe4f31~tplv-k3u1fbpfcp-watermark.image?)
### 需求
vue2.0数据响应式，我们希望监听这个对象中的属性被设置或获取的过程--->ES5 Object.defineProperty

### JavaScript
```
  let obj = {
    name: "zyb",
    age: 18,
    height: 2.0,
  };

  
  // 1、监听对象的一个属性的操作过程
  // let _name = obj.name
  // Object.defineProperty(obj, "name", {
  //   set: function (newValue) {
  //     console.log('监听设置name的值', newValue);
  //     _name = newValue
  //   },
  //   get: function () {
  //     console.log('监听获取name的值', _name);
  //     return _name
  //   }
  // })
  // obj.name
  // obj.name = '9567'


  // 2、监听对象的多个属性的操作过程
  Object.keys(obj).forEach(key=>{
    let value = obj[key];
    Object.defineProperty(obj, key,{
      set: function (newValue) {
        console.log(`监听设置${key}新值：`, newValue);
        value = newValue
      },
      get: function () {
        console.log(`监听${key}获取新值：`, value);
        return value
      }
    })
  })

  obj.name
  obj.name = '9567'
  obj.name

  obj.age
  obj.age = 100
  obj.age
```

### JavaScript
```

```

### 分析 ``Object.defineProperty（vue2.0）`` 实现数据响应式的不足及痛点
 - Object.defineProperty设计的初衷，不是为了去监听截止一个对象中所有的属性的.

 - 我们想监听更加丰富的操作，比如新增属性、删除属性，那么Object.defineProperty 是监听不到的 （vue2.0数据绑定的痛点，用set来通知）
 - **Proxy的出现 可以解决Object.defineProperty痛点**

### 

## ES6 Proxy类 
*** Proxy基本使用 ***

``` 
 const p = new Proxy(target, handler)
```
new 一个Proxy对象， 对代理对象p进行操作，监听属性需要在 handler添加捕获器，

### 常用捕获器如下 ###

### 1、set(target， property, value,  receiver) 函数有四个参数 ###
set是设置代理对象的值，代理对象会处理操作对象设置
- target：目标对象（侦听的对象）
- property：将被设置的属性key
- value：新属性值
- receiver：调用的代理对象

### 2、get(target， property, value) 函数有三个参数###
get 是获取代理对象的值
- target：目标对象（侦听的对象）
- property：将被设置的属性key
- receiver：调用的代理对象

### deleteProperty(target, key) 函数有二个参数###
deleteProperty 删除对象属性
- target：目标对象（侦听的对象）
- property：将被设置的属性key
- receiver：调用的代理对象



### JavaScript ###
```
  let obj = {
    name: "zyb",
    age: 18,
    height: 2.0,
  };

  
  let p = new Proxy(obj, {
    set: function (target, key, newValue, receiver) {
      console.log(`监听${key}设置新值：`, newValue);
      target[key] = newValue
    },
    get: function name(target, key) {
      console.log(`监听${key}获取：`, target[key]);
      return target[key]
    },
    deleteProperty: function (target, key) {
      console.log(`监听${key}的删除`);
      delete target[key]
    }
  })
  p.name
  p.name = '9567'
  p.name

  p.age
  p.age = 100
  p.age


  //解决 vue2.0痛点 演示  对象新增、删除属性的监听

  delete p.height
  p.height

  p.zyb = '9567'
  p.zyb

```

### 场景总结
* 框架、库做响应式

### Vue框架 响应式原理实现
* vue2.0 -->  Object.defineProperty

* vue3.0 -->  Proxy
