

function abs(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}

var res = abs(-10);
console.log(res);


// 匿名函数，这个匿名函数赋值给变量 abs, 所以可以通过变量调用该函数
var abs = function(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}; // 需要在这里加上 ;, 表示赋值语句结束。

var res = abs(-1);
console.log(res);



/**
 *  函数调用
 *  函数调用时，参数按顺序传入即可。由于JavaScript允许传入任意个参数而不影响调用，
 *  1. 传入的参数个数比定义要多时, 多余的参数不会处理
 *  2. 传入的参数比定义少时, 没传入的参数的值为 undefided
 * 
 * 
 */

 // 对传入的参数做合法性检查
 function abs(x) {
     if (typeof x !== 'number') {
         throw 'Not a number';
     }

     if (x >= 0) {
         return x;
     } else {
         return -x;
     }
 }



/**
 *  arguments 关键字，只在函数内部起作用，指向函数调用者传入的所有参数，有点类似array, 但不是array
 *  常用语判断传入参数的个数
 */



 function foo(x) {
     console.log("x = " + x);

     for (var i = 0; i < arguments.length; i++) {
         console.log("arg " + i + " = " + arguments[i]);
     }
 }

 foo(10, 20, 30);



 // rest 关键字; 
 
 function foo(a, b) {
    var i, rest = [];
    if (arguments.length > 2) {
        for (i = 2; i<arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}
 
 // ES6标准引入了rest参数，上面的函数可以改写为
 function foo(a, b, ...rest) {
     console.log('a = ' + a);
     console.log('b = ' + b);

     console.log(rest);
 }

foo(10, 20, 30);



// 变量提升， JavaScript函数定义有个特点，它会先扫描整个函数体的语句，把所有声明的变量"提升"到顶部

function foo() {
    // 只会提升y的声明，不会提升y的赋值

    var x = "Hello, " + y; // Hello, undefined
    console.log(x);
    var y = "Bob";
}

foo();




/**
 * 解构赋值: 从ES6开始，JavaScript引入了解构赋值，可以同时对一组变量进行赋值。
 *  
 * 
 */

 // 传统赋值

 var array = ['hello', 'javascript', 'ES6'];
 var x = array[0];
 var y = array[1];
 var z = array[2];

 // 解构赋值，同时给一组变量赋值
 var [x, y, z] = ['hello', 'javascript', 'ES6'];
 console.log('x = ' + x + ', y = ' + y + ', z = ' + z);

 // 数组本身还有嵌套
 var [x, [y, z]] = ['hello', ['JavaScript', 'ES6']];

 // 解构赋值还可以忽略某些元素：
var [, , z] = ['hello', 'JavaScript', 'ES6']; // 忽略前两个元素，只对z赋值第三个元素
console.log('z = ' + z);


// 如果需要从一个对象中取出若干属性，也可以使用解构赋值，便于快速获取对象的指定属性：
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};
var {name, age, passport} = person;
console.log('name = ' + name + ', age = ' + age + ', passport = ' + passport);


// 对一个对象进行解构赋值时，同样可以直接对嵌套的对象属性进行赋值，只要保证对应的层次是一致的：
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school',
    address: {
        city: 'Beijing',
        street: 'No.1 Road',
        zipcode: '100001'
    }
};
var {name, address: {city, zip}} = person;
name; // '小明'
city; // 'Beijing'
zip; // undefined, 因为属性名是zipcode而不是zip
// 注意: address不是变量，而是为了让city和zip获得嵌套的address对象的属性:
// address; // Uncaught ReferenceError: address is not defined

// 利用对象进行解构赋值时，如果对应的属性不存在，则对应的变量被赋值为undefined

var {name, age: myAge} = person;
name; // '小明'
myAge; // 20 ，把执行的属性赋值给指定的变量


// 解构赋值还可以使用默认值，这样就避免了不存在的属性返回undefined的问题：
var {name, single = true} = person;
name;
single;






// 高阶函数：函数的参数为函数时，称为高阶函数

console.log('========== 高阶函数 ========');

