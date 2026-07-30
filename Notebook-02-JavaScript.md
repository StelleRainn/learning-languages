# JavaScript

## JavaScript语法和基础

### 基础规则

- **JS的书写位置**: 和css一样, 包括内联（行内）, 内部（在`</body>`标签上）, 外部（`<script src='...'>`）；写在底部的目的是, 让页面按顺序从上往下加载, 避免HTML元素加载不完全
- **JS的注释**: 单行注释`//`, 多行注释`/*...*/`。
- **JS结束符号**: 可写可不写, 但要统一；立即执行函数（IIFE）除外。
- **输入语法**: `prompt('enter content here')`
- **输出语法**: `document.write('...')`, `console.log('...')`, `alert('...')`


### 变量

- **变量**: `let 变量名 = 值` 
- **命名规则**: 仅`字母`, `数字`, `下划线`与`$`符号, 数字不能开头；严格区分大小写；建议使用`小驼峰命名法`
- 变量初始化与输入输出的结合: e.g. `let name = prompt('Please enter your name')`  `document.write(name)`
- **常量**: `const 常量名 = 值`, 在声明时必须赋值, 常量一旦赋值后不能再修改。

### 数据类型

#### 基本数据类型

  - `Number`: 数字类型, 包括整数和浮点数, 正数、负数统一为`Number`类型。
    - `NaN`: 也是数字类型, 表示非数字（Not a Number）, 通常是计算错误的结果。具有粘性, 即任何与`NaN`进行的运算结果都是`NaN`。
    - 搭配算数运算符运算, 包括加（`+`）、减（`-`）、乘（`*`）、除（`/`）、取余（`%`）等； `n**x`: 表示n的x次方。
  - `String`: 字符串类型, 用单引号、双引号、**反引号**以及转义字符括起来的文本。单双引号可以相互嵌套；使用`+`号可以连接字符串。
    - **反引号**: ES6新增的字符串语法, 支持多行字符串和模板字符串（变量插值）。使用`${变量名}`来插入变量。e.g. 
    ```javascript
    let name = 'Alice';
    document.write(`Hello, ${name}!`); // 输出: Hello, Alice!
    ```
    可以利用`document.write('HTML 代码')`来输出`html`标签, 配合模板字符串修改一些内容。
    - 字符串方法: 
      - `.length()`获取长度
      - `.toUpperCase()`转换为大写
      - `.toLowerCase()`转换为小写
      - `.trim()`去除首尾空格
    - **转义字符**: 使用反斜杠`\`来转义特殊字符, 如`\'`、`\"`、`\n`（换行）、`\t`（制表符）等。
  - `Boolean`: 布尔类型, 只有两个值: `true`和`false`。
  - `Null`: 空值, 表示变量没有值。（将null作为尚未创建的对象）
  - `Undefined`: 未定义, 表示变量已声明但未赋值。
	  - *`undefined`与`null`不同,  例如同样 `+1` 操作, 前者返回`NaN`, 后者返回`1`*
  - `Symbol`: ES6新增的唯一值类型, 用于创建唯一标识符。

#### 数据类型检测
  - 使用`typeof`操作符检测数据类型。
  ```javascript
  console.log(typeof 123); // "number"
  console.log(typeof 'Hello'); // "string"
  console.log(typeof true); // "boolean"
  console.log(typeof null); // "object"（这是一个历史遗留问题）
  console.log(typeof undefined); // "undefined"
  console.log(typeof Symbol('id')); // "symbol"
  ```

#### 类型转换

分为**显式转换**和**隐式转换**。

**显式转换**: 使用函数进行转换。
  - `String(值)`: 将值转换为字符串。
  - `Number(值)`: 将值转换为数字。**若字符串包含非数字字符, 则转换结果为`NaN`**。
  - `Boolean(值)`: 将值转换为布尔值。以下转换为布尔值时为`false`: `0`、`NaN`、`null`、`undefined`、空字符串（`''`）。其他值转换为`true`。
  - `parseInt(字符串, 基数)` & `parseFloat(字符串, 基数)` : 将字符串转换为整数或小数, 基数可选（如10进制）。前提条件: 字符串开头不能是非数字。e.g. 
  ```javascript
  console.log(Number('123')); // 123
  console.log(parseInt('12px123')); // 12
  console.log(parseInt('123abc', 10)); // 123
  console.log(parseFloat('123.45abc')); // 123.45
  console.log(parseFloat(abc123abc)); // NaN
  ```
**隐式转换**: JavaScript会自动进行类型转换, 如在运算中自动将字符串转换为数字。
   - 对于+号, 若两边存在一个字符串, 则自动将另外一个转换为字符串；所以**任何数据和字符串相加的结果都是字符串**
   - 除+号之外的运算符, 只要有数字, 都换转换成数字
   - **单独使用+号**: 可以转换成数字类型；e.g. 
  ```javascript
  console.log(typeof '123') // string
  console.log(typeof +'123') // number
  ```
   - 在减法运算, `''`和`null`的值会化为`0`；`undefined`的值化为`NaN`；
   - 特殊情况: `undefined == null` 为`true`, 但`undefined === null` 依然是`false`

#### 引用数据类型

- **简单数据类型**: 变量本身存储这个值, 存储于栈空间。

- **引用数据类型**: 变量存储的是对对象的引用, 该引用地址指向存储于堆空间的实际数据。包括: 
  - `Object`: 对象类型, 键值对集合。
  - `Array`: 数组类型, 有序列表。
  - `Function`: 函数类型, 可调用的代码块。
  - `Date`: 日期类型, 用于处理日期和时间。
  - `RegExp`: 正则表达式类型, 用于模式匹配。

```javascript
let obj1= { age: 30 };
let obj2 = obj1; // obj2引用了obj1的地址
obj2.age = 31; // 修改obj2的age属性
console.log(obj1.age); // 31, obj1也被修改了
```


### 运算符

- **赋值运算符**: `=` `+=` `-=` `*=` `/=` `%=`
- **自增运算符**: `++i` `i++` `--i` `i--`
   - 存在自增和运算并行的情况, 需留意 e.g. `let i = 1 console.log(i++ + ++i + i) // 1 + 3 + 3 = 7`
- **比较运算符**: 和之前学过的C++大部分都一样, 额外留意: 
   - `==`: 值相等；`===`: 值和类型相等（全相等）, **推荐使用**, 对应`!==`: 不全等
   - `undefined == null // true `
   - `NaN === NaN // false`
   - 本质: 比较的是ASCII码值: `console.log('aa' < 'aac') // true`
- **逻辑运算符: 与或非**: 记住优先级: **小括号 > 一元运算符(含!) > 算术运算符 > 逻辑运算符(先 && 后 ||)**
   - `&&`: 与运算, 只有当两个操作数都为真时结果才为真。
   - `||`: 或运算, 只要有一个操作数为真结果就为真。
   - `!`: 非运算, 取反操作数的布尔值。
   - **短路求值(逻辑中断)**: 在逻辑运算中, 如果第一个操作数已经决定了结果, 则不会计算第二个操作数。
     - e.g. `console.log(false || 'Hello') // Hello`
     - e.g. `console.log(true && 'Hello') // Hello`
   - **逻辑运算符的返回值**: `&&`返回第一个假值或最后一个真值；`||`返回第一个真值或最后一个假值。**判断的是真假（布尔）, 但返回的是这个值本身**.
     - e.g. `console.log(0 && 'Hello') // 0`
     - e.g. `console.log('Hello' || 0) // Hello`
```**javascript**
function f(x, y) {
x = x || 0
y = y || 0
return x + y
}
console.log(f(1,2)) // 3
console.log(f()) // 0 避免了undefined的NaN情况出现
```
- **三元运算符**: `条件 ? 满足条件所执行代码 : 否则执行不满足条件代码`, 用于简化`if-else`语句。
- **位运算符**: 对整数的二进制位进行操作。
  - `&`: 按位与
  - `|`: 按位或
  - `^`: 按位异或
  - `~`: 按位取反
  - `<<`: 左移
  - `>>`: 右移
  - `>>>`: 无符号右移

### 条件语句

####  if语句

用于根据条件执行代码块。

```javascript
if (条件) {
    // 条件为真时执行的代码
} else if (其他条件) {
    // 其他条件为真时执行的代码
} else {
    // 所有条件都不满足时执行的代码
}
```
#### switch语句

用于根据表达式的值执行不同的代码块。

```javascript
switch (表达式) {
    case 值1:
        // 当表达式等于值1时执行的代码
        break;
    case 值2:
        // 当表达式等于值2时执行的代码
        break;
    default:
        // 当没有匹配的值时执行的代码
}
```
- *p.s. 可以写`case (value): { expressions }`, 也可以`case value: expressions`*
- 记得加`break`防止穿透
- 记得加`default`

### 循环语句

#### for循环

用于重复执行代码块, 直到条件不满足。

```javascript
for (初始化; 条件; 更新) {
    // 循环体
}
```
e.g. 冒泡排序
```javascript
for (let i = 0; i < array.length - 1; i++) {
for (let j = 0; j < array.length - 1 - i; j++) {
  if (array[j] > array[j + 1]) {
    swap
    }
  }
}
```

*冒泡排序拓展: 核心思想/两个关键点:*

- 双重循环, 每一趟循环都让`arr[0]`与其它数据元素(arr.length - 1个)比较, 根据大小进行交换(
  升序或降序, 自行调整if判断中arr[j]和arr[j+1]的比较方式)
- 一趟排序完成后, 产生本趟**最值**, 「冒泡」到数组末尾。下一趟arr[0]无需与最值比较。所以内层循环的终止条件是
  `j < arr.length -1 -i`

```javascript
for (let i = 0; i < array.length - 1; i++) {
for (let j = 0; j < array.length - 1 - i; j++) {
  if (array[j] > array[j+1]) {
     swap...
```

- 可以用一个布尔标志, 当没有发生交换时, 可以直接结束循环（外层）
- JS也有sort()函数 `e.g. array.sort() ` 默认升序
- sort()函数如需降序, 可以填入函数 `array.sort( function (a, b) { return b - a } )`
- 关于 return b-a 的理解
   - **sort函数通过return expression判断, 当expression的结果大于0, 交换参数a、b的位置；结果小于等于0, 不交换参数a、b的位置**
   - 假设锚定规则「大于0则交换位置」: 
      - 若使用 return a-b : 当发生交换, 说明「前者」（指参数的位置）a更大, 同时被排到后面, 完成升序
      - 若使用 return b-a : 当发生交换, 说明「后者」b更大, 同时被排到前面, 完成降序

