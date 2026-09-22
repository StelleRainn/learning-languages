---
id: swift
name: Swift
order: 3
glyph: "🦅"
tagline: 为 Apple 生态而生
description: 类型安全、协议与值类型，构建现代 App。
accent: "#FA7343"
gradient: "linear-gradient(135deg, #b91c1c 0%, #f97316 50%, #fbbf24 100%)"
light: true
---

# Swift

> Swift 是 Apple 推出的一门**类型安全**、**现代化**的编程语言，用于开发 iOS / iPadOS / macOS / watchOS / tvOS 应用。它融合了 C / Objective-C 的优点，同时去掉了历史包袱（如头文件、指针裸用等），并引入了**可选类型（Optional）**、**协议导向**、**值类型优先**等现代语言特性。
>
> 本笔记由浅入深，涵盖语法基础 → 控制流 → 函数与闭包 → 枚举与面向对象 → 协议扩展 → 错误处理与内存管理 → 高级特性。代码可直接在 Swift Playgrounds、Xcode 或命令行 `swift` REPL 中运行。

## Swift 语法和基础

### 基础规则

- **代码书写位置**: Swift 源码以 `.swift` 为后缀；可在 **Xcode 项目**、**Swift Playgrounds**、**命令行 REPL（输入 `swift` 进入）** 或 **命令行脚本（`swift script.swift`）** 中运行。
- **注释**: 单行注释 `//`，多行注释 `/* ... */`。Swift 的多行注释**支持嵌套**（这是与多数语言不同的一点），便于在大段注释中临时屏蔽代码。
```swift
// 单行注释

/* 多行注释
   /* 嵌套注释，不会报错 */
*/
```
- **分号**: **可写可不写**；仅当**一行有多条语句**时才必须用分号分隔。统一风格上，绝大多数 Swift 代码**不写分号**。
```swift
let a = 1
let b = 2; let c = 3 // 同一行多条语句需要分号
```
- **输出语法**: `print(...)` 输出并换行，`print(..., terminator: "")` 不换行；`debugPrint` 输出更详细的调试信息。
```swift
print("Hello, Swift")        // Hello, Swift
print(1, 2, 3, separator: "-") // 1-2-3
```
- **Playground 实时结果**: 在 Playgrounds 中，每行表达式的结果会直接显示在右侧，无需 `print`。

### 变量与常量

- **变量 `var`**: 值可以修改。
- **常量 `let`**: 值一经赋值**不可修改**。**优先使用 `let`**，这是 Swift 的核心编程习惯——它能帮助编译器优化，也能避免意外修改。

```swift
var age = 20       // 变量
age = 21           // OK

let pi = 3.14159   // 常量
// pi = 3          // ❌ 编译错误：常量不可修改
```

- **命名规则**: 字母、数字、下划线，**数字不能开头**；区分大小写；推荐**小驼峰**命名。Swift 还允许用**中文、emoji**等 Unicode 字符作为标识符（但不推荐）。
- **命名冲突与关键字**: 若要用关键字作名字，需加反引号，如 ``let `class` = 1``。

> **核心习惯**: **能用 `let` 就不用 `var`**。这与 JavaScript 中「`const` 优先」的思想一致。

### 数据类型

Swift 是**强类型**语言：每个值都有确定的类型，且**类型不会隐式转换**。但 Swift 强大的**类型推断（Type Inference）**让你大多数时候无需手写类型。

#### 类型推断与类型注解

- **类型推断**: 声明并赋值时，编译器自动推断类型。
- **类型注解**: 显式声明类型，语法为 `变量名: 类型`。

```swift
let inferredInt = 42            // 推断为 Int
let inferredDouble = 3.14       // 推断为 Double（小数字面量默认 Double，而非 Float）

let explicitFloat: Float = 3.14 // 显式注解为 Float
let x: Int = 100
```

#### 整数与浮点数

- **整数**: `Int`（有符号，**默认**）、`UInt`（无符号）。还有固定位宽类型 `Int8/16/32/64`、`UInt8/...`。
  - 在 64 位平台上，`Int` 等价于 `Int64`。**日常开发统一用 `Int`**，无需关心位宽。
- **浮点数**: `Double`（64 位，**默认**，约 15 位精度）、`Float`（32 位，约 6 位精度）。
- **数值可读性**: 可用下划线分隔长数字，提升可读性。
```swift
let oneMillion = 1_000_000
let bytes = 0b1000      // 二进制字面量 = 8
let hex = 0x1F          // 十六进制 = 31
```

#### 布尔类型

- `Bool`，只有 `true` 和 `false` 两个值。
- Swift 的条件判断**必须是 Bool**，不存在 C/JS 那种「非零即真」「非空即真」的隐式转换。
```swift
let i = 1
// if i { ... }          // ❌ 编译错误：i 是 Int 不是 Bool
if i != 0 { ... }        // ✅ 必须显式比较
```

#### 元组 Tuple

元组把**多个值组合成一个复合值**，类型可以不同。适合临时组织一组相关数据。

```swift
// 方式一：按下标访问
let http404 = (404, "Not Found")
print(http404.0)   // 404
print(http404.1)   // Not Found

// 方式二：命名元素，可读性更好
let person = (name: "Rainn", age: 21)
print(person.name) // Rainn

// 方式三：解构赋值（分解元组）
let (code, message) = http404
print(code)        // 404
let (justCode, _) = http404  // 只取需要的部分
```

> 元组常用于「函数返回多个值」，详见函数章节。

#### 类型转换（显式）

Swift **不做隐式类型转换**，不同类型混合运算必须**显式转换**。这是 Swift 类型安全的体现。

```swift
let intNum = 3
let doubleNum = 0.14159
// let pi = intNum + doubleNum          // ❌ 类型不匹配
let pi = Double(intNum) + doubleNum     // ✅ 3.14159

let label = "The width is "
let width = 94
// let str = label + width              // ❌ 不能隐式拼接数字
let str = label + String(width)         // ✅ "The width is 94"
```

整数之间转换也需显式，避免溢出隐患：
```swift
let small: Int16 = 1000
let big: Int32 = Int32(small)
```

### 🌟可选类型 Optional

**可选类型是 Swift 区别于多数语言的最核心特性**，用于表达「这个值可能**有**，也可能**没有（nil）」。

#### 为什么需要可选

在 Objective-C / JS 中，一个对象引用可以随意为 `nil`/`null`，运行时访问就可能崩溃。Swift 用 `Optional` 把「可能为空」这件事在**类型层面**表达出来，强制开发者处理 nil，从而把大量运行时错误提前到**编译期**。

- `Int` 表示「**一定有**一个整数」。
- `Int?` 表示「**可能有**整数，也可能是 `nil`」。

```swift
var possibleNum: Int? = nil     // 可选，可以为 nil
possibleNum = 42

let definiteNum: Int = 42       // 非可选，绝不可能是 nil
```

> `Int?` 本质是 `Optional<Int>` 枚举，有两个 case：`.some(值)` 和 `.none`（即 nil）。

#### 强制解包 Forced Unwrapping

用 `!` 解包。**仅在你确定有值时使用**，否则运行时崩溃（`Unexpectedly found nil`）。

```swift
let num: Int? = 42
print(num!)  // 42，强制解包
let nothing: Int? = nil
// print(nothing!)  // 💥 运行时崩溃
```

#### 可选绑定 Optional Binding（推荐）

用 `if let` / `guard let` 安全地解包：当可选有值时，赋给一个临时常量并进入分支；为 nil 则跳过。

```swift
let userInput: String? = "123"

if let actualNumber = Int(userInput) {
    // actualNumber 在此分支内是非可选 Int
    print("数字是 \(actualNumber)")
} else {
    print("不是合法数字")
}

// 多个可选可同时绑定，用逗号分隔（都成功才进入）
if let a = optionalA, let b = optionalB, a < b { ... }
```

#### guard 语句（提前退出）

`guard` 用于「条件不满足就提前退出」，让正常逻辑保持在同一缩进层级。`guard let` 解包的变量在**之后的作用域**可用（与 `if let` 不同）。

```swift
func greet(_ name: String?) {
    guard let name = name else {
        print("名字为空")
        return        // guard 必须转移控制流（return / break / throw 等）
    }
    // name 在这里可用，且已是解包后的非可选 String
    print("Hello, \(name)")
}
```

