const PENDING = 'PENDING' // 待定
const FULFILLED = 'FULFILLED' // 成功
const REJECTED = 'REJECTED' // 失败

function resolvePromise (promise2, x, resolve, reject) {

}

class MyPromise {
  constructor (executor) {
    this.state = PENDING
    this.val = undefined
    this.reason = undefined
    this.onfulfilledList = []
    this.onrejectedList = []

    // 成功调用函数
    const resolve = (val) => {
      if (this.state === PENDING) {
        this.val = val
        this.state = FULFILLED
        this.onfulfilledList.forEach(fn=>fn())
      }
    }

    // 失败调用函数
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason
        this.state = REJECTED
        this.onrejectedList.forEach(fn=>fn())
      }

    }

    try{
      executor(resolve, reject)
    } catch(e) {
      console.log(e)
      reject(e)
    }

  }

  then (onfulfilled, onrejected) {
    let promise2 = new MyPromise((resolve, reject)=>{
      onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
      onrejected = typeof onrejected === 'function' ? onrejected : {
        // throw console.error(); to-do
      }
  
      
      if (this.state === FULFILLED) {
        setTimeout(()=> {
          try{
            let x = onfulfilled(this.val)
            resolvePromise(promise2, x, resolve, reject)
          }catch (e) {
            reject(e)
          }
        },0)
      
      }

      if (this.state === REJECTED) {
        setTimeout(()=> {
          try{
            let x = onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          }catch (e) {
            reject(e)
          }
        },0)
      
      }
      
      if(this.state === PENDING) {

        this.onfulfilledList.push(
          setTimeout(()=> {
            try{
              let x = onfulfilled(this.val)
              resolvePromise(promise2, x, resolve, reject)
            }catch (e) {
              reject(e)
            }
          },0)
        )

        this.onrejectedList.push(
          setTimeout(()=> {
            try{
              let x = onfulfilled(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            }catch (e) {
              reject(e)
            }
          },0)
        )

      }
    })

    return promise2
  }
}



let p1 = new MyPromise((resolve, reject)=>{
   resolve(111)
   reject(222)
})

p1.then((res)=> {
  console.log(res);

},(err)=>{
  console.log(err);

})