var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};

var s = JSON.stringify(xiaoming);
console.log(s);


var s = JSON.stringify(xiaoming, null, '  ');
console.log(s);

// 第二个参数用于控制筛选对象的键值，输出指定的键值，可以传入一个数组
var s = JSON.stringify(xiaoming, ['name', 'age'])
console.log(s); // {"name":"小明","age":14}


// 第二个参数传入一个函数，对象的每个键值对都会被这个函数处理

function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}
// 所有的字符都是大写了
var s = JSON.stringify(xiaoming, convert, '  ');


// 精确化控制序列化，给对象定义一个方法，直接返回JSON应该序列化的数据
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],

    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};


JSON.stringify(xiaoming); // {"Name":"小明","Age":14}



// 反序列化

JSON.parse('[1,2,3,true]'); // [1, 2, 3, true]
var obj = JSON.parse('{"name":"小明","age":14}');
console.log(obj); // Object {name: "小明", age: 14}


// JSON.parse() 还可以接收一个函数，用来转化解析出的属性
var obj = JSON.parse('{"name":"小明","age":14}', function (key, value) {
    if (key === 'name') {
        return value + '同学';
    }
    return value;
})

console.log(obj);  // Object {name: "小明同学", age: 14}