#### 空合运算符 Nil-Coalescing `??`

`a ?? b`：若 `a` 有值则解包返回 `a`，否则返回默认值 `b`。等价于 `a != nil ? a! : b`。

```swift
let nickname: String? = nil
let displayName = nickname ?? "Anonymous"  // "Anonymous"
```

#### 可选链 Optional Chaining

对可选值用 `?` 调用属性 / 方法 / 下标。链上任意一环为 nil，整条链就安全地返回 nil，而不会崩溃。

```swift
// 假设 person.spouse 是可选的
let spouseAge = person.spouse?.age   // 类型是 Int?（即使 age 本身是 Int）
```

> 可选链的返回类型**永远会多一层 Optional**，因为链可能中断返回 nil。详见高级特性章节。

#### 隐式解包可选 `Int!`

声明为 `Int!` 的可选，使用时**自动解包**，无需 `!`。它本质仍是 Optional。

- 用途有限：主要用于「初始化前一定为 nil，之后一定会被赋值」的场景（如 IBOutlet）。
- **日常开发尽量避免**，优先用普通可选 + `if let`。

```swift
var implicitNum: Int! = nil
implicitNum = 10
print(implicitNum + 5)  // 15，无需手动解包
```

#### 可选小结对比

| 操作 | 语法 | 安全性 | 说明 |
| :--- | :--- | :--- | :--- |
| 声明可选 | `Int?` | — | 值可能为 nil |
| 强制解包 | `x!` | ⚠️ 不安全 | 为 nil 则崩溃 |
| 可选绑定 | `if let x = opt` | ✅ 安全 | 有值才进入分支 |
| 提前退出 | `guard let x = opt else {return}` | ✅ 安全 | 解包变量后续可用 |
| 空合运算 | `opt ?? 默认值` | ✅ 安全 | 提供 fallback |
| 可选链 | `opt?.prop` | ✅ 安全 | 链中断返回 nil |
| 隐式解包 | `Int!` | ⚠️ 慎用 | 自动解包，本质仍可选 |

### 运算符

- **赋值运算符**: `=` `+=` `-=` `*=` `/=` `%=`。
- **算术运算符**: `+` `-` `*` `/` `%`（取余）。
  - **字符串支持 `+` 拼接**；**数组也支持 `+`/`+=` 合并**。
- **比较运算符**: `==` `!=` `>` `<` `>=` `<=`。Swift 中 `==` 默认就是**值相等**且**类型相同**才为真（不存在 JS 的隐式转换坑）。
- **恒等运算符（引用相等）**: `===` 和 `!==`，**仅用于类实例**，判断两个引用是否指向**同一个对象**。（注意：与 JS 的 `===` 含义不同！Swift 的 `==` 已经是值相等，`===` 是引用相等。）
```swift
class Person { var name = "" }
let p1 = Person(); let p2 = Person()
p1 === p2   // false，两个不同的实例
let p3 = p1
p1 === p3   // true，指向同一实例
```
- **逻辑运算符**: `&&` `||` `!`，优先级与 C 一致：`!` > `&&` > `||`。同样有**短路求值**。
- **三元运算符**: `条件 ? A : B`。
- **空合运算符**: `??`（见可选类型）。
- **范围运算符 Range（Swift 特色）**: 
  - `a...b`: **闭区间**，包含 a 和 b。
  - `a..<b`: **半开区间**，包含 a，不包含 b。
  - `a...` / `...a` / `a..<b`: **单侧区间**，表示到结尾 / 从开头到 a。
```swift
for i in 1...5 { print(i) }   // 1 2 3 4 5
for i in 1..<5 { print(i) }   // 1 2 3 4
let names = ["a", "b", "c"]
for n in names[1...] { print(n) }  // b c（从索引1到结尾）
```
- **溢出运算符**: `&+` `&-` `&*`，允许溢出回绕（默认情况下溢出会报错）。
- **位运算符**: `&` `|` `^` `~` `<<` `>>`，与 C 一致。

### 字符串

Swift 的 `String` 是**值类型**（Value Type）：赋值或传参时会发生**拷贝**，互不影响（不同于 JS 字符串虽也是值类型，但 Swift 这里强调结构体语义）。

#### 字符串字面量与插值

- **字符串插值**: 用 `\(表达式)` 把变量或表达式嵌入字符串，等价于 JS 的模板字符串 `` `${...}` ``。
```swift
let name = "Rainn"
let age = 21
let msg = "我叫 \(name)，今年 \(age) 岁，明年 \(age + 1) 岁。"
```
- **多行字符串字面量**: 用三个双引号 `"""` 包裹，开头结尾换行。适合写长文本、JSON、SQL 等。
```swift
let paragraph = """
第一行
第二行
缩进由结束的 \"\"\" 位置决定
"""
```
- **字符 `Character`**: 单个字符。`String` 可看作 `Character` 的集合。

#### 常用字符串属性与方法

```swift
let str = "Hello, Swift"

str.count                     // 12，字符数（不是字节数，正确处理 emoji）
str.isEmpty                   // false
str.hasPrefix("Hello")        // true，前缀
str.hasSuffix("Swift")        // true，后缀
str.uppercased()              // "HELLO, SWIFT"
str.lowercased()              // "hello, swift"

// 索引：Swift 字符串不能用整数下标！必须用 String.Index
let idx = str.index(str.startIndex, offsetBy: 7)
str[idx]                      // "S"
str[str.startIndex]           // "H"
str[str.index(before: str.endIndex)]  // "t"
```

> ⚠️ **重要区别**: Swift 字符串**不支持 `str[0]` 这种整数下标**，因为不同字符占用字节数不同（如 emoji）。必须通过 `String.Index` 和 `.index(_:offsetBy:)` 来定位。

#### 字符串拼接与修改

```swift
var greeting = "Hello"
greeting += ", World"           // "Hello, World"
greeting.append("!")            // "Hello, World!"

// 字符串插值 vs 拼接：插值会把任意类型转为字符串
let count = 3
print("数量：\(count)")          // 数量：3
```

### 集合类型

Swift 提供**三种**核心集合类型，它们都是**值类型**（用 `struct` 实现），赋值/传参都是拷贝。

- **数组 Array**: **有序**、可重复。
- **集合 Set**: **无序**、**唯一**。
- **字典 Dictionary**: **无序**的**键值对**，键唯一。

> 三者都用泛型语法：`Array<Element>` 可简写为 `[Element]`，`Dictionary<Key, Value>` 可简写为 `[Key: Value]`。

#### 数组 Array

```swift
// 创建
var numbers: [Int] = [1, 2, 3]
var inferred = [1, 2, 3]            // 推断为 [Int]
var empty1: [Int] = []
var empty2 = [Int]()                // 等价的空数组构造
var repeats = Array(repeating: 0.0, count: 3)  // [0.0, 0.0, 0.0]

// 访问与修改
numbers.count                       // 3
numbers.isEmpty                     // false
numbers[0]                          // 1（数组可以用整数下标，字符串不行）
numbers.append(4)                   // 尾部追加 → [1,2,3,4]
numbers.insert(0, at: 0)            // 指定位置插入 → [0,1,2,3,4]
numbers[0] = 100                    // 修改
numbers.remove(at: 0)               // 删除指定位置，返回被删元素
numbers.removeLast()                // 删除末尾
numbers.contains(2)                 // true，是否包含

// 区间批量操作
var arr = [1, 2, 3, 4, 5]
arr[1...3] = [8, 9, 10]             // 替换区间
```

> ⚠️ 访问越界下标会**运行时崩溃**，访问前应检查 `index < arr.count` 或用 `arr.indices`。

**遍历数组**:
```swift
let fruits = ["apple", "banana", "cherry"]

// 仅元素
for fruit in fruits {
    print(fruit)
}

// 元素 + 索引
for (index, fruit) in fruits.enumerated() {
    print("\(index): \(fruit)")
}
```

**数组的合并 `+` / `+=`**（要求元素类型相同）:
```swift
let a = [1, 2] + [3, 4]   // [1,2,3,4]
var b = [1, 2]
b += [3]                  // [1,2,3]
```

#### 集合 Set

集合存储**无序、唯一**的元素，元素必须实现 `Hashable`（Swift 基础类型默认满足）。