#### while循环

当条件为真时重复执行代码块。

```javascript
while (条件) {
    // 循环体
}
```
- `continue`语句: 跳过当前循环的剩余部分, 直接进入下一次循环。(回到while起点)
- `break`语句: 终止循环, 跳出循环体。(跳出while)

### 数组

#### 数组基础知识

- **数组**: 使用方括号`[]`定义的**有序**数据集合。
```javascript
let array = [data1, data2, 'data3', 4, true]; // 数组可以包含不同类型的数据, 甚至嵌套数组。
let array2 = new Array(1, 2, 3); // 另一种创建数组的方式

// 数组的索引从0开始, 访问元素使用方括号。(数组的“查”)
console.log(array[0]); // 输出第一个元素

// 数组的长度
console.log(array.length); // 输出数组长度
```

- **数组的增删改方法**: 
  - 增: 
    - `push(元素)`: 在数组末尾添加一个或多个元素。**返回新数组的长度**。
    - `unshift(元素)`: 在数组开头添加一个或多个元素。**同样返回新数组的长度**。
    - `splice(位置, 0, 元素)`: 在指定位置添加一个或多个元素。
  - 删: 
    - `pop()`: 删除数组末尾的元素, **返回被删除的元素**。
    - `shift()`: 删除数组开头的元素, **返回被删除的元素**。
    - `splice(位置, 数量)`: 从指定位置删除指定数量的元素。`数量`无参时, 删除到末尾。
  - 改: 即修改数组元素的值, 直接使用索引访问并赋值。
    - `array[index] = newValue;`: 将指定索引的元素修改为新值。

```javascript
let arr = ['a', 'b', 'c'];

// 增
arr.push('d'); // arr is now ['a', 'b', 'c', 'd']
arr.unshift('x'); // arr is now ['x', 'a', 'b', 'c', 'd']
arr.splice(2, 0, 'y'); // arr is now ['x', 'a', 'y', 'b', 'c', 'd']

// 删
arr.pop(); // returns 'd', arr is now ['x', 'a', 'y', 'b', 'c']
arr.shift(); // returns 'x', arr is now ['a', 'y', 'b', 'c']
arr.splice(1, 2); // returns ['y', 'b'], arr is now ['a', 'c']

// 改
arr[0] = 'A'; // arr is now ['A', 'c']
```

#### 常用数组方法

- **map()**: 对数组中的每个元素**执行**指定函数(遍历+处理), **返回新数组**。

```javascript
const newArr = arr.map(function (ele, index) {
  console.log(ele) // 数组元素
  console.log(index) // 索引号
  return ele + 'Color' // 处理数据并返回新数组
})
console.log(newArr) // ['redColor', 'blueColor', 'greenColor']
```

- **join()**: 把数组中所有元素拼接起来, 并且通过参数(分隔符)可以定义拼接方式, **常用空字符串使所有字符串相接为一个长串**, 以及: 

```javascript
console.log(newArr.join()) // redColor,blueColor,greenColor 参数为空, 逗号分割（默认）
console.log(newArr.join('')) // redColorblueColorgreenColor 参数为空字符串, 则分割消失
console.log(newArr.join('|')) // redColor|blueColor|greenColor
```

- **forEach()**: **遍历**数组中的每个元素, **执行**指定函数, 但**不返回新数组**。

```javascript
const arr = ['red', 'blue', 'green'];
arr.forEach((element, index) => console.log(element, index)) // 输出每个元素和索引
```

- **filter()**: 过滤数组中的元素, 筛选数组符合条件的元素, 并加入到新数组中, 返回这个数组。

```javascript
const arr = [1, 2, 3, 4, 5];
const filteredArr = arr.filter((element, index, array) => element > 2); // 筛选大于2的元素
```

### 函数

#### 具名函数（函数声明）

使用`function`关键字定义函数。使用函数名和括号调用函数。
```javascript
function 函数名(参数1, 参数2) {
    // 函数体
    return 返回值; // 可选
}
// 调用函数
函数名(参数1, 参数2);
```
e.g. 
```javascript
function getMax(a, b) {
    return a > b ? a : b
  }
let max = getMax(201, 200)
console.log(max)
```
- **return多个值**: 
  - 可以使用数组或对象返回多个值。
  - 例如: `return [value1, value2];` 或 `return {key1: value1, key2: value2};`
  - 可以用数组承接结果, 
```javascript
return [max, min]

let max = f(x)[0]
let min = f(x)[1]
```

- **出现相同函数名时**: 后面的函数会覆盖前面的函数。不管在哪儿调用函数, 都会以后面的为准。

- **实参和形参数目不匹配**: 
  - 若实参多于形参, 则**多余的实参被舍弃**, 不参与运算。函数可以输出前面参数的运算结果
  - 若实参少于形参, 则形参出现`undefined`, 导致出现`NaN`结果

- **作用域**: 分为全局作用域与局部作用域, 由此引申出全局变量与局部(函数)变量
  - 特殊情况1: 在**函数内部未声明变量而赋值**, 该变量会成为全局变量。*强烈不建议此情况的出现*
  - 特殊情况2: 形参可以看作是一种局部变量
  - 不同作用域中**同名变量**的访问原则: 就近——从当前作用域开始寻找；若无, 则向上查找父作用域, 直到全局作用域。 e.g. 
```javascript
let x =10
function f3() {
  let x = 20
  function f4() {
    let x = 30
    console.log(x)
  }
  f4()
}
f3() 
console.log(x) // 30
```

#### 匿名函数

分为**函数表达式**和**立即执行函数**。

- **函数表达式**: 将函数赋值给变量, 而后这个变量名就是函数名, 并利用该名调用函数。函数名可以省略。

*和具名函数的不同点在于, 函数表达式必须先声明再调用*

```javascript
let fn = function (a, b) {
  return a + b
}
// 调用
let re = fn(10, 20)
console.log(re) // 30
```

- **立即执行函数**（IIFE）: 定义后立即执行的函数, 通常用于创建局部作用域, 避免变量污染全局作用域。

*需要配合结束分号, 若该函数前有代码, 前面也要加分号。*

```javascript
;(function (x ,y) {
  console.log(x + y)
}(1, 2)); // 调用函数的括号写在里外都可以
```

*立即执行函数, 一般用括号封住; 但有时, 也可以用`!``+`等符号防止报错（要能看懂别人的代码）*
```javascript
(function() {...} )() // OK
!function(){...} () // 也OK
```

#### 函数动态参数 Arguments对象

**本质: 伪数组, 并且只能存在于函数中**。可以接受多个参数。
- **访问方式**: 使用`arguments[index]`访问参数, `arguments.length`获取参数个数。
```javascript
function getSum() {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
  sum += arguments[i]
  }
  return sum
  }

getSum(2, 3) // Arguments(2)
getSum(1, 2, 3, 4, 5, 6, 7) // Arguments(7)
```

#### 剩余参数 ...args

**本质: 真数组, 也能接受多个参数, 同样只能存在于函数中**。开发中推荐使用。

- **定义方式**: 在函数参数前加`...`, 表示接收剩余的参数, 并将其存储为一个数组。

```javascript
function getSum(a, b, ...arr) {
  let sum = 0
  sum += a + b
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

console.log(getSum(2, 3)) // 5
console.log(getSum(2, 3, 4, 5, 6)) // 20
```

**对比总结**

