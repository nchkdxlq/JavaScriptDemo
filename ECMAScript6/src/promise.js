

function asyncTask(timeCost, success) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        if (success === true) {
          resolve('done')
        } else {
          rejected(new Error('task faild'))
        }
      }, timeCost)
    })
}

/*
Promise的执行顺序

1. Promise一旦创建就会执行, 作为构造函数参数的的函数就会立即执行。

下面的执行顺序为
0000
1111
2222
3333
4444
done
*/
function promise_test1() {
  console.log('========== promise_test1 ==========')
  console.log('0000')
  const promise = new Promise(function(resolve, rejected) {
    console.log('1111')
    setTimeout(() => {
      resolve('test1 done')
    }, 1 * 1000);
    
    console.log('2222')
  })

  console.log('3333')
  promise.then((value) => {
    console.log(value)
  }, (error) => {
    console.log(error)
  })

  console.log('4444')
}


/*
如果状态已经发生，再对Promise对象添加回调函数，会立即得到结果。
这与事件完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

*/

function promise_test2() {
  console.log('========== promise_test2 ==========')
  const promise = new Promise((resolve, rejected) => {
    resolve('test2 done')
  })
  setTimeout(() => {
    promise.then((value) => {
      console.log(value)
    })
  }, 500);
}


/*
resolve函数的参数除了正常的值以外，还可能是另一个Promise实例。

需要注意的是，这时p1的状态会传递给p2, 也就是说，p1的状态决定了p2的状态。
如果p1的状态是`pending`, 那么p2的回调函数就会等待p1的状态的改变；
如果p1的状态已经是`resolved`或者`rejected`, 那么p2的回调函数将会立即执行.

*/


function promise_test3() {
  console.log('======= promise_test3  =======')

  const p1 = new Promise((resolve, rejected) => {
    setTimeout(() => {
      rejected(new Error('fail'))
    }, 3000);
  })

  const p2 = new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(p1)
    }, 1000);
  })

  p2.then((value) => {
    console.log(value)
  }).catch((error) => {
    console.log(error)
  })
}



/*
Promise.prototype.then()

当异步任务需要顺序执行时，一个异步任务执行完后，使用then，返回一个新的Promise

*/

function promise_then_test1() {

  console.log('======= promise_then_test1  =======')

  asyncTask(1000, false)
  .then(value => {
    console.log(value + ' 1111')
    return asyncTask(1000, false)
  }).then((value) => {
    console.log(value + ' 2222');
  }, (error) => {
    console.log(error + ' 3333')
  })
}



/*
  Promise.prototype.catch()
  用于指定发生错误时的回调函数

*/

function promise_catch_test() {
  console.log('======= promise_catch_test  =======')
  
  asyncTask(1000, false)
  .then((value) => {
    console.log(value + ' 1111')
  }).catch((error) => {
    console.log(error + ' 2222')
  })
}


function test_promise() {
  // promise_test1()
  // promise_test2()
  // promise_test3()
  // promise_then_test1()
  promise_catch_test()
}


test_promise()