```swift
var letters = Set<Character>()
letters.insert("a")
var favNums: Set = [1, 2, 3, 3]     // {1,2,3}，重复自动去重（顺序不定）

favNums.insert(4)
favNums.remove(2)
favNums.contains(1)

// 集合运算（这是 Set 的强项）
let odd: Set = [1, 3, 5, 7]
let prime: Set = [2, 3, 5]
odd.intersection(prime)     // 交集 {3, 5}
odd.union(prime)            // 并集 {1,2,3,5,7}
odd.subtracting(prime)      // 差集 {1, 7}
odd.symmetricDifference(prime) // 对称差集 {1,2,7}
```

#### 字典 Dictionary

```swift
// 创建
var scores: [String: Int] = ["Alice": 90, "Bob": 85]
var inferred = ["Alice": 90]        // 推断为 [String: Int]
var empty = [String: Int]()

// 访问：返回的是可选类型！因为键可能不存在
scores["Alice"]                     // Int?，值为 Optional(90)
scores["Charlie"]                   // nil
scores["Alice", default: 0]         // 90，提供默认值（非可选）

// 增删改
scores["Charlie"] = 70              // 新增
scores["Alice"] = 95                // 修改
scores.removeValue(forKey: "Bob")   // 删除，返回被删的值
scores["Bob"] = nil                 // 也可置 nil 删除

scores.count
scores.keys                         // 所有键（可迭代）
scores.values                       // 所有值
```

**遍历字典**:
```swift
for (name, score) in scores {
    print("\(name): \(score)")
}
// 字典无序，遍历顺序不保证
```

#### 集合类型对比

| 特性 | `Array` | `Set` | `Dictionary` |
| :--- | :--- | :--- | :--- |
| 有序性 | 有序 | 无序 | 无序 |
| 重复性 | 可重复 | 唯一 | 键唯一 |
| 语法 | `[Element]` | `Set<Element>` | `[Key: Value]` |
| 元素要求 | 任意 | `Hashable` | 键 `Hashable` |
| 下标访问 | 整数下标 | 无 | 键下标（返回可选） |
| 典型用途 | 有序列表 | 去重、集合运算 | 键值映射 |

> **值类型语义**: 与 JS「数组/对象是引用类型」截然不同。Swift 中 `let arr2 = arr1` 后修改 `arr2` **不会**影响 `arr1`。

### 控制流

#### if 语句

Swift 的 `if` 条件**不需要小括号**（写了也不报错），但**大括号必须**。

```swift
let score = 85

if score >= 90 {
    print("优秀")
} else if score >= 60 {
    print("及格")
} else {
    print("不及格")
}
```

#### switch 语句（强大）

Swift 的 `switch` 比 C/JS 强大得多，且**不会隐式穿透**（每个 case 默认结束，无需写 `break`）。

```swift
let grade = "A"

switch grade {
case "A":
    print("优秀")        // 无需 break，自动结束
case "B":
    print("良好")
case "C", "D":           // 多个值合并
    print("及格")
default:
    print("未知")        // 必须「穷尽」所有情况，否则编译错误
}
```

**switch 的进阶用法**:
```swift
// 1. 区间匹配
let count = 3
switch count {
case 0:
    print("none")
case 1..<5:
    print("a few")       // 3 命中这里
case 5...:
    print("many")
default: break
}

// 2. 元组匹配 + 通配符 _
let point = (2, 0)
switch point {
case (0, 0):
    print("原点")
case (_, 0):              // _ 表示匹配任意值
    print("在 x 轴上")
case (let x, let y) where x == y:   // 值绑定 + where 条件
    print("在 y = x 上")
default:
    print("其他")
}

// 3. 需要穿透时显式用 fallthrough（少见）
```

> `switch` 必须**穷尽**所有可能的情况，否则必须提供 `default`。这一点与 C/JS 的 switch（可不写 default、会穿透）差异很大。

#### guard 语句

`guard`（守卫语句）用于「**满足条件才继续往下走**」，常用于参数校验、提前返回，让主逻辑保持顶层缩进。详见可选类型章节。

```swift
func checkAge(_ age: Int) {
    guard age >= 18 else {
        print("未成年")
        return
    }
    print("成年")
}
```

#### for-in 循环

```swift
// 遍历区间
for i in 1...5 {
    print(i)            // 1 2 3 4 5
}

// 不需要索引时用 _ 忽略
let power = 2
var result = 1
for _ in 1...5 {        // 循环 5 次，不用计数变量
    result *= power
}

// 遍历数组 / 字典 / 字符串
for ch in "Swift" { print(ch) }
```

#### while 与 repeat-while

```swift
// while：先判断后执行
var n = 5
while n > 0 {
    print(n)
    n -= 1
}

// repeat-while：先执行后判断（相当于 do-while，至少执行一次）
var m = 0
repeat {
    print(m)
    m += 1
} while m < 3
```

#### 控制转移语句

- `break`: 跳出当前循环 / switch。
- `continue`: 跳过本次循环剩余部分，进入下一次。
- `fallthrough`: 在 switch 中**显式穿透**到下一个 case（少见）。
- `return`: 从函数返回。
- **带标签的语句（Labeled Statements）**: 嵌套循环时，可用标签精确控制跳出哪一层。
```swift
outerLoop: for i in 1...3 {
    for j in 1...3 {
        if j == 2 { continue outerLoop }  // 跳到外层循环下一次
        if i == 3 { break outerLoop }     // 直接跳出外层
        print("\(i), \(j)")
    }
}
```

## 函数与闭包

### 函数

#### 函数定义与调用

```swift
func 函数名(参数) -> 返回类型 {
    // 函数体
    return 返回值
}
```

```swift
func greet(name: String) -> String {
    return "Hello, \(name)!"
}

print(greet(name: "Rainn"))   // 调用时必须写参数标签 name:
```

> 注意：Swift 函数调用时**通常需要写参数标签**（如 `greet(name:)`），这与多数语言不同。这是为了提高可读性，让每个参数都有语义。

#### 🌟参数标签与参数名

每个参数有**两个名字**：
- **参数标签（Argument Label）**: 调用时使用，对外。
- **参数名（Parameter Name）**: 函数体内使用，对内。

```swift
func greet(person name: String, from hometown: String) -> String {
    // name, hometown 在函数体内使用
    return "Hello \(name)! Glad you visited from \(hometown)."
}

greet(person: "Rainn", from: "GDUFS")   // person 和 from 是参数标签
```

- **省略参数标签**: 用 `_` 作为标签，调用时无需写标签（类似 C 风格）。
```swift
func add(_ a: Int, _ b: Int) -> Int { return a + b }
add(2, 3)            // 无需标签
```
- **参数标签与参数名相同**（默认情况，只有一个名字）: `func f(name: String)`。

#### 默认参数值

```swift
func greet(name: String, greeting: String = "Hello") -> String {
    return "\(greeting), \(name)!"
}
greet(name: "Rainn")                    // "Hello, Rainn!"
greet(name: "Rainn", greeting: "Hi")    // "Hi, Rainn!"
```

#### 可变参数 Variadic Parameters

用 `类型...` 接收**零个或多个**值，在函数内以**数组**形式访问。一个函数最多一个可变参数。

```swift
func sum(_ numbers: Int...) -> Int {
    var total = 0
    for n in numbers { total += n }
    return total
}
sum(1, 2, 3, 4)   // 10
sum()             // 0
```

#### 🌟输入输出参数 inout

普通参数是**常量**（函数内不可修改，且是值拷贝）。`inout` 参数允许函数**修改外部变量**，类似 C 的「传引用」。

- 调用时必须用 `&` 取地址传入。
- `inout` 参数**不能有默认值**，也**不能是可变参数**。

```swift
func swap(_ a: inout Int, _ b: inout Int) {
    let temp = a
    a = b
    b = temp
}

var x = 10, y = 20
swap(&x, &y)
print(x, y)    // 20 10，外部变量被交换
```

#### 返回多个值（借助元组）

```swift
func minMax(_ array: [Int]) -> (min: Int, max: Int)? {
    if array.isEmpty { return nil }
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1...] {
        if value < currentMin { currentMin = value }
        if value > currentMax { currentMax = value }
    }
    return (currentMin, currentMax)
}

if let result = minMax([3, 5, 1, 9, 2]) {
    print(result.min, result.max)   // 1 9
}
```