- 剩余参数只包含那些**没有对应形参的实参**，而 `arguments` 对象包含了传给函数的**所有实参**。
- `arguments`对象不是一个真正的数组，而剩余参数是真正的 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)实例，也就是说你能够在它上面直接使用所有的数组方法，比如 [`sort`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)，[`map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)，[`forEach`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)或[`pop`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)。

#### 展开运算符

可以将数组展开；注意区分剩余参数。典型应用场景包括数组求最值、合并数组等: 

```javascript
const arr1 = [1, 2, 3]
console.log(Math.max(...arr1)) // 3 // Math.max()本身不接受数组参数

const arr2 = [4, 5, 6]
console.log([...arr1, ...arr2]) // [1, 2, 3, 4, 5, 6] // 合并数组
```


#### 箭头函数

箭头函数是ES6新增的简洁函数语法, 使用`=>`符号定义。

**语法**: `(参数1, 参数2) => { 函数体 }`。
- 若只有一个参数, 可以省略括号；
- 若函数体只有一行代码, 可以省略大括号和`return`关键字。

适用于那些需要匿名函数的地方；不绑定this；属于表达式函数, 不存在变量提升。

*p.s. 箭头函数没有动态参数, 只有剩余参数...args*

```javascript
const fun = () => {
  console.log(123)
}
```

```javascript
const f = (x, y) => {
  console.log(x, y)
}
```

```javascript
// 简化写法: 只有一个形参, 可以省略小括号；函数执行体只有一行代码, 可以省略大括号
const f1 = x => console.log(x)

// 一行return可以省略return
const f2 = (x, y) => x + y
```

```javascript
// 箭头函数可以直接返回一个对象
// 用小括号是因为函数体的花括号和对象的花括号冲突
const f3 = uname => ({ uname: uname })
console.log(f3('Rainn')) // {uname: 'Rainn'}
```

**箭头函数中的this**

箭头函数没有自己的`this`, 它会捕获定义时的`this`值, 作为自己的`this`。因此, 箭头函数不能用作构造函数（下文提及）, 也不能使用`arguments`对象。

简单来说: 箭头函数本身不生成`this`；如果在内部使用了`this`关键字, 它会沿着「作用域链」在上一级寻找`this`。 e.g. 

```javascript
const obj = {
  name: 'Rainn',
  sayHi: function () {
    console.log(this)
  }
}
obj.sayHi() // obj, sayHi函数自带this

const obj1 = {
  name: 'Rainn',
  sayHi: () => console.log(this)
}
obj1.sayHi() // window, sayHi函数没有this, 且上一级作用域直接到了window

const obj2 = {
  name: 'Rainn',
  sayHi: function () {
    const fn = () => {
      console.log(this)
    }
    fn()
  }
}
obj2.sayHi() // obj, fn上一级作用域（obj的sayHi函数中）有this, 所以按作用域链理解即可
```

### 对象

#### 对象基础知识

##### 定义
 
使用花括号`{}`定义的无序数据集合, 包含键值对（属性和方法）。

##### 🌟对象的声明

1. 使用花括号字面量创建对象, 键值对用逗号分隔。键名可以是字符串或符号, 若是字符串, 则可以不加引号, 但不推荐这么做。

```javascript
let obj = {
    属性1: 值1,
    属性2: 值2,
    方法1: function() {
        // 方法体
    },
    方法2() { // ES6简写
        // 方法体
    }
};
```

2. 使用`new Object()`创建对象, 通常不推荐这种方式。

```javascript
const obj = new Object({name: 'rainn', age: 18});
```

3. **构造函数**: 
   1. 是一种特殊的函数, 用来初始化对象、快速创建多个类似的对象； *类似于Java中的类*；
   2. 约定: 函数命名以大写字母开头；并且只能由new关键字执行；
   3. 构造函数内部不写return（写了也无效）；其返回值就是新创建的对象。
   4. 实例化过程中, new关键字执行之后, 经过以下四步: 
       1. 立即创造一个新的空对象；
       2. 构造函数中的this指向这个新对象；
       3. 执行构造函数的代码, 修改this, 添加属性；
       4. 返回对象。
```javascript
function Student(name, age, gender) {
  this.name = name
  this.age = age
  this.gender = gender
  this.sayHi = function () {
    console.log('Singing.')
  }
}

// 实例化
console.log(new Student('rainn', '21', 'male'))
```

##### 对象的构成

  - **属性**: 键值对中的键, 表示对象的特征或状态。**属性名: 属性值**
  - **方法**: 键值对中的值为函数, 表示对象的行为或操作。**方法名: 函数体**
  - 各属性、方法之间用逗号分隔, 最后一个属性后面不需要逗号。 e.g. 
```javascript
let person = {
    name: 'Alice',
    age: 30,
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
};
```

##### 增删改查与方法的调用

  - **访问属性**: **使用点语法`obj.属性名`或方括号语法`obj['属性名']`**。其中方括号方法的引号是必须的；另外方括号语法可以使用变量名来访问属性。
  - **修改属性**: 直接赋值`obj.属性名 = 新值;`。
  - **添加属性**: 直接赋值新属性`obj.新属性名 = 值;`。
  - **删除属性**: 使用`delete obj.属性名;`。
  - **调用方法**: 使用点语法调用方法`obj.方法名();`。
  - **遍历对象**: 使用`for...in`循环遍历对象的属性。

  *p.s. 虽然也可以用于遍历数组, 但由于变化量输出的是字符/串, 不推荐这么用*

```javascript
for (let key in obj) {
    console.log(key + ': ' + obj[key]); // 输出属性名和属性值, 属性名带引号, 如'name'
}
```


##### 实例成员 & 静态成员

1. **实例成员**

实例成员即「实例对象」中的属性和方法（实例属性、实例方法）。

为构造函数传入不同的参数, 创建结构相同但值不同的对象；实例对象彼此互不影响。

```javascript
function Stu(name) {
  this.name = name
}

const rainn = new Stu('rainn')
const stelle = new Stu('stelle')

rainn.name = 'Rainn' // 实例属性
rainn.sayHi = () => console.log('Hi') // 实例方法
```

2. **静态成员**

「构造函数」中的属性和方法就是静态成员。

只能通过构造函数访问, 例如`Math.PI`, `Math.random()`；静态方法中的`this`指向构造函数。

```javascript
Stu.school = 'GDUFS' // 静态属性
Stu.sayHi = function () { // 静态方法
  console.log(this)
}
Stu.sayHi() // 指向Stu函数
```

#### 常用对象

##### 内置数学对象

JavaScript提供了内置的`Math`对象, 包含常用的数学常量和函数。

| 属性或方法 | 说明 | 示例 |
|------|------|------|
| `Math.PI` | 圆周率 | `Math.PI // 3.141592653589793` |
| `Math.E` | 自然对数的底数 | `Math.E // 2.718281828459045` |
| `Math.abs(x)` | 绝对值 | `Math.abs(-3) // 3` |
| `Math.max(a, b, ...)` | 返回最大值 | `Math.max(1, 5, 2) // 5` |
| `Math.min(a, b, ...)` | 返回最小值 | `Math.min(1, 5, 2) // 1` |
| `Math.round(x)` | 四舍五入 | `Math.round(4.6) // 5` |
| `Math.random()` | 生成 [0,1) 之间的随机小数 | `Math.random() // 0.123...` |

_Math.random()生成的随机数是\[0,1)之间的浮点数, 若需要生成\[min, max\]范围内的随机整数, 可以使用:_
  
```JavaScript
Math.floor(Math.random() * (max - min + 1)) + min
```

##### JSON对象

JavaScript 对象表示法（JSON）是一种轻量级的数据交换格式。属性和值有引号, 而且引号统一是双引号。

- `JSON.stringify(obj)`: 将JavaScript对象转换为JSON字符串。
- `JSON.parse(jsonString)`: 将JSON字符串转换为JavaScript对象。

##### 日期对象

JavaScript提供了`Date`对象, 用于处理日期和时间。

- 创建日期对象: 
  - `new Date()`（当前时间）
  - `new Date(时间戳)`（指定时间戳）
  - `new Date(年, 月, 日, 时, 分, 秒)`（指定具体时间）。

- 时间戳: 自1970年1月1日以来的毫秒数, 三种获取方式: 
  - `Date.now()`: 返回当前时间的时间戳。
  - `new Date().getTime()`: 返回当前时间的时间戳。
  - `+new Date()`: 将当前时间转换为时间戳。

- 格式化: `toLocaleString()`（本地化字符串）。

- 常用方法: 包括但不限于以下例子, 注意`getMonth`和`getDay`的返回值是从0开始的。
```javascript
console.log(date.getFullYear()) // 2025 年 数字型
console.log(date.getMonth() + 1) // 0 ~ 11, +1为实际月份
console.log(date.getDate()) // 16 号
console.log(date.getDay() + 1) // 0 ~ 6, +1为实际星期几
```


### 内置构造函数系列

#### Object系列
  - `Object.keys(obj)`: 返回对象的所有属性名组成的**数组**。
  - `Object.values(obj)`: 返回对象的所有属性值组成的**数组**。
  - `Object.entries(obj)`: 返回对象的所有键值对组成的**二维数组**。
  - `Object.assign(target, ...sources)`: 将源对象的属性复制到目标对象, 返回目标对象。

```javascript
const newObj = {}
Object.assign(newObj, obj)
Object.assign(newObj, {school: 'GDUFS'}) // 追加
```

#### 🌟Array系列

已经学习过的一些**实例方法**: 

- **forEach**方法: 遍历数组: 

```javascript
arr.forEach(function (current) {...}) 
arr.forEach( curr => console.log(curr))
```

- **filter**方法: 遍历并做条件过滤, 将符合条件的元素加入到新数组并**返回该数组**: 

```javascript
arr.filter(function (current) {...})
arr.filter( curr => curr > 0)
```

- **map**方法: 遍历与迭代处理, **返回处理后的新数组**: 

```javascript
arr.map(function (current) {...})
arr.map( curr => curr * 2)
```

- **join**方法: 将数组元素拼接成一个字符串, **返回字符串**。参数即拼接方式, 默认逗号。
```javascript
console.log(arr.join('/'))
console.log(typeof arr.join()) // string
```

**新方法: **

- **reduce**方法: 返回**累计处理**的结果, 常用于**求和**操作等;

  1. 参数: 回调函数, 起始值。
  2. 回调函数中, 至少包含prev和current两个值；
  3. 如果没有起始值, 则默认以数组第一个元素作为起始值。 
      _p.s. 注意一个细节: 第一个元素未必是个数值(例如，遍历对象数组), 所以建议至少填入起始值0。_
  4. 注意: 每次循环（包括首次）, **当前元素**的位置都在current上；prev可以理解为**累计值**, 每次循环后, 都会把当前return结果作为prev传递给下一次循环。

``````javascript
const total = arr.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue
  })
const tot = arr.reduce((prev, current) => prev + current, 10)

// 对象数组: prev值不要采用prev.salary, 因为首次循环之后的返回值就是纯数值了, 而不是对象。
const totalSalary = array.reduce((prev, current) => prev + current.salary, 0)
``````

- **find**方法: 返回数组中满足提供的测试函数的**第一个**元素的值。否则返回 **undefined**。

```javascript
// find(callbackFn(element, index, array), thisArg)
const apple = phones.find(value => value.name === 'Apple')
```

- **every**方法: 测试一个数组内的**所有元素**是否能通过指定函数的测试。返回一个**布尔值**。

```javascript
console.log(numbers.every((value) => value >= 1)) // true
```

- **some**方法: 和every接近, 但只要有**一个元素**通过测试, 就能返回`true`。

**静态方法from: 将伪数组转换为真数组**: 

- **Array.from(伪数组序列)**: 

```javascript
const list = document.querySelectorAll('ul li')
console.log(list) // NodeList
const realList = Array.from(list)
console.log(realList)
```

#### String系列

1. **split**方法: 将字符串拆分成数组, 参数即分隔符。和数组join方法反过来。

```javascript
const str = '2025-4-24'
const arr = str1.split('-')
console.log(arr)
```

2. **substring**方法: 截取子字符串。

```javascript
// str.substring(indexStart[, indexEnd]) 省略indexEnd, 则默认截取到字符串的最后.
// 包含indexStart, 不包含indexEnd
const longStr = '0123456789'
const subStr1 = longStr.substring(0)
const subStr2 = longStr.substring(8)
const subStr3 = longStr.substring(5, 9) // 5678
```

3. **startsWith**方法: 判断字符串是否以给定的子字符串开头, 返回一个布尔值。（同步记住**endsWith**方法）

```javascript
const str = 'Grain,Stelle,Rainn'
// startsWith(searchString[, position])判断当前字符串是否以另外一个给定的子字符串开头, 返回布尔值
console.log(str.startsWith('Grain')) // t
console.log(str.startsWith('Rainn')) // f
console.log(str.startsWith('Rainn', 13)) // true
```

4. **includes**方法: 判断是否包含某子串: 

```javascript
// includes(searchString[, position]) 区分大小写
console.log(str.includes('Rainn')) // true
console.log(str.includes('rainn')) // false
```

#### Number系列

1. **toFixed**方法: 保留几位小数, 注意四舍五入: 

```javascript
const number = 10.919
console.log(number.toFixed()) // 11 -- 四舍五入
console.log(number.toFixed(2)) // 10.92
```

