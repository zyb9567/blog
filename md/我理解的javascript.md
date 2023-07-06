### JavaScript代码运行过程

假如我们有下面一段代码，它在JavaScript中是如何被执行的呢？
```
  var name = 'globalName'
  function foo() {
    var name = 'foo'
    console.log(name);
  }

  var num1 = 20
  var num2 = 30
  var result = num1 + num2

  console.log(result);

  foo()

```

JS引擎会在执行代码前，在堆内存中创建一个全局对象(GO,Global Object)``window``,
- 该对象所有作用域都能访问到
- 该对象内置 String、Array、Date、Number、setTimeout、setInterval等等
- 其中还有一个window属性指向自己；

JS引擎会在执行代码前，创建一个全局上下文，压入执行栈，每个上下文都会关联一个VO对象(变量对象 Variable Object)，用来存我们上文中的变量，全局上下文VO指向window，我们的全局定义（全局上下文）的变量、函数等会加入到全局对象中(Golbal Object-window);但不会对其赋值。
- 变量默认值为undefined
- 函数变量默认一个对象()
- 这个过程也叫变量的作用域提升

### 全局代码执行前
![Alt text](../img/01_%E5%85%A8%E5%B1%80%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E5%89%8D%E5%86%85%E5%AD%98%E5%9B%BE.png)


代码执行前全局上下文中的OV就是GO对象-window，代码从上到下开始执行代码。
先遇到 `` var name = 'globalName' `` 对堆内存赋值globalName

### 每个执行上下文（上下文）
- 变量对象(VO,Variable Object)  用来存储该上下文的变量。
- 作用域链(Socpe  Chain) ``全局上下文无作用域链``
- this指向 ``全局上下文this指向window``



### 函数执行前
![Alt text](../img/02_%E9%81%87%E5%88%B0%E5%87%BD%E6%95%B0_%E5%87%BD%E6%95%B0%E6%89%A7%E8%A1%8C%E4%BB%A3%E7%A0%81%E5%89%8D%E5%86%85%E5%AD%98%E5%9B%BE.png)

接着遇到foo函数，先创建一个函数上下文，并压入执行栈，每一个上下文包括三个重要的属性，函数上下文也会关联一个VO对象（活动对象），
- 这时需要在堆内存中创建AO对象(活动对象 Activation Object)，并且函数VO对象（变量对象）指向这个AO对象（活动对象），
- AO对象创建一个arguments属性并初始传入的值
- AO对象会作为函数执行上下文的VO来存放变量的初始化，name的初始化：undefined
- 作用域指向一个新的对象列表，这个对象列表第一个就是指向全局作用域链。

### 函数执行后

对AO对象中的name赋值'foo',打印foo，函数执行后，函数执行上下文从执行栈弹出，开始执行foo函数后面的代码






### 全局代码执行后

###  初始化全局对象(Global Object)
JS引擎会在执行代码前，在堆内存中创建一个全局对象(GO,Global Object)``window``,
- 

### 创建一个全局上下文，
每个上下文都会关联一个VO对象(变量对象 Variable Object)，用来存我们上文中的变量，我们的全局定义（全局上下文）的变量、函数等会加入到全局对象中(Golbal Object-window);






### 执行上下文

当javaScript 执行一段代码时，会创建对应的执行上下文。

我们执行上下文分为：
- 全局上下文

- 函数上下文

- eval上下文（不常用，先不做介绍）



###  全局上下文

全局上下文的变量对象(VO), 指向我们的全局对象window。
函数上下文的变量对象(VO), 指向我们的活动对象(AO,Activation Object)


### 上下文栈
上下文栈，用来管理上下文的。
