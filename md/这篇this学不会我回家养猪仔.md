


![R-C.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dec6b7c99a53401c92a7883520fe4f31~tplv-k3u1fbpfcp-watermark.image?)


### 我对this的解释
```
var obj1 = {
    name: "obj1",
    foo: function() {
      var obj1 = {
        name: "foo",
      }
      console.log(obj1.name); 
      console.log(this.name);
    }
  }
  obj1.foo();
```

上面代码``console.log(obj1.name); ``  通过对象名来访问属性name， 期望打印obj1  不符合预期？  变量名冲突导致
上面代码``console.log(this.name);``   通过this来访问属性name,   期望打印obj1   符合预期？   js关键字无冲突


通过上面的代码，来说下this：

**this是对象的别名，就像其他对象的变量名一样，可以避免使用对象名访问产生冲突，ecma定义this这个关键字，方便使用**


### this的分类

- 默认绑定 ``独立函数的调用``
  - 非严格模式 this指向全局对象， 浏览器中是window对象  Node中是Glob对象
  - 严格模式下 this指向是 underfinde
- 隐式绑定  ``对象通过.调用``
- 显示绑定 ``通过call、apply、bind显示指定``

- new关键字， 构造函数中的this指向创建的对象
- 箭头函数， 不绑定this，不绑定argument, this取上级作用域的this， 箭头不能使用call、bind

### this 面试题1
```
  var name = "window";
  var person = {
    name: "person",
    sayName: function () {
      console.log(this.name);
    }
  };

  function sayName() {
    var sss = person.sayName;
    sss(); //  函数独立执行  默认绑定 非严格模式 this指向window

    person.sayName(); // 通过.调用，this永远指向调用它的对象 隐式绑定 this指向person  打印person

    (person.sayName)(); // 隐式绑定  this指向person  打印person

    (b = person.sayName)(); // 默认绑定  非严格模式 this指向window  打印window
  }

  sayName();
```

### 解析

- ``sss()`` 独立函数执行  默认绑定 非严格模式 this指向window, 打印window
- ``person.sayName();`` // 通过.调用，this永远指向调用它的对象, 隐式绑定, this指向person, 打印person
- `` (person.sayName)();`` 类似``person.sayName();``  通过.调用，this永远指向调用它的对象, 隐式绑定, this指向person, 打印person

-  ``(b = person.sayName)(); `` // 把person.sayName的函数对象赋值给b, 然后再调用， 独立函数执行  默认绑定 非严格模式 this指向window, 打印window


### this面试题2
```
  var name = 'window'


// {} -> 对象
// {} -> 代码块
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }


// 开始题目:
person1.foo1(); // 通过函数名调用，this指向调用者，即person1, 隐式绑定 打印 person1
person1.foo1.call(person2); //通过call调用，this指向call的第一个参数，即person2, 显式绑定 打印 person2

person1.foo2(); // 箭头函数不绑定this，this指向外层作用域，即window, 打印 window
person1.foo2.call(person2); // 箭头函数不绑定this，this指向外层作用域，即window, 打印 window

person1.foo3()(); // 独立函数执行 默认绑定  this指向window  打印window
person1.foo3.call(person2)(); // 独立函数执行 默认绑定  this指向window  打印window
person1.foo3().call(person2); // 显示绑定，this指向 call的第一个参数  person2 打印person2

person1.foo4()(); // 箭头函数  this指向 上层作用域的this，  person1，  打印persion1
person1.foo4.call(person2)(); // 箭头函数  this指向 上层作用域的this，  person2，  打印persion2
person1.foo4().call(person2);// 箭头函数不绑定this，  this指向 上层作用域的this，  person1，  person1

```
### 详细解析

`person1.foo1(); `通过.调用，this指向调用者，即person1, 隐式绑定 打印 person1
`person1.foo1.call(person2);` 通过call 显示绑定this persion2，this指向call的第一个参数，即person2, 显式绑定 打印 person2
`person1.foo2(); ` 箭头函数不绑定this，this指向外层作用域，**person1对象是作用域的**所以外层作用域window, 打印 window

`person1.foo2.call(person2);`// 箭头函数不绑定this，不能被call指定this， this指向外层作用域，即window, 打印 window

`person1.foo3()();`  **person1.foo3()**  返回了一个内部匿名函数， 然后独立执行， 默认绑定  this指向window  打印window
`person1.foo3.call(person2)();`  **person1.foo3.call(person2)** 把foo3的this通过call  显示绑定this persion2, 接着返回一个匿名函数，接着匿名函数独立执行，默认绑定  this指向window  打印window
`person1.foo3().call(person2);` **person1.foo3()**  返回了一个内部匿名函数，匿名函数使用call显示绑定， this指向 call的第一个参数  person2 打印person2
`person1.foo4()();` **person1.foo4()** this   返回了一个匿名**箭头**函数，
// 箭头函数  this指向 上层作用域的this，  person1，  打印persion1