2. **toString**方法: 转化为字符串, 和字符串**String()**方法一致: 

```javascript
console.log(typeof String(number))
console.log(typeof number.toString())
```

### 处理this

#### this的指向

1. 普通函数中的`this`: **谁调用, this的值就指向谁**。

```js
// 普通函数没有明确调用者时, this的值为window
// 严格模式下没有调用者时, this的值为undefined
// 严格模式 'use strict'
console.log(this) // Window
function f() {
  console.log(this) // Window
}
setTimeout(function () {
  console.log(this) // Window
}, 1)
document.querySelector('button').addEventListener('click', function () {
  console.log(this) // button
})
const obj = {
  sayHi: function () {
    console.log(this) // 指向obj对象
  }
}
```

2. 箭头函数中的`this`: **箭头函数没有自己的`this`, 箭头函数的`this`引用的就是最近一级作用域的`this`。适用于需要**用到上层`this`**的地方**。

#### 改变this指向

```js
const obj = {
  name: 'rainn',
}
function fn(x, y) {
  console.log(this) // 一般调用时, 指向window
  console.log(x + y)
}
```

1. **call()**方法: **立即调用函数**, 并指定`this`的值。第一个参数是`this`的值, 后面的参数是函数的参数。

```javascript
// function.call(this语句, 参数1, 参数2...)
// 调用函数的同时, 指定this的指向
fn.call(obj, 1, 2) // {name: 'rainn'} 3
```

2. **apply()**方法: 和`call()`类似, 但参数是一个**数组**。**立即调用函数**, 并指定`this`的值。

```javascript
// function.call(thisArg, [参数1, ..., 参数n])
// 必须以数组的方式传递其他参数
// 也可以改变this的指向, 其他参数以数组的形式传入
fn.apply(obj, [1, 2])

// 使用场景: 求数组最大值
const arr = [1, 2, 3]
const max = Math.max.apply(Math, arr) 
// max方法本身只接受(1,2,3)这样的数据
// arr可以是任何类数组对象，有length属性即可，相当于被展开运算符展开了
```

3. **bind()**方法: **创建一个新函数**（对原函数的拷贝, 同时改变了this的指向）, 并指定`this`的值。返回的新函数可以在以后调用。

_MDN原话: 创建一个新函数，当调用该新函数时，它会调用原始函数并将其 this 关键字设置为给定的值，同时，还可以传入一系列指定的参数，这些参数会插入到调用新函数时传入的参数的前面。_

```javascript
// function.bind(this语句, 参数1, 参数2...)
const boundFn = fn.bind(obj, 1, 2) // 返回一个新函数
```

```js
btn.addEventListener('click', function () {
  this.disabled = true
  setTimeout(function () {
    this.disabled = false
  }.bind(this), 2000) // 这里的this指向的是btn
})
```

### 基本包装类型

简单的数据类型（如字符串）也有自己的属性和方法, 这实际上是因为JS在底层自动进行了包装；字符串、数值、布尔等基本类型都有**专门的构造函数**, 称为**包装类型**。

```javascript
const str = 'rainn'
console.log(str.length)

// 实际上相当于
const string = new String('rainn')
```

### 作用域和作用域链

作用域是变量和函数的可访问范围。JavaScript有**全局作用域**和**局部作用域**（函数作用域）。**作用域链**是指在嵌套函数中, **内部函数可以访问外部函数的变量**。

- **全局作用域**: 在脚本的最外层定义的变量和函数, 任何地方都可以访问。
  - 写在script标签和.js文件中的代码
  - 函数中未使用任何关键字声明的变量为全局变量, 不推荐
  - 尽可能少的声明全局变量, 防止变量被污染

- **局部作用域**:  又分为**函数作用域**和**块级作用域**。
  - **函数作用域**: 在函数内部定义的变量和函数, 只能在该函数内部访问。
  - **块级作用域**: 使用{}包含的代码块, 在其内部声明的变量几乎不能被外面访问；使用`let`和`const`声明的变量具有块级作用域, 只能在所在的代码块内访问。**`var`没有块作用域**。

- **作用域链**: 当访问变量时, JavaScript会从当前作用域开始查找, 如果找不到, 则向上查找父作用域, 直到全局作用域为止。
  - **本质**: 底层的「变量查找机制」
  - 函数被执行, 优先查找当前函数作用域中的变量；当前作用域查找不到则「依次、逐级」查找父级作用域, 直到全局作用域

*p.s. 子作用域能访问父作用域, 父作用域无法访问子作用域*

### 垃圾回收机制

**内存生命周期**

1. **内存分配**（声明变量）、**内存使用**（读写）、**内存回收**（使用完毕, 由垃圾回收器处理）

2. 全局变量在关闭页面时回收（一般）, 局部变量在使用完毕后自动被回收；

**垃圾回收机制的两种办法**

1. **引用计数算法**。核心: 定义“内存不再使用”。原理是: 多一次引用, 次数加1；减少一次引用, 次数-1；若引用为0, 回收堆空间。但存在一个缺陷, 若存在相互引用, 则引用永远不会为0, 无法回收而造成内存泄露。
2. **标记清除法**。核心: 定时从根部出发扫描对象, 如果是可达（reachable）则保留, 否则被标记为不再使用, 回收内存。

### 🌟同步异步和事件循环

- JS是单线程的；但HTML5 Web Worker标准允许JS脚本创建多个线程
- **同步**: 程序执行顺序与任务排列顺序一致；逐行执行, 需原地等待结果后, 才继续向下执行。
- **异步**则是可以在做一件事的同时去做另一件事；调用后耗时, 不阻塞代码继续执行（不必原地等待）, 在**将来完成后触发一个回调函数来处理结果**。
- **本质**: 流水线上各个流程的执行顺序不同
- **同步任务**: 都在主线程执行, 形成执行栈；
- **异步任务**, 通过回调函数实现, 被添加到任务队列中, 包括: 
    - 普通事件（click、resize）
    - 资源加载（load、error）
    - 定时器（setInterval、setTimeout）
- **事件循环机制**: 
  - 定义: 执行代码和收集异步任务的模型, 在调用栈空闲时, 反复调用任务队列里回调函数的执行机制, 就叫事件循环。
  - 存在**执行栈**、**宿主环境**和**任务队列**。当执行栈中的同步任务执行完毕后, 事件循环机制会检查任务队列中是否有异步任务, 如果有, 则将其放入执行栈中执行。
  - 1.先执行执行栈的同步任务；
  - 2.异步任务放到任务队列: 先放入Web API或者说浏览器API(宿主环境, 浏览器), 处理后（得到异步结果）再加入到任务队列排队（分为下文提到的**宏任务队列**和**微任务队列**）
  - 3.执行栈同步任务处理完毕, 系统读取任务队列的异步任务, 按顺序执行
  - **事件循环机制**：**同步代码 → 微任务 → 宏任务**；**且每次宏任务执行完后，都会清空微任务队列**
- **宏任务和微任务**: **优先调度微任务队列**
  - **宏任务**: 由**浏览器**环境执行的异步代码, 通常包括: 
    - `setTimeout`、`setInterval`、`setImmediate`
    - DOM事件（如click、load）
    - AJAX请求完成事件
    - JS脚本执行事件（script）
  - **微任务**: 由**JS引擎**执行的异步代码, 通常包括: 
    - `Promise`的回调函数（`then`、`catch`） *p.s. Promise本身（executor函数）是**同步**的, 但其回调函数是异步的*
    - `MutationObserver`
    - `process.nextTick`（Node.js环境）

```javascript
// Promise 例子
console.log('开始')

const p = new Promise((resolve, reject) => {
  console.log('Promise executor 同步执行')  // 立即执行
  resolve('成功')
  console.log('resolve 调用后继续执行')     // 也会立即执行
})

console.log('Promise 创建完成')

p.then(result => {
  console.log('then 回调:', result)  // 微任务，稍后执行
})

console.log('结束')

/**
* 输出顺序：
* 开始
* Promise executor 同步执行
* resolve 调用后继续执行
* Promise 创建完成
* 结束
* then 回调: 成功
*/
```

```javascript
// 经典面试题
console.log(1) // 同步

setTimeout(() => { // 宏任务
  console.log(2)
  const p = new Promise(resolve => resolve(3))
  p.then(result => console.log(result))
}, 0)

const p = new Promise(resolve => { // 同步
  setTimeout(() => { // 宏任务
    console.log(4)
  }, 0)
  resolve(5)
})

p.then(result => console.log(result)) // 微任务

const p2 = new Promise(resolve => resolve(6)) // 同步

p2.then(result => console.log(result)) // 微任务

console.log(7) // 同步


// 输出顺序: 1, 7, 5, 6, 2, 3, 4
```


### 闭包

一个函数对周围状态的引用捆绑在一起, 内部函数可以访问其外层函数的作用域。简单理解: **闭包 = 内层函数 + 外层函数的变量**。

闭包的应用: 使数据私有, 同时让外部也可以访问函数内部的变量。

```javascript
// 将counter闭包
function count() {
  let counter = 0

  function f() {
    counter++
    console.log(`函数被调用了${counter}次`)
  }

  return f
}

const ff = count()
// 当调用ff()时, counter是私有的, 即使修改外部的counter, 也不会影响到闭包中的counter
// 同时, ff引用count里面的counter, 所以局部变量不会被垃圾机制回收, 可能会造成内存泄露（潜在风险）
```

### 变量提升和函数提升

1. var声明的变量, 会存在函数提升现象（先使用再声明）。原理是: 代码在执行之前, 预解析, 把所有var声明的变量提升到「当前」作用域的最前面。_p.s. 提升的是声明, 但赋值不会提升。_
2. let / const 声明的变量不存在函数提升

```javascript
console.log(num) // undefined
var num = 10
console.log(num) // 10
```

3. 函数的声明接近, 之所以可以先调用再声明, 也是因为预解析而将函数的声明提前到了「当前作用域」的最前面。同样地, **提升的只是函数的声明, 不提升调用**。

### 🌟解构

#### 数组解构

将数组元素值「快速、批量」赋值给变量的简洁语法。

```javascript
const [max, min, avg] = [100, 60, 80]
// 然后, 直接用这个变量
console.log(max)
```

可以方便地交换两个变量: 

```javascript
;[b, a] = [a, b] // 此处的分号必须要加
```

p.s. 关于分号: 

```javascript
// 分号拓展: 前面有代码, 后面用数组开头的, 用分号隔开；当然, 立即执行函数开头也要加
;[1, 2, 3].map(function (item) { // 不加分号就报错
  console.log(item)
})
```