#### 可选返回类型

函数可能返回 nil 时，标注返回类型为可选，详见上例中的 `-> (min: Int, max: Int)?`。

#### 无返回值的函数

```swift
func sayHi() -> Void { print("Hi") }   // 显式 Void
func sayHello() { print("Hello") }     // 省略，等价
```

#### 函数类型 Function Types

每个函数都有特定的**函数类型**，形如 `(参数类型) -> 返回类型`。函数类型可以像普通类型一样使用：赋值、传参、作为返回值。

```swift
func add(a: Int, b: Int) -> Int { a + b }
func multiply(a: Int, b: Int) -> Int { a * b }

// 把函数赋值给变量
var mathFunc: (Int, Int) -> Int = add
mathFunc(2, 3)              // 5（注意：赋值后调用无需标签！）
mathFunc = multiply
mathFunc(2, 3)              // 6

// 函数作为参数（高阶函数）
func apply(_ op: (Int, Int) -> Int, _ a: Int, _ b: Int) -> Int {
    op(a, b)
}
apply(add, 4, 5)            // 9

// 函数作为返回值
func choose(step: Bool) -> (Int, Int) -> Int {
    step ? add : multiply
}
```

> 这与 JS「函数是一等公民」完全一致，是函数式编程的基础。

#### 嵌套函数 Nested Functions

函数内部定义的函数，默认对外不可见，可作为返回值返回（结合闭包捕获）。

```swift
func makeIncrementer(by amount: Int) -> () -> Int {
    var total = 0
    func increment() -> Int {
        total += amount
        return total
    }
    return increment        // 返回内部函数（闭包）
}

let inc = makeIncrementer(by: 5)
inc()   // 5
inc()   // 10
```

### 闭包 Closure

闭包是**自包含的、可被传递的功能代码块**。本质和 JS 的匿名函数 / 箭头函数一致：能「捕获并存储」其上下文中的常量和变量。

Swift 闭包有三种形式：
1. **全局函数**: 有名字、不捕获值的闭包。
2. **嵌套函数**: 有名字、能捕获外层函数值的闭包。
3. **闭包表达式**: 没名字、能捕获上下文值的简短写法（类似 JS 箭头函数）。

#### 闭包表达式语法

```swift
{ (参数列表) -> 返回类型 in
    函数体
}
```

以 `sorted` 为例，它的参数是一个**比较闭包** `(String, String) -> Bool`。

```swift
let names = ["Chris", "Alex", "Ewa", "Barry"]

// 完整写法
let reversed1 = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})
```

#### 🌟闭包的简化（逐步推导）

Swift 提供多种简化手段，是它的一大特色。理解简化过程很重要：

```swift
// 0. 完整写法
names.sorted(by: { (s1: String, s2: String) -> Bool in return s1 > s2 })

// 1. 类型可由上下文推断，省略类型与返回箭头
names.sorted(by: { s1, s2 in return s1 > s2 })

// 2. 单表达式闭包可隐式返回，省略 return
names.sorted(by: { s1, s2 in s1 > s2 })

// 3. 用简写参数名 $0, $1 ... 省略参数声明与 in
names.sorted(by: { $0 > $1 })

// 4. 运算符函数：> 本身就是 (String,String)->Bool，直接传入
names.sorted(by: >)
```

#### 尾随闭包 Trailing Closure

当闭包是函数**最后一个参数**时，可把闭包写在函数括号**之后**，增强可读性（尤其闭包较长时）。

```swift
// 普通写法
names.sorted(by: { $0 > $1 })

// 尾随闭包
names.sorted() { $0 > $1 }

// 若闭包是唯一参数，可省略括号
names.sorted { $0 > $1 }
```

> 尾随闭包在 SwiftUI、集合高阶函数（`map`/`filter`/`reduce`）中被大量使用，是 Swift 的标志性风格。

#### 高阶函数实战（类比 JS 的 map/filter/forEach）

```swift
let nums = [1, 2, 3, 4, 5]

// map：每个元素变换，返回新数组
let doubled = nums.map { $0 * 2 }              // [2,4,6,8,10]

// compactMap：map + 过滤掉 nil（很常用）
let strings = ["1", "2", "abc", "3"]
let ints = strings.compactMap { Int($0) }      // [1,2,3]

// filter：过滤
let evens = nums.filter { $0 % 2 == 0 }        // [2,4]

// reduce：累计（注意初始值 0）
let sum = nums.reduce(0) { $0 + $1 }           // 15
let sumShort = nums.reduce(0, +)               // 15，运算符简写

// forEach：遍历（无返回值）
nums.forEach { print($0) }

// flatMap：扁平化嵌套
let nested = [[1, 2], [3, 4], [5]]
let flat = nested.flatMap { $0 }               // [1,2,3,4,5]
```

#### 值捕获 Capturing Values

闭包会**捕获**它引用的外层变量，即使外层作用域已经销毁，闭包仍能访问并修改（捕获的是引用，`var` 才可修改）。

```swift
func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1
        return count
    }
}

let counter = makeCounter()
counter()   // 1
counter()   // 2
counter()   // 3 —— count 被闭包捕获并持久保存
```

> 这与 JS 闭包机制一致：内层函数引用了外层变量，使其不被回收。

#### 逃逸闭包 `@escaping`

默认闭包是**非逃逸（noescape）**的——闭包在函数返回前就执行完毕。若闭包被**异步存储、稍后执行**（如网络请求回调、定时器），则需要标记 `@escaping`。

```swift
var completions: [() -> Void] = []

func register(completion: @escaping () -> Void) {
    completions.append(completion)   // 闭包「逃逸」出函数，被存储
}
```

> 逃逸闭包内若引用 `self`（在类中），需要显式写 `self.`，且要注意循环引用（见内存管理章节）。

#### 自动闭包 `@autoclosure`

把一个**表达式**自动包装成无参闭包，实现「**延迟求值**」。常见于 `assert`、`??` 等的实现，日常较少手写。

```swift
func logIfTrue(_ condition: @autoclosure () -> Bool) {
    if condition() { print("true") }   // 表达式被延迟到这里才求值
}
logIfTrue(2 > 1)    // 传入的是表达式 2>1，自动包装为闭包
```

## 枚举与结构体和类

### 枚举 enum

Swift 的枚举比 C/Java 强大很多：它不只是「一组整型常量」，还能携带**关联值**、**原始值**，并能定义**计算属性和方法**。枚举是**值类型**，并且是一等公民。

#### 基础枚举

```swift
enum CompassPoint {
    case north
    case south
    case east
    case west
}
// 也可一行写多个 case
enum Planet {
    case mercury, venus, earth, mars
}

var dir = CompassPoint.north
dir = .east                // 类型已知时可省略枚举名
```

**用 switch 匹配枚举**（必须穷尽）:
```swift
switch dir {
case .north: print("向北")
case .south: print("向南")
case .east, .west: print("东西")
}
```

#### 🌟关联值 Associated Values

枚举 case 可以**携带自定义的关联值**，每个 case 可携带不同类型的值。这是枚举最强大的特性。

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)      // 数字元组
    case qrCode(String)               // 字符串
}

var productBarcode = Barcode.upc(8, 85909, 51226, 3)
productBarcode = .qrCode("ABCDEFG")

// 用 switch 提取关联值
switch productBarcode {
case .upc(let a, let b, let c, let d):
    print("UPC: \(a)-\(b)-\(c)-\(d)")
case .qrCode(let code):
    print("QR: \(code)")
}

// 若全部提取为常量，简写
case .upc(let numberSystem, let manufacturer, let product, let check)
```

> 关联值让枚举可以充当「带数据的标签联合」，非常适合建模状态、网络响应、树结构等。

#### 原始值 Raw Values

枚举 case 可预先填充**相同类型**的默认值。原始值在同一枚举内**唯一**。

```swift
enum ASCIIControlCharacter: Character {
    case tab = "\t"
    case lineFeed = "\n"
    case carriageReturn = "\r"
}

// Int / String 原始值可「隐式赋值」
enum Planet: Int {
    case mercury = 1, venus, earth, mars   // 自动 1,2,3,4
}
Planet.earth.rawValue       // 3

