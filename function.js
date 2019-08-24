

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