一些特殊情况: 

```javascript
// 1.单元值少而变量多
const [i, j, k, l] = [1, 2, 3]
console.log(i, j, k, l) // 1, 2, 3, undefined

// 2.变量少而单元值多
const [x, y] = [1, 2, 3]
console.log(x, y) // 1, 2

// 3.利用「剩余参数」解决变量少的问题
const [v, w, ...args] = [1, 2, 3, 4, 5]
console.log(v, w, args) // 1, 2, [3, 4, 5]

// 4.防止undefined传递
const [f = 0, g = 0] = [1]
console.log(f, g) // 1, 0

// 5.按需导入赋值（即有意地忽视某些单元值）（重）
const [m, n, , o] = [1, 2, 3, 4]
console.log(m, n, o) // 1, 2, 4

// 6. 多维数组解构
const [r, t, p] = [1, 2, [3, 4]]
console.log(p[0]) // 3
const [q, e, [h, s]] = [1, 2, [3, 4]]
console.log(h, s) // 3 ,4
```



#### 对象解构

和数组解构接近, 但有几个注意点: 

1. **变量名要和对象属性/方法相同**, 因为对象是**无序**的, 需要一致才能赋值；否则, 变量名输出undefined；
2. 解构中的变量名不要与其他、外部的变量名冲突。

```javascript
const obj = {
  name: 'rainn',
  age: 18,
  sayHi: function () {
    console.log('Hi')
  }
}

const {name, age, sayHi} = obj
```

```javascript
// 对象解构的变量名的重新改名, 语法: 旧变量名: 新变量名
const {name: username} = obj
console.log(username) // rainn
```

3. **嵌套关系**：对于一些嵌套关系, 如对象数组, 对象嵌套对象, 甚至嵌套对象数组, 只需记住: **解构体的结构要和被解构体相同**, 例如数组被解构, 那就`const [...] = [...]`；对象被解构, 就是`const {...} = {...}`；内部的结构（按需求）保持一致即可。一些例子:

```javascript
// 2.解构对象数组
const stu = [
  {
    name: 'Charlotte',
    gender: 'female',
  },
  {
    name: 'Rainn',
    gender: 'male',
  }
]
const [{name: name1, gender: gender1}, {name: name2, gender: gender2}] = stu // 解构体是数组
console.log(name1, gender1, name2, gender2) // Charlotte female Rainn male
```

```javascript
// 3.对象嵌套对象
const pig = {
  name: '佩奇',
  family: {
    mother: '猪妈妈',
    father: '猪爸爸',
    sister: '乔治',
  },
  age: 6
}
// 在其中说明是哪个对象
const {name: pigName, family: {mother, father, sister}, age: pigAge} = pig // 解构体是对象
```

```javascript
// 对象嵌套对象, 并内嵌在数组
const pigs = [
  {
    name: '佩奇',
    family: {
      mother: '猪妈妈',
      father: '猪爸爸',
      sister: '乔治',
    },
    age: 6
  }
]

// 解构体是数组
const [{name: theName, family: {mother: mo, father: fa, sister: sis}, age: theAge}] = pigs
console.log(theName, mo, fa, sis, theAge) // 佩奇 猪妈妈 猪爸爸 乔治 6
```

### 🌟原型对象 prototype

#### 两种编程思想

1. **面向过程**: 按照分析好了的步骤依次解决问题。性能比面向对象高。

2. **面向对象**: 以对象功能来划分问题而不是步骤。

   每一个对象都是功能中心, 具有明确分工。

   非常灵活、代码可复用、易维护和开发、适用于多人合作的大型项目。

   包括**三大特性**: **封装, 继承, 多态**

#### 构造函数

构造函数体现了面向对象的封装特性；创建的对象彼此独立, 互不影响。

但是, 存在**浪费内存**的问题（比如, 每new一个对象, 其中的函数也会开辟、占用一份内存, 即使这两个函数表现起来是一致的）。

为了解决这一问题, 引出**「原型」**。

#### 原型对象 prototype

- 原型对象是JavaScript中实现继承和共享属性/方法的机制。 
  构造函数通过**原型**分配的函数是所有对象共享的, **每个函数都有一个`prototype`属性, 指向一个对象,** 这个对象就是该函数的原型。
  *p.s. 通过`console.dir()可以看到是Object*

- **prototype可以挂载函数**, 故可以将不变的**方法**直接定义在prototype对象上, 然后**所有对象的实例**就可以**共享**这些方法。
- 当访问对象的属性或方法时，**先在当前实例对象**查找，然后**再去原型对象查找**，并且原型对象被所有实例共享（也就是说，如果构造函数和原型对象中的方法重名，则调用构造函数中的方法）

**p.s. 构造函数和原型对象中的this都指向「实例化的对象」**

```javascript
// 相同属性定义在构造函数中
function Student(name, age) {
  this.name = name
  this.age = age
  this.pointer = this
}

// 相同方法定义在原型对象中
Student.prototype.sing = function () {
  console.log('Singing~')
  console.log(this)
}

const rainn = new Student('rainn', 21)
const charlotte = new Student('charlotte', 20)

console.log(rainn.sing === charlotte.sing) // true

// this指向实例对象
console.log(rainn.pointer) // 指向rainn对象
console.log(charlotte.pointer) // 指向charlotte对象
rainn.sing() // log结果为rainn对象
charlotte.sing() // log结果为charlotte对象
```

*可以自定义方法*

```javascript
// 自定义max方法, 求数组最大值
Array.prototype.max = function () {
  return (Math.max(...this)) // 直接用this指向调用的数组
}
console.log(arr.max())

// 自定义sum方法, 求数组元素之和
Array.prototype.sum = function () {
  return this.reduce((prev, current) => prev + current, 0)
}
console.log(arr.sum())
```

#### constructor属性

每个`prototype`中都有一个`constructor`属性, 指向自己的构造函数。

```js
function Student () {}
console.log(Student.prototype.constructor === Student) // true
```

使用场景: 需要为`prototype`添加多个方法, 采用了对象赋值的形式。这会导致原`prototype`中的内容被覆盖, `constructor`属性丢失。

故而, 在对象赋值的过程中, 显式声明（赋值）`constructor`。

```js
console.log(Student.prototype) // 有constructor
// 采用对象赋值的形式为prototype添加方法
Student.prototype = { 
  constructor: Student, // 如果不加这一句, 后面输出就无法查看到constructor
  sing: function () {
    console.log('sing')
  },
  dance: function () {
    console.log('dance')
  }
}
console.log(Student.prototype) // 既保留了constructor, 又追加了sing和dance方法
```

#### 对象原型 \__proto__ 或 \[\[prototype\]\]

每个**实例对象**都会有一个属性 `__proto__` , 称为**对象原型**, 指向**构造函数的`prototype`**。这就是实例对象能够使用`prototype`中方法的原因。

`__proto__`是JS的非标准属性, **只读**；在浏览器中显示为`[[prototype]]`, 两种形式的意义相同。

```js
const rainn = new Student()
console.log(rainn.__proto__ === Student.prototype) // true
console.log(rainn.__proto__.constructor === Student) // true
```

#### 原型继承

抽取共同属性成为一个公共的构造函数（父类）, 新的构造函数（子类）通过`prototype`继承其中的属性。

注意: 继承后需要重新为`prototype.constructor`赋值, 令其指回构造函数

*p.s. 可以按照Java中类的思想理解*

```js
// 父类
function Human() {
  this.eyes = 2
  this.head = 1
}

// 子类
function Student() {
  this.school = 'GDUFS'
}
function Worker() {
  this.company = 'Apple'
}

// 继承
Student.prototype = new Human() // {eyes: 2, head: 1, school: 'GDUFS'}
Student.prototype.constructor = Student // 也要记得重新声明constructor
const Rainn = new Student()

Worker.prototype = new Human() // {eyes: 2, head: 1, company: 'Apple'}
Worker.prototype.constructor = Worker
const Charlotte = new Worker()

Worker.prototype.salary = function () { // 添加新方法
  console.log('发工资')
}
console.log(Charlotte) // 有新方法 
console.log(Rainn) // 不受影响

console.log(Rainn.__proto__) // { "eyes": 2, "head": 1 }
console.log(Charlotte.__proto__) // { "eyes": 2, "head": 1, "salary": f }
```

#### 原型链

> 梳理清楚**构造函数**, **实例对象**与**原型对象**之间的关联。

基于`prototype`的继承使得不同构造函数的原型对象关联在一起, 且这种关联的关系是一种链状结构。将原型对象的链状结构关系称为原型链。

**原理: 原型对象prototype本身也是个对象, 是对象就有\__proto\__（从而可以向上链式索引）**

*p.s. 最大的基类是`Object`。万物皆对象。*

```js
function Person () {}

// 只要是对象, 就有__proto__, 指向构造函数的prototype
console.log(Person.prototype.__proto__ === Object.prototype) // true
console.log(Object.prototype.__proto__ === null) // true 顶级对象, 无法再向上寻找 