enum CompassPoint: String {
    case north, south, east, west          // 自动 "north","south"...
}
CompassPoint.south.rawValue // "south"
```

**用原始值初始化枚举**（返回可选，因为原始值可能不匹配）:
```swift
let possiblePlanet = Planet(rawValue: 3)   // Optional(Planet.earth)
let invalid = Planet(rawValue: 99)         // nil
```

#### 递归枚举 `indirect`

枚举 case 关联了**自身的枚举类型**时，需用 `indirect` 关键字（提示编译器加一层间接），常用于构建树 / 链表。

```swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}

let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)       // 5 + 4

// 用递归函数求值
func evaluate(_ expr: ArithmeticExpression) -> Int {
    switch expr {
    case .number(let value):
        return value
    case .addition(let left, let right):
        return evaluate(left) + evaluate(right)
    case .multiplication(let left, let right):
        return evaluate(left) * evaluate(right)
    }
}
evaluate(sum)   // 9
```

#### 枚举的方法

枚举也可以定义实例方法、计算属性。

```swift
enum TrafficLight {
    case red, yellow, green
    var description: String {           // 计算属性
        switch self {
        case .red: return "停"
        case .yellow: return "等"
        case .green: return "行"
        }
    }
    func next() -> TrafficLight {
        switch self {
        case .red: return .green
        case .yellow: return .red
        case .green: return .yellow
        }
    }
}
TrafficLight.red.description   // "停"
```

#### 关联值 vs 原始值 对比

| 特性 | 关联值 Associated | 原始值 Raw |
| :--- | :--- | :--- |
| 是否固定 | 创建时才确定 | 定义时就固定 |
| 类型 | 每个 case 可不同 | 整个枚举统一 |
| 唯一性 | 无要求 | 必须唯一 |
| 典型用途 | 携带运行时数据 | 标识符 / 可持久化 |

### 结构体与类

Swift 用 `struct`（结构体）和 `class`（类）来构建自定义类型。**结构体是值类型，类是引用类型**，这是两者最根本的区别。

> **Apple 的建议**：优先使用结构体（`struct`），只在确实需要引用语义（共享可变状态、继承、Objective-C 互操作）时才用类。Swift 标准库大量类型（`String`、`Array`、`Dictionary`）都是结构体。

#### 结构体 struct

```swift
struct Resolution {
    var width = 0
    var height = 0
}

let someResolution = Resolution()              // 用默认值，width=0, height=0
let vga = Resolution(width: 640, height: 480)  // 用「成员构造器」初始化
```

> 结构体**自动获得一个「成员逐一构造器」**（memberwise initializer），可按属性名赋值；而类没有这种自动构造器，必须自己写 `init`。

#### 类 class

```swift
class VideoMode {
    var resolution = Resolution()
    var interlaced = false
    var name: String?                          // 可选属性默认为 nil
    func describe() {
        print("Name: \(name ?? "Unknown")")
    }
}

let video = VideoMode()                        // 类只能用无参构造器（若无自定义 init）
video.name = "1080p"
```

#### 🌟值类型 vs 引用类型

- **结构体（值类型）**: 赋值 / 传参时**拷贝**，修改副本**不影响**原件。类似 JS 中数字、字符串的拷贝语义，但 Swift 的整个 `struct`（包括它持有的数据）都会拷贝。
- **类（引用类型）**: 赋值 / 传参时**拷贝引用**（地址），多个变量指向**同一对象**，修改会影响所有引用者。类似 JS 中对象、数组的引用语义。

```swift
// 结构体：值类型
var hd = Resolution(width: 1920, height: 1080)
var cinema = hd
cinema.width = 2048
print(hd.width)       // 1920 —— hd 不受影响

// 类：引用类型
let tenEighty = VideoMode()
tenEighty.name = "Ten"
let alsoTenEighty = tenEighty
alsoTenEighty.name = "Changed"
print(tenEighty.name) // "Changed" —— 同一对象，被影响
```

**恒等运算符**（仅引用类型可用）:
```swift
tenEighty === alsoTenEighty   // true，是同一实例
tenEighty !== VideoMode()     // true，不是同一实例
```

#### 何时选择 struct / class

| 维度 | `struct`（值类型） | `class`（引用类型） |
| :--- | :--- | :--- |
| 复制语义 | 拷贝 | 共享引用 |
| 继承 | ❌ 不支持 | ✅ 支持 |
| 自动构造器 | 成员逐一构造器 | 需手动写 init |
| 引用计数 | 无（拷贝） | 有（ARC 管理） |
| 适用场景 | 数据模型、无需共享状态 | 需要共享、继承、身份 |
| 默认推荐 | ✅ **优先** | 仅在需要时 |

### 属性

属性分为**存储属性**（struct / class 都有）和**计算属性**（class / struct / enum 都有）。

#### 存储属性 Stored Properties

```swift
struct FixedLengthRange {
    var firstValue: Int
    let length: Int          // 常量存储属性，创建后不可改
}
var range = FixedLengthRange(firstValue: 0, length: 3)
range.firstValue = 6         // OK
// range.length = 4          // ❌ 常量属性不可改
```

> 注意：若把结构体实例声明为常量 `let`，则**即使是 `var` 属性也不能修改**（因为常量结构体整体不可变）。

#### 延迟存储属性 `lazy`

第一次被访问时才初始化，必须用 `var`。常用于初始化开销大、或依赖实例其他属性的属性。

```swift
class DataImporter {
    var filename = "data.txt"
    init() { print("导入器初始化（耗时）") }
}
class DataManager {
    lazy var importer = DataImporter()   // 访问时才创建
    var data = [String]()
}
let manager = DataManager()  // 此时不会创建 importer
manager.data.append("some")  // 仍未创建
print(manager.importer.filename)  // 此刻才打印"导入器初始化"
```

#### 计算属性 Computed Properties

不直接存储值，而是用 `get` / `set` 计算。必须用 `var`。

```swift
struct Point {
    var x = 0, y = 0
}
struct Size {
    var width = 0, height = 0
}
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {                  // 计算属性
        get {
            let centerX = origin.x + size.width / 2
            let centerY = origin.y + size.height / 2
            return Point(x: centerX, y: centerY)
        }
        set(newCenter) {
            origin.x = newCenter.x - size.width / 2
            origin.y = newCenter.y - size.height / 2
        }
    }
}
// set 若不写新值名，默认名为 newValue，可省略 set(center)
```

**只读计算属性**（省略 get）:
```swift
struct Cube {
    var side = 0.0
    var volume: Double { side * side * side }   // 只有一个表达式，省略 get 与 return
}
```

#### 🌟属性观察者 Property Observers

`willSet`（即将改变前）和 `didSet`（改变后），用于响应属性变化。类似 JS 中没有、但 Vue 等框架里的「响应式」概念。

```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet(newTotal) {
            print("即将变为 \(newTotal)，当前 \(totalSteps)")
        }
        didSet {
            if totalSteps > oldValue {       // oldValue 是旧值
                print("增加了 \(totalSteps - oldValue) 步")
            }
        }
    }
}
let counter = StepCounter()
counter.totalSteps = 200
// 即将变为 200，当前 0
// 增加了 200 步
counter.totalSteps = 360
```

> 父类的属性观察者也会被子类继承并在赋值时触发。

#### 类型属性 `static`

属于**类型本身**而非实例的属性。用 `static`（不可被子类覆盖）或 `class`（类中，可被子类覆盖）。

```swift
struct SomeStructure {
    static var storedTypeProperty = "Some value"
    static var computedTypeProperty: Int { 100 }
}
SomeStructure.storedTypeProperty          // 通过类型名访问
```

> 这对应 JS / Java 中的「静态成员」`Math.PI`、`Stu.school`。

### 方法

方法是「属于类型」的函数，分**实例方法**和**类型方法**。

#### 实例方法

```swift
class Counter {
    var count = 0
    func increment() { count += 1 }
    func increment(by amount: Int) { count += amount }
    func reset() { count = 0 }
}
```

#### 🌟mutating 方法（值类型专属）

结构体和枚举是**值类型**，默认其方法**不能修改自身的属性**。若要修改，需用 `mutating` 关键字声明该方法。

```swift
struct Point {
    var x = 0, y = 0
    mutating func moveBy(dx: Int, dy: Int) {   // 必须 mutating
        x += dx
        y += dy
    }
}
var p = Point(x: 1, y: 1)
p.moveBy(dx: 2, dy: 3)     // p.x = 3, p.y = 4
// let 声明的结构体实例不能调用 mutating 方法（因为整体不可变）
```

> 类的方法不需要 `mutating`，因为类是引用类型。

#### 类型方法 `static` / `class`

```swift
struct LevelTracker {
    static var highestUnlocked = 1
    static func unlock(_ level: Int) {
        if level > highestUnlocked { highestUnlocked = level }
    }
}
LevelTracker.unlock(5)
```

### 下标 subscript

下标让你能用 `[index]` 语法访问类型的元素，类似数组 `arr[i]`、字典 `dict[key]`。可以自定义。

```swift
struct TimesTable {
    let multiplier: Int
    subscript(index: Int) -> Int {
        multiplier * index
    }
}
let threeTimes = TimesTable(multiplier: 3)
print(threeTimes[6])   // 18
```

### 继承（仅限类）

只有**类**支持继承。子类用 `:` 继承父类，用 `override` 重写父类方法 / 属性 / 下标。

```swift
class Vehicle {
    var currentSpeed = 0.0
    var description: String { "速度为 \(currentSpeed) km/h" }
    func makeNoise() {
        print("噪音")
    }
}

