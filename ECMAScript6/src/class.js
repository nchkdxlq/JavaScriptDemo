

console.log('=================== ES6 class ===================');

class Point {

  // 构造方法，this关键字代表实例对象
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

console.log('typeof Point is ' + typeof Point); // function，类的数据类型就是函数

// 
console.log('Point === Point.prototype.constructor is ' + (Point === Point.prototype.constructor)); // true
/*
  类的数据类型就是函数，类本身就指向构造函数。
*/


{

  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }

  const point = new Point(10, 20);
  console.log(point.toString());

  // hasOwnProperty() 判断某个实例对象是否存在某个属性
  console.log(point.hasOwnProperty('x')); // true

  console.log(point.hasOwnProperty('y')); // true

  console.log(point.hasOwnProperty('toSTring')); // false

  console.log(point.__proto__.hasOwnProperty('toString')); // true

  console.log('point.__proto__ === Point.prototype is ' + (point.__proto__ === Point.prototype)); // true

}


class MyClass {
  constructor() {
    //...
  }

  // 可以使用`get`和`set`关键字为某个属性设置 `取值函数`和`存值函数`，拦截属性的行为。
  get prop() {
    return 'getter prop';
  }
  set prop(value) {
    console.log('setter: ' + value);
  }
}

{
  const instance = new MyClass();
  instance.prop = 123;
  console.log(instance.prop);
}


// Class 表达式
console.log('=========== Class 表达式 ===========');
{
  // 和函数一样，类也可以使用表达式的形式来定义

  const MyClass = class Me {
    getClassName() {
      return Me.name;
    }
  }

  let instance = new MyClass();
  console.log(instance.getClassName());
  // Me.name; // Uncaught ReferenceError: Me is not defined

  // 上面的代码表示，`Me`只在Class内部有定义

  // 如果类的内部没有使用的话，可以省略`Me`, const MyClass = class {  }
}




// Class 继承

/*


*/