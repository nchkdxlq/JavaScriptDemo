

// 1. 数组的解构赋值



// 2. 对象的结构赋值
console.log('============= 对象的结构赋值 ============');
{
  let { foo, bar } = { foo:'aaa', bar:'bbb' };
  console.log(foo); // aaa
  console.log(bar); // bbb
}


{
  /*
   对象的结构与数组有一个重要的不同。数组的元素时一次排列的，变量的取值由它的位置决定;
   而对象的属性没有顺序，变量必须与属性同名，才能取到正确的值。
  */
  let { bar, foo } = { foo:'aaa', bar:'bbb' };  // 变量名顺序与属性名称顺序不一致不影响取值
  console.log(foo); // aaa
  console.log(bar); // bbb

  let  { baz } = { foo:'aaa', bar:'bbb' };
  console.log(baz) // undefined 没有对应的属性名，导致取不到值
}

{
  /*
    如果变量名和属性名不一致的情况，必须写成下面的样子
  */

  let { foo: baz } = { foo:'aaa', bar:'bbb' };
  console.log(baz); // aaa

  let obj = { first:'hello', last:'world' };
  let { first: f, last: l } = obj;
  console.log(f); // hello
  console.log(l); // world
}


{
  let { foo: foo, bar: bar } = { foo:'aaa', bar:'bbb' };
  // 对象结构赋值的内部机制，是先找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者。
}

{
  let { foo:baz } = { foo:'aaa', bar:'bbb' };
  // console.log(foo); // Uncaught ReferenceError: foo is not defined
  console.log(baz);

  // 上面代码中，foo是模式匹配，baz才是变量。真正被赋值的是变量baz，而不是模式foo。
}

// 嵌套结构的对象
{
  let obj = {
    p: [
      'Hello',
      { y: 'World' }
    ]
  };

  let { p: [x, { y }] } = obj;
  console.log('x = ' + x + ', y = ' + y);
}


// 默认值
console.log('================ 解构赋值的默认值 ===============');
{
  // 对象的解构也可以指定默认值
  
  const { x = 3 } = {};
  console.log(x); // 3

  const { a, b = 5 } = { a: 5 };
  console.log('a = ' + a + ', b = ' + b);
}

{
  const { x = 3 } = {x: undefined};
  console.log(x); // undefined

  const { y = 3 } = { y: null };
  console.log(y); // null
}


{
  console.log('============ 字符串的解构赋值 =============');

  const [a, b, c, d, e] = 'hello';
}

{
  console.log('============ 数值和布尔值的解构赋值 ===========');
  // 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
}



// 解构赋值的用途

console.log('\n============= 解构赋值的用途 ============\n');
// 1. 交换两个值
{
  console.log('== 交换两个值 ==');
  let x = 1;
  let y = 2;
  [x, y] = [y, x];
}

// 2. 函数返回多个值
{
/*
  函数只能返回一个值，如果需要返回对个值，就需要放在数组或者对象中返回。有了解构赋值，取出这些字就非常方便了。
*/
  console.log('== 函数返回多个值 ==');
  // 返回一个数组
  function example() {
    return [1, 2, 3];
  }
  let [a, b, c] = example();

  // 返回一个对象
  function exampleObj() {
    return {
      foo: 1,
      bar: 2
    };
  }
  const { foo, bar } = exampleObj();
  console.log(foo, bar);
}


// 3. 函数参数的定义
{
  /*
    解构赋值可以方便地将一组参数与变量名对应起来。
  */
  console.log('== 函数参数的定义 ==');
  // 参数是一组有序的值
  function foo1([x, y, z]) {
    console.log(x, y, z);
  }
  foo1([1, 2, 3]);

  // 参数是一组无序的值
  function foo2({x, y, z}) {
    console.log(x, y, z);
  }
  foo2({ x:1, y:2, z:3 });
}

// 4. 提取JSON数据
{
  console.log('== 提取JSON数据 ==');
  // 提取JSON对象中的数据非常有用
  const jsonData = {
    id: 42,
    status: 'OK',
    data: [2019, 12]
  };

  const { id, status, data: number} = jsonData;
  console.log('id = ' + id, 'status = ' + status, 'data = ' + number);
}

// 5. 函数参数的默认值
{
  function ajax(url, {
    async = true,
    beforeSend = function() {},
    cache = true,
    complete = function() {},
    global = true
  } = {}) {
    console.log(url);
  }
}

// 6.遍历Map结构
{
  /*
    任何部署了Iterator接口的对象，都可以使用`for...of`循环遍历。Map结构原生支持Iterator接口，
    配合变量的解构赋值，获取键名和键值就非常方便了。
  */
  const map = new Map();
  map.set('first', 'hello');
  map.set('second', 'world');

  for (let [key, value] of map) {
    console.log(key + ' is ' + value);
  }

  for (let item of map) {
    // item是一个数组，包含两个元素
    console.log(item);
  }

  // 获取键名
  for (let [key] of map) {
    console.log(key);
  }

  // 获取键对应的值
  for (let [, value] of map) {
    console.log(value);
  }

}

// 7. 输入模块指定方法
{
  /*
    加载模块时，往往需要指定输入一些方法。解构赋值使得输入语句非常清晰。
  */

  const { sourceMapSonsumer, sourceNode } = require('source-map');
}