class Bicycle: Vehicle {
    var hasBasket = false
}

class Train: Vehicle {
    override func makeNoise() {            // 重写需 override
        print("Choo Choo")
    }
    override var description: String {     // 重写计算属性
        super.description + "，且会鸣笛"
    }
}

let train = Train()
train.makeNoise()        // Choo Choo
```

- `final` 关键字：防止被重写（`final func`、`final class`、`final var`）。
- 重写属性时，可把存储属性「升级」为带观察者的属性，但反之不行。

### 初始化 init

初始化是为类 / 结构体 / 枚举实例**准备初始状态**的过程，调用 `init()` 方法。

#### 默认构造器

```swift
struct Size {
    var width = 0.0, height = 0.0
    // 自动获得成员逐一构造器 init(width:height:)
}
class ShoppingListItem {
    var name: String?          // 默认 nil
    var quantity = 1
    var purchased = false
    // 自动获得无参构造器 init()
}
```

#### 自定义构造器

```swift
struct Celsius {
    var temperature: Double
    init(fromFahrenheit fahrenheit: Double) {
        temperature = (fahrenheit - 32) / 1.8
    }
    init(fromKelvin kelvin: Double) {
        temperature = kelvin - 273.15
    }
}
let boiling = Celsius(fromFahrenheit: 212)   // 100.0
```

#### 指定构造器与便利构造器（类专属）

类的构造器分两类，这是 Swift 类初始化的核心规则：
- **指定构造器 Designated**: 「主要」构造器，必须确保所有属性初始化，并调用**父类**的指定构造器（沿继承链向上）。
- **便利构造器 Convenience**: 「辅助」构造器，必须调用**同类**的另一个构造器，最终归结到某个指定构造器。

```swift
class Food {
    var name: String
    init(name: String) {                     // 指定构造器
        self.name = name
    }
    convenience init() {                     // 便利构造器
        self.init(name: "[Unnamed]")
    }
}

class RecipeIngredient: Food {
    var quantity: Int
    init(name: String, quantity: Int) {      // 子类指定构造器
        self.quantity = quantity
        super.init(name: name)               // 向上调用父类指定构造器
    }
    override convenience init(name: String) {// 子类便利构造器
        self.init(name: name, quantity: 1)
    }
}
```

**构造器代理规则（「向上代理、横向代理」）**:
- 指定构造器必须向上调用父类指定构造器。
- 便利构造器必须横向调用（本类的）其他构造器。

#### 可失败构造器 `init?`

构造失败时返回 nil。

```swift
struct Animal {
    let species: String
    init?(species: String) {
        if species.isEmpty { return nil }
        self.species = species
    }
}
let a = Animal(species: "Giraffe")   // Optional(Animal)
let b = Animal(species: "")          // nil
```

#### 必需构造器 `required`

子类必须实现的构造器。

### 反初始化 deinit（仅限类）

类的实例**被销毁前**会自动调用 `deinit`，用于释放资源（关闭文件、移除通知、取消网络请求等）。结构体没有。

```swift
class Bank {
    static var coinsInBank = 10_000
    static func distribute(coins: Int) -> Int { /* ... */ }
}
class Player {
    var coinsInPurse: Int
    init(coins: Int) {
        coinsInPurse = Bank.distribute(coins: coins)
    }
    deinit {                                  // 实例销毁前调用
        Bank.coinsInBank += coinsInPurse      // 把金币还给银行
    }
}
```

## 协议、扩展与错误处理

### 协议 Protocol

协议定义了一份**方法、属性、下标的蓝图**，任何类型（类、结构体、枚举）都可以**遵循（adopt）**它来提供具体实现。可以类比为 Java / C# 的接口（interface）、JS 中「鸭子类型」的契约。

> 协议是 Swift「**面向协议编程（POP）**」的核心，地位相当于 Objective-C 的「协议」+ Java 的「接口」。

#### 定义与遵循

```swift
protocol Named {
    var name: String { get }            // 可读属性（get 表示至少可读）
}
protocol Aged {
    var age: Int { get set }           // 可读可写属性
}

struct Person: Named, Aged {           // 可同时遵循多个协议
    var name: String
    var age: Int
}
```

- 属性要求用 `{ get }`（必须可读，可读可写也满足）或 `{ get set }`（必须可读可写）。
- 方法要求只写声明，不写大括号体（`func sing()`）。
- 变长参数、默认值不允许出现在协议中。

#### 协议中的方法与 mutating

```swift
protocol Togglable {
    mutating func toggle()             // 值类型实现时需要 mutating
}
enum OnOffSwitch: Togglable {
    case off, on
    mutating func toggle() {
        switch self {
        case .off: self = .on
        case .on: self = .off
        }
    }
}
```

#### 协议作为类型

协议本身**不能实例化**，但可作为变量、参数、返回值的类型（多态）。

```swift
let birthdayPerson: Named = Person(name: "Rainn", age: 21)
let attendees: [Named] = [ ... ]       // 协议类型的数组
func wishHappyBirthday(to celebrator: Named) { ... }
```

#### 协议继承

协议可以继承一个或多个其他协议，组合出更具体的契约。

```swift
protocol NamedAged: Named, Aged {      // 继承两个协议
    // 可再添加新的要求
}
```

#### 协议与类的强约束

```swift
// 限制：遵循者必须是引用类型（class）
protocol SomeProtocol: AnyObject { }

// 限制：必须是某个类的子类且遵循协议（先写父类，再写协议）
class SuperClass { }
class SubClass: SuperClass, SomeProtocol, Named { }
```

#### 协议合成 Protocol Composition

需要「同时遵循多个协议」的类型，用 `&` 组合（旧写法 `protocol<Named, Aged>`）。

```swift
func celebrate(to person: Named & Aged) {
    print("\(person.name) 庆祝 \(person.age) 岁")
}
```

#### 协议可选要求 `@objc optional`

只有 `@objc` 协议才能有可选方法（与 Objective-C 互操作时常见），日常纯 Swift 协议应尽量「全部必需」。

### 扩展 Extension

扩展为**已有的类型**（包括系统类型！）添加新功能：方法、计算属性、构造器、下标、嵌套类型、协议遵循。但不能**覆盖**已有功能，也不能添加**存储属性**。

> 这相当于 JS 中「给原型添加方法」`Array.prototype.sum = ...`，但 Swift 的扩展是**类型安全**的，且作用于值类型时也无副作用。

#### 添加方法与计算属性

```swift
extension Int {
    func repeatTask(_ times: Int, _ task: () -> Void) {
        for _ in 0..<times { task() }
    }
    var squared: Int { self * self }       // 计算属性
}
3.repeatTask(2) { print("Hi") }            // 打印两次 Hi
5.squared                                   // 25
```

#### 为类型添加协议遵循

```swift
struct Dice { var value: Int }
extension Dice: CustomStringConvertible {   // 通过扩展遵循协议
    var description: String { "骰子点数 \(value)" }
}
print(Dice(value: 6).description)
```

#### 给系统类型扩展

```swift
extension Array where Element == Int {
    func sum() -> Int { reduce(0, +) }     // 给 Int 数组加 sum
}
[1, 2, 3].sum()   // 6
```

### 类型转换 Type Casting

针对**类层级**的类型检查与转换。

- `is`: 类型检查，返回 Bool。
- `as?`: 条件向上 / 向下转换，返回可选（失败为 nil）。
- `as!`: 强制向下转换，失败则崩溃。
- `as`: 向上转换（子→父）或与无副作用类型互转，必定成功。

```swift
class MediaItem { var name: String; init(name: String){self.name = name} }
class Movie: MediaItem { var director: String; init(name: String, director: String){super.init(name:name); self.director = director} }
class Song: MediaItem { var artist: String; init(name: String, artist: String){super.init(name:name); self.artist = artist} }

