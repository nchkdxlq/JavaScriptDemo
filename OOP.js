
// 面向对象编程


// 1. 在JavaScript中，不区分类和实例的概念，而是通过原型(prototype)来实现面向对象编程。

var robot = {
    name: 'Robot',
    height: 1.6,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

// 定义一个Student对象

var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

var xiaoming = {
    'name': '小明'
};

// 把`xiaoming`的原型指向了对象`Student`, 看上去`xiaoming`好像是从`Student`继承来的。
xiaoming.__proto__ = Student;

xiaoming.name;  // 小明
xiaoming.run(); // 小明 is running...


// 2. 在JavaScript中，没有`class`的概念，所有的对象都是实例；所谓的继承关系是把对象的原型(prototype)指向另一个对象。

// 思考题: 如果两个对象的`原型`分别指向对方会发生什么事情 ?

var Bird = {
    fly: function() {
        console.log(this.name + ' is flying...');
    }
};

// 3. 在JS代码运行时期，可以把`xiaoming`从`Student`变成`Bird`, 或者变成任何对象.
xiaoming.__proto__ = Bird;

xiaoming.fly();


// 4. 利用Object.create() 方法传入一个原型对象，并创建一个基于该原型对象的新对象，但是新对象什么属性都没有。

function createStudent(name) {
    var s = Object.create(Student)
    s.name = name;
    return s;
}


var xiaoming1 = createStudent('小明');
xiaoming1.name; // 小明
xiaoming1.run();
console.log(xiaoming1.name);



// 对象的原型链

// JS对每一个创建的对象都有设置一个原型，指向他的原型对象。

/**
 *  当我们使用`obj.xxx`访问一个对象的属性时，JS引擎先在当前对象上查找该属性，如果没找到，就到原型对象上找，
 *  如果还没找到，就一直上溯到`Object.prototype`对象，最后如果还没找到，就只能返回`undefined`。
 */

/**
 *  Array的原型链: arr ----> Array.prototype ----> Object.prototype ----> null
 */

 /**
  *  函数也是一个对象，原型链为: foo ----> Function.prototype ----> Object.prototype ----> null
  */

// 总结：原型链有点像`继承链`, 但不是同一个概念.

// 如果原型链很长，那么访问一个对象的属性就会因为花更多的时间查找而变得更慢，因此要注意不要把原型链搞得太长。



/**
 *  构造函数
 *  除了可以使用`{...}`创建一个对象外，JS还可以使用`构造函数`的方法创建对象。
 */

 console.log('======== constructor ========\n');

 // 定义一个构造函数

function Dog(name) {
     this.name = name;
     this.hello = function() {
         console.log('Hello, ' + this.name);
     }
 }


// 它确实是一个普通函数，但可以使用`new`关键字来调用这个函数，并返回一个对象。
var dog = new Dog('哈士奇');
dog.name; // 哈士奇
dog.hello(); // Hello, 哈士奇

// 注意: 如果不写`new`, 这就是一个普通函数，它返回`undefined`; 但是使用了`new`, 它就变成了一个构造函数。
// 它绑定的`this`指向新创建的对象，并默认返回`this`, 所以不需要在函数最后 `return this;`


// 使用`new Dog()`创建的对象还从原型上获得了一个`constructor`属性，它指向`Dog`函数本身。
var res = dog.constructor === Dog;
console.log(res);

console.log('dog.prototype = ' + dog.prototype);
console.log('dog.constructor = ' + dog.constructor);

var res = dog.constructor === Dog.prototype.constructor;  // true
console.log(res);

var res = Dog.prototype.constructor === Dog; // true
console.log(res);

console.log('Object.getPrototypeOf(dog) = ' + Object.getPrototypeOf(dog));
console.log('Dog.prototype = ' + Dog.prototype);

var res = Object.getPrototypeOf(dog) === Dog.prototype // true
console.log(res);

var dog1 = new Dog('dog1');
var dog2 = new Dog('dog2');

dog1.name; // 'dog1'
dog2.name; // 'dog2'

// 注意: dog1 和 dog2 各自的`hello`是一个函数，但它们是不同的函数，尽管函数名称和代码是相同的
var res = dog1.hello === dog2.hello; // false
console.log('dog1.hello === dog2.hello : ' + res);

// 思考，要让`dog1`和`dog2`共用`hello`函数，只需要把`hello`函数移到`dog1`和`dog2`的公共原型即可
// 而`dog1`和`dog2`公共原型是 Dog.prototype, 所以只需要

function DogV2(name) {
    this.name = name;
}

Dog.prototype.helle = function(name) {
    this.name = name;
}

var dog1 = new DogV2('dog1');
var dog2 = new DogV2('dog2');

var res = dog1.hello === dog2.hello; // true
console.log('DogV2: dog1.hello === dog2.hello : ' + res);



function PrimaryStudent(props) {
    // 调用Student的构造函数，绑定this
    Student.call(this, props);
    this.grade = props || 1;
}



/**
 *  原型继承
 */



 /**
  * class 继承
  */

  // `class` 关键字从ES6开始正式被引入JS中, `class`的目的是让定义类更简单

  // 使用 class 定义类
  class StudentV1 {
      // 构造函数
      constructor(name) {
          this.name = name;
      }

      hello() {
          console.log('Hello, ' + this.name + '!');
      }
  }

  var s1 = new StudentV1('Kitty');
  s1.hello();


  class PrimaryStudentV1 extends StudentV1 {
      constructor(name, grade) {
          super(name); // 一定要用supper调用父类的构造方法，否则父类的属性name不能正常初始化
          this.grade = grade;
      }

      // 在子类中添加新的方法
      myGrade() {
          console.log('grade is ' + this.grade);
      }
  }