// 只要是原型对象, 就有constructor, 指回构造函数
console.log(Person.prototype.constructor === Person) // true
console.log(Object.prototype.constructor === Object) // true
```

**原型链-查找规则**: 访问一个对象的属性/方法, 先**看看这个对象（构造函数）自身有没有**；如果没有, 就沿着`__proto__`所指向的`prototype`上寻找；直到顶级构造函数`Object`的`prototype`；如果依然没有, 就返回`null`。

意义: 为对象成员的查找机制提供一个方向或者说路线。

**instanceof** 运算符: 检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上；

简单理解: **对象是否属于某个构造函数**。


```js
const rainn = new Person()
console.log(rainn instanceof Person) // true
console.log(rainn instanceof Object) // true
console.log(rainn instanceof Array) // false
console.log([''] instanceof Array) // true
console.log(Array instanceof Object) // true
```

![[proto_chains.png]]

### 深浅拷贝

#### 浅拷贝

浅拷贝是指创建一个新对象, 新对象的属性值是原对象属性值的引用。对于基本类型, 值是直接复制；对于引用类型（如数组、对象）, 则复制的是地址。

可以完成对「单层」对象的拷贝, 对新的对象/数组的修改不会影响到原来的对象/数组。包括两种方法: 

```js
// {...sourceObj}
const o1 = {...obj}
o1.age = 20
console.log(obj.age, o1.age) // 18 20 对o1的修改不会影响原来的obj
```

```js
// Object.assign(target, source)
const o2 = {}
Object.assign(o2, obj)
o2.age = 20
console.log(obj.age, o2.age) // 18 20 对o2的修改也不会影响到obj
```

拷贝数组, 包括`[...sourceArray]`和`Array.prototype.contact`两种方法。

然而, 浅拷贝不能完成对多级（嵌套）的对象/数组的拷贝（对于其中的简单数据类型就拷贝了值, 但引用数据类型还是拷贝了地址）, 故引出**深拷贝**。

#### 深拷贝

包括**递归函数实现**、**lodash库实现**和**JSON字符串**三种实现方式。

1. **递归函数实现: **

自定义函数`deepCopy(target, source)`, 接受`新对象, 源对象`作为参数, 将源对象拷贝给新对象, 同时两个对象之间各自的属性/修改互不影响。

核心要点: 遍历, 条件判断与递归。使用`for-in`循环遍历对象中的每一个属性, 对每个属性作`if判断`, 根据属性`instanceof`的不同类型将其**递归处理**: 

```js
const charlotte = {} // 新对象
function deepCopy(target, source) {
  for (let key in source) { // 对象遍历, key是属性名（变量）, source[key]是属性值
    if (source[key] instanceof Array) { // 判断是否是数组（复杂数据类型）
      target[key] = [] // 让自己作为同样的数组类型, 去递归获取源对象中的这个数组属性
      deepCopy(target[key], source[key]) // 递归调用
    } else if (source[key] instanceof Object) { // 判断是否为对象, 但Array先行, 因为数组也是对象
      target[key] = {}
      deepCopy(target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }
}

deepCopy(charlotte, rainn)
```


2. **lodash库实现: **

使用`lodash`库中的`cloneDeep`方法可以轻松实现深拷贝。

```javascript
<!--引用lodash库-->
<script src="lodash.min.js"></script>
...
const charlotte = _.cloneDeep(rainn)
console.log(charlotte)
...
```

3. **JSON字符串实现: **

最直观也最简单, 将源对象转化为完全的字符串, 将字符串赋值给新变量, 再将其反JSON化, 就得到了一致但地址不同的两个对象。

*p.s. 但是不支持拷贝函数*

```javascript
const charlotte = JSON.parse(JSON.stringify(rainn))
```

### 异常处理

异常处理是指在程序运行过程中, 出现错误或异常情况时, 采取措施来处理这些问题, 以避免程序崩溃或产生不正确的结果。

**throw new Error('message')**: 抛出可定义的错误信息, 同时会**终止**程序！

```js
function fn1(x, y) {
  if (!x || !y) {
    throw new Error('参数不完整') // 会终止程序
  }
  return x + y
}

fn1()
```

**try...catch...finally**: 捕获异常, 处理错误。

```js
function fn2() {
  try {
    document.querySelector('span').style.color = 'red'
  } catch (e) { // 参数e中的message是错误消息
    console.log(e.message)
    // throw new Error(e.message)
  } finally {
    alert('finally 语句中的代码一定会执行')
  }
  console.log('后续代码正常运行')
}

fn2()
```

**debugger**: 运行到该代码, 在浏览器中打开debugger调试程序, 相当于打断点。

### 🌟防抖和节流

#### 防抖 debounce

防抖是指在事件触发后, 延迟一段时间执行函数, 如果在这段时间内再次触发事件, 则重新计时。

换句话说：单位时间内频繁触发某事件, 但**只执行最后一次**；**前面的频繁触发都不作数**。（类比回城技能）

使用场景包括: 搜索框搜索输入, 只需用户最后一次输入完, 再发送请求；手机号, 邮箱验证输入检测……

e.g. 鼠标划过（mousemove）div块后, 内部数字增加1。如果不防抖, 那么哪怕移动一像素, 数字也会增加。通过防抖, 使多次划动都只算1次（就是最后一次停止了才算）, 并在最后一次划动停止200ms后才计数。

**lodash库实现debounce: **

```js
function mouseMove() {
  box.innerHTML = String(++i)
}
```

```js
 box.addEventListener('mousemove', _.debounce(mouseMove, 200)) 
//_.debonuce(fn, waitTime)
```

**手写防抖**:  `setTimeout`和**闭包**。

核心思路: 检测是否有正在运行的定时器, 如有, 就要**销毁**, 重新开启一个定时器, 在wait秒后执行fn。

_换句话说：有就删除，只执行最后一个定时器_

```js
function debounce(fn, wait) {
  let timer
  // 闭包变量, 内部函数引用了外部函数作用域中的变量, 这个变量就会“被保留下来”, 不会被销毁。
  // 不能写在return function的作用域中, 否则每次事件都会重新声明一个timer
  
  return function () {
    // 关键: 每次执行前, 检测是否有定时器, 如有, 则清除上一个定时器；
    // 然后在新的定时器中调用函数
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      fn()
    }, wait)
  }
}

box.addEventListener('mousemove', debounce(mouseMove, 200))
// 理解: addEventListener我们正常绑定的是函数名, 或者用匿名函数, 但这里填入了函数调用
// 这就意味着, box在绑定时就已经执行了这个函数, 并将其返回值作为事件处理函数
// 所以, 在自定的debounce函数中, 我们返回一个函数（不是函数调用）；在mousemove事件后, 执行的就是这个返回的函数
// 这就解释了为什么timer应当声明在debounce，它是唯一的，利用了闭包的性质访问
// 否则，每次mousemove事件都会声明一个timer，这就无效了
```

#### 节流 throttle

单位时间内, 频繁触发事件, 但**只执行最开始那一次**；**执行期间, 任何触发都不会生效, 直到该执行完毕**（类比: 技能冷却, 换子弹等）

使用场景:  鼠标移动`mousemove`,  页面缩放`resize`, 滚动条`scroll`等。

e.g. 鼠标经过div块, 3s后计数器加一, 期间不论怎么移动都不影响。

**lodash库实现throttle**

```javascript
box.addEventListener('mousemove', _.throttle(mouseMove, 3000))
```

**手写节流: ** 和防抖结构类似, 但**核心正好相反**: 
- 如果有正在运行的定时器, 那就放任执行, 什么也不做；
- 如果没有定时器了, 才开启定时器并在wait秒后执行代码fn, 并在最后**清空**定时器。
- _换句话说：没有了才创建，只执行第一个定时器_

p.s. 注意这里的用词***清空***, 因为我们是无法在定时器内部***销毁***一个定时器的, 也就是`clearTimer`不生效, 所以, 只能*清空*: 

```javascript
function throttle(fn, wait) {
  let timer // 闭包变量
  return function () {
    if (!timer) {
      timer = setTimeout(function () {
        fn()
        // 注意: 清空定时器不能用clearTimeout！
        // 不能在定时器里面清除定时器, 因为定时器还在运作
        // clearTimeout(timer)
        timer = null
      }, wait)
    }
  }
}
box.addEventListener('mousemove', throttle(mouseMove, 3000))
```

#### 对比总结

| 特性 (Feature) | 防抖 (Debounce) | 节流 (Throttle) |
| :--- | :--- | :--- |
| **核心思想** | 单位时间内频繁触发，只执行最后一次 | 单位时间内频繁触发，只执行第一次 |
| **类比** | 回城技能 | 技能冷却 |
| **应用场景** | 搜索框输入、输入验证 | `scroll`, `resize`, `mousemove` |
| **实现方式** | `clearTimeout` + `setTimeout` 。持续重置计时器。 | `setTimeout`。在计时器期间忽略新事件。 |
| **白话记忆** | 有定时器就删，只执行最后一个定时器内的函数 | 没定时器才创建，只执行第一个定时器内的函数 |


## Web API

### 声明变量const优先

- `const`的语义化更好；
- 建议数组和对象使用 const 声明, 因为数组/对象名本身存储的是地址；
- 使用数组方法或对象属性赋值时, 本身没有影响 数组/对象**名** 中的地址值；
- 注意, 如果将 数组/对象名 用于声明新的 数组/对象, 那就等同于修改了地址, 就会引发常量报错

### DOM树和DOM对象

术语 DOM 是指 Document Object Model，文档对象模型。DOM 树是 HTML 文档的结构化表示, DOM对象是JavaScript对DOM树的抽象表示。可以通过`document`对象访问和操作DOM树。
*p.s. DOM树的根节点是`document`对象（最大的DOM对象）, 所有其他节点都是其子节点。*

更多关于 DOM 的知识点，可参阅[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)

### DOM结点及操作

- **节点类型**: DOM树中的每个节点都有一个类型, 常见的节点类型包括: 
  - `Element`: 元素节点, 表示HTML标签。**（重点关注）**
  - `Text`: 文本节点, 表示元素内的文本内容。
  - `Comment`: 注释节点, 表示HTML注释。
  - `Document`: 文档节点, 表示整个HTML文档。

- **查找结点**: 
  - **查找父结点**: 使用`parentNode`属性获取当前节点的父节点（只能得到最近一级的亲父亲）
  - **查找子结点**: 
    - 使用`childNodes`属性获取当前节点的所有子节点（返回 NodeList 对象, 包含所有类型的子节点, 包括文本节点和注释节点）。
    - 使用`children`属性获取当前节点的所有子元素节点（返回 HTMLCollection 对象, 伪数组, 只包含元素节点）。
  - **查找兄弟结点**: 
    - 使用`nextElementSibling`属性获取当前节点的下一个兄弟节点。
    - 使用`prevoiusElementSibling`属性获取当前节点的上一个兄弟节点。
```javascript
console.log(son.parentNode)  // father
console.log(son.parentNode.parentNode) // grandfather // 都返回dom对象

const ul = document.querySelector('ul')
console.log(ul.children)