var intArr = [1, 2, 3, 4];

function pow(x) {
    return x * x;
}

// pow作为函数的参数传递给 map
var res = intArr.map(pow);
console.log('map: ' + res);

// reduce   参数的函数foo(x, y)接收两个参数, x为当前结果, y为序列的下一个元素

// 利用reduxe求一个数组的和
function sum(x, y) {
    return x + y;
}
var res = intArr.reduce(sum);
console.log('reduce 求和: ' + res);


function string2Int(s) {
    var arr = [];
    for (var i = 0; i < s.length; i++) {
        arr[i] = s[i];
    }

    function char2Int(x) {
        return x - '0';
    }
    function arr2Number(x, y) {
        return 10 * x + y;
    }
    
    return arr.map(char2Int).reduce(arr2Number);
    return arr.map(function(x){return x - '0';}).reduce(function(x, y){return 10 * x + y;});
}

var res = string2Int('123');
console.log('string2Int: ' + res);


// filter 过滤一些元素，返回满足条件的元素

var intArr = [1, 2, 3, 4, 5, 6];
var res = intArr.filter(function (x) { return x % 2});
console.log('filter: ' + res); // 1, 3, 5


// sort() 默认情况先把元素转换为string在排序，总结：默认根据ASIIC码字符序

['Google', 'apple', 'Microsoft'].sort(); // ['Apple', 'Google', 'Microsoft'];

['Google', 'apple', 'Microsoft'].sort(); // ['Google', 'Microsoft", 'apple']


var intArr = [10, 12, 3, 14, 25, 6];

intArr.sort(); //10,12,14,25,3,6

var res = intArr.sort(function (x, y) {
    return x - y; // 返回-1，表示x在y的前面，即 x-y升序， y-x降序
});
// 3,6,10,12,14,25


var arr = ['Google', 'apple', 'Microsoft'];

// 忽略大小写比较

var res = arr.sort(function(x, y) {
    x = x.toUpperCase(); y = y.toUpperCase();
    // x = x.toLowerCase(); y = y.toLowerCase();

    if (x < y) {
        return -1;
    } else {
        return 1;
    }
});

// ["apple", "Google", "Microsoft"]




// Arrow Function (ES6标准新增了一种新的函数: 箭头函数)

// 普通函数
var f1 = function(x) {
    return x * x;
}
// 箭头函数
var f2 = x => x * x;
f1(2);
f2(2);

// 多个参数，需要用()括起来
(x, y) => x + y;

// 无参数
() => 2004;

// 可变参数
(x, y, ...rest) => {
    var i, sum = x + y;
    for (i = 0; i < rest.length; i++) {
        sum += rest[i];
    }
    return sum;
};

// 还缺少箭头函数对 `this` 指针的讨论， 待补充





// generator 生成器  是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。


// 编写一个产生斐波那契数列的函数
function fib(max) {
    var
        t,
        a = 0,
        b = 1,
        arr = [0, 1];
    while (arr.length < max) {
        [a, b] = [b, a + b];
        arr.push(b);
    }
    return arr;
}

// 测试:
fib(5); // [0, 1, 1, 2, 3]
fib(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]


function* fib(max) {
    var 
        t,
        a = 0,
        b = 1,
        n = 0;
    while(n < max) {
        yield a;
        [a, b] = [b, a + b];
        n++;
    }

    return;
}


var f = fib(5); // 创建一个生成器对象, 还没有执行
var {value, done} = f.next(); // {value: 0, done: false}
console.log('value = ' + value, 'done = ' + done);

f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: false}
f.next(); // {value: undefined, done: true}

// next()方法会执行generator的代码，然后，每次遇到yield x;就会返回一个对象{value: x, done: false/true}, 然后暂停，
// value就是yield的返回值，done表示这个generator是否执行结束，如果done为true，则value就是return的返回值

for (var x of fib(10)) {
    console.log(x); // 依次输出0, 1, 1, 2, 3, ...
}


// 实现一个自增id的生成器

function* increaseMent() {
    var num = 0;
    while (true) {
        yield num;
        num++;
    }
}

