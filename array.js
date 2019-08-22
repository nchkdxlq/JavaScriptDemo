

/**
 *  数组是特殊类型的对象，支持数字索引。
 * 
 */


/**
 *  创建数组
 */

var car1 = "Saab";
var car2 = "Volvo";
var car3 = "BMW";

// 方式一：使用数组文本创建数组
var cars = ["Saab", "Volvo", "BMW"];

var cars = [
    "Sbba",
    "Volvo",
    "BMW"
];
//方式二： 使用 new 关键字创建数组
var cars = new Array("Saab", "Volvo", "BMW");

// 总结：方式一和方式二创建数组产生的数组效果是完全一样的， 无需使用 new array(), 建议使用 方式一
console.log(cars);



/**
 * 访问数组元素, 数组的索引从 0 开始
 */
var cars = ["Saab", "Volvo", "BMW"];
// 获取第一个元素
var oneCar = cars[0];

// 修改第一个元素
cars[0] = "Opel";