li.nextElementSibling // 获取下一个兄弟元素节点
li.prevoiusElementSibling // 获取上一个兄弟元素节点
```

- **增加结点（重点）**: 先创建, 后追加
  - 使用`createElement(tagName)`方法创建一个新的元素节点。
  - 使用`createTextNode(text)`方法创建一个新的文本节点。
  - 使用`appendChild(node)`方法将新节点添加到父节点的子节点列表中。
  - 使用`insertBefore(newNode, referenceNode)`方法在指定的参考节点之前插入新节点。

```javascript
let newLi = document.createElement('li'); // 创建一个新的li元素
newLi.textContent = '新列表项'; // 设置文本内容
let ul = document.querySelector('ul'); // 获取ul元素
ul.appendChild(newLi); // 将新li元素添加到ul的末尾
ul.insertBefore(newLi, ul.children[0]); // 在ul的第一个子元素之前插入新li元素
```


- **克隆结点**: 使用`cloneNode(deep)`方法克隆节点。
  - `deep`参数决定是否深度克隆（包括子节点）。`true`表示深度克隆, 克隆时会包含后代节点；`false`表示浅克隆, 默认（只克隆当前节点, 且只克隆标签, 内容不管）。
```javascript
ul.insertBefore(ul.children[0].cloneNode(true), ul.children[0]) // 克隆第一个子元素并插入到第一个子元素之前
```

- **删除结点**: 使用`removeChild(node)`方法从父节点中删除子节点。
```javascript
ul.removeChild(ul.children[0]) // 删除ul的第一个子元素
```

** 对比总结 **

| 操作 (Operation) | 方法 (Method) | 描述 (Description) |
| :--- | :--- | :--- |
| **查找父节点** | `parentNode` | 获取当前节点的直接父节点。 |
| **查找子节点** | `childNodes` | 获取所有类型的子节点，包括文本和注释。 |
| | `children` | **（推荐）** 获取所有元素子节点。 |
| **查找兄弟节点** | `nextElementSibling` | 获取下一个兄弟元素节点。 |
| | `previousElementSibling` | 获取上一个兄弟元素节点。 |
| **增加节点** | `createElement()` | 创建一个新的元素节点。 |
| | `appendChild()` | 在父节点的末尾追加一个子节点。 |
| | `insertBefore()` | 在指定的子节点前插入一个新的子节点。 |
| **克隆节点** | `cloneNode(deep)` | 克隆一个节点。`true` 为深克隆（包括后代），`false` 为浅克隆。 |
| **删除节点** | `removeChild()` | 从父节点中删除一个子节点。 |



### BOM

BOM（Browser Object Model）是浏览器对象模型, 提供了与浏览器窗口和浏览器相关的对象和方法。`window`是其中最大的对象, 其子级包括`document`、`location`、`history`、`navigator`、`screen`等。

*p.s. `window`对象是JS中的顶级对象、全局对象；`window`对象下的属性和和方法调用时可以省略`window`前缀。*

#### location对象

`location`对象表示当前文档的URL信息, 提供了获取和修改浏览器地址栏的功能。关注以下4个属性/方法: 

- `location.href`: 获取或设置当前文档的完整URL。**可以通过修改以实现页面跳转**。
```javascript
location.href = 'https://www.example.com'; // 跳转到指定URL
```

- `location.search`: 提交表单后, 获取表单信息问号后的内容, 要求表单标签都有`name`属性。
```javascript
console.log(location.search); // 输出查询字符串, 如 ?name=Alice&age=30
```

- `location.hash`: 获取或设置URL中的锚点部分（#后面的内容）, **用于页面内跳转**。
```javascript
location.hash = '#section1'; // 跳转到页面内的锚点
```

- `location.reload()`: 重新加载当前文档。可带参数`true`强制从服务器重新加载, 而不是从缓存中加载。
```javascript
location.reload(); // 刷新页面
```

#### navigator对象

**`navigator`对象**提供了浏览器的相关信息, 如浏览器类型、版本、操作系统等。可用于检测是否为移动端设备（安卓/iOS）而进行网页跳转。

#### history对象

`history`对象表示浏览器的历史记录, 提供了访问和操作浏览器历史记录的方法。

管理历史记录, 控制后退/前进, 包括`forward()`,` back()`, `go()`; `go()`带参数, `1`前进, `-1`后退

#### 🌟本地存储localStorage

`localStorage`是浏览器提供的本地存储机制, 用于在用户浏览器中存储数据。数据**以键值对的形式**存储, 将数据永久存储在本地, 除非手动删除, 否则即使页面关闭, 数据也存在。

- **特性**: 
  - 数据存储在浏览器中, 跨页面共享。
  - 数据以字符串形式存储, 非字符串类型需要转换。
  - 存储容量通常为5MB（不同浏览器可能有所不同）。
  - 数据不会过期, 除非手动删除。

- **常用方法**: 
- `setItem(key, value)`: 设置键值对, 存储数据。原存储中没有对应的`key`, 就是**增**, 有`key`就是覆盖原来的`key`, 也即**改**
```javascript
localStorage.setItem('username', 'Alice'); // 存储用户名
```
- `getItem(key)`: 获取指定键的值, 若不存在则返回`null`。
```javascript
localStorage.getItem('username'); // 获取用户名
```
- `removeItem(key)`: 删除指定键的值。
```javascript
localStorage.removeItem('username'); // 删除用户名
```
- `clear()`: 清空所有本地存储的数据。
```javascript
localStorage.clear(); // 清空所有数据
```

*p.s. `sessionStorage`与`localStorage`类似, 但数据仅在当前会话中有效, 关闭浏览器窗口后数据会被清除。*

- **存入复杂数据类型**: 

	- 复杂数据类型（如对象、数组）无法直接存储到`localStorage`中, 需要先将其转换为**JSON字符串**。
	- 使用`JSON.stringify()`将对象或数组**转换为字符串**存储, 使用`JSON.parse()`将字符串转换回对象或数组。
```javascript
localStorage.setItem('obj', JSON.stringify({ name: 'Alice', age: 30 })); // 存储对象

console.log(typeof localStorage.getItem('obj')) // string
console.log(localStorage.getItem('obj')) // {"name":"Alice","age":30}

let obj = JSON.parse(localStorage.getItem('obj')); // 获取对象
console.log(obj.name); // 输出: Alice
```


### 选择器

由HTML树获取DOM元素, 使用`document.querySelector(选择器)`和`document.querySelectorAll(选择器)`选择元素。

- `querySelector()`返回第一个匹配的元素（HTMLElement对象）, 没有则返回空；
- `querySelectorAll()`返回所有匹配的元素集合（NodeList对象集合）；伪数组, 哪怕只有一个元素；有长度和索引号, 但没有数组方法。
- **选择器语法与CSS选择器相同, 可以是一个或多个css选择器**。
- 其它选择器方法: 
  - `getElementById(id)`: 通过ID选择元素。
  - `getElementsByClassName(className)`: 通过类名选择元素, 返回HTMLCollection对象（实时更新）。
  - `getElementsByTagName(tagName)`: 通过标签名选择元素, 返回HTMLCollection对象（实时更新）。

### 🌟修改元素

#### 修改元素内容

 使用`innerHTML`、`textContent`或`innerText`属性。常用于双标签。

  - `innerHTML`: 获取或设置元素的**HTML内容**, **支持HTML标签**。
  - `textContent`: 获取或设置元素的**文本内容**, 不支持HTML标签。
  - `innerText`: 获取或设置元素的可见文本内容, 考虑CSS样式。

#### 修改元素常用属性

 修改如`src`, `href`等html标签的属性, 像**修改对象属性**一样修改。 e.g. 

```javascript 
img.src = 'images/01-CommonJS导出导入.jpg'
```

#### 修改元素样式

 包括`style`, `className`和`classList`属性。

- `style`属性: 直接修改元素的内联样式。e.g. 

```javascript
element.style.color = 'red';
element.style.backgroundColor = 'blue'; // CSS中用了短横线的, JS中用小驼峰式命名
```

- `className`属性: **覆盖**一个新的类名。

```javascript
div.className = 'nav box' // 若想保留原类名, 就两个一起写
```

- `classList`属性: 提供对元素类名的操作方法, 如`add()`、`remove()`、`toggle()`等。

```javascript
// 「追加」类名
box.classList.add('active') // 类名一样不加点, 并且是字符串
// 「移除」类名
box.classList.remove('box')
// 「切换」类名: 有就删掉, 没有就加上
box.classList.toggle('box')
```

#### 修改表单元素属性

 本质还是修改对象属性、重新赋值。

- `value`属性: 获取或设置表单元素的值。
```javascript
input.value = '新值'; // 设置输入框的值
let inputValue = input.value; // 获取输入框的值
```

- `type`属性: 获取或设置表单元素的类型（如`text`、`password`、`checkbox`等）。
```javascript
input.type = 'password'; // 设置输入框类型为密码
```
- `placeholder`属性: 获取或设置输入框的占位符文本。
```javascript
input.placeholder = '请输入内容'; // 设置输入框的占位符
```

- `selectedIndex`属性: 获取或设置下拉列表的选中项索引。
```javascript
select.selectedIndex = 1; // 设置下拉列表选中第二项
let selectedIndex = select.selectedIndex; // 获取下拉列表选中项的索引
```

- `button`: 获取或设置按钮的文本内容。相对特殊, 因为是双标签, 所以还是使用`innerHTML`或`textContent`修改文本。
```javascript
button.innerHTML = '提交'; // 设置按钮文本内容
button.textContent = '提交'; // 设置按钮文本内容
```

*修改表单中的添加/移除效果, 一律用**布尔值**。*

*p.s. 虽然有时填`true`字符串也生效, 但本质上他们发生了隐式转换, 以下属性只接受布尔值。生效是因为非空字符串在转换时成为了`true`*

- `checked`属性: 获取或设置复选框或单选按钮的选中状态。
```javascript
checkbox.checked = true; // 设置复选框为选中状态
let isChecked = checkbox.checked; // 获取复选框的选中状态
```

- `disabled`属性: 获取或设置表单元素是否禁用。
```javascript
input.disabled = true; // 设置输入框为禁用状态
```

### 自定义属性

**自定义属性**: 在HTML中使用`data-*`前缀定义自定义属性, 便于存储额外信息。
```html
<div id="myElement" data-custom="value" data-id="1">内容</div>
```
然后在JavaScript中使用`dataset`属性访问自定义属性。
```javascript
let element = document.getElementById('myElement');
let customValue = element.dataset.custom; // 获取自定义属性值
let idValue = element.dataset.id; // 获取自定义ID值
```


### 定时器

#### 间歇函数

**setInterval(f(), interval time)**: 设置一个间隔时间重复执行的函数。**返回值: 定时器ID**。e.g. 
```javascript   
let timer = setInterval(() => {
    console.log('每隔1秒执行一次');
}, 1000); // 每1000毫秒（1秒）执行一次
```
*p.s. 使用**外部具名函数**, 不需要加括号, 直接传入函数名即可。 如:*

```javascript
function myFunction() {
    console.log('每隔1秒执行一次');
}
let timer = setInterval(myFunction, 1000); // 每1000毫秒（1秒）执行一次
```

**清除间歇函数**: 使用`clearInterval(timer)`停止间隔函数的执行。参数`timer`是`setInterval`返回的定时器ID。
```javascript
clearInterval(timer); // 停止间隔函数
```

#### 延时函数

**setTimeout(f(), delay time)**: 设置一个延时执行的函数。返回值: 定时器ID。和`setInterval`相近, 不同点在于, 延时函数的意义是「多久后」开始, 所以**只会执行一次**
```javascript
let timer = setTimeout(() => {
    console.log('延时1秒执行一次');
}, 1000); // 延时1000毫秒（1秒）执行一次