let library: [MediaItem] = [
    Movie(name: "Casablanca", director: "Michael"),
    Song(name: "Blue Suede", artist: "Elvis")
]

for item in library {
    if let movie = item as? Movie {            // 条件向下转换
        print("电影：\(movie.director)")
    } else if let song = item as? Song {
        print("歌曲：\(song.artist)")
    }
}

item is Movie     // 类型检查
```

#### Any 与 AnyObject

- `Any`: 可表示**任何类型**的实例（包括函数类型）。
- `AnyObject`: 可表示**任何类类型**的实例。
- 尽量避免滥用，会丢失类型安全。

### 🌟错误处理 Error Handling

Swift 用 `Error` 协议 + `throw` / `do-catch` / `try` 来处理错误，比返回错误码更安全，比异常机制更可控。

#### 定义错误

让枚举遵循 `Error` 协议，是定义错误最自然的方式。

```swift
enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)   // 可带关联值
    case outOfStock
}
```

#### 抛出与传递错误

用 `throw` 抛出错误；用 `throws` 标记「可能抛错」的函数。`throws` 函数内部抛出的错误会**向上传递**给调用者。

```swift
struct Item { var price: Int; var count: Int }
class VendingMachine {
    var inventory = ["Candy": Item(price: 12, count: 7)]
    var coinsDeposited = 0

    func vend(itemNamed name: String) throws {       // throws 标记
        guard let item = inventory[name] else {
            throw VendingMachineError.invalidSelection
        }
        guard item.count > 0 else {
            throw VendingMachineError.outOfStock
        }
        guard coinsDeposited >= item.price else {
            throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }
        coinsDeposited -= item.price
        inventory[name]?.count -= 1
        print("Dispensing \(name)")
    }
}
```

#### 🌟处理错误：do-catch / try? / try!

```swift
let machine = VendingMachine()
machine.coinsDeposited = 5

// 方式一：do-catch 捕获
do {
    try machine.vend(itemNamed: "Candy")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) {
    print("余额不足，还需 \(coinsNeeded) 枚硬币")
} catch {                       // 捕获其他所有错误
    print("其他错误：\(error)")
}

// 方式二：try? 把结果转为可选（出错则 nil）
let result = try? machine.vend(itemNamed: "Candy")  // 失败为 nil

// 方式三：try! 断言不会出错，出错则崩溃（慎用）
// try! machine.vend(itemNamed: "Candy")
```

#### defer：保证收尾

`defer` 块的代码**无论是否出错、如何退出**（return / throw / break），都会在作用域结束时执行。常用于关闭文件、释放锁、恢复状态。多个 `defer` 按**逆序**执行（后注册的先执行）。

```swift
func processFile(filename: String) throws {
    let file = open(filename)
    defer { close(file) }            // 保证关闭，即使下面抛错

    // ... 使用 file ...
    // 函数结束时（正常返回或抛错）都会执行 close(file)
}
```

### 泛型 Generics

泛型让你写出**可复用、类型安全**的代码——一份代码适用于多种类型，且由编译器保证类型正确。相当于 TS 的 `<T>`、Java 的泛型。

#### 泛型函数

```swift
// T 是「类型占位符」，编译期会被替换为具体类型
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}

var s1 = "Hello", s2 = "World"
swapTwoValues(&s1, &s2)            // 字符串也可交换

var n1 = 10, n2 = 20
swapTwoValues(&n1, &n2)            // 整数也可交换
```

#### 泛型类型

```swift
struct Stack<Element> {
    var items = [Element]()
    mutating func push(_ item: Element) { items.append(item) }
    mutating func pop() -> Element { items.removeLast() }
}

var intStack = Stack<Int>()
intStack.push(1); intStack.push(2)
intStack.pop()   // 2

var stringStack = Stack<String>()
stringStack.push("Hi")
```

#### 类型约束

限制泛型必须满足某些条件（遵循某协议 / 是某类子类）。

```swift
// 要求 T 必须遵循 Equatable 协议（才能用 == 比较）
func findIndex<T: Equatable>(of valueToFind: T, in array: [T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind { return index }
    }
    return nil
}
findIndex(of: "b", in: ["a", "b", "c"])   // 1
```

#### 协议中的关联类型 associatedtype

协议用 `associatedtype` 声明一个「占位类型」，由遵循者具体指定。

```swift
protocol Container {
    associatedtype Item                         // 关联类型
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

// 遵循时，Item 被推断为 Int
struct IntStack: Container {
    var items = [Int]()
    mutating func append(_ item: Int) { items.append(item) }
    var count: Int { items.count }
    subscript(i: Int) -> Int { items[i] }
    // typealias Item = Int  // 可显式指定，也可省略由推断得出
}
```

#### 扩展泛型类型

```swift
extension Stack {
    var topItem: Element? { items.last }   // Element 自动可用
}
```

## 内存管理与高级特性

### 🌟自动引用计数 ARC

Swift 用 **ARC（Automatic Reference Counting）** 管理**类的实例**的内存：当实例的引用计数降为 0 时，立即释放。

- ARC 只对**引用类型（类）**生效；**值类型（结构体、枚举）**通过拷贝管理，不涉及引用计数。
- 大多数情况 ARC 自动工作，无需手动管理；唯独**强引用循环**需要开发者用 `weak` / `unowned` 主动打破。

#### 工作原理

当你创建一个类实例，ARC 分配内存并让引用计数 +1；每多一个强引用，计数 +1；强引用被移除（变量出作用域、置 nil），计数 -1；归零即销毁并调用 `deinit`。

#### 强引用循环 Strong Reference Cycle

两个类的实例互相**强引用**对方，导致双方引用计数永远 ≥1，即使外部已经没有引用，也无法释放——这就是**内存泄漏**。

```swift
class Person {
    let name: String
    init(name: String) { self.name = name; print("\(name) 初始化") }
    deinit { print("\(name) 被销毁") }
    var apartment: Apartment?           // ⚠️ 潜在循环
}
class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    deinit { print("Apartment \(unit) 被销毁") }
    var tenant: Person?                 // ⚠️ 潜在循环
}

var rainn: Person? = Person(name: "Rainn")   // Person 引用计数 1
var unit4A: Apartment? = Apartment(unit: "4A")
rainn!.apartment = unit4A     // Apartment 引用计数 2
unit4A!.tenant = rainn        // Person 引用计数 2

rainn = nil                   // Person 引用计数 → 1（仍被 unit4A.tenant 引用）
unit4A = nil                  // Apartment 引用计数 → 1（仍被 rainn.apartment 引用）
// 两个实例的 deinit 都不会触发 → 内存泄漏！
```

#### 解决方案：weak 与 unowned

- **`weak`（弱引用）**: 指向引用类型，**不增加**引用计数；**必须是可选类型**（因为对象可能先销毁，引用会自动置 nil）。适合「生命周期不确定、可能为 nil」的关系（如上面的 `tenant`）。
- **`unowned`（无主引用）**: 不增加引用计数，且**假定对象一定存活**（非可选）；若访问已销毁的对象会崩溃。适合「一方生命周期 ≥ 另一方」的关系（如闭包与宿主）。

打破上面的循环：
```swift
class Apartment {
    weak var tenant: Person?         // 改为 weak，打破循环
    // ...
}
// 现在 rainn = nil 时 Person 引用计数归 0，正常销毁，进而 Apartment 也能销毁
```

#### 闭包引起的循环引用

闭包捕获 `self` 时也会形成强引用循环。解决：用**捕获列表** `[weak self]` 或 `[unowned self]`。

```swift
class HTMLElement {
    let name: String
    lazy var asHTML: () -> String = {           // 闭包强引用 self → 循环
        return "<\(self.name)>"
    }
    init(name: String) { self.name = name }
    deinit { print("\(name) 被销毁") }
}