// 清除延时函数
clearTimeout(timer); // 停止延时函数
```


### 事件

#### 事件

用户与网页交互时触发的动作, 如点击、键盘输入、鼠标移动等。

#### 事件监听

使用 **`addEventListener(event, handler)`** 方法为元素添加事件监听器。`event`是事件类型, `handler`是事件处理函数。

**三要素**: 

1. **事件源**: 触发事件的元素。
2. **事件类型**: 事件的种类, 如`click`、`mouseover`、`keydown`等。
3. **事件处理函数**: 当事件发生时执行的代码块。

```javascript
// 关闭广告
let closeButton = document.querySelector('.close-button');
closeButtion.addEventListener('click', function() {
    AD.style.display = 'none'; // 隐藏广告
});
```

**其他版本的事件监听**: （了解）
- `element.onclick = function() { ... }`: 直接设置事件处理函数。缺点是只能绑定一个事件处理函数, 后续设置会覆盖之前的处理函数。

#### 事件类型

##### 常见事件类型

| 事件类别 (Category) | 事件类型 (Type) | 描述 (Description) |
| :--- | :--- | :--- |
| 鼠标事件 | `click` | 单击 |
| | `mouseover` | 悬停 |
| | `mouseout` | 移出 |
| | `mouseenter` | 进入 |
| | `mousemove` | 移动 |
| 键盘事件 | `keydown` | 按下 |
| | `keyup` | 松开 |
| | `keypress` | 按下或松开 |
| 表单事件 | `submit` | 提交 |
| | `change` | 值改变 |
| | `input` | 内容变化 |
| 焦点事件 | `focus` | 获得焦点 |
| | `blur` | 失去焦点 |
| 页面加载 | `load` | 页面及所有资源加载完成 |
| | `DOMContentLoaded` | DOM内容加载完成, HTML结构加载完即触发, 无需等待样式表、图片等, 速度更快 |
| 页面滚动 | `scroll` | 页面滚动时触发 |
| 窗口事件 | `resize` | 窗口大小改变时触发 |

##### 重要元素属性

###### scroll 事件相关属性

-   `scrollTop`: 元素顶部到可视区域顶部的距离。
-   `scrollLeft`: 元素左侧到可视区域左侧的距离。

这两个属性可读可写，值为数字，无单位。通常被通俗地理解为“被卷去的头部”和“被卷去的左侧”。

要获取整个页面的滚动距离，需要访问文档根元素 (`documentElement`)：
-   `document.documentElement.scrollTop`
-   `document.body.scrollTop` (用于兼容旧版浏览器)

```javascript
window.addEventListener('scroll', function() {
  console.log('页面滚动了');
  // 获取页面垂直滚动的距离
  const distance = document.documentElement.scrollTop;
  console.log('被卷去的头部: ', distance);
});
```

###### resize 事件相关属性

-   `clientWidth` 与 `clientHeight`: 获取元素的**可见**宽度或高度，计算方式为 `内容 + padding`。
-   `offsetWidth` 与 `offsetHeight`: 获取元素的**总**宽度或高度，**只读**，计算方式为** `内容 + padding + border`。

```javascript
// 假设页面中有一个 class 为 .box 的元素
const box = document.querySelector('.box'); 

window.addEventListener('resize', function() {
  console.log('窗口大小改变了');
  if (box) {
    console.log('元素的可见宽度 (clientWidth): ', box.clientWidth);
    console.log('元素的可见高度 (clientHeight): ', box.clientHeight);
    console.log('元素的总宽度 (offsetWidth): ', box.offsetWidth);
    console.log('元素的总高度 (offsetHeight): ', box.offsetHeight);
  }
});
```

![[dimensions-client.png]]

![[dimensions-offset.png]]


#### 🌟事件对象 event

事件发生时, 浏览器会创建一个事件对象, 包含有关事件的信息。可以**在事件处理函数中访问该对象**。

- **回调函数**: 将函数f(n)作为参数, 传递给函数g(n), 称f(n)为回调函数。 [官方文档](https://developer.mozilla.org/zh-CN/docs/Glossary/Callback_function) 
```javascript
setInterval(fn, 1000); // fn是回调函数
```

- **事件绑定的回调函数的_第一个参数_就是事件对象`event`**, 包含事件的相关信息。例如: 
```javascript
element.addEventListener('click', function(event) {
  console.log(event) // 输出事件对象 PointerEvent对象
  console.log(event.type); // 输出事件类型
  console.log(event.target); // 输出触发事件的元素
  console.log(event.clientX, event.clientY); // 输出鼠标点击位置的坐标
  console.log(event.offsetX, event.offsetY); // 输出鼠标点击位置相对于元素的坐标
});
```

#### 🌟环境对象 this

每个「函数内部」都有一个`this`对象, 指向当前函数的执行环境。普通函数中, `this`指向`window`, 事件处理函数（回调函数）中的`this`通常指向触发**事件的元素（调用者）**。

*p.s. 函数的调用方式不同, `this`的指代对象也不同。粗略规则: **谁调用, this就指向谁**。*

```javascript
btn.addEventListener('click', function() {
  console.log(this); // <button>button</button> btn对象
  this.style.backgroundColor = 'red'; // 修改按钮背景色, this指向btn对象
});
```

#### 事件流 

事件流是指事件在DOM树中传播的过程, 事件完整执行过程中的流动路径, 分为三个阶段: 
1. **捕获阶段**: 事件从根节点向目标节点传播。
2. **目标阶段**: 事件到达目标节点。
3. **冒泡阶段**: 事件从目标节点向根节点传播。

**事件捕获**: 在事件流的捕获阶段, 可以使用`addEventListener(event, handler, true)`来监听事件。第三个参数为`true`表示启用捕获。

**事件冒泡**: 在事件流的冒泡阶段, 可以使用`addEventListener(event, handler, false)`或**省略**第三个参数来监听事件。第三个参数为`false`表示启用冒泡。

*p.s. onclick方法只有冒泡阶段, 没有捕获阶段。*

**🌟阻止事件流**: 可以使用`event.stopPropagation()`方法阻止事件继续传播。在冒泡或捕获阶段都可以使用。

**mouseover / mouseout 和 mouseenter / mouseleave的区别**:
- `over/out` 组会有冒泡效果, 例如内嵌在`father`中的`son`, 即使没有给`son`设置事件, 鼠标经过`son`时会认为离开了`father`；而`son`并没有事件, 又冒泡回来执行`father`的经过事件
- 同样的例子, 在 `enter/leave` 组中就不会发生, 经不经过`son`都不会影响

#### 事件解绑

**L0事件解绑**: 直接将事件处理函数设置为`null`或`undefined`。
```javascript
element.onclick = null; // 解绑事件
```

**L2事件解绑**: 使用`removeEventListener(event, handler)`方法解绑事件监听器。需要传入相同的事件类型和处理函数。

*p.s. 匿名函数无法解绑, 因为没有引用。* 

```javascript
element.removeEventListener('click', handler); // 解绑事件监听器
```

**总结对比**: 

- L0: 同一对象, 后者覆盖前者；`null`覆盖可以解绑；都是冒泡阶段执行
- L2: 注册不会向前覆盖；使用`removeEventListener`解绑；通过第三个参数决定冒泡


#### 事件委托

事件委托是将事件监听器添加到父元素上, 而不是每个子元素上。这样可以减少内存使用和提高性能, 尤其是当子元素动态添加或删除时。

利用冒泡特点, 只需为父元素注册事件, 当子元素被触发, 就必然冒泡回父元素并执行相应事件。

使用`event.target`获取触发事件的子元素。

*p.s. 可以使用`console.dir(event.target)`查看事件目标的详细信息。*

```javascript
// 筛选标签
let chlid = document.querySelector('.child');
chlid.addEventListener('click', function (event) {
  console.log(event.target); // 输出触发事件的子元素
  if (event.target.tagName === 'BUTTON') {
    console.log('按钮被点击了');
  }
})
```

**🌟阻止默认行为**: 有些事件会触发浏览器的默认行为, 如链接点击、表单提交等。可以使用`event.preventDefault()`方法阻止默认行为。

## 技巧类

### 排他思想
- 排他思想: 在处理多个元素的状态时, 确保只有一个元素处于激活状态。可以通过遍历所有相关元素, 先清除其他元素的状态, 再设置当前元素的状态。
- 例如, 处理多个按钮的选中状态时, 可以先移除所有按钮的选中样式, 再为当前按钮添加选中样式。
```javascript
// 删除前一个圆点
// li[i - 1].classList.remove('active')
// 用排他思想做会更好！避免了数组下标的计算问题
document.querySelector('.slider-indicator .active').classList.remove('active')
...
li[i].classList.add('active')
```


### 让页面滚动更加丝滑
使用`scroll-behavior: smooth;`可以让页面滚动更加平滑。
```javascript
document.documentElement.style.scrollBehavior = 'smooth';
```

### confirm方法
- `confirm`方法用于显示一个确认对话框, 用户可以选择“确定”或“取消”。返回值为布尔类型, `true`表示用户点击“确定”, `false`表示用户点击“取消”。
```javascript
if (confirm("确定要删除吗？")) {
    // 用户点击了“确定”
    console.log("已删除");
} else {
    // 用户点击了“取消”
    console.log("取消删除");
}
```

### 表单value判空
对于表单value判空, H5新增了required属性, 可以实现基础的表单判空, 但空字符串可以跳过这一点, 所以JS中可以用trim()方法进一步优化 e.g. 
```javascript
if (String(form_items[i].value).trim() === '') {return alert('请填入完整字段')}`
```

### 使用逻辑中断避免localstorage初次加载报错

```js
//使用逻辑中断避免初次加载因没有本地存储而报错
bgUrl && (document.body.style.backgroundImage = `url(${bgUrl})`)
```