// 改进：用捕获列表 [weak self] / [unowned self]
lazy var asHTML: () -> String = { [unowned self] in
    return "<\(self.name)>"
}
```

#### weak vs unowned 对比

| 特性 | `weak` | `unowned` |
| :--- | :--- | :--- |
| 引用计数 | 不增加 | 不增加 |
| 是否可选 | **必须**可选 | **必须**非可选 |
| 对象销毁后 | 自动置 nil | 仍是悬挂指针（访问会崩溃） |
| 适用场景 | 关系可断开、生命周期独立 | 一方总能比另一方活得久 |
| 闭包内捕获 | `[weak self]` 配合 `guard let` | `[unowned self]` |

> 实践口诀：**不确定谁先死，用 `weak`；确定对方一定在，用 `unowned`**。

### 访问控制

Swift 提供 5 个访问级别，控制代码的可见范围：

| 级别 | 关键字 | 范围 | 说明 |
| :--- | :--- | :--- | :--- |
| 开放 | `open` | 模块内 + 模块外可继承/重写 | 仅类、类成员可用，最高权限 |
| 公开 | `public` | 模块内 + 模块外可访问（不可继承） | 框架对外 API |
| 内部 | `internal` | **模块内**（默认） | App / 模块内部通用 |
| 文件私有 | `fileprivate` | 同一源文件 | 限制在单个 .swift 文件 |
| 私有 | `private` | 同一类型作用域（含扩展） | 最严格 |

> **默认是 `internal`**。`open` 与 `public` 的区别在于是否允许**跨模块继承 / 重写**。

```swift
public class MyClass {
    public var publicProp = 0
    internal var internalProp = 0      // 默认
    private var privateProp = 0
    fileprivate func helper() { }      // 仅本文件可见
}
```

### 可选链 Optional Chaining（深入）

可选链允许多层调用，任意一层为 nil 整条链安全返回 nil。**返回值总是多一层可选**。

```swift
class Person {
    var residence: Residence?
}
class Residence {
    var rooms = [Room]()
    var numberOfRooms: Int { rooms.count }
    subscript(i: Int) -> Room { rooms[i] }
}
class Room { var name: String; init(name: String){self.name = name} }

let john = Person()
let roomCount = john.residence?.numberOfRooms      // Int?（residence 为 nil → 结果 nil）

if john.residence?.numberOfRooms > 0 { }           // 可选链可与比较结合

// 链式下标 / 方法也支持
john.residence?[0].name          // 下标也用可选链 ?
john.residence?.rooms.append(Room(name: "Living")) // 多层调用
```

**可选链 vs 强制解包对比**:
```swift
john.residence?.numberOfRooms    // 链断开返回 nil，安全
john.residence!.numberOfRooms    // residence 为 nil 会崩溃
```

### 不透明类型 `some` 与存在类型 `any`

Swift 5.1+ 引入不透明类型，Swift 5.7+ 规范了存在类型语法。

#### 不透明类型 `some`

`some` 让你**隐藏具体类型**，只告诉调用者「会返回**某个**遵循某协议的类型」（且同一函数内返回的具体类型必须固定）。常用于 SwiftUI 视图 `some View`。

```swift
// 调用方知道返回的是某个 Shape，但不知具体是 Triangle 还是 Square
func makeTriangle() -> some Shape {
    return Triangle()
}
```

#### 存在类型 `any`

`any Protocol` 表示「**任意**遵循该协议的类型」（异构集合、运行时多态）。Swift 5.7+ 要求显式写 `any`。

```swift
let shapes: [any Shape] = [Triangle(), Square()]   // 异构数组，运行时多态
```

> 简记：`some` = 一个具体但隐藏的类型（编译期确定）；`any` = 可能多种类型（运行期动态）。

### Result 类型

`Result<Success, Failure>` 是标准库提供的枚举，把「成功值」和「错误」打包成一个值返回，常用于异步回调。`Failure` 必须遵循 `Error`。

```swift
enum NetworkError: Error { case badURL, timeout }

func fetch(_ url: String, completion: @escaping (Result<String, NetworkError>) -> Void) {
    if url.isEmpty {
        completion(.failure(.badURL))
    } else {
        completion(.success("来自 \(url) 的数据"))
    }
}

fetch("https://example.com") { result in
    switch result {
    case .success(let data): print(data)
    case .failure(let err): print("失败：\(err)")
    }
}
```

### 字符串与集合补充技巧

#### 字符串与字符数组互转

```swift
let str = "Swift"
let chars = Array(str)            // [Character] → ['S','w',...]
let joined = String(chars)        // "Swift"
```

#### 集合的常用高阶与判等

```swift
[1,2,3] == [1,2,3]                // true，数组可值比较（需元素 Equatable）
[1,2,3,3,2,1].contains(2)         // true
let unique = Array(Set([1,1,2,2,3]))  // 去重（顺序丢失）
```

### 🌟实战技巧汇总

#### 安全解包的多种姿势

```swift
let optionalName: String? = "Rainn"

// 1. if let
if let name = optionalName { print(name) }

// 2. guard let（提前退出，推荐用于函数）
guard let name = optionalName else { return }

// 3. ?? 提供默认值
let name = optionalName ?? "匿名"

// 4. 可选链
optionalName?.count

// 5. map / flatMap 对可选变换
optionalName.map { $0.uppercased() }   // Optional("RAINN")
```

#### 函数式风格处理数据（综合）

```swift
struct Student { let name: String; let score: Int }

let students = [
    Student(name: "Rainn", score: 88),
    Student(name: "Charlotte", score: 95),
    Student(name: "Stelle", score: 60)
]

// 链式：过滤及格 → 取姓名 → 排序
let passedNames = students
    .filter { $0.score >= 60 }
    .map { $0.name }
    .sorted()
// ["Charlotte", "Rainn", "Stelle"]

// 求平均分
let avg = students.map(\.score).reduce(0, +) / students.count   // 用 keypath \.score
```

> Swift 支持 **KeyPath** `\属性名`，让 `map { $0.属性 }` 简写为 `map(\.属性)`。

#### 用枚举建模网络状态（结合关联值）

```swift
enum LoadState {
    case loading
    case success(String)
    case failure(Error)
}

func render(_ state: LoadState) {
    switch state {
    case .loading:              showSpinner()
    case .success(let data):    showContent(data)
    case .failure(let error):   showError(error)
    }
}
```

> 这种「用枚举 + 关联值表达状态」的模式，是 Swift 中替代「多重布尔标志位」的推荐做法，可读性与安全性都更好。

---

## 附：Swift 与 JavaScript 学习要点对照

| 概念 | JavaScript | Swift | 备注 |
| :--- | :--- | :--- | :--- |
| 变量声明 | `let` / `var` | `let` / `var` | 语义一致，Swift **let 优先** |
| 类型系统 | 动态弱类型 | 静态强类型 + 类型推断 | Swift 不做隐式转换 |
| 空值 | `null` / `undefined` | `nil`（仅可选类型） | Swift 用 Optional 强制处理 |
| 字符串插值 | `` `${x}` `` | `\(x)` | |
| 数组遍历高阶 | `map/filter/reduce/forEach` | `map/filter/reduce/forEach` | 几乎一致 |
| 函数一等公民 | ✅ | ✅ | 闭包 / 箭头函数 ↔ 闭包表达式 |
| 面向对象 | 基于原型 | `class` + `struct` + `protocol` | Swift 值类型优先 |
| 继承机制 | 原型链 | 单继承（仅 class） | Swift 协议弥补多继承 |
| 静态成员 | `Class.prop` | `static` / 类属性 | |
| 异步 | Promise / async | `Result` / async-await | |
| 错误处理 | try-catch | do-catch / throws | Swift 用枚举建模错误 |

> **学习建议**: 把握住 Swift 的三条主线 —— **类型安全（Optional / 强类型）**、**值类型优先（struct / enum）**、**面向协议（protocol + extension）**，就能举一反三。从「JS 思维」迁移时，最大的观念转变是：**一切可能为空的值都要显式标注并处理**，以及**默认用 `let` 与 `struct`**。
