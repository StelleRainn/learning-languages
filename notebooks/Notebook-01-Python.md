---
id: python
name: Python
order: 1
glyph: "🐍"
tagline: 简洁优雅，无所不在
description: 从语法基础到并发、数据模型与工程实践的系统笔记。
accent: "#3776AB"
gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 45%, #facc15 100%)"
light: true
---

# Python 3

> 本笔记默认使用 **Python 3.10 及以上版本**。标注“3.11+”的内容需要更高版本。
> 学习时建议把示例亲手输入并修改，而不是只阅读输出结果。

## 学习路线

| 阶段 | 重点内容 | 学完后应能做到 |
| :--- | :--- | :--- |
| 入门 | 环境、变量、数据类型、运算符、分支、循环 | 独立编写简单脚本 |
| 基础 | 容器、函数、模块、异常、文件 | 处理结构化数据并拆分代码 |
| 进阶 | 面向对象、迭代器、生成器、装饰器、类型提示 | 设计可复用、可维护的程序 |
| 工程 | 虚拟环境、项目结构、测试、日志、命令行 | 完成可交付的小型项目 |
| 深入 | 并发、异步、内存、性能、Python 数据模型 | 理解运行机制并解决复杂问题 |

建议顺序：

1. 先掌握“Python 3 语法和基础”与“常用容器”。
2. 再学习函数、模块、异常和文件操作，完成几个单文件脚本。
3. 接着学习面向对象、迭代器、生成器和类型提示。
4. 最后进入测试、工程化、并发与性能优化。

文末“渐进练习”按同样阶段分组。**每完成一个阶段就立即跳到对应练习动手，不必等到读完整篇笔记**：入门做 1～3，容器与函数做 4～6，文件与对象做 7～9，工程与测试做 10～12，并发与进阶做 13～15。

---

## Python 3 语法和基础

### 运行环境与第一个程序

#### 确认 Python 版本

在终端中执行：

```bash
python3 --version
```

不同系统也可能把命令注册为 `python`。如果同时存在多个 Python，学习过程中尽量固定使用同一个解释器。

#### 三种常见运行方式

1. **交互式解释器（REPL）**：适合快速验证一两行表达式。

```text
$ python3
>>> 1 + 2
3
>>> print("Hello, Python!")
Hello, Python!
```

2. **运行脚本文件**：实际开发最常用。

```python
# hello.py
name = "Rainn"
print(f"Hello, {name}!")
```

```bash
python3 hello.py
```

3. **以模块方式运行**：让 Python 按模块和包的规则寻找代码。

```bash
python3 -m http.server 8000
python3 -m package_name.module_name
```

> `python3 file.py` 把某个文件当作入口；`python3 -m package.module` 按导入系统运行模块。开发包内代码时通常优先使用 `-m`。

### 基础规则

- **缩进就是语法**：代码块通常使用 4 个空格缩进，不要混用 Tab 和空格。
- **大小写敏感**：`name`、`Name` 和 `NAME` 是三个不同的名称。
- **一行一条语句**：通常不写分号。
- **单行注释**：以 `#` 开头。
- **文档字符串**：模块、函数和类的第一条字符串，可由 `help()` 和 `.__doc__` 读取。
- **默认文本编码**：Python 3 源文件通常使用 UTF-8。
- **续行**：优先用圆括号、方括号或花括号包住多行表达式，不推荐依赖反斜杠 `\`。

```python
# 单行注释

total = (
    10
    + 20
    + 30
)


def greet(name: str) -> str:
    """返回一条问候语。"""
    return f"Hello, {name}!"
```

Python 用冒号和缩进表示代码块：

```python
score = 85

if score >= 60:
    print("及格")
    print("继续保持")
else:
    print("需要复习")
```

空代码块可以临时使用 `pass`：

```python
def todo_later() -> None:
    pass
```

### 变量、名称与对象

#### 变量本质

Python 中的变量更准确地说是**名称**。赋值操作把名称绑定到对象，而不是把值装进一个固定类型的盒子。

```python
age = 21          # 名称 age 指向整数对象 21
age = "twenty-one"  # 同一个名称可以重新绑定到字符串对象
```

Python 是：

- **动态类型语言**：变量名称本身不固定类型，类型属于对象。
- **强类型语言**：不同类型不会随意隐式转换，例如 `"3" + 2` 会报错。

```python
count = 3
message = "数量：" + str(count)
print(message)  # 数量：3
```

#### 赋值不是复制

```python
original = [1, 2]
alias = original
alias.append(3)

print(original)          # [1, 2, 3]
print(alias is original) # True
```

`original` 和 `alias` 指向同一个列表。需要独立列表时，应显式复制，后文会详细介绍。

#### 命名规则与约定

- 只能包含字母、数字和下划线，不能以数字开头。
- 不能使用 `if`、`class`、`return` 等关键字。
- 变量和函数使用 `snake_case`：`user_name`、`calculate_total()`。
- 类名使用 `PascalCase`：`UserProfile`。
- 常量使用全大写：`MAX_RETRY_COUNT = 3`。这只是约定，Python 不会阻止重新赋值。
- 单个前导下划线表示“模块内部使用”：`_cache`。
- 避免覆盖内置名称：不要把变量命名为 `list`、`str`、`sum`、`id`。

查看关键字：

```python
import keyword

print(keyword.kwlist)
```

#### 多重赋值与交换

```python
x, y = 10, 20
x, y = y, x

name, age, active = "Alice", 20, True
```

右侧会先构造并求值，再进行解包，因此交换变量无需临时变量。

#### 查看类型、身份与属性

```python
value = 42

print(type(value))              # <class 'int'>
print(isinstance(value, int))   # True
print(id(value))                # 当前进程中的对象身份标识
print(dir(value))               # 对象可访问的属性和方法
```

业务代码中判断类型通常优先用 `isinstance()`，因为它能够正确处理继承关系。

### 数据类型

#### 类型总览

| 分类 | 常见类型 | 是否可变 |
| :--- | :--- | :--- |
| 数值 | `int`、`float`、`complex`、`bool` | 否 |
| 文本 | `str` | 否 |
| 二进制 | `bytes`、`bytearray` | `bytes` 否，`bytearray` 是 |
| 序列 | `list`、`tuple`、`range` | `list` 是，其余否 |
| 映射 | `dict` | 是 |
| 集合 | `set`、`frozenset` | `set` 是，`frozenset` 否 |
| 空值 | `NoneType`，唯一常用值为 `None` | 否 |

**可变**表示对象创建后可以原地修改；**不可变**表示对象状态不能被原地改变。相关操作会返回一个结果对象，赋值可能让名称重新绑定；解释器也可能安全地复用原对象，因此不保证每次都创建新对象。

**可哈希（hashable）**表示对象拥有在其生命周期内保持稳定的哈希值，并能参与相等性比较。字典键和集合元素必须可哈希：

- `int`、`str`、`bytes`、`frozenset` 通常可哈希。
- `list`、`dict`、`set` 不可哈希。
- 元组只有在它的所有元素都可哈希时才可哈希。

“不可变”常常意味着可哈希，但两者不是完全相同的概念，自定义类还能自行定义相等性与哈希行为。

```python
text = "py"
print(id(text))

text += "thon"
print(id(text))  # 通常不同，因为字符串不可变

numbers = [1, 2]
before = id(numbers)
numbers.append(3)
print(id(numbers) == before)  # True，列表被原地修改
```

#### 整数 `int`

Python 的整数可以表示任意精度，大小主要受可用内存限制。

```python
decimal = 42
binary = 0b101010
octal = 0o52
hexadecimal = 0x2A
large_number = 1_000_000_000

print(decimal == binary == octal == hexadecimal)  # True
```

`bool` 是 `int` 的子类，`True` 和 `False` 在数值语境中分别相当于 `1` 和 `0`，但业务表达中不应把二者混用。

```python
print(isinstance(True, int))  # True
print(True + True)            # 2
```

#### 浮点数 `float`

`float` 通常采用二进制浮点表示，因此部分十进制小数不能被精确存储：

```python
print(0.1 + 0.2)  # 0.30000000000000004
```

比较计算结果时使用 `math.isclose()`：

```python
import math

result = 0.1 + 0.2
print(math.isclose(result, 0.3))  # True
```

货币等要求十进制精确计算的场景使用 `decimal.Decimal`，并从字符串构造：

```python
from decimal import Decimal

price = Decimal("19.90")
quantity = Decimal("3")
print(price * quantity)  # 59.70
```

精确分数可以使用 `fractions.Fraction`：

```python
from fractions import Fraction

print(Fraction(1, 3) + Fraction(1, 6))  # 1/2
```

#### 复数 `complex`

虚部使用 `j`：

```python
number = 3 + 4j
print(number.real)  # 3.0
print(number.imag)  # 4.0
print(abs(number))  # 5.0
```

#### 字符串 `str`

Python 字符串是不可变的 Unicode 文本序列。

```python
single = 'hello'
double = "hello"
multiline = """第一行
第二行"""
```

常见转义字符：

| 转义 | 含义 |
| :--- | :--- |
| `\n` | 换行 |
| `\t` | 制表符 |
| `\\` | 反斜杠 |
| `\'`、`\"` | 引号 |

原始字符串会减少反斜杠转义，适合正则表达式和 Windows 路径：

```python
pattern = r"\d+\.\d+"
windows_path = r"C:\Users\name"
```

> 原始字符串末尾不能只剩一个未配对的反斜杠。

字符串支持索引和切片：

```python
language = "Python"

print(language[0])     # P
print(language[-1])    # n
print(language[1:4])   # yth
print(language[::-1])  # nohtyP
```

常用方法：

```python
text = "  Hello, Python  "

print(text.strip())                 # "Hello, Python"
print(text.lower())                 # "  hello, python  "
print(text.upper())                 # "  HELLO, PYTHON  "
print(text.replace("Python", "世界"))
print("a,b,c".split(","))           # ['a', 'b', 'c']
print("-".join(["2026", "07", "29"]))  # 2026-07-29
print("python".startswith("py"))     # True
print("python".endswith("on"))       # True
print("th" in "python")              # True
```

字符串是不可变对象，方法通常返回新字符串：

```python
name = "alice"
name.upper()
print(name)  # alice

name = name.upper()
print(name)  # ALICE
```

#### 格式化字符串

优先使用 f-string：

```python
name = "Alice"
score = 93.456

print(f"{name} 的成绩是 {score:.2f}")
print(f"{score:10.2f}")   # 宽度 10，保留两位小数
print(f"{score:>10.2f}")  # 右对齐
print(f"{score:<10.2f}")  # 左对齐
print(f"{score:^10.2f}")  # 居中
print(f"{0.875:.1%}")     # 87.5%
print(f"{1_234_567:,}")   # 1,234,567
```

调试时可以使用 `=`：

```python
items = ["apple", "pear"]
print(f"{items=}")  # items=['apple', 'pear']
```

另外两种格式化方式需要能读懂：

```python
"{} 的成绩是 {:.2f}".format(name, score)
"%s 的成绩是 %.2f" % (name, score)
```

#### 字节 `bytes` 与文本编码

`str` 表示字符，`bytes` 表示原始字节。网络、压缩、图片和二进制文件通常使用字节。

```python
text = "你好"
data = text.encode("utf-8")

print(data)                 # b'\xe4\xbd\xa0\xe5\xa5\xbd'
print(data.decode("utf-8")) # 你好
```

编码和解码必须使用匹配的字符集。不要把 `str` 与 `bytes` 直接拼接。

`bytearray` 是可变的字节序列：

```python
data = bytearray(b"ABC")
data[0] = 97
print(data)  # bytearray(b'aBC')
```

#### 空值 `None`

`None` 表示“没有值”“尚未找到”或“没有返回结果”。判断时使用 `is None`：

```python
result = None

if result is None:
    print("暂无结果")
```

不要写 `result == None`。`is` 判断是否为同一个对象，`None` 是单例，用身份判断最清晰。

#### 真值与假值

以下值在布尔环境中为假：

- `False`
- `None`
- 数值零：`0`、`0.0`、`0j`
- 空容器和空文本：`""`、`[]`、`()`、`{}`、`set()`

其他对象通常为真。

```python
items: list[str] = []

if not items:
    print("列表为空")
```

如果必须区分 `None`、`0` 和空字符串，应明确判断，不能只写 `if value:`。

#### 显式类型转换

```python
print(int("42"))          # 42
print(int("1010", 2))     # 10
print(float("3.14"))      # 3.14
print(str(42))            # "42"
print(bool(""))           # False
print(list("abc"))        # ['a', 'b', 'c']
print(tuple([1, 2]))      # (1, 2)
print(set([1, 1, 2]))     # {1, 2}
```

无效转换会抛出异常：

```python
try:
    number = int("12px")
except ValueError:
    print("不是合法整数")
```

### 运算符

#### 算术运算符

| 运算符 | 含义 | 示例 |
| :--- | :--- | :--- |
| `+` | 加法、序列拼接 | `2 + 3`、`"a" + "b"` |
| `-` | 减法 | `5 - 2` |
| `*` | 乘法、序列重复 | `3 * 4`、`"ab" * 2` |
| `/` | 真除法，结果通常为浮点数 | `5 / 2 == 2.5` |
| `//` | 向下取整除法 | `5 // 2 == 2` |
| `%` | 取模 | `5 % 2 == 1` |
| `**` | 幂运算 | `2 ** 3 == 8` |

`//` 是向负无穷方向取整，不是简单截断：

```python
print(5 // 2)    # 2
print(-5 // 2)   # -3
print(-5 % 2)    # 1，满足 a == (a // b) * b + (a % b)
```

同时得到商和余数：

```python
quotient, remainder = divmod(17, 5)
print(quotient, remainder)  # 3 2
```

#### 赋值运算符

```python
count = 10
count += 1
count -= 2
count *= 3
count //= 2
```

Python 没有 `++` 和 `--`。

需要注意：对可变对象执行 `+=` 可能原地修改，对不可变对象则产生新对象。

```python
left = [1, 2]
alias = left
left += [3]
print(alias)  # [1, 2, 3]
```

#### 比较运算符

```python
print(3 == 3)   # True
print(3 != 4)   # True
print(3 < 4)    # True
print(3 <= 3)   # True
```

Python 支持链式比较：

```python
age = 20
print(18 <= age < 65)  # True
```

#### 逻辑运算符与短路求值

- `and`：返回第一个假值；全部为真时返回最后一个值。
- `or`：返回第一个真值；全部为假时返回最后一个值。
- `not`：把对象的真值取反，返回布尔值。

```python
print("" or "default")       # default
print("hello" and 42)        # 42
print(not [])                # True
```

常见默认值写法：

```python
display_name = user_input or "匿名用户"
```

但如果 `0`、`False` 或空字符串是合法值，应使用 `is None`，避免把合法值误当成缺省值。

#### 成员运算符与身份运算符

```python
print("py" in "python")       # True
print(3 not in [1, 2])        # True

a = [1, 2]
b = [1, 2]
c = a

print(a == b)  # True，值相等
print(a is b)  # False，不是同一个对象
print(a is c)  # True
```

**`==` 比较值，`is` 比较对象身份。** 除 `None`、`NotImplemented` 等单例外，不要用 `is` 比较数字或字符串；解释器的对象缓存属于实现细节。

#### 位运算符

| 运算符 | 含义 |
| :--- | :--- |
| `&` | 按位与 |
| `|` | 按位或 |
| `^` | 按位异或 |
| `~` | 按位取反 |
| `<<` | 左移 |
| `>>` | 右移 |

```python
permissions = 0b001 | 0b100
print(bin(permissions))  # 0b101
```

#### 海象运算符 `:=`

赋值表达式可以在表达式中赋值，适合“计算一次并立即判断”的场景：

```python
line = "Python"

if (length := len(line)) > 5:
    print(f"字符串较长：{length}")
```

不要为了少写一行而滥用，否则会降低可读性。

### 输入与输出

#### `input()`

`input()` 总是返回字符串：

```python
name = input("请输入姓名：")
age = int(input("请输入年龄："))
print(f"{name} 明年 {age + 1} 岁")
```

实际程序应处理非法输入：

```python
while True:
    raw = input("请输入整数：")
    try:
        number = int(raw)
    except ValueError:
        print("输入无效，请重试")
    else:
        break
```

#### `print()`

```python
print("A", "B", "C")                 # A B C
print("A", "B", "C", sep="-")        # A-B-C
print("loading", end="...")
print("done")
```

写到标准错误：

```python
import sys

print("发生错误", file=sys.stderr)
```

### 条件语句

#### `if` 语句

```python
score = 86

if score >= 90:
    level = "A"
elif score >= 80:
    level = "B"
elif score >= 60:
    level = "C"
else:
    level = "D"

print(level)
```

条件表达式用于简单二选一：

```python
status = "成年" if age >= 18 else "未成年"
```

复杂逻辑仍应使用普通 `if`，不要嵌套多层条件表达式。

#### 结构化模式匹配 `match`（3.10+）

`match` 不只是其他语言中 `switch` 的替代品，它可以匹配值和数据结构。

```python
command = "start"

match command:
    case "start":
        print("启动")
    case "stop":
        print("停止")
    case _:
        print("未知命令")
```

`match` 还可以拆解序列、映射和类。先掌握这里的字面值匹配；学习容器与解包后，再阅读“结构化模式匹配进阶”。

### 循环语句

#### `for` 循环

Python 的 `for` 遍历的是**可迭代对象**：

```python
for letter in "Python":
    print(letter)

for number in [10, 20, 30]:
    print(number)
```

使用 `range()` 生成整数序列：

```python
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8, 2):    # 2, 4, 6
    print(i)

for i in range(5, 0, -1):   # 5, 4, 3, 2, 1
    print(i)
```

需要索引时用 `enumerate()`，不要手动维护计数器：

```python
languages = ["Python", "JavaScript", "Swift"]

for index, language in enumerate(languages, start=1):
    print(index, language)
```

并行遍历多个序列使用 `zip()`：

```python
names = ["Alice", "Bob"]
scores = [95, 88]

for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

默认 `zip()` 在最短序列结束时停止。需要发现长度不一致时可使用 `zip(..., strict=True)`：

```python
pairs = zip(names, scores, strict=True)
```

#### `while` 循环

```python
countdown = 3

while countdown > 0:
    print(countdown)
    countdown -= 1

print("Go!")
```

无限循环应设计清晰的退出条件：

```python
while True:
    command = input("> ").strip().lower()
    if command == "quit":
        break
```

#### `break`、`continue` 与循环 `else`

- `break`：立即退出当前循环。
- `continue`：跳过本轮剩余代码，进入下一轮。
- 循环 `else`：只有循环**没有被 `break` 中断**时才执行。

```python
target = 7

for number in [2, 4, 6, 7, 8]:
    if number == target:
        print("找到了")
        break
else:
    print("没有找到")
```

查找素数时，循环 `else` 很实用：

```python
number = 29

if number < 2:
    is_prime = False
else:
    is_prime = True
    for divisor in range(2, int(number ** 0.5) + 1):
        if number % divisor == 0:
            is_prime = False
            break

print(is_prime)
```

#### 避免边遍历边修改容器

```python
numbers = [1, 2, 3, 4, 5]

# 遍历副本，再修改原列表
for number in numbers.copy():
    if number % 2 == 0:
        numbers.remove(number)
```

更推荐直接创建结果：

```python
numbers = [number for number in numbers if number % 2 != 0]
```

---

## 常用容器

### 列表 `list`

列表是**有序、可变、允许重复元素**的容器。

#### 列表的创建与访问

```python
empty = []
numbers = [10, 20, 30]
mixed = [1, "Python", True, [2, 3]]
generated = list(range(5))

print(numbers[0])   # 10
print(numbers[-1])  # 30
```

越界访问会抛出 `IndexError`。

#### 增删改查

```python
items = ["a", "b", "c"]

# 增
items.append("d")             # 末尾添加一个元素
items.extend(["e", "f"])      # 末尾添加多个元素
items.insert(1, "new")        # 指定位置插入

# 改
items[0] = "A"
items[1:3] = ["B", "C"]

# 查
print(items.index("d"))       # 第一次出现的位置；不存在会报错
print(items.count("d"))       # 出现次数
print("d" in items)

# 删
last = items.pop()            # 删除并返回最后一个
chosen = items.pop(1)         # 删除并返回指定位置元素
items.remove("d")             # 删除第一个匹配值；不存在会报错
del items[0]
items.clear()
```

`append()` 与 `extend()` 的区别：

```python
left = [1, 2]
left.append([3, 4])
print(left)  # [1, 2, [3, 4]]

right = [1, 2]
right.extend([3, 4])
print(right)  # [1, 2, 3, 4]
```

#### 排序

- `list.sort()`：原地排序，返回 `None`。
- `sorted()`：接受任意可迭代对象，返回新列表。

```python
numbers = [3, 1, 4, 2]

new_numbers = sorted(numbers)
print(numbers)      # [3, 1, 4, 2]
print(new_numbers)  # [1, 2, 3, 4]

numbers.sort(reverse=True)
print(numbers)      # [4, 3, 2, 1]
```

使用 `key` 指定排序依据：

```python
users = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 20},
    {"name": "Carol", "age": 25},
]

users.sort(key=lambda user: user["age"])
```

多条件排序：

```python
records = [
    ("A", 90),
    ("B", 90),
    ("C", 85),
]

records.sort(key=lambda item: (-item[1], item[0]))
```

Python 排序是稳定的：`key` 相同时保留原相对顺序。

#### 列表重复的陷阱

```python
wrong = [[0] * 3] * 2
wrong[0][0] = 1
print(wrong)  # [[1, 0, 0], [1, 0, 0]]
```

两行指向同一个内部列表。正确写法：

```python
matrix = [[0] * 3 for _ in range(2)]
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [0, 0, 0]]
```

### 元组 `tuple`

元组是**有序、不可变、允许重复元素**的序列。

```python
point = (3, 4)
empty = ()
single = (42,)  # 单元素元组的关键是逗号
also_point = 3, 4
```

常用于：

- 表示不应改变的一组值。
- 函数返回多个值。
- 作为字典键或集合元素（前提是内部所有元素都可哈希）。
- 解包赋值。

```python
def min_max(numbers: list[int]) -> tuple[int, int]:
    return min(numbers), max(numbers)


minimum, maximum = min_max([3, 1, 8])
```

元组本身不可变，但其中可能包含可变对象：

```python
data = (1, [2, 3])
data[1].append(4)
print(data)  # (1, [2, 3, 4])
```

### 字典 `dict`

字典保存**键值对**，键必须可哈希。现代 Python 的字典会保留插入顺序，但业务逻辑仍应明确表达是否依赖顺序。

#### 字典的创建与访问

```python
user = {
    "name": "Alice",
    "age": 20,
    "active": True,
}

print(user["name"])
print(user.get("email"))                # None
print(user.get("email", "unknown"))     # unknown
```

`user["missing"]` 会抛出 `KeyError`；`get()` 在缺失时返回默认值。

#### 增删改

```python
user["email"] = "alice@example.com"  # 增
user["age"] = 21                     # 改

removed = user.pop("active")         # 删除并返回值
pair = user.popitem()                # 删除并返回最后插入的键值对
del user["email"]

user.update({"city": "Guangzhou", "age": 22})
```

合并字典（3.9+）：

```python
defaults = {"theme": "light", "page_size": 20}
custom = {"theme": "dark"}

settings = defaults | custom
print(settings)  # 后面的同名键覆盖前面的值

defaults |= custom  # 原地更新
```

#### 遍历

```python
for key in user:
    print(key, user[key])

for value in user.values():
    print(value)

for key, value in user.items():
    print(key, value)
```

#### `setdefault()` 与缺省值

```python
groups: dict[str, list[str]] = {}

for name, department in [
    ("Alice", "研发"),
    ("Bob", "设计"),
    ("Carol", "研发"),
]:
    groups.setdefault(department, []).append(name)

print(groups)
```

更复杂的分组可以使用 `collections.defaultdict`，后文介绍。

> 不要用 `dict.fromkeys(keys, [])` 创建独立列表；所有键会共享同一个列表对象。

### 集合 `set` 与 `frozenset`

集合是**无序、不重复**的可哈希元素集合，适合去重和集合运算。

```python
numbers = {1, 2, 3}
empty_set = set()  # {} 是空字典，不是空集合

numbers.add(4)
numbers.update([4, 5, 6])
numbers.discard(10)  # 不存在也不报错
numbers.remove(6)    # 不存在会抛出 KeyError
```

集合运算：

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)  # 并集：{1, 2, 3, 4, 5}
print(a & b)  # 交集：{3}
print(a - b)  # 差集：{1, 2}
print(a ^ b)  # 对称差：{1, 2, 4, 5}
print({1, 2} <= a)  # 是否为子集
print(a >= {1, 2})  # 是否为超集
```

去重但保留首次出现顺序：

```python
values = ["a", "b", "a", "c", "b"]
unique_in_order = list(dict.fromkeys(values))
print(unique_in_order)  # ['a', 'b', 'c']
```

`frozenset` 不可变，因此可作为字典键或另一个集合的元素：

```python
edge = frozenset({"A", "B"})
graph_weights = {edge: 10}
```

### 索引与切片

通用形式：

```text
sequence[start:stop:step]
```

- 包含 `start`，不包含 `stop`。
- 省略 `start` 表示从开头开始。
- 省略 `stop` 表示直到末尾。
- `step` 默认为 `1`，不能为 `0`。
- 负索引从末尾计数。

```python
numbers = [0, 1, 2, 3, 4, 5]

print(numbers[1:4])    # [1, 2, 3]
print(numbers[:3])     # [0, 1, 2]
print(numbers[3:])     # [3, 4, 5]
print(numbers[::2])    # [0, 2, 4]
print(numbers[::-1])   # [5, 4, 3, 2, 1, 0]
```

列表切片返回浅拷贝：

```python
copy_of_numbers = numbers[:]
```

列表还支持切片赋值：

```python
items = [0, 1, 2, 3, 4]
items[1:4] = ["a", "b"]
print(items)  # [0, 'a', 'b', 4]
```

### 解包

#### 序列解包

```python
first, second, third = [10, 20, 30]
head, *middle, tail = [1, 2, 3, 4, 5]

print(head)    # 1
print(middle)  # [2, 3, 4]
print(tail)    # 5
```

使用 `_` 表示有意忽略：

```python
name, _, city = ("Alice", 20, "Guangzhou")
```

#### 调用时解包

```python
def add(x: int, y: int) -> int:
    return x + y


values = [3, 4]
print(add(*values))

options = {"x": 10, "y": 20}
print(add(**options))
```

#### 构造容器时解包

```python
left = [1, 2]
right = [3, 4]
combined = [0, *left, *right, 5]

base = {"theme": "light", "size": 10}
override = {"theme": "dark"}
config = {**base, **override}
```

### 结构化模式匹配进阶

学过元组、字典和解包后，可以使用模式直接拆解数据。

匹配坐标：

```python
point = (3, 4)

match point:
    case (0, 0):
        print("原点")
    case (0, y):
        print(f"位于 Y 轴：{y=}")
    case (x, 0):
        print(f"位于 X 轴：{x=}")
    case (x, y) if x == y:
        print("位于 y = x 上")
    case (x, y):
        print(f"普通坐标：({x}, {y})")
```

匹配映射与剩余字段：

```python
event = {
    "type": "message",
    "text": "hello",
    "sender": "Alice",
}

match event:
    case {
        "type": "message",
        "text": str(text),
        **metadata,
    }:
        print(text, metadata)
    case {"type": "quit"}:
        print("退出")
    case _:
        print("未知事件")
```

模式中的裸名称通常表示“捕获到这个变量”，不是与同名变量比较。固定枚举值适合使用枚举成员或带限定名的常量。

### 推导式

#### 列表推导式

```python
squares = [number ** 2 for number in range(6)]
even_squares = [
    number ** 2
    for number in range(10)
    if number % 2 == 0
]
```

带二选一条件时，条件表达式写在 `for` 前面：

```python
labels = ["even" if number % 2 == 0 else "odd" for number in range(5)]
```

#### 字典与集合推导式

```python
square_map = {number: number ** 2 for number in range(5)}
lengths = {word: len(word) for word in ["Python", "JS", "Swift"]}
unique_lengths = {len(word) for word in ["a", "bb", "cc", "ddd"]}
```

圆括号形式不是“元组推导式”，而是生成器表达式：

```python
squares = (number ** 2 for number in range(1_000_000))
```

推导式适合简单映射和过滤。逻辑超过两三层时，普通循环通常更清晰。

### 浅拷贝与深拷贝

#### 浅拷贝

浅拷贝创建外层新容器，但嵌套对象仍被共享：

```python
import copy

original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
# 对列表也可以写 shallow = original.copy()

shallow.append([5, 6])
print(original)  # 外层互不影响

shallow[0].append(99)
print(original)  # [[1, 2, 99], [3, 4]]，内部列表被共享
```

#### 深拷贝

```python
deep = copy.deepcopy(original)
deep[0].append(100)

print(original)
print(deep)
```

`deepcopy()` 会递归复制，并处理常见循环引用，但并非所有资源都适合复制。文件句柄、网络连接、锁等对象应通过明确的生命周期管理，不应依赖深拷贝。

---

## 函数

### 定义与调用

```python
def calculate_area(width: float, height: float) -> float:
    """计算矩形面积。"""
    return width * height


area = calculate_area(3.5, 2)
print(area)
```

- `def` 定义函数。
- 参数写在圆括号中。
- `return` 返回结果并结束当前函数。
- 没有显式 `return` 时，函数返回 `None`。
- 类型提示帮助阅读和静态检查，运行时默认不会强制校验。

一个函数应尽量只承担一个清晰职责。

### 返回多个值

Python 实际返回一个元组，再由调用方解包：

```python
def statistics(numbers: list[float]) -> tuple[float, float, float]:
    return min(numbers), max(numbers), sum(numbers) / len(numbers)


minimum, maximum, average = statistics([2, 4, 8])
```

返回字段较多时，优先考虑数据类、具名元组或字典，以免调用方记忆位置含义。

### 参数传递与对象共享

调用函数时，形参会绑定到实参所指向的对象。它不是简单的“按值传递”或“按引用传递”标签能够完整概括的。

```python
def mutate(items: list[int]) -> None:
    items.append(99)


def rebind(items: list[int]) -> None:
    items = [0]  # 只让局部名称指向新列表


numbers = [1, 2]
mutate(numbers)
print(numbers)  # [1, 2, 99]

rebind(numbers)
print(numbers)  # [1, 2, 99]
```

- 修改传入的可变对象，调用方可以观察到变化。
- 在函数内重新绑定形参，不会让调用方的名称自动改绑。
- 不可变对象不能被原地改变，所谓“修改”通常是创建新对象并重新绑定。

函数是否修改参数应在命名、文档和接口中明确。可行时，返回新值通常更容易推理。

### 参数类型

#### 位置参数与关键字参数

```python
def create_user(name: str, age: int, active: bool = True) -> dict[str, object]:
    return {"name": name, "age": age, "active": active}


create_user("Alice", 20)
create_user("Alice", age=20, active=False)
create_user(name="Alice", age=20)
```

关键字参数能提高可读性。传参时，位置参数必须写在关键字参数之前。

#### 默认参数

```python
def greet(name: str, prefix: str = "Hello") -> str:
    return f"{prefix}, {name}!"
```

**每次执行 `def` 创建函数对象时，默认表达式只求值一次，并由该函数的后续调用复用。** 语法允许可变默认值，偶尔也会有意共享；但大多数函数并不希望跨调用共享状态，因此通常不应直接使用可变对象作为默认值：

```python
# 错误示例：多次调用会共享同一个列表
def append_item_wrong(item: str, items: list[str] = []) -> list[str]:
    items.append(item)
    return items
```

正确写法：

```python
def append_item(
    item: str,
    items: list[str] | None = None,
) -> list[str]:
    if items is None:
        items = []
    items.append(item)
    return items
```

如果 `None` 本身也是合法值，可用专用哨兵对象区分“没有传参”和“明确传入 None”：

```python
_MISSING = object()


def set_nickname(nickname=_MISSING) -> None:
    if nickname is _MISSING:
        print("保持原昵称")
    elif nickname is None:
        print("清除昵称")
    else:
        print(f"设置昵称：{nickname}")
```

#### 仅限位置参数与仅限关键字参数

`/` 左侧只能按位置传递；`*` 右侧只能按关键字传递：

```python
def connect(
    host: str,
    /,
    port: int = 5432,
    *,
    timeout: float = 5.0,
    use_tls: bool = True,
) -> None:
    print(host, port, timeout, use_tls)


connect("localhost", 5432, timeout=2.0)
```

这种约束适合稳定公共 API，能明确调用意图。

#### 可变数量参数 `*args` 与 `**kwargs`

```python
def total(*numbers: float) -> float:
    return sum(numbers)


print(total(1, 2, 3))
```

`args` 是元组：

```python
def show_args(*args: object) -> None:
    print(type(args), args)
```

`kwargs` 是字典：

```python
def show_profile(**fields: object) -> None:
    for key, value in fields.items():
        print(f"{key}={value}")


show_profile(name="Alice", age=20)
```

完整顺序：

```python
def example(
    positional_only,
    /,
    normal,
    default="value",
    *args,
    keyword_only,
    **kwargs,
):
    ...
```

### 函数是一等对象

函数可以赋值给变量、放进容器、作为参数传入，也可以从另一个函数返回。

```python
from collections.abc import Callable


def add(x: int, y: int) -> int:
    return x + y


def subtract(x: int, y: int) -> int:
    return x - y


def calculate(
    operation: Callable[[int, int], int],
    x: int,
    y: int,
) -> int:
    return operation(x, y)


print(calculate(add, 5, 2))
print(calculate(subtract, 5, 2))
```

注意传递函数时写 `add`，立即调用才写 `add(...)`。

### `lambda` 表达式

`lambda` 创建只包含一个表达式的匿名函数：

```python
square = lambda number: number ** 2
print(square(5))

words = ["pear", "watermelon", "fig"]
words.sort(key=lambda word: len(word))
```

复杂逻辑使用普通 `def`，它更容易命名、注释、测试和调试。

### 作用域：LEGB

Python 按以下顺序查找名称：

1. **L — Local**：当前函数局部作用域。
2. **E — Enclosing**：外层函数作用域。
3. **G — Global**：当前模块全局作用域。
4. **B — Built-in**：内置作用域。

```python
message = "global"


def outer() -> None:
    message = "enclosing"

    def inner() -> None:
        message = "local"
        print(message)

    inner()


outer()  # local
```

#### `global`

函数内赋值默认创建局部名称。确实需要重新绑定模块级变量时使用 `global`：

```python
counter = 0


def increment() -> None:
    global counter
    counter += 1
```

大量依赖全局可变状态会让测试和推理变困难，通常应封装为参数、返回值或对象。

#### `nonlocal`

重新绑定最近的外层函数变量：

```python
def make_counter():
    count = 0

    def increment() -> int:
        nonlocal count
        count += 1
        return count

    return increment


counter = make_counter()
print(counter())  # 1
print(counter())  # 2
```

### 闭包

闭包由“内部函数”和它所引用的外层状态组成。即使外层函数已经结束，状态仍能保留。

```python
from collections.abc import Callable


def make_multiplier(factor: int) -> Callable[[int], int]:
    def multiply(number: int) -> int:
        return number * factor

    return multiply


double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15
```

#### 循环中的晚绑定陷阱

闭包在调用时查找变量，而不是在创建时复制变量值：

```python
functions = [lambda: i for i in range(3)]
print([function() for function in functions])  # [2, 2, 2]
```

用默认参数捕获当轮值：

```python
functions = [lambda i=i: i for i in range(3)]
print([function() for function in functions])  # [0, 1, 2]
```

晚绑定不只发生在 `lambda`，普通嵌套 `def` 也遵循相同自由变量查找规则。也可以通过工厂函数或 `functools.partial()` 把当轮值固定下来。

### 装饰器

装饰器接收函数并返回新的可调用对象，用于在不修改核心函数的前提下增加行为。

```python
from functools import wraps
from time import perf_counter


def timer(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        start = perf_counter()
        result = function(*args, **kwargs)
        elapsed = perf_counter() - start
        print(f"{function.__name__} 耗时 {elapsed:.6f}s")
        return result

    return wrapper


@timer
def calculate_sum(limit: int) -> int:
    return sum(range(limit))


calculate_sum(1_000_000)
```

`@timer` 等价于：

```python
calculate_sum = timer(calculate_sum)
```

`functools.wraps()` 会保留原函数的名称、文档和其他元数据。

#### 带参数的装饰器

```python
from functools import wraps


def repeat(times: int):
    if times < 1:
        raise ValueError("times 必须大于等于 1")

    def decorator(function):
        @wraps(function)
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(times):
                result = function(*args, **kwargs)
            return result

        return wrapper

    return decorator


@repeat(times=3)
def say(message: str) -> str:
    print(message)
    return message
```

装饰器的应用顺序：

```python
@outer
@inner
def function():
    ...

# 等价于 function = outer(inner(function))
```

### 递归

递归函数直接或间接调用自身，必须有终止条件：

```python
def factorial(number: int) -> int:
    if number < 0:
        raise ValueError("number 不能为负数")
    if number in (0, 1):
        return 1
    return number * factorial(number - 1)
```

Python 没有通用尾递归优化，默认递归深度也有限。对很深的数据，显式循环或栈通常更安全：

```python
def factorial_iterative(number: int) -> int:
    if number < 0:
        raise ValueError("number 不能为负数")

    result = 1
    for value in range(2, number + 1):
        result *= value
    return result
```

### 函数设计原则

- 函数名使用动词或动词短语，表达行为。
- 参数与返回值保持清晰，避免暗中修改外部状态。
- 默认优先返回结果，由调用方决定是否打印。
- 不要捕获过多职责；一段逻辑难以命名时往往意味着需要拆分。
- 公共函数编写文档字符串与类型提示。
- 对非法参数尽早抛出有意义的异常。
- 不要仅为了“减少函数数量”而复制粘贴逻辑。

---

## 模块、包与依赖

### 模块

一个 `.py` 文件就是一个模块。模块用于组织相关的变量、函数和类。

假设有文件 `calculator.py`：

```python
PI = 3.1415926


def add(x: float, y: float) -> float:
    return x + y
```

在同一目录的另一个文件中导入：

```python
import calculator

print(calculator.PI)
print(calculator.add(2, 3))
```

常见导入形式：

```python
import math
import datetime as dt
from pathlib import Path
from collections import Counter, defaultdict
```

建议：

- 默认优先 `import module` 或导入少量明确名称。
- 别名要简短且有公认含义，如 `import numpy as np`。
- 避免 `from module import *`，它会污染命名空间并让来源不清楚。
- 导入通常放在文件顶部，依次为标准库、第三方库、本地模块。

### 模块只初始化一次

第一次导入模块时，Python 会执行模块顶层代码，并把模块对象缓存到 `sys.modules`。同一进程中再次普通导入通常直接复用缓存。

因此不要在模块顶层执行昂贵操作、启动服务或修改外部状态：

```python
# 不推荐：仅仅 import 就会执行网络请求或大量计算
data = load_large_remote_data()
```

把有副作用的入口逻辑放进函数。

### `__name__` 与程序入口

模块直接运行时，`__name__` 为 `"__main__"`；被导入时，`__name__` 是模块名。

```python
def main() -> None:
    print("程序开始")


if __name__ == "__main__":
    main()
```

这样既可以运行脚本，又可以在测试中安全导入函数：

```bash
python3 app.py
```

### 包

包是一组模块。典型结构：

```text
project/
├── pyproject.toml
├── src/
│   └── study_app/
│       ├── __init__.py
│       ├── __main__.py
│       ├── calculator.py
│       └── cli.py
└── tests/
    └── test_calculator.py
```

- `__init__.py` 表明目录是常规包，也可定义包的公共接口。
- `__main__.py` 允许执行 `python3 -m study_app`。
- `src/` 布局可以避免无意中从项目根目录导入尚未安装的源码。

包内优先使用绝对导入：

```python
from study_app.calculator import add
```

相对导入适合紧密相关的包内模块：

```python
from .calculator import add
from .models.user import User
```

直接运行包内某个文件时，相对导入可能失败。应从项目根目录以模块方式运行：

```bash
python3 -m study_app.cli
```

### 导入查找路径

Python 会沿 `sys.path` 寻找模块，路径通常包含：

- 程序入口所在目录。
- 标准库目录。
- 当前虚拟环境安装包目录。
- 环境和启动配置增加的路径。

```python
import sys

for path in sys.path:
    print(path)
```

不要在业务代码中随意 `sys.path.append(...)` 修补导入。更可靠的方式是正确组织包，并把项目安装到虚拟环境。

### 循环导入

`a.py` 导入 `b.py`，同时 `b.py` 又在模块顶层导入 `a.py`，可能看到“部分初始化的模块”错误。

常见解决思路：

1. 把共享模型或常量提取到第三个模块。
2. 重新划分职责，让依赖方向单向。
3. 只为类型提示导入时使用 `TYPE_CHECKING`。
4. 极少数场景可把导入放进函数，但这通常只是局部权宜之计。

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from study_app.models import User


def send_message(user: "User") -> None:
    ...
```

### 🌟虚拟环境 `venv`

虚拟环境为每个项目隔离解释器入口和第三方依赖，避免项目之间版本冲突。

创建：

```bash
python3 -m venv .venv
```

macOS / Linux 激活：

```bash
source .venv/bin/activate
```

Windows PowerShell 激活：

```powershell
.\.venv\Scripts\Activate.ps1
```

激活只是让虚拟环境的命令目录排到当前 shell 的 `PATH` 前面，并不是使用虚拟环境的必要条件。也可以直接运行 `.venv/bin/python`（Windows 为 `.venv\Scripts\python.exe`）。

确认正在使用的解释器：

```bash
python -c "import sys; print(sys.executable)"
```

退出：

```bash
deactivate
```

`.venv/` 通常加入 `.gitignore`，不提交到版本控制。

### `pip`

尽量通过当前解释器调用 `pip`，避免把依赖装到另一个 Python：

```bash
python -m pip install package_name
python -m pip install "package_name>=1.2,<2"
python -m pip uninstall package_name
python -m pip list
python -m pip show package_name
```

从依赖清单安装：

```bash
python -m pip install -r requirements.txt
```

开发当前包：

```bash
python -m pip install -e .
```

`pip freeze` 记录的是当前环境的完整安装快照：

```bash
python -m pip freeze > requirements.txt
```

它适合简单应用或部署快照，但库项目通常应在 `pyproject.toml` 中声明直接依赖和兼容范围。

### `pyproject.toml`

现代 Python 项目可以在 `pyproject.toml` 中集中声明构建配置、项目元数据与工具配置。

最小示例：

```toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "study-app"
version = "0.1.0"
description = "A small Python study project"
requires-python = ">=3.10"
dependencies = []

[project.scripts]
study-app = "study_app.cli:main"
```

安装后，`study-app` 命令会调用 `study_app.cli` 中的 `main()`。

> 锁定依赖的具体方式取决于所选工具和项目类型。不要同时维护多套互相冲突的依赖来源。

---

## 异常处理与资源管理

### 异常是什么

异常表示程序运行过程中出现了无法按当前路径继续处理的情况。

常见异常：

| 异常 | 常见原因 |
| :--- | :--- |
| `SyntaxError` | 语法不合法，通常在运行前就发现 |
| `NameError` | 名称未定义 |
| `TypeError` | 类型不支持当前操作或参数形式错误 |
| `ValueError` | 类型可接受，但值无效 |
| `KeyError` | 字典键不存在 |
| `IndexError` | 序列索引越界 |
| `AttributeError` | 对象没有对应属性 |
| `FileNotFoundError` | 文件不存在 |
| `PermissionError` | 没有文件或系统操作权限 |
| `ZeroDivisionError` | 除数为零 |
| `TimeoutError` | 操作超时 |

多数可处理异常继承自 `Exception`。`KeyboardInterrupt`、`SystemExit` 等直接继承自 `BaseException`，通常不应被宽泛吞掉。

### `try`、`except`、`else`、`finally`

```python
try:
    raw = input("请输入除数：")
    divisor = float(raw)
    result = 10 / divisor
except ValueError:
    print("请输入合法数字")
except ZeroDivisionError:
    print("除数不能为零")
else:
    print(f"结果：{result}")
finally:
    print("本次计算结束")
```

- `try`：放可能抛出异常的最小代码范围。
- `except`：只捕获能够正确处理的具体异常。
- `else`：没有异常时执行。
- `finally`：在正常的 Python 控制流中，不论 `try` 是否抛出异常都会执行，适合清理资源。

不要随意在 `finally` 中写 `return`、`break` 或 `continue`，它们可能覆盖原返回值或让正在传播的异常变得不可见。进程被强制终止、解释器崩溃等情况也不能保证清理代码得到执行，因此关键数据仍需要事务、原子替换等机制保护。

多个相关异常可合并：

```python
try:
    value = int(user_input)
except (TypeError, ValueError) as error:
    print(f"转换失败：{error}")
```

避免：

```python
try:
    do_many_things()
except:
    pass
```

裸 `except` 会连用户中断等异常也捕获；`pass` 又会隐藏真正错误。

### 主动抛出异常 `raise`

```python
def set_age(age: int) -> None:
    if age < 0:
        raise ValueError("age 不能为负数")
```

在 `except` 内单独写 `raise` 可保留原回溯并重新抛出：

```python
try:
    process()
except ValueError:
    log_problem()
    raise
```

### 异常链

把底层异常转换为领域异常时，使用 `raise ... from ...` 保留因果关系：

```python
class ConfigurationError(Exception):
    """配置无效。"""


def parse_port(raw: str) -> int:
    try:
        port = int(raw)
    except ValueError as error:
        raise ConfigurationError("port 必须是整数") from error

    if not 1 <= port <= 65535:
        raise ConfigurationError("port 超出有效范围")
    return port
```

如果明确不希望显示原异常上下文，可使用 `raise NewError(...) from None`，但不要因此丢掉排错所需信息。

### 自定义异常

领域异常通常继承 `Exception`，名称以 `Error` 结尾：

```python
class InsufficientBalanceError(Exception):
    """账户余额不足。"""


def withdraw(balance: float, amount: float) -> float:
    if amount <= 0:
        raise ValueError("amount 必须大于 0")
    if amount > balance:
        raise InsufficientBalanceError(
            f"余额 {balance:.2f}，无法支出 {amount:.2f}"
        )
    return balance - amount
```

不要为每一句错误消息都创建新异常类型。只有调用方确实需要分类处理时，自定义类型才有价值。

### EAFP 与 LBYL

- **EAFP**：先执行，失败后捕获预期异常。
- **LBYL**：执行前先检查条件。

字典读取适合 EAFP：

```python
try:
    value = mapping[key]
except KeyError:
    value = default
```

也可以直接使用符合语义的 `mapping.get(key, default)`。

文件场景中，“先检查存在，再打开”存在检查与操作之间的竞态条件：

```python
try:
    content = path.read_text(encoding="utf-8")
except FileNotFoundError:
    content = ""
```

但 EAFP 不是“用异常代替所有正常分支”。能直接表达且不会产生竞态的条件，普通判断更清晰。

### `assert`

断言用于检查开发者认为必然成立的内部不变量：

```python
def average(numbers: list[float]) -> float:
    assert numbers, "调用方应确保列表非空"
    return sum(numbers) / len(numbers)
```

Python 优化模式可以移除断言，因此：

- 不用 `assert` 校验用户输入。
- 不用 `assert` 做权限检查、金额检查等业务约束。
- 需要始终生效时显式抛出异常。

### 🌟上下文管理器 `with`

上下文管理器把资源的“获取”和“释放”绑定在一个结构中，即使发生异常也能清理。

```python
with open("notes.txt", "r", encoding="utf-8") as file:
    content = file.read()

# 离开 with 后文件已关闭
```

多个上下文可以写在一起：

```python
with (
    open("source.txt", encoding="utf-8") as source,
    open("target.txt", "w", encoding="utf-8") as target,
):
    target.write(source.read())
```

#### 自定义上下文管理器

类可以实现 `__enter__()` 与 `__exit__()`：

```python
from types import TracebackType


class Timer:
    def __enter__(self) -> "Timer":
        from time import perf_counter

        self._perf_counter = perf_counter
        self.started_at = perf_counter()
        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_value: BaseException | None,
        traceback: TracebackType | None,
    ) -> bool:
        self.elapsed = self._perf_counter() - self.started_at
        print(f"耗时：{self.elapsed:.6f}s")
        return False  # False 表示不吞掉异常


with Timer():
    sum(range(1_000_000))
```

也可以用 `contextlib.contextmanager`：

```python
from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path
from tempfile import TemporaryDirectory


@contextmanager
def temporary_workspace() -> Iterator[Path]:
    with TemporaryDirectory() as directory:
        path = Path(directory)
        print(f"创建：{path}")
        try:
            yield path
        finally:
            print("即将清理临时目录")


with temporary_workspace() as workspace:
    (workspace / "result.txt").write_text("done", encoding="utf-8")
```

`contextlib.ExitStack` 适合动态数量的上下文：

```python
from contextlib import ExitStack

paths = ["a.txt", "b.txt", "c.txt"]

with ExitStack() as stack:
    files = [
        stack.enter_context(open(path, encoding="utf-8"))
        for path in paths
    ]
    contents = [file.read() for file in files]
```

---

## 文件、目录与数据格式

### 文件打开模式

```python
open(file, mode="r", encoding=None)
```

| 模式 | 含义 |
| :--- | :--- |
| `"r"` | 只读；文件不存在时报错 |
| `"w"` | 写入；文件存在时清空，不存在时创建 |
| `"a"` | 追加；写入到末尾 |
| `"x"` | 独占创建；文件已存在时报错 |
| `"b"` | 二进制模式，如 `"rb"`、`"wb"` |
| `"t"` | 文本模式，默认 |
| `"+"` | 同时读写，如 `"r+"` |

文本文件应明确指定编码：

```python
with open("notes.txt", "w", encoding="utf-8") as file:
    file.write("第一行\n")
    file.write("第二行\n")
```

### 读取文本

一次性读取：

```python
with open("notes.txt", encoding="utf-8") as file:
    content = file.read()
```

逐行读取适合大文件：

```python
with open("server.log", encoding="utf-8") as file:
    for line_number, line in enumerate(file, start=1):
        clean_line = line.rstrip("\n")
        print(line_number, clean_line)
```

`readlines()` 会把所有行读入列表，大文件中应谨慎。

### 写入文本

```python
lines = ["Python\n", "JavaScript\n", "Swift\n"]

with open("languages.txt", "w", encoding="utf-8") as file:
    file.writelines(lines)
```

`writelines()` 不会自动补换行。

`print()` 也可以写入文件：

```python
with open("report.txt", "w", encoding="utf-8") as file:
    print("学习报告", file=file)
    print("已完成：3 章", file=file)
```

### 二进制文件

```python
with open("source.png", "rb") as source:
    data = source.read()

with open("copy.png", "wb") as target:
    target.write(data)
```

复制大文件时分块处理：

```python
def copy_binary(source_path: str, target_path: str) -> None:
    chunk_size = 1024 * 1024

    with (
        open(source_path, "rb") as source,
        open(target_path, "wb") as target,
    ):
        while chunk := source.read(chunk_size):
            target.write(chunk)
```

标准库 `shutil.copyfile()` 更适合普通复制需求。

### 🌟`pathlib`

`pathlib.Path` 用对象表示路径，通常比手工拼接字符串更清晰、跨平台。

```python
from pathlib import Path

project = Path.cwd()
notes = project / "data" / "notes.txt"

print(notes.name)       # notes.txt
print(notes.stem)       # notes
print(notes.suffix)     # .txt
print(notes.parent)
print(notes.exists())
print(notes.is_file())
print(notes.is_dir())
```

创建目录：

```python
data_directory = Path("data")
data_directory.mkdir(parents=True, exist_ok=True)
```

读写文本：

```python
path = Path("message.txt")
path.write_text("Hello\n", encoding="utf-8")
content = path.read_text(encoding="utf-8")
```

遍历：

```python
for markdown_file in Path(".").glob("*.md"):
    print(markdown_file)

for python_file in Path("src").rglob("*.py"):
    print(python_file)
```

删除和重命名：

```python
path.rename("new-name.txt")
Path("temporary.txt").unlink(missing_ok=True)
```

执行删除前务必确认目标。目录树删除通常使用 `shutil.rmtree()`，属于破坏性操作，不应对未解析或过宽的路径直接执行。

### `shutil` 与 `tempfile`

```python
import shutil
from pathlib import Path

shutil.copy2("source.txt", "backup.txt")  # 尽量保留元数据
shutil.copytree("assets", "assets-backup", dirs_exist_ok=True)
shutil.move("old.txt", "archive/old.txt")
```

临时资源：

```python
from tempfile import NamedTemporaryFile, TemporaryDirectory

with TemporaryDirectory() as directory:
    workspace = Path(directory)
    (workspace / "test.txt").write_text("temporary", encoding="utf-8")

with NamedTemporaryFile(mode="w+", encoding="utf-8") as file:
    file.write("temporary")
    file.seek(0)
    print(file.read())
```

上下文结束后会自动清理。

### JSON

JSON 与 Python 类型的大致对应：

| JSON | Python |
| :--- | :--- |
| object | `dict` |
| array | `list` |
| string | `str` |
| number | `int` / `float` |
| true / false | `True` / `False` |
| null | `None` |

字符串转换：

```python
import json

user = {
    "name": "Alice",
    "age": 20,
    "skills": ["Python", "SQL"],
}

json_text = json.dumps(user, ensure_ascii=False, indent=2)
restored = json.loads(json_text)

print(json_text)
print(restored["name"])
```

文件读写：

```python
from pathlib import Path

path = Path("user.json")

with path.open("w", encoding="utf-8") as file:
    json.dump(user, file, ensure_ascii=False, indent=2)

with path.open(encoding="utf-8") as file:
    loaded_user = json.load(file)
```

JSON 不直接支持 `datetime`、`Decimal`、`set` 和自定义类，需要转换为基本类型或提供自定义编码逻辑。

### CSV

写入：

```python
import csv

rows = [
    {"name": "Alice", "score": 95},
    {"name": "Bob", "score": 88},
]

with open("scores.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerows(rows)
```

读取：

```python
with open("scores.csv", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["name"], int(row["score"]))
```

`csv` 读取的字段默认都是字符串，需要按业务类型转换。

### `pickle` 的安全边界

`pickle` 可以序列化许多 Python 对象，但其数据只适合可信 Python 环境：

```python
import pickle

with open("cache.pkl", "wb") as file:
    pickle.dump({"items": [1, 2, 3]}, file)
```

> **绝对不要反序列化来源不可信的 pickle 数据。** 恶意 pickle 可在加载时执行任意代码。跨语言或长期数据交换通常优先使用 JSON、CSV 或数据库。

### SQLite

`sqlite3` 是标准库内置的轻量关系型数据库接口，适合本地工具和中小型单机数据。

```python
from contextlib import closing
import sqlite3

with closing(sqlite3.connect("tasks.db")) as connection:
    with connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS task (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                completed INTEGER NOT NULL DEFAULT 0
            )
            """
        )
        connection.execute(
            "INSERT INTO task (title) VALUES (?)",
            ("学习 pathlib",),
        )
        rows = connection.execute(
            """
            SELECT id, title, completed
            FROM task
            ORDER BY id
            """
        ).fetchall()

print(rows)
```

**始终使用参数化查询，不要用 f-string 拼接用户输入：**

```python
# 正确
connection.execute(
    "SELECT * FROM task WHERE title = ?",
    (user_input,),
)

# 错误：存在 SQL 注入风险
query = f"SELECT * FROM task WHERE title = '{user_input}'"
```

`Connection` 自身的上下文管理负责事务提交或回滚，但不会自动关闭连接；这里外层使用 `closing()` 明确关闭。它也不会替你设计并发、迁移和备份策略。

### 正则表达式 `re`

正则表达式用于匹配具有规则的文本。简单包含、前缀、分割等操作优先用字符串方法，只有模式更复杂时再使用正则。

```python
import re

text = "订单号：A-2026-0042"
match = re.search(r"[A-Z]-\d{4}-\d{4}", text)

if match:
    print(match.group())  # A-2026-0042
```

常见元字符：

| 模式 | 含义 |
| :--- | :--- |
| `.` | 任意字符（默认不含换行） |
| `\d` / `\D` | 数字 / 非数字 |
| `\w` / `\W` | 单词字符 / 非单词字符 |
| `\s` / `\S` | 空白 / 非空白 |
| `^` / `$` | 字符串开头 / 结尾 |
| `*` / `+` / `?` | 0 次以上 / 1 次以上 / 0 或 1 次 |
| `{m,n}` | 重复 m 到 n 次 |
| `[...]` | 字符集合 |
| `(...)` | 捕获分组 |
| `(?:...)` | 非捕获分组 |
| `A|B` | A 或 B |

常用函数：

```python
text = "Alice:95 Bob:88 Carol:91"

print(re.findall(r"\d+", text))           # ['95', '88', '91']
print(re.split(r"\s+", text))             # 按空白分割
print(re.sub(r"\d+", "***", text))        # 替换所有数字段
print(bool(re.fullmatch(r"\d{4}", "2026")))
```

命名分组：

```python
pattern = re.compile(
    r"(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})"
)
match = pattern.fullmatch("2026-07-29")

if match:
    print(match.groupdict())
```

贪婪与非贪婪：

```python
html = "<b>one</b><b>two</b>"
print(re.findall(r"<b>.*</b>", html))   # 贪婪：一个大匹配
print(re.findall(r"<b>.*?</b>", html))  # 非贪婪：两个匹配
```

正则不适合完整解析 HTML、复杂编程语言或任意嵌套结构，应选择专用解析器。

---

## 🌟面向对象编程

### 类与对象

- **类（class）**：描述一类对象共有的数据和行为。
- **对象 / 实例（object / instance）**：根据类创建的具体实体。
- **属性（attribute）**：对象保存的数据。
- **方法（method）**：绑定到类或对象的函数。

```python
class User:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age

    def greet(self) -> str:
        return f"你好，我是 {self.name}"


alice = User("Alice", 20)
bob = User("Bob", 25)

print(alice.name)
print(alice.greet())
print(isinstance(alice, User))  # True
```

`self` 表示当前实例。调用 `alice.greet()` 时，Python 会把 `alice` 自动绑定为第一个参数，概念上接近：

```python
User.greet(alice)
```

`self` 不是关键字，但这是必须遵守的通用命名约定。

### `__init__()` 与 `__new__()`

创建实例大致经历：

1. `__new__()` 创建并返回实例。
2. `__init__()` 初始化已经创建的实例。

日常类设计几乎总是只需要 `__init__()`：

```python
class Product:
    def __init__(self, name: str, price: float) -> None:
        if price < 0:
            raise ValueError("price 不能为负数")
        self.name = name
        self.price = price
```

`__init__()` 必须返回 `None`。只有不可变类型定制、实例缓存或元编程等特殊场景才常重写 `__new__()`。

### 实例属性与类属性

```python
class Student:
    school = "GDUFS"  # 类属性，由类及实例共享读取

    def __init__(self, name: str) -> None:
        self.name = name  # 实例属性，每个实例独立


alice = Student("Alice")
bob = Student("Bob")

print(Student.school)
print(alice.school)
print(alice.name, bob.name)
```

给实例赋同名属性会遮蔽类属性：

```python
alice.school = "Another School"

print(alice.school)    # Another School
print(bob.school)      # GDUFS
print(Student.school)  # GDUFS
```

#### 可变类属性陷阱

```python
class TeamWrong:
    members: list[str] = []


team_a = TeamWrong()
team_b = TeamWrong()
team_a.members.append("Alice")
print(team_b.members)  # ['Alice']，共享了类属性
```

需要每个实例独立时在 `__init__()` 中创建：

```python
class Team:
    def __init__(self) -> None:
        self.members: list[str] = []
```

### 实例方法、类方法与静态方法

| 类型 | 装饰器 | 首个参数 | 常见用途 |
| :--- | :--- | :--- | :--- |
| 实例方法 | 无 | `self` | 读取或修改实例状态 |
| 类方法 | `@classmethod` | `cls` | 替代构造器、读取类级配置 |
| 静态方法 | `@staticmethod` | 无自动参数 | 与该类语义相关的独立工具函数 |

```python
from __future__ import annotations

from datetime import date


class Person:
    species = "Homo sapiens"

    def __init__(self, name: str, birth_year: int) -> None:
        self.name = name
        self.birth_year = birth_year

    def age_in(self, year: int) -> int:
        return year - self.birth_year

    @classmethod
    def from_age(cls, name: str, age: int) -> Person:
        current_year = date.today().year
        return cls(name, current_year - age)

    @staticmethod
    def is_valid_name(name: str) -> bool:
        return bool(name.strip())
```

类方法中的 `cls` 支持继承后的多态构造；不要硬编码 `Person(...)`。

如果静态方法与类状态毫无关系，普通模块函数往往更自然。

### 封装与命名约定

Python 倾向通过约定表达访问意图：

- `name`：公共接口。
- `_name`：内部实现，外部不应依赖。
- `__name`：触发名称改写，主要用于避免子类意外覆盖。
- `__name__`：语言定义的特殊名称，不要自行发明。

```python
class Account:
    def __init__(self, owner: str, balance: float = 0) -> None:
        self.owner = owner
        self._balance = balance
        self.__audit_code = "internal"
```

`__audit_code` 会被改写为类似 `_Account__audit_code`，但这**不是真正的安全私有权限**。真正的安全边界不能依靠前导下划线。

### `property`

属性可以让调用方保持简单访问语法，同时由类控制读取和修改。

```python
class Temperature:
    def __init__(self, celsius: float) -> None:
        self.celsius = celsius

    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float) -> None:
        if value < -273.15:
            raise ValueError("温度不能低于绝对零度")
        self._celsius = value

    @property
    def fahrenheit(self) -> float:
        return self._celsius * 9 / 5 + 32


temperature = Temperature(25)
print(temperature.celsius)     # 25
print(temperature.fahrenheit)  # 77.0

temperature.celsius = 30
```

不要为所有字段机械添加 getter / setter。普通公共属性在 Python 中完全合理；当需要验证、计算、兼容或只读语义时再引入属性。

### 继承与方法重写

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name = name

    def speak(self) -> str:
        raise NotImplementedError


class Dog(Animal):
    def __init__(self, name: str, breed: str) -> None:
        super().__init__(name)
        self.breed = breed

    def speak(self) -> str:
        return "汪"


class Cat(Animal):
    def speak(self) -> str:
        return "喵"


animals: list[Animal] = [Dog("Coco", "Corgi"), Cat("Mimi")]

for animal in animals:
    print(animal.name, animal.speak())
```

- 子类继承父类公开行为。
- 同名方法在子类中被重写。
- `super()` 按方法解析顺序调用下一个实现，不应简单理解为“指定父类对象”。

### 多重继承与 MRO

Python 支持多重继承。方法解析顺序（MRO）决定属性查找和 `super()` 调用次序：

```python
class A:
    def process(self) -> None:
        print("A")


class B(A):
    def process(self) -> None:
        print("B")
        super().process()


class C(A):
    def process(self) -> None:
        print("C")
        super().process()


class D(B, C):
    def process(self) -> None:
        print("D")
        super().process()


D().process()
print([cls.__name__ for cls in D.mro()])
```

输出：

```text
D
B
C
A
['D', 'B', 'C', 'A', 'object']
```

协作式多重继承要求链上的实现都合理调用 `super()`，并保持兼容的参数签名。复杂业务层级更适合组合。

### 组合优于继承

继承表示“是一个（is-a）”，组合表示“拥有一个（has-a）”。

```python
class JsonStorage:
    def save(self, data: dict[str, object]) -> None:
        print("保存 JSON", data)


class UserService:
    def __init__(self, storage: JsonStorage) -> None:
        self.storage = storage

    def create_user(self, name: str) -> None:
        self.storage.save({"name": name})


service = UserService(JsonStorage())
service.create_user("Alice")
```

组合让依赖更容易替换和测试，也避免为复用少量代码创建不自然的继承关系。

### 抽象基类

抽象基类声明子类必须实现的接口：

```python
from abc import ABC, abstractmethod
from math import pi


class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        """返回面积。"""


class Circle(Shape):
    def __init__(self, radius: float) -> None:
        self.radius = radius

    def area(self) -> float:
        return pi * self.radius ** 2


shape: Shape = Circle(2)
print(shape.area())
```

未实现抽象方法的子类不能实例化。若只关心“对象是否具备某些方法”，类型提示中的 `Protocol` 往往更灵活。

### 🌟数据类 `dataclass`

数据类自动生成常用的初始化、表示和比较方法，适合以数据为核心的模型：

```python
from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class Task:
    title: str
    priority: int = 0
    tags: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)
    completed: bool = False

    def __post_init__(self) -> None:
        if not self.title.strip():
            raise ValueError("title 不能为空")
        if not 0 <= self.priority <= 5:
            raise ValueError("priority 必须在 0 到 5 之间")


task = Task("学习 dataclass", tags=["python"])
print(task)
```

普通类中的可变类属性会被实例共享；数据类则会拒绝常见的直接可变默认字段。需要每个数据类实例拥有独立对象时，应使用 `field(default_factory=...)`。

不可变值对象：

```python
@dataclass(frozen=True, slots=True)
class Point:
    x: float
    y: float
```

- `frozen=True` 阻止普通字段重新赋值，但不是绝对安全沙箱；字段引用的可变对象仍可能变化。
- `slots=True` 减少常见实例的属性存储开销，并限制随意增加属性。
- `dataclasses.asdict()` 会递归转换数据类；嵌套大对象时留意复制成本。

### 枚举 `Enum`

枚举为一组有限选项提供名称和类型：

```python
from enum import Enum, auto


class Status(Enum):
    TODO = auto()
    IN_PROGRESS = auto()
    DONE = auto()


status = Status.TODO

if status is Status.TODO:
    print(status.name, status.value)
```

枚举成员是单例，因此成员之间常用 `is` 比较。

需要与字符串值交互：

```python
class Color(str, Enum):
    RED = "red"
    GREEN = "green"
    BLUE = "blue"
```

Python 3.11+ 也可以使用 `enum.StrEnum`。

### 🌟特殊方法与 Python 数据模型

双下划线特殊方法让自定义对象参与语言内置语法。它们通常由解释器调用，不应随意直接调用。

#### `__repr__()` 与 `__str__()`

```python
class Book:
    def __init__(self, title: str, author: str) -> None:
        self.title = title
        self.author = author

    def __repr__(self) -> str:
        return f"Book(title={self.title!r}, author={self.author!r})"

    def __str__(self) -> str:
        return f"《{self.title}》— {self.author}"


book = Book("Python Notes", "Rainn")
print(book)        # 调用 __str__
print(repr(book))  # 调用 __repr__
```

- `__repr__()` 面向开发与调试，目标是明确、无歧义。
- `__str__()` 面向用户，可更友好。
- 没有 `__str__()` 时会回退到 `__repr__()`。

#### 相等性与哈希

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class Coordinate:
    x: int
    y: int


left = Coordinate(1, 2)
right = Coordinate(1, 2)

print(left == right)  # True
print(left is right)  # False
print({left, right})  # 只有一个元素
```

如果定义了基于可变字段的 `__eq__()`，通常不应让对象可哈希，否则对象放入集合后字段变化会破坏查找规则。不可变值对象更适合作为字典键。

#### 容器协议

```python
class Playlist:
    def __init__(self, songs: list[str]) -> None:
        self._songs = list(songs)

    def __len__(self) -> int:
        return len(self._songs)

    def __iter__(self):
        return iter(self._songs)

    def __contains__(self, song: object) -> bool:
        return song in self._songs

    def __getitem__(self, index: int) -> str:
        return self._songs[index]


playlist = Playlist(["A", "B", "C"])

print(len(playlist))
print("B" in playlist)
print(playlist[0])

for song in playlist:
    print(song)
```

#### 运算符重载

```python
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Vector:
    x: float
    y: float

    def __add__(self, other: Vector) -> Vector:
        if not isinstance(other, Vector):
            return NotImplemented
        return Vector(self.x + other.x, self.y + other.y)

    def __abs__(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5


print(Vector(1, 2) + Vector(3, 4))
print(abs(Vector(3, 4)))  # 5.0
```

当操作数类型不支持时返回 `NotImplemented`，让 Python 尝试反向操作或抛出正确的 `TypeError`，不要直接返回 `False`。

### `__slots__`

普通实例通常通过 `__dict__` 保存属性。`__slots__` 可以声明固定属性：

```python
class Pixel:
    __slots__ = ("x", "y")

    def __init__(self, x: int, y: int) -> None:
        self.x = x
        self.y = y
```

优点：

- 大量小实例时可能减少内存。
- 防止拼写错误导致意外新属性。

限制：

- 继承设计更复杂。
- 默认没有 `__dict__` 和弱引用支持。
- 不应把它当作访问控制机制。

先通过性能和内存测量确认需要，再使用 `__slots__`。

### 属性查找概览

表达式 `obj.attribute` 背后涉及实例、类、基类以及描述符。简化理解：

1. 数据描述符可能优先处理访问。
2. 查找实例自身属性。
3. 沿类的 MRO 查找类属性和非数据描述符。
4. 若仍未找到，可调用 `__getattr__()`。

方法之所以会自动绑定 `self`，是因为普通函数对象实现了描述符协议。

不要轻易重写 `__getattribute__()`，因为它拦截所有属性访问，写错后很容易无限递归。

---

## 🌟迭代器与生成器

### 可迭代对象与迭代器

| 概念 | 定义 | 常见例子 |
| :--- | :--- | :--- |
| 可迭代对象（iterable） | 可由 `iter()` 获取迭代器 | `list`、`tuple`、`str`、`dict`、`range` |
| 迭代器（iterator） | 实现 `__iter__()`（返回自身）和 `__next__()` | `iter([1, 2])`、生成器、文件对象 |

```python
numbers = [10, 20, 30]
iterator = iter(numbers)

print(next(iterator))  # 10
print(next(iterator))  # 20
print(next(iterator))  # 30
```

继续 `next()` 会抛出 `StopIteration`。`for` 循环会自动完成：

1. 调用 `iter(iterable)` 获取迭代器。
2. 反复调用 `next(iterator)`。
3. 捕获 `StopIteration` 并正常结束循环。

列表通常可以多次迭代，因为每次 `iter(list)` 都能得到新迭代器；迭代器本身通常只能向前消费一次。

```python
iterator = iter([1, 2, 3])

print(list(iterator))  # [1, 2, 3]
print(list(iterator))  # []，已经耗尽
```

### 自定义迭代器

```python
class Countdown:
    def __init__(self, start: int) -> None:
        if start < 0:
            raise ValueError("start 不能为负数")
        self.current = start

    def __iter__(self) -> "Countdown":
        return self

    def __next__(self) -> int:
        if self.current == 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value


for number in Countdown(3):
    print(number)
```

迭代器的 `__iter__()` 返回自身。若对象需要支持多次独立遍历，更适合让 `__iter__()` 每次返回新迭代器或直接写成生成器。

### 生成器函数

函数体中出现 `yield`，调用后返回生成器对象。**调用生成器函数时，函数体并不会立刻完整执行；首次迭代才开始运行。**

```python
def countdown(start: int):
    print("开始倒计时")
    while start > 0:
        yield start
        start -= 1
    print("倒计时结束")


generator = countdown(3)
print(generator)

for number in generator:
    print(number)
```

`yield` 会：

1. 产出一个值。
2. 暂停函数。
3. 保存局部变量和执行位置。
4. 下次迭代时从暂停处继续。

生成器正常结束使用 `return` 或运行到函数末尾。不要在生成器中手动抛出 `StopIteration`。

### 惰性计算

列表推导式立即计算全部结果：

```python
squares_list = [number ** 2 for number in range(1_000_000)]
```

生成器表达式按需计算：

```python
squares_generator = (
    number ** 2
    for number in range(1_000_000)
)

first_ten_sum = sum(
    next(squares_generator)
    for _ in range(10)
)
```

惰性计算可以减少一次性内存占用，也能处理无限序列，但并不意味着“零内存”：生成器仍会保存执行状态和它引用的对象。

### 生成器管道

```python
from collections.abc import Iterable, Iterator


def read_clean_lines(lines: Iterable[str]) -> Iterator[str]:
    for line in lines:
        clean = line.strip()
        if clean:
            yield clean


def only_errors(lines: Iterable[str]) -> Iterator[str]:
    for line in lines:
        if "ERROR" in line:
            yield line


with open("app.log", encoding="utf-8") as file:
    for error_line in only_errors(read_clean_lines(file)):
        print(error_line)
```

每层只处理一个元素，不必先把整个日志读入内存。

### `yield from`

`yield from` 把产出工作委托给另一个可迭代对象：

```python
from collections.abc import Iterable, Iterator


def flatten(nested: Iterable[Iterable[int]]) -> Iterator[int]:
    for group in nested:
        yield from group


print(list(flatten([[1, 2], [3], [4, 5]])))
```

在生成器之间传递 `send()`、异常和返回值时，`yield from` 还有更完整的委托语义；普通数据管道先掌握“依次产出子序列”即可。

### `send()` 简介

生成器也能接收调用方发送的值：

```python
def running_average():
    total = 0.0
    count = 0
    average = None

    while True:
        value = yield average
        total += value
        count += 1
        average = total / count


averager = running_average()
next(averager)          # 启动到第一个 yield
print(averager.send(10))  # 10.0
print(averager.send(20))  # 15.0
averager.close()
```

普通迭代很少需要 `send()`。复杂双向流程通常用对象、队列或 `asyncio` 表达更清楚。

---

## 函数式工具与常用数据结构

### `map()`、`filter()` 与推导式

```python
numbers = [1, 2, 3, 4]

mapped = map(lambda number: number ** 2, numbers)
filtered = filter(lambda number: number % 2 == 0, numbers)

print(list(mapped))
print(list(filtered))
```

`map()` 与 `filter()` 返回惰性迭代器。简单逻辑通常用推导式更直观：

```python
squares = [number ** 2 for number in numbers]
evens = [number for number in numbers if number % 2 == 0]
```

已有清晰具名函数，或需要构建长惰性管道时，`map()` 仍然合适。

### `any()` 与 `all()`

```python
scores = [70, 85, 92]

print(any(score >= 90 for score in scores))  # 至少一个为真
print(all(score >= 60 for score in scores))  # 全部为真
```

短路规则：

- `any()` 遇到第一个真值就停止。
- `all()` 遇到第一个假值就停止。
- `any([])` 是 `False`。
- `all([])` 是 `True`，这是逻辑上的“空真”。

### `functools.partial`

`partial()` 预先固定一部分参数：

```python
from functools import partial


def power(base: float, exponent: float) -> float:
    return base ** exponent


square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))
print(cube(5))
```

它也能避免闭包循环晚绑定：

```python
functions = [partial(power, exponent=i) for i in range(3)]
print([function(2) for function in functions])  # [1, 2, 4]
```

### `reduce()`

```python
from functools import reduce
from operator import mul

product = reduce(mul, [1, 2, 3, 4], 1)
print(product)  # 24
```

求和优先 `sum()`，拼接优先 `str.join()`，最大最小值优先 `max()` / `min()`。只有确实表达累计归约时再用 `reduce()`。

### 缓存

```python
from functools import cache


@cache
def fibonacci(number: int) -> int:
    if number < 2:
        return number
    return fibonacci(number - 1) + fibonacci(number - 2)


print(fibonacci(100))
print(fibonacci.cache_info())
```

有限缓存：

```python
from functools import lru_cache


@lru_cache(maxsize=256)
def load_user(user_id: int) -> str:
    return expensive_lookup(user_id)
```

缓存要求：

- 参数必须可哈希。
- 函数对相同参数应返回可复用结果。
- 注意过期、内存占用和外部数据变化。
- 不要无意缓存包含密码、令牌等敏感数据。

### `collections.Counter`

```python
from collections import Counter

words = "python is clear and python is powerful".split()
counts = Counter(words)

print(counts)
print(counts["python"])       # 2
print(counts["missing"])      # 0
print(counts.most_common(2))  # [('python', 2), ('is', 2)]
```

计数器支持集合式运算：

```python
left = Counter(a=3, b=1)
right = Counter(a=1, c=2)

print(left + right)
print(left - right)  # 会丢弃零或负计数
```

### `defaultdict`

```python
from collections import defaultdict

groups: defaultdict[str, list[str]] = defaultdict(list)

for name, department in [
    ("Alice", "研发"),
    ("Bob", "设计"),
    ("Carol", "研发"),
]:
    groups[department].append(name)

print(dict(groups))
```

访问缺失键会立即创建默认值。只想读取而不改变字典时，普通 `dict.get()` 更合适。

### `deque`

`list.pop(0)` 需要移动后续元素，频繁从两端操作时使用双端队列：

```python
from collections import deque

queue: deque[str] = deque()
queue.append("task-a")
queue.append("task-b")

current = queue.popleft()
print(current)
```

固定长度窗口：

```python
recent = deque(maxlen=3)

for value in [1, 2, 3, 4, 5]:
    recent.append(value)

print(recent)  # deque([3, 4, 5], maxlen=3)
```

### `namedtuple` 与数据类

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
point = Point(3, 4)

print(point.x, point.y)
```

`namedtuple` 轻量、不可变且兼容元组接口。需要默认值、验证、方法、继承或更强类型表达时，通常选 `dataclass`。

### `ChainMap`

```python
from collections import ChainMap

defaults = {"theme": "light", "timeout": 10}
environment = {"timeout": 5}
command_line = {"theme": "dark"}

config = ChainMap(command_line, environment, defaults)

print(config["theme"])    # dark
print(config["timeout"])  # 5
```

查找从前到后进行；写入默认只修改第一层映射。

### `itertools`

`itertools` 提供高效的惰性迭代工具。

```python
from itertools import (
    chain,
    combinations,
    count,
    cycle,
    islice,
    pairwise,
    product,
)

print(list(chain([1, 2], [3, 4])))
print(list(product("AB", repeat=2)))
print(list(combinations([1, 2, 3], 2)))
print(list(pairwise([10, 20, 30, 40])))
```

处理无限迭代器时必须设置停止条件：

```python
even_numbers = (number * 2 for number in count())
print(list(islice(even_numbers, 5)))  # [0, 2, 4, 6, 8]

colors = cycle(["red", "green", "blue"])
print(list(islice(colors, 7)))
```

分组前通常需要先按同一个键排序：

```python
from itertools import groupby

records = [
    {"department": "设计", "name": "Bob"},
    {"department": "研发", "name": "Alice"},
    {"department": "研发", "name": "Carol"},
]
records.sort(key=lambda item: item["department"])

for department, group in groupby(
    records,
    key=lambda item: item["department"],
):
    print(department, [item["name"] for item in group])
```

`groupby()` 只把**连续的同键元素**分为一组，而且返回的分组迭代器与源迭代器共享状态。

### `heapq`

`heapq` 实现最小堆，适合优先队列和 Top K：

```python
import heapq

numbers = [20, 5, 15, 1, 8]
heapq.heapify(numbers)

print(heapq.heappop(numbers))  # 1
heapq.heappush(numbers, 3)
print(numbers[0])              # 当前最小值
```

```python
scores = [88, 95, 72, 99, 91]
print(heapq.nlargest(3, scores))
print(heapq.nsmallest(2, scores))
```

堆列表只有第一个元素保证最小，整体显示顺序不是完整排序。

### `bisect`

对已排序列表二分查找插入位置：

```python
from bisect import bisect_left, insort

numbers = [10, 20, 30, 40]
position = bisect_left(numbers, 25)
print(position)  # 2

insort(numbers, 25)
print(numbers)
```

二分查找是对数复杂度，但列表中间插入仍需要移动元素，整体插入是线性复杂度。

---

## 类型提示与静态检查

### 基础注解

```python
name: str = "Alice"
age: int = 20
scores: list[float] = [88.5, 92.0]
metadata: dict[str, str] = {"source": "manual"}


def average(values: list[float]) -> float:
    return sum(values) / len(values)
```

类型提示默认不会在运行时强制类型：

```python
def double(number: int) -> int:
    return number * 2


print(double("ha"))  # 运行时得到 "haha"，静态检查器会报告问题
```

它们主要服务于：

- IDE 补全与重构。
- 静态检查器，如 mypy、pyright。
- 文档与代码审查。
- 框架在运行时读取注解的特定功能。

Python 仍然是动态类型语言。

### 联合类型与 `None`

```python
def find_user(user_id: int) -> str | None:
    if user_id == 1:
        return "Alice"
    return None
```

使用前进行类型收窄：

```python
user = find_user(1)

if user is None:
    print("未找到")
else:
    print(user.upper())
```

`Optional[str]` 等价于 `str | None`，它表示值可以是 `None`，**不表示参数可以省略**：

```python
from typing import Optional


def show(value: Optional[str]) -> None:
    print(value)


show()  # 错误：仍然缺少参数
```

### `Any` 与 `object`

```python
from typing import Any


def unchecked(value: Any) -> None:
    value.anything().goes()  # 静态检查被大幅放宽


def safe_unknown(value: object) -> None:
    if isinstance(value, str):
        print(value.upper())
```

- `Any` 表示“退出这部分类型检查”，会向外传播不确定性。
- `object` 表示“可以接收任何对象，但使用前必须收窄类型”。

边界处接收未知输入时，优先考虑 `object` 或更准确的协议，而不是到处使用 `Any`。

### 类型别名

Python 3.10 兼容写法：

```python
UserId = int
Coordinates = tuple[float, float]
Headers = dict[str, str]
```

`TypeAlias` 可明确表达意图：

```python
from typing import TypeAlias

JsonValue: TypeAlias = (
    None
    | bool
    | int
    | float
    | str
    | list["JsonValue"]
    | dict[str, "JsonValue"]
)
```

Python 3.12+ 支持新的 `type` 语句：

```python
type Coordinates = tuple[float, float]
```

### `Callable`

```python
from collections.abc import Callable

Transformer = Callable[[str], str]


def apply_transform(
    text: str,
    transform: Transformer,
) -> str:
    return transform(text)
```

`Callable[[A, B], R]` 表示接收 `A`、`B` 并返回 `R`。复杂回调签名可使用 `Protocol`。

### 用 `ParamSpec` 标注装饰器

基础章节中的装饰器为了突出运行机制，省略了复杂类型。需要保留被包装函数的参数和返回类型时，可以使用 `ParamSpec` 与 `TypeVar`：

```python
from collections.abc import Callable
from functools import wraps
from typing import ParamSpec, TypeVar

P = ParamSpec("P")
R = TypeVar("R")


def traced(
    function: Callable[P, R],
) -> Callable[P, R]:
    @wraps(function)
    def wrapper(
        *args: P.args,
        **kwargs: P.kwargs,
    ) -> R:
        print(f"调用 {function.__name__}")
        return function(*args, **kwargs)

    return wrapper
```

这样静态检查器仍能知道装饰后函数的原参数签名和返回类型。

### `Literal`

```python
from typing import Literal


def open_connection(
    mode: Literal["read", "write"],
) -> None:
    print(mode)


open_connection("read")
```

`Literal` 适合非常有限的固定值。选项形成独立领域概念时，枚举更合适。

### `TypedDict`

普通字典的固定结构可以用 `TypedDict` 表达：

```python
from typing import TypedDict


class RequiredUserFields(TypedDict):
    name: str
    age: int


class UserPayload(RequiredUserFields, total=False):
    email: str


def display_user(user: UserPayload) -> None:
    print(user["name"], user["age"])


payload: UserPayload = {"name": "Alice", "age": 20}
display_user(payload)
```

`TypedDict` 主要用于静态检查，运行时对象仍是普通 `dict`。

### 泛型与 `TypeVar`

```python
from typing import Generic, TypeVar

T = TypeVar("T")


class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        if not self._items:
            raise IndexError("stack is empty")
        return self._items.pop()


stack: Stack[int] = Stack()
stack.push(10)
print(stack.pop())
```

泛型函数：

```python
T = TypeVar("T")


def first(items: list[T]) -> T:
    if not items:
        raise ValueError("items 不能为空")
    return items[0]
```

### `Protocol`

协议用结构化类型表达“只要具备这些行为即可”，不要求显式继承。

```python
from typing import Protocol


class SupportsSave(Protocol):
    def save(self, data: str) -> None:
        ...


class FileStorage:
    def save(self, data: str) -> None:
        print(f"保存：{data}")


def persist(storage: SupportsSave, data: str) -> None:
    storage.save(data)


persist(FileStorage(), "hello")
```

这体现了 Python 常见的鸭子类型思想：关注能力，而不是具体继承树。

### `Self`（3.11+）

```python
from typing import Self


class Query:
    def where(self, condition: str) -> Self:
        self.condition = condition
        return self
```

`Self` 能正确表示子类调用后仍返回子类类型。

### `cast()`

```python
from typing import cast

value: object = load_unknown_value()
name = cast(str, value)
```

`cast(str, value)` **不会转换或校验对象**，运行时基本返回原对象。它只是告诉静态检查器“开发者已经确认类型”，因此必须有可靠依据。

### 运行时类型检查的边界

```python
values = [1, 2, 3]

print(isinstance(values, list))  # 可以
```

不能写：

```python
isinstance(values, list[int])  # TypeError
```

类型参数不会让容器在运行时自动校验元素。`list[int]` 等参数化泛型仍保留部分可由 `typing.get_origin()`、`typing.get_args()` 内省的元数据，但不能直接作为 `isinstance()` 的第二个参数。需要验证外部 JSON、表单等数据时，应编写明确校验逻辑或使用专门的数据验证工具。

### 静态检查工作流

```bash
python -m pip install mypy
python -m mypy src tests
```

也可以选择 pyright。项目应固定一种主要检查器及其配置，逐步提高严格度。

类型提示的目标不是追求“所有表达式都写类型”，而是在接口、数据模型和复杂逻辑处减少歧义。

---

## 标准库实用工具箱

### `collections.abc`

接口类型优先从 `collections.abc` 导入：

```python
from collections.abc import (
    Callable,
    Iterable,
    Iterator,
    Mapping,
    MutableMapping,
    Sequence,
)


def print_values(values: Iterable[str]) -> None:
    for value in values:
        print(value)


def lookup(config: Mapping[str, str], key: str) -> str | None:
    return config.get(key)
```

参数只需要遍历能力时写 `Iterable[T]`，只需要只读映射时写 `Mapping[K, V]`，不要无谓限制调用方必须传 `list` 或 `dict`。

### `datetime` 与 `zoneinfo`

```python
from datetime import date, datetime, timedelta, timezone

today = date.today()
now_utc = datetime.now(timezone.utc)
tomorrow = today + timedelta(days=1)

print(today.isoformat())
print(now_utc.isoformat())
print(tomorrow)
```

解析和格式化：

```python
text = "2026-07-29T12:30:00+00:00"
moment = datetime.fromisoformat(text)

print(moment.strftime("%Y年%m月%d日 %H:%M"))

parsed = datetime.strptime(
    "2026-07-29 20:30",
    "%Y-%m-%d %H:%M",
)
```

时区：

```python
from zoneinfo import ZoneInfo

shanghai = ZoneInfo("Asia/Shanghai")
new_york = ZoneInfo("America/New_York")

local_time = datetime.now(shanghai)
remote_time = local_time.astimezone(new_york)
```

- **naive datetime**：没有时区信息。
- **aware datetime**：带时区信息。

跨系统存储和传输通常使用带时区的 ISO 8601 时间，内部可统一为 UTC，展示时再转用户时区。不要给一个 naive datetime 随意替换 `tzinfo` 来假装完成时区换算。

### `math` 与 `statistics`

```python
import math
import statistics

values = [1.0, 2.0, 3.0, 10.0]

print(math.sqrt(16))
print(math.ceil(2.1))
print(math.floor(2.9))
print(math.gcd(12, 18))
print(math.prod([2, 3, 4]))

print(statistics.mean(values))
print(statistics.median(values))
print(statistics.stdev(values))
```

大数求和可使用 `math.fsum()` 改善浮点累加精度：

```python
print(math.fsum([0.1] * 10))
```

### `random` 与 `secrets`

模拟、抽样和游戏：

```python
import random

print(random.randint(1, 6))         # 闭区间
print(random.randrange(0, 10, 2))
print(random.choice(["A", "B", "C"]))
print(random.sample(range(100), k=5))

items = [1, 2, 3, 4]
random.shuffle(items)               # 原地打乱
```

测试中可设种子得到可重复结果：

```python
rng = random.Random(42)
print(rng.random())
```

密码、重置令牌和 API 密钥不能用 `random`，应使用 `secrets`：

```python
import secrets

token = secrets.token_urlsafe(32)
verification_code = f"{secrets.randbelow(1_000_000):06d}"
```

### `os`、`sys` 与环境变量

```python
import os
import sys

api_url = os.environ.get("APP_API_URL", "http://localhost:8000")
required_token = os.environ["APP_TOKEN"]  # 缺失时立即 KeyError

print(sys.version)
print(sys.executable)
print(sys.argv)
print(sys.platform)
```

敏感信息通过环境、密钥服务或受权限保护的配置注入，不应硬编码或提交到仓库。

退出码：

```python
def main() -> int:
    if configuration_is_invalid():
        print("配置错误", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

约定上 `0` 表示成功，非零表示失败。

### `argparse`

```python
import argparse


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="统计文本中的单词",
    )
    parser.add_argument("path", help="文本文件路径")
    parser.add_argument(
        "-n",
        "--top",
        type=int,
        default=10,
        help="显示前 N 个结果",
    )
    parser.add_argument(
        "--ignore-case",
        action="store_true",
        help="忽略大小写",
    )
    return parser


def main() -> None:
    args = build_parser().parse_args()
    print(args.path, args.top, args.ignore_case)


if __name__ == "__main__":
    main()
```

子命令：

```python
parser = argparse.ArgumentParser()
subparsers = parser.add_subparsers(dest="command", required=True)

add_parser = subparsers.add_parser("add")
add_parser.add_argument("title")

list_parser = subparsers.add_parser("list")
list_parser.add_argument("--completed", action="store_true")
```

`argparse` 自动生成 `--help`、校验基础参数并返回恰当退出码。

### `logging`

不要用散落的 `print()` 代替可配置日志：

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

logger.debug("调试细节")
logger.info("服务启动")
logger.warning("缓存即将过期")
```

记录异常堆栈：

```python
try:
    process_data()
except ValueError:
    logger.exception("处理数据失败")
```

日志级别：

| 级别 | 用途 |
| :--- | :--- |
| `DEBUG` | 开发期细节 |
| `INFO` | 正常业务事件 |
| `WARNING` | 可恢复但值得注意 |
| `ERROR` | 当前操作失败 |
| `CRITICAL` | 系统可能无法继续服务 |

不要在日志中记录明文密码、令牌、身份证号等敏感信息。

### `subprocess`

安全调用外部程序时传参数列表：

```python
import subprocess

result = subprocess.run(
    ["python3", "--version"],
    check=True,
    capture_output=True,
    text=True,
    timeout=10,
)
print(result.stdout or result.stderr)
```

- `check=True`：非零退出码时抛 `CalledProcessError`。
- `timeout`：限制等待时间。
- `capture_output=True`：捕获标准输出与错误。
- `text=True`：以文本形式返回。

不要把不可信输入拼进命令字符串并设置 `shell=True`，否则可能造成命令注入。

### `hashlib` 与 `hmac`

计算文件哈希：

```python
import hashlib
from pathlib import Path


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()

    with path.open("rb") as file:
        while chunk := file.read(1024 * 1024):
            digest.update(chunk)

    return digest.hexdigest()
```

哈希用于完整性校验，不是加密。密码存储需要专门的慢哈希 / KDF 方案和随机盐，不能直接保存 `sha256(password)`。

验证带共享密钥的消息：

```python
import hashlib
import hmac

expected = hmac.new(secret_key, message, hashlib.sha256).digest()
valid = hmac.compare_digest(expected, received_signature)
```

### `uuid`

```python
from uuid import uuid4

identifier = uuid4()
print(identifier)
print(identifier.hex)
```

UUID 适合生成分布式唯一标识，但不是访问令牌，也不应默认被视为不可猜测的权限凭据。

### `tomllib`（3.11+）

标准库可以读取 TOML：

```python
import tomllib

with open("pyproject.toml", "rb") as file:
    configuration = tomllib.load(file)

project_name = configuration["project"]["name"]
```

`tomllib` 只负责读取，不提供写入功能。

### `help()`、`inspect` 与 `pydoc`

遇到陌生对象时先查看：

```python
help(str.split)
print(str.split.__doc__)
```

终端文档：

```bash
python3 -m pydoc pathlib.Path
```

运行时检查：

```python
import inspect

print(inspect.signature(print))
print(inspect.isgeneratorfunction(generator_function))
```

不要让反射代替清晰的接口；它主要用于框架、调试和工具构建。

---

## 项目结构与工程实践

### 从脚本到项目

当代码超过一个文件，可以按职责组织：

```text
study-app/
├── .gitignore
├── README.md
├── pyproject.toml
├── src/
│   └── study_app/
│       ├── __init__.py
│       ├── __main__.py
│       ├── cli.py
│       ├── models.py
│       ├── services.py
│       └── storage.py
└── tests/
    ├── test_services.py
    └── test_storage.py
```

推荐依赖方向：

```text
CLI / Web 接口
      ↓
   业务服务
      ↓
存储 / 外部系统
```

- **模型层**：表达核心数据。
- **服务层**：实现业务规则。
- **适配层**：文件、数据库、网络、命令行。
- **入口层**：解析输入，调用服务，格式化输出。

核心业务不直接调用 `input()`、`print()` 或全局数据库，测试会容易很多。

### 导入与依赖边界

好的模块通常：

- 对外暴露少量清晰接口。
- 不在导入时执行外部 I/O。
- 依赖方向稳定，不形成环。
- 接收抽象能力，而不是到处创建具体依赖。

简单依赖注入：

```python
from typing import Protocol


class UserRepository(Protocol):
    def save(self, name: str) -> None:
        ...


class UserService:
    def __init__(self, repository: UserRepository) -> None:
        self.repository = repository

    def register(self, name: str) -> None:
        clean_name = name.strip()
        if not clean_name:
            raise ValueError("name 不能为空")
        self.repository.save(clean_name)
```

测试时可以传入内存实现，生产时传数据库实现。

### 代码风格

常用约定：

- 4 空格缩进。
- 函数、变量：`snake_case`。
- 类：`CapWords` / `PascalCase`。
- 常量：`UPPER_SNAKE_CASE`。
- 模块名：短小、小写，可用下划线。
- 导入按标准库、第三方、本地分组。
- 公共函数和类写文档字符串。
- 行宽是团队风格配置，不是 Python 语法。

PEP 8 是基础风格指南。自动工具可以减少无意义的格式争论，例如：

```bash
python -m pip install ruff
ruff check .
ruff format .
```

也可选择 Black、isort 等工具。一个项目应统一配置，不要让多个格式化工具互相打架。

示例 `pyproject.toml` 配置：

```toml
[tool.ruff]
line-length = 88
target-version = "py310"

[tool.ruff.lint]
select = ["E", "F", "I", "B", "UP"]
```

### 文档字符串

```python
def calculate_discount(
    price: float,
    rate: float,
) -> float:
    """计算折后价格。

    Args:
        price: 原价，必须大于等于 0。
        rate: 折扣率，范围为 0 到 1。

    Returns:
        折后价格。

    Raises:
        ValueError: price 或 rate 超出有效范围。
    """
    if price < 0:
        raise ValueError("price 不能为负数")
    if not 0 <= rate <= 1:
        raise ValueError("rate 必须在 0 到 1 之间")
    return price * (1 - rate)
```

文档重点解释意图、约束和副作用，不要重复一眼可见的实现。

### 配置管理

配置来源通常有优先级：

1. 命令行参数。
2. 环境变量。
3. 项目配置文件。
4. 代码内安全默认值。

```python
from dataclasses import dataclass
import os


@dataclass(frozen=True)
class Settings:
    api_url: str
    timeout: float
    debug: bool


def load_settings() -> Settings:
    return Settings(
        api_url=os.getenv(
            "APP_API_URL",
            "http://localhost:8000",
        ),
        timeout=float(os.getenv("APP_TIMEOUT", "10")),
        debug=os.getenv("APP_DEBUG", "").lower()
        in {"1", "true", "yes"},
    )
```

外部输入可能非法，应在程序启动边界集中验证。不要把密钥写入普通配置样例或日志。

### 依赖安装安全

- 每个项目使用虚拟环境。
- 不向系统 Python 随意安装包，尤其避免 `sudo pip install ...`。
- 遇到 externally managed environment 提示时，不要强行破坏系统环境；创建 `.venv`。
- 安装名称和导入名称可能不同，例如某些发行包安装后使用另一个导入名。
- 只从可信来源安装依赖。
- 应用部署应固定经过验证的依赖版本或锁文件，并定期审计更新。
- `requirements.txt` 是 `pip` 的需求文件格式，不天然保证跨平台、可重复的完整锁定。

### Git 忽略项

常见 `.gitignore`：

```gitignore
.venv/
__pycache__/
*.py[cod]
.pytest_cache/
.mypy_cache/
.ruff_cache/
.coverage
htmlcov/
build/
dist/
*.egg-info/
.env
```

不要只依靠 `.gitignore` 保护已经提交过的秘密；一旦密钥进入版本历史，应立即撤销并轮换。

---

## 🌟测试、调试与质量保障

### 为什么测试

测试用于：

- 确认行为满足需求。
- 防止修改引入回归。
- 记录边界条件和接口用法。
- 支持安全重构。

测试不能证明程序绝对无错，但能显著降低已知风险。

### Arrange — Act — Assert

```python
def normalize_name(name: str) -> str:
    clean = " ".join(name.split())
    if not clean:
        raise ValueError("name 不能为空")
    return clean.title()


def test_normalize_name() -> None:
    # Arrange
    raw = "  alice   smith "

    # Act
    result = normalize_name(raw)

    # Assert
    assert result == "Alice Smith"
```

每个测试尽量表达一个行为，失败时名称就能说明问题。

### 标准库 `unittest`

```python
import unittest


class NormalizeNameTests(unittest.TestCase):
    def test_removes_extra_spaces_and_title_cases(self) -> None:
        result = normalize_name("  alice   smith ")
        self.assertEqual(result, "Alice Smith")

    def test_rejects_blank_name(self) -> None:
        with self.assertRaisesRegex(
            ValueError,
            "name 不能为空",
        ):
            normalize_name("   ")


if __name__ == "__main__":
    unittest.main()
```

运行：

```bash
python3 -m unittest
python3 -m unittest discover -s tests
```

### `pytest`

`pytest` 是常用第三方测试框架：

```bash
python -m pip install pytest
python -m pytest
```

普通测试就是带 `test_` 前缀的函数：

```python
import pytest


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("alice", "Alice"),
        ("  alice smith ", "Alice Smith"),
        ("ALICE", "Alice"),
    ],
)
def test_normalize_name(raw: str, expected: str) -> None:
    assert normalize_name(raw) == expected


def test_normalize_name_rejects_blank() -> None:
    with pytest.raises(ValueError, match="不能为空"):
        normalize_name(" ")
```

参数化可以用同一行为测试多个输入。

### Fixtures

```python
from pathlib import Path

import pytest


@pytest.fixture
def sample_file(tmp_path: Path) -> Path:
    path = tmp_path / "sample.txt"
    path.write_text("one\ntwo\n", encoding="utf-8")
    return path


def test_line_count(sample_file: Path) -> None:
    content = sample_file.read_text(encoding="utf-8")
    assert len(content.splitlines()) == 2
```

Fixture 用于建立并清理测试依赖。避免创建巨大的全局 fixture，让测试彼此隐式耦合。

### Mock 与依赖替换

最容易测试的方式是让代码接收依赖：

```python
from dataclasses import dataclass, field


@dataclass
class InMemoryRepository:
    saved: list[str] = field(default_factory=list)

    def save(self, name: str) -> None:
        self.saved.append(name)


def test_register_saves_clean_name() -> None:
    repository = InMemoryRepository()
    service = UserService(repository)

    service.register("  Alice ")

    assert repository.saved == ["Alice"]
```

必须模拟调用时可使用 `unittest.mock`：

```python
from unittest.mock import Mock

repository = Mock()
service = UserService(repository)

service.register("Alice")

repository.save.assert_called_once_with("Alice")
```

Mock 应替换系统边界，如网络、时间、邮件和外部进程。不要把每个内部函数都 Mock 掉，否则测试只会复制实现细节。

### 测试异常与边界

至少考虑：

- 空输入。
- 最小值、最大值和边界两侧。
- 重复数据。
- 文件不存在、权限不足、格式损坏。
- 网络超时和非成功状态。
- 并发取消和部分失败。
- 非 ASCII 文本。
- 时区和夏令时。

测试中不仅检查“抛异常”，还应检查异常类型和必要消息。

### 单元测试、集成测试与端到端测试

| 类型 | 范围 | 特点 |
| :--- | :--- | :--- |
| 单元测试 | 函数、类、纯业务规则 | 快、定位准 |
| 集成测试 | 数据库、文件、多个模块协作 | 更接近真实边界 |
| 端到端测试 | 从用户入口到最终结果 | 信心高、成本和脆弱性也高 |

以大量快速单元测试打底，为关键边界编写集成测试，只保留少量高价值端到端测试。

### `doctest`

文档字符串中的交互式示例可以被验证：

```python
def add(x: int, y: int) -> int:
    """返回两个整数的和。

    >>> add(2, 3)
    5
    >>> add(-1, 1)
    0
    """
    return x + y
```

```bash
python3 -m doctest -v module.py
```

`doctest` 适合小而稳定的示例，不适合承担全部测试。

### 覆盖率

覆盖率说明哪些代码被执行过，不代表断言质量：

```bash
python -m pip install coverage
python -m coverage run -m pytest
python -m coverage report -m
```

优先覆盖重要分支和失败路径，不为追求 100% 数字编写无意义测试。

### `breakpoint()` 与 `pdb`

```python
def calculate(items: list[int]) -> int:
    breakpoint()
    return sum(items)
```

常用 `pdb` 命令：

| 命令 | 含义 |
| :--- | :--- |
| `n` | 执行下一行，不进入函数 |
| `s` | 进入函数 |
| `c` | 继续运行到下个断点 |
| `p expression` | 打印表达式 |
| `pp expression` | 美化打印 |
| `l` | 查看附近源码 |
| `q` | 退出调试 |

也可以：

```bash
python3 -m pdb app.py
```

调试时先缩小问题：

1. 获得可重复的失败输入。
2. 阅读完整回溯，从最底部异常向上看调用链。
3. 在边界记录关键值和类型。
4. 写一个失败测试。
5. 修复根因后保留回归测试。

### 静态与自动检查

一个常见本地检查顺序：

```bash
ruff check .
ruff format --check .
python -m mypy src
python -m pytest
```

具体工具并不唯一，关键是把项目采用的命令写进 README，并在持续集成中重复执行。

---

## 网络请求基础

### HTTP 基础

常见请求方法：

| 方法 | 典型语义 |
| :--- | :--- |
| `GET` | 获取资源 |
| `POST` | 创建资源或提交操作 |
| `PUT` | 完整替换资源 |
| `PATCH` | 部分更新资源 |
| `DELETE` | 删除资源 |

常见状态码：

- `2xx`：请求成功。
- `3xx`：重定向。
- `4xx`：客户端请求问题。
- `5xx`：服务端问题。

网络代码应明确：

- 超时。
- 状态码处理。
- 编码与 JSON 解析错误。
- 可重试与不可重试错误。
- 连接和响应资源关闭。
- API 密钥来源。

### 标准库 `urllib.request`

```python
import json
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


def fetch_json(url: str) -> object:
    request = Request(
        url,
        headers={"Accept": "application/json"},
    )

    try:
        with urlopen(request, timeout=10) as response:
            charset = response.headers.get_content_charset() or "utf-8"
            body = response.read().decode(charset)
    except HTTPError as error:
        raise RuntimeError(
            f"服务器返回 HTTP {error.code}"
        ) from error
    except URLError as error:
        raise RuntimeError("网络请求失败") from error

    try:
        return json.loads(body)
    except json.JSONDecodeError as error:
        raise RuntimeError("响应不是合法 JSON") from error
```

生产代码还需限制响应大小、验证重定向目标，并根据业务设计重试。第三方 `requests` 或 `httpx` 可以提供更友好的高级接口，但它们不是标准库，项目应显式声明依赖。

### Socket 概念

```python
import socket

with socket.create_connection(
    ("example.com", 80),
    timeout=5,
) as connection:
    request = (
        b"HEAD / HTTP/1.1\r\n"
        b"Host: example.com\r\n"
        b"Connection: close\r\n\r\n"
    )
    connection.sendall(request)
    response = connection.recv(4096)
    print(response.decode("iso-8859-1"))
```

这是理解 TCP 字节流的最小示意。实际 HTTP 客户端应使用成熟库，不要手写协议处理。

---

## 🌟并发、并行与异步

### 核心概念

- **并发（concurrency）**：多个任务在一段时间内交替推进。
- **并行（parallelism）**：多个任务在同一时刻真正执行。
- **I/O 密集**：主要等待网络、磁盘、数据库。
- **CPU 密集**：主要消耗计算资源。

| 方式 | 更适合 | 隔离 | 主要成本 |
| :--- | :--- | :--- | :--- |
| 线程 | 阻塞式 I/O、少量共享状态 | 同一进程，共享内存 | 同步、竞态、线程切换 |
| 进程 | CPU 密集、强隔离 | 独立内存 | 启动、序列化、进程通信 |
| `asyncio` | 大量支持异步接口的 I/O | 单线程事件循环中常见 | 协作式调度、异步生态 |

先从正确、清晰的串行版本开始，再根据测量和依赖接口选择并发模型。

### 线程与 GIL

以下结论针对**默认启用 GIL 的 CPython**：

- 同一进程中通常只有一个线程同时执行 Python 字节码。
- 线程在等待 I/O 时可以让其他线程运行，因此仍适合并发 I/O。
- 一些 C 扩展会释放 GIL，其他 Python 实现也可能采用不同机制。
- CPython 3.13+ 提供可选的 free-threaded 构建，可关闭 GIL；它不是默认构建，部分 C 扩展还可能重新启用 GIL。
- GIL **不等于业务代码线程安全**。检查后修改、复合操作和共享状态仍会发生竞态。

#### `ThreadPoolExecutor`

```python
from concurrent.futures import ThreadPoolExecutor
from time import sleep


def simulated_io(task_id: int) -> str:
    sleep(0.2)
    return f"task-{task_id} done"


with ThreadPoolExecutor(max_workers=4) as executor:
    results = executor.map(simulated_io, range(8))

for result in results:
    print(result)
```

`executor.map()` 按输入顺序提供结果。需要完成一个就处理一个时使用 `submit()` 与 `as_completed()`：

```python
from concurrent.futures import as_completed

with ThreadPoolExecutor(max_workers=4) as executor:
    futures = [
        executor.submit(simulated_io, task_id)
        for task_id in range(8)
    ]

    for future in as_completed(futures):
        try:
            print(future.result())
        except Exception as error:
            print(f"任务失败：{error}")
```

#### 锁

```python
from threading import Lock, Thread

counter = 0
lock = Lock()


def increment_many(times: int) -> None:
    global counter

    for _ in range(times):
        with lock:
            counter += 1


threads = [Thread(target=increment_many, args=(10_000,)) for _ in range(4)]

for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print(counter)
```

锁的范围要尽量小，但必须覆盖完整的不变量。多个锁要保持统一获取顺序，避免死锁。

#### 线程安全队列

生产者与消费者之间优先使用 `queue.Queue`，避免手写共享列表和忙等待：

```python
from queue import Queue
from threading import Thread

jobs: Queue[int | None] = Queue()


def worker() -> None:
    while True:
        job = jobs.get()
        try:
            if job is None:
                return
            print(f"处理 {job}")
        finally:
            jobs.task_done()


thread = Thread(target=worker)
thread.start()

for job in range(3):
    jobs.put(job)

jobs.put(None)
jobs.join()
thread.join()
```

### 多进程

CPU 密集任务可用进程池利用多核：

```python
from concurrent.futures import ProcessPoolExecutor


def count_primes(limit: int) -> int:
    count = 0

    for number in range(2, limit):
        for divisor in range(2, int(number ** 0.5) + 1):
            if number % divisor == 0:
                break
        else:
            count += 1

    return count


def main() -> None:
    limits = [50_000, 55_000, 60_000, 65_000]

    with ProcessPoolExecutor() as executor:
        print(list(executor.map(count_primes, limits)))


if __name__ == "__main__":
    main()
```

多进程注意：

- 入口必须放在 `if __name__ == "__main__":` 保护下，跨平台尤其重要。
- 参数、返回值和提交函数通常需要可序列化。
- 进程启动、复制数据和进程通信有成本。
- 不要为极小任务创建大量进程。
- 子进程不会像线程一样直接共享普通内存对象。

### `asyncio`

#### 协程与事件循环

```python
import asyncio


async def greet(name: str) -> str:
    await asyncio.sleep(0.1)
    return f"Hello, {name}"


async def main() -> None:
    result = await greet("Alice")
    print(result)


if __name__ == "__main__":
    asyncio.run(main())
```

调用 `async def` 函数只会创建协程对象。需要 `await`、创建任务或交给事件循环，函数体才会推进。

在已有事件循环的环境（如部分 Notebook 或异步框架）中，不要再次嵌套调用 `asyncio.run()`。当前代码已经位于 `async def` 中时可直接 `await`；同步回调则要使用所在框架的调度 API，或把协程创建为任务。

#### 顺序等待与并发任务

下面的示例同时比较顺序等待和并发调度：

```python
import asyncio
from time import perf_counter


async def fetch_item(item_id: int) -> str:
    await asyncio.sleep(0.2)
    return f"item-{item_id}"


async def run_sequentially() -> list[str]:
    result_a = await fetch_item(1)
    result_b = await fetch_item(2)
    return [result_a, result_b]


async def run_concurrently() -> list[str]:
    tasks = [
        asyncio.create_task(fetch_item(item_id))
        for item_id in (1, 2)
    ]
    return await asyncio.gather(*tasks)


async def main() -> None:
    start = perf_counter()
    print(await run_sequentially())
    print(f"顺序：{perf_counter() - start:.2f}s")

    start = perf_counter()
    print(await run_concurrently())
    print(f"并发：{perf_counter() - start:.2f}s")


if __name__ == "__main__":
    asyncio.run(main())
```

不要创建任务后丢失所有引用；任务异常可能因此难以及时观察。

#### `TaskGroup`（3.11+）

结构化并发会等待组内任务，并在任务失败时取消相关任务、汇总错误：

```python
import asyncio


async def fetch_item(item_id: int) -> str:
    await asyncio.sleep(0.1)
    return f"item-{item_id}"


async def main() -> None:
    tasks: list[asyncio.Task[str]] = []

    async with asyncio.TaskGroup() as group:
        for item_id in range(5):
            tasks.append(
                group.create_task(fetch_item(item_id))
            )

    results = [task.result() for task in tasks]
    print(results)


if __name__ == "__main__":
    asyncio.run(main())
```

`TaskGroup` 可能以 `ExceptionGroup` 报告多个错误，可使用 `except*` 分类处理（3.11+）：

```python
import asyncio


async def fail(message: str) -> None:
    await asyncio.sleep(0)
    raise ValueError(message)


async def main() -> None:
    try:
        async with asyncio.TaskGroup() as group:
            group.create_task(fail("A 失败"))
            group.create_task(fail("B 失败"))
    except* ValueError as error_group:
        for error in error_group.exceptions:
            print(error)


if __name__ == "__main__":
    asyncio.run(main())
```

### 超时与取消

**Python 3.11+：**

```python
import asyncio


async def long_operation() -> None:
    await asyncio.sleep(10)


async def main() -> None:
    try:
        async with asyncio.timeout(2):
            await long_operation()
    except TimeoutError:
        print("操作超时")


if __name__ == "__main__":
    asyncio.run(main())
```

较早版本可以使用：

```python
import asyncio


async def long_operation() -> None:
    await asyncio.sleep(10)


async def main() -> None:
    try:
        await asyncio.wait_for(
            long_operation(),
            timeout=2,
        )
    except TimeoutError:
        print("操作超时")


if __name__ == "__main__":
    asyncio.run(main())
```

任务取消会在协程中抛出 `asyncio.CancelledError`。它直接继承 `BaseException`，普通 `except Exception` 不会捕获；裸 `except`、`except BaseException` 或显式捕获才可能吞掉取消。显式捕获后通常应完成清理并继续传播：

```python
import asyncio


async def worker() -> None:
    try:
        while True:
            await asyncio.sleep(1)
    except asyncio.CancelledError:
        print("释放 worker 资源")
        raise


async def main() -> None:
    task = asyncio.create_task(worker())
    await asyncio.sleep(0)
    task.cancel()

    try:
        await task
    except asyncio.CancelledError:
        print("worker 已取消")


if __name__ == "__main__":
    asyncio.run(main())
```

不要用宽泛异常处理无意吞掉取消信号。

### 异步中的阻塞操作

协程中使用 `time.sleep()`、同步网络请求或长时间 CPU 计算会阻塞整个事件循环。

```python
import asyncio
import time


# 错误
async def wrong() -> None:
    time.sleep(1)


# 正确的非阻塞等待
async def correct() -> None:
    await asyncio.sleep(1)
```

暂时调用阻塞式 I/O 函数：

```python
import asyncio
from pathlib import Path


def blocking_read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


async def load_text(path: Path) -> str:
    return await asyncio.to_thread(blocking_read, path)
```

在默认启用 GIL 的 CPython 中，CPU 密集的纯 Python 工作通常更适合进程池，而不是塞进事件循环。

### 异步信号量与队列

限制并发数量：

```python
import asyncio


async def fetch_item(item_id: int) -> str:
    await asyncio.sleep(0.1)
    return f"item-{item_id}"


async def limited_worker(
    item_id: int,
    semaphore: asyncio.Semaphore,
) -> str:
    async with semaphore:
        return await fetch_item(item_id)


async def main() -> None:
    semaphore = asyncio.Semaphore(5)
    results = await asyncio.gather(
        *[
            limited_worker(item_id, semaphore)
            for item_id in range(100)
        ]
    )
    print(len(results))


if __name__ == "__main__":
    asyncio.run(main())
```

异步生产者 / 消费者：

```python
import asyncio


async def producer(queue: asyncio.Queue[int | None]) -> None:
    for item in range(5):
        await queue.put(item)
    await queue.put(None)


async def consumer(queue: asyncio.Queue[int | None]) -> None:
    while True:
        item = await queue.get()
        try:
            if item is None:
                return
            print(f"处理 {item}")
        finally:
            queue.task_done()


async def main() -> None:
    queue: asyncio.Queue[int | None] = asyncio.Queue(maxsize=10)
    producer_task = asyncio.create_task(producer(queue))
    consumer_task = asyncio.create_task(consumer(queue))

    await producer_task
    await queue.join()
    await consumer_task


if __name__ == "__main__":
    asyncio.run(main())
```

`asyncio.Lock`、`asyncio.Queue` 用于同一事件循环内协程之间的协调，不是跨线程同步工具。

### 异步迭代器与异步上下文

普通 `for` / `with` 对应同步协议；等待数据或资源时使用异步协议：

| 同步 | 异步 |
| :--- | :--- |
| `__iter__()` / `__next__()` | `__aiter__()` / `__anext__()` |
| `for` | `async for` |
| `__enter__()` / `__exit__()` | `__aenter__()` / `__aexit__()` |
| `with` | `async with` |

异步生成器：

```python
import asyncio
from collections.abc import AsyncIterator


async def ticker(count: int) -> AsyncIterator[int]:
    for number in range(count):
        await asyncio.sleep(0.1)
        yield number


async def main() -> None:
    async for number in ticker(3):
        print(number)


if __name__ == "__main__":
    asyncio.run(main())
```

异步上下文管理器：

```python
import asyncio
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager


@asynccontextmanager
async def connection() -> AsyncIterator[str]:
    print("异步建立连接")
    await asyncio.sleep(0.1)
    try:
        yield "connection"
    finally:
        await asyncio.sleep(0.1)
        print("异步关闭连接")


async def main() -> None:
    async with connection() as resource:
        print(f"使用 {resource}")


if __name__ == "__main__":
    asyncio.run(main())
```

### 测试异步代码

标准库 `unittest.IsolatedAsyncioTestCase` 会为每个测试管理独立事件循环：

```python
import asyncio
import unittest


async def fetch_value() -> int:
    await asyncio.sleep(0)
    return 42


class AsyncTests(unittest.IsolatedAsyncioTestCase):
    async def test_fetch_value(self) -> None:
        result = await fetch_value()
        self.assertEqual(result, 42)


if __name__ == "__main__":
    unittest.main()
```

使用 pytest 时可选择明确支持异步测试的插件，并把它声明为测试依赖；不要在普通同步测试中反复嵌套 `asyncio.run()`。

### 如何选择

1. **少量普通任务**：先串行。
2. **使用阻塞 API 的 I/O 密集任务**：线程池。
3. **默认启用 GIL 的 CPython 中，CPU 密集纯 Python 计算**：进程池，先确认任务足够大。
4. **大量支持异步接口的 I/O**：`asyncio`。
5. **既有同步库又有异步架构**：在明确边界使用 `asyncio.to_thread()`。

并发不会自动让程序变快。锁竞争、连接限制、序列化、远端限流和任务粒度都可能抵消收益。

---

## 性能与内存

### 先测量，再优化

性能优化顺序：

1. 定义可接受的目标。
2. 用真实或代表性数据复现。
3. 测量并定位热点。
4. 优先改算法和数据结构。
5. 再做局部优化。
6. 重新测量，确认没有破坏正确性。

不要凭直觉把可读代码改成难懂技巧。

### 常见时间复杂度

以下为典型平均情况，具体实现和最坏情况可能不同：

| 操作 | 典型复杂度 |
| :--- | :--- |
| `list[index]` | O(1) |
| `list.append()` | 摊销 O(1) |
| `list.insert(0, value)` | O(n) |
| `value in list` | O(n) |
| `key in dict` | 平均 O(1) |
| `value in set` | 平均 O(1) |
| `dict[key]` | 平均 O(1) |
| 排序 | O(n log n) |
| `deque.appendleft()` / `popleft()` | O(1) |
| 堆插入 / 弹出 | O(log n) |

需要频繁成员判断时：

```python
allowed_list = ["read", "write", "admin"]
allowed_set = {"read", "write", "admin"}

permission in allowed_set
```

但小数据量下可读性和构造成本同样重要。

### `timeit`

```python
from timeit import timeit

list_time = timeit(
    "9999 in values",
    setup="values = list(range(10_000))",
    number=10_000,
)
set_time = timeit(
    "9999 in values",
    setup="values = set(range(10_000))",
    number=10_000,
)

print(list_time, set_time)
```

命令行：

```bash
python3 -m timeit -s "values=list(range(1000))" "999 in values"
```

微基准应多次运行，并避免把无关的初始化工作算入测试。

### `cProfile`

```bash
python3 -m cProfile -s cumulative app.py
```

代码中：

```python
import cProfile
import pstats

profiler = cProfile.Profile()
profiler.enable()

run_application()

profiler.disable()
statistics = pstats.Stats(profiler)
statistics.sort_stats("cumulative").print_stats(20)
```

关注累计耗时、调用次数和真正的热点函数。

### `tracemalloc`

```python
import tracemalloc

tracemalloc.start()
before = tracemalloc.take_snapshot()

data = build_large_data()

after = tracemalloc.take_snapshot()

for statistic in after.compare_to(
    before,
    "lineno",
)[:10]:
    print(statistic)
```

`tracemalloc` 跟踪 Python 内存分配，不等同于进程全部原生内存。

### 引用计数与垃圾回收

CPython 通常结合：

- **引用计数**：引用数降为零时可立即释放对象。
- **循环垃圾收集器**：发现部分相互引用但不可达的对象。

```python
import gc

print(gc.get_count())
gc.collect()  # 通常无需手动调用
```

不要依赖对象销毁时机释放关键资源。文件、锁、事务和网络连接应使用 `with` 明确管理。

### 弱引用

弱引用不会阻止对象被回收，适合缓存或观察者场景：

```python
import weakref


class Image:
    pass


image = Image()
reference = weakref.ref(image)

print(reference() is image)  # True
del image
print(reference())           # None
```

并非所有对象都支持弱引用，使用 `__slots__` 的类若需要弱引用还要显式支持。

### 内存优化思路

- 流式处理，避免一次读入全部数据。
- 使用生成器表达式而非巨大临时列表。
- 只保留需要的字段。
- 大量固定结构实例可评估数据类 `slots=True`。
- 及时关闭资源，移除不再需要的缓存。
- 先用 `tracemalloc` 或进程指标确认真实问题。

不要为了少量内存牺牲接口清晰度。

---

## Python 进阶机制

### 描述符协议

定义了 `__get__()`、`__set__()` 或 `__delete__()` 的对象称为描述符。函数、`property`、`classmethod` 和许多 ORM 字段都依赖这一协议。

```python
from typing import Any


class PositiveNumber:
    def __set_name__(
        self,
        owner: type,
        name: str,
    ) -> None:
        self.private_name = f"_{name}"

    def __get__(
        self,
        instance: object | None,
        owner: type | None = None,
    ) -> Any:
        if instance is None:
            return self
        return getattr(instance, self.private_name)

    def __set__(
        self,
        instance: object,
        value: float,
    ) -> None:
        if value <= 0:
            raise ValueError("值必须大于 0")
        setattr(instance, self.private_name, value)


class Product:
    price = PositiveNumber()
    weight = PositiveNumber()

    def __init__(self, price: float, weight: float) -> None:
        self.price = price
        self.weight = weight
```

因为实现了 `__set__()`，这是数据描述符，读取优先级通常高于实例字典中的同名值。

### `__getattr__()` 与 `__getattribute__()`

```python
class Settings:
    def __init__(self, data: dict[str, str]) -> None:
        self._data = data

    def __getattr__(self, name: str) -> str:
        try:
            return self._data[name]
        except KeyError as error:
            raise AttributeError(name) from error
```

只有普通查找失败时才调用 `__getattr__()`。

`__getattribute__()` 拦截所有实例属性读取。若必须重写，应通过 `object.__getattribute__(self, name)` 访问底层属性，避免无限递归。

### `__init_subclass__()`

父类可在子类定义时执行注册或验证：

```python
class Plugin:
    registry: dict[str, type["Plugin"]] = {}

    def __init_subclass__(
        cls,
        *,
        name: str,
        **kwargs: object,
    ) -> None:
        super().__init_subclass__(**kwargs)
        if name in cls.registry:
            raise ValueError(f"插件名重复：{name}")
        cls.registry[name] = cls


class CsvPlugin(Plugin, name="csv"):
    pass


print(Plugin.registry)
```

这类钩子通常比直接引入元类更简单。

### 元类概览

类也是对象，默认由 `type` 创建：

```python
class User:
    pass


print(type(User))   # <class 'type'>
print(type(User())) # <class '__main__.User'>
```

元类可以干预类的创建。框架可能用它注册模型、验证声明或生成方法，但日常业务中应优先考虑：

- 类装饰器。
- `__init_subclass__()`。
- 描述符。
- 普通工厂函数。

如果不确定是否需要元类，通常就不需要。

### 导入缓存

```python
import sys

import json

print(sys.modules["json"] is json)  # True
```

删除局部名称不会卸载模块：

```python
del json
```

动态重载可使用 `importlib.reload()`，但对象引用、状态和线程会让行为复杂。生产程序通常通过重启进程应用新代码。

### 字节码与 `dis`

```python
import dis


def add(x: int, y: int) -> int:
    return x + y


dis.dis(add)
```

字节码是 CPython 实现细节，可能随版本变化。它适合理解和排查，不应成为普通业务逻辑依赖。

### 反射

```python
user = User()

print(hasattr(user, "name"))
setattr(user, "name", "Alice")
print(getattr(user, "name", "unknown"))
delattr(user, "name")
```

当属性名来自不可信输入时，应建立允许列表，避免任意访问或修改内部状态。

### 猴子补丁

运行时替换模块或类属性称为猴子补丁：

```python
module.function = replacement
```

它在测试或兼容层中偶尔有用，但会产生隐式全局影响、导入顺序依赖和升级风险。优先使用显式依赖注入或官方扩展接口。

---

## 安全与可靠性

### 不可信输入

外部输入包括：

- 命令行参数。
- 表单、URL 和 HTTP 请求体。
- 文件与数据库内容。
- 环境变量。
- 消息队列和第三方 API 响应。

处理原则：

1. 在系统边界解析。
2. 校验类型、长度、范围和格式。
3. 转换成内部明确模型。
4. 失败时给出安全、可操作的错误。
5. 不把原始敏感输入写入日志。

### `eval()` 与 `exec()`

```python
# 危险：不可信字符串可执行任意代码
result = eval(user_input)
```

只需读取 Python 字面量时，可以使用限制更强的：

```python
from ast import literal_eval

value = literal_eval("[1, 2, {'name': 'Alice'}]")
```

即便如此也应限制输入大小。数据交换优先使用 JSON 等明确格式。

### SQL 注入

永远使用参数化查询：

```python
cursor.execute(
    "SELECT * FROM user WHERE email = ?",
    (email,),
)
```

占位符只能表示值，不能直接表示表名或列名。动态标识符要从代码内允许列表选择。

### 路径遍历

用户提供的文件名可能包含 `../` 逃逸目标目录：

```python
from pathlib import Path


def safe_child(base: Path, user_path: str) -> Path:
    base = base.resolve()
    candidate = (base / user_path).resolve()

    if not candidate.is_relative_to(base):
        raise ValueError("路径超出允许目录")

    return candidate
```

还需根据场景考虑符号链接、竞态条件和文件权限。压缩包解压也必须验证每个成员路径。

### 命令注入

```python
# 推荐
subprocess.run(
    ["tool", "--name", user_name],
    check=True,
)
```

不要：

```python
subprocess.run(
    f"tool --name {user_name}",
    shell=True,
)
```

参数列表能避免 shell 重新解释大部分特殊字符。

### 重试

只重试临时性错误，并设置上限和退避：

```python
from time import sleep


def retry_operation(
    operation,
    *,
    attempts: int = 3,
    initial_delay: float = 0.5,
):
    delay = initial_delay

    for attempt in range(1, attempts + 1):
        try:
            return operation()
        except TemporaryError:
            if attempt == attempts:
                raise
            sleep(delay)
            delay *= 2
```

注意：

- 验证操作是否幂等，避免重复扣款或重复创建。
- 不重试明确的认证失败、参数错误等永久错误。
- 设置总超时，而不仅是单次超时。
- 在多客户端环境加入随机抖动，避免同时重试。

### 安全清单

- 不反序列化不可信 pickle。
- 不对用户输入执行 `eval()` / `exec()`。
- SQL 使用参数化查询。
- 外部命令传参数列表，谨慎使用 `shell=True`。
- 网络请求设置超时和响应大小限制。
- 密码与令牌不写入源码、异常消息和日志。
- 安全随机值使用 `secrets`。
- 文件路径限制在明确根目录内。
- 依赖来自可信来源并持续更新。
- 以最小权限运行程序。

---

## 综合实战：命令行任务管理器

这个项目把以下知识串联起来：

- 数据类与类型提示。
- JSON 文件持久化。
- 服务层与存储层分离。
- 自定义异常。
- `argparse` 子命令。
- 明确退出码。
- 可测试的 `main()`。

为了便于复制，先实现为一个文件；功能稳定后再拆成 `models.py`、`storage.py`、`services.py` 和 `cli.py`。

### 完整代码

保存为 `task_cli.py`：

```python
from __future__ import annotations

import argparse
import json
import sys
from collections.abc import Mapping, Sequence
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Protocol
from uuid import uuid4


class TaskError(Exception):
    """任务应用的基础异常。"""


class TaskNotFoundError(TaskError):
    """没有找到指定任务。"""


class DataFileError(TaskError):
    """任务数据文件无效。"""


def utc_now_text() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass
class Task:
    title: str
    id: str = field(default_factory=lambda: uuid4().hex)
    completed: bool = False
    created_at: str = field(default_factory=utc_now_text)

    def __post_init__(self) -> None:
        self.title = self.title.strip()
        if not self.title:
            raise ValueError("任务标题不能为空")

    def to_dict(self) -> dict[str, object]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Mapping[str, object]) -> Task:
        try:
            task_id = data["id"]
            title = data["title"]
            completed = data["completed"]
            created_at = data["created_at"]
        except KeyError as error:
            raise DataFileError("任务记录字段无效") from error

        if (
            not isinstance(task_id, str)
            or not task_id
            or not isinstance(title, str)
            or type(completed) is not bool
            or not isinstance(created_at, str)
        ):
            raise DataFileError("任务记录字段类型无效")

        try:
            moment = datetime.fromisoformat(created_at)
            if moment.tzinfo is None:
                raise ValueError("created_at 缺少时区")
            return cls(
                id=task_id,
                title=title,
                completed=completed,
                created_at=created_at,
            )
        except ValueError as error:
            raise DataFileError("任务记录字段值无效") from error


class TaskRepository(Protocol):
    def load(self) -> list[Task]:
        ...

    def save(self, tasks: Sequence[Task]) -> None:
        ...


class JsonTaskRepository:
    def __init__(self, path: Path) -> None:
        self.path = path

    def load(self) -> list[Task]:
        if not self.path.exists():
            return []

        try:
            raw_data = json.loads(
                self.path.read_text(encoding="utf-8")
            )
        except (OSError, json.JSONDecodeError) as error:
            raise DataFileError(
                f"无法读取数据文件：{self.path}"
            ) from error

        if not isinstance(raw_data, list):
            raise DataFileError("数据文件顶层必须是数组")

        tasks: list[Task] = []
        for item in raw_data:
            if not isinstance(item, dict):
                raise DataFileError("每条任务记录必须是对象")
            tasks.append(Task.from_dict(item))
        return tasks

    def save(self, tasks: Sequence[Task]) -> None:
        temporary_path = self.path.with_suffix(
            self.path.suffix + ".tmp"
        )
        content = json.dumps(
            [task.to_dict() for task in tasks],
            ensure_ascii=False,
            indent=2,
        )

        try:
            self.path.parent.mkdir(
                parents=True,
                exist_ok=True,
            )
            temporary_path.write_text(
                content + "\n",
                encoding="utf-8",
            )
            temporary_path.replace(self.path)
        except OSError as error:
            raise DataFileError(
                f"无法写入数据文件：{self.path}"
            ) from error


class TaskService:
    def __init__(self, repository: TaskRepository) -> None:
        self.repository = repository

    @staticmethod
    def _find_index(
        tasks: Sequence[Task],
        task_id: str,
    ) -> int:
        if not task_id:
            raise TaskError("任务 ID 不能为空")

        matches = [
            index
            for index, task in enumerate(tasks)
            if task.id.startswith(task_id)
        ]

        if not matches:
            raise TaskNotFoundError(
                f"没有找到任务：{task_id}"
            )
        if len(matches) > 1:
            raise TaskError(
                f"任务 ID 前缀不唯一：{task_id}"
            )
        return matches[0]

    def add(self, title: str) -> Task:
        try:
            task = Task(title=title)
        except ValueError as error:
            raise TaskError(str(error)) from error

        tasks = self.repository.load()
        tasks.append(task)
        self.repository.save(tasks)
        return task

    def list_tasks(
        self,
        status: str = "all",
    ) -> list[Task]:
        tasks = self.repository.load()

        if status == "pending":
            return [task for task in tasks if not task.completed]
        if status == "completed":
            return [task for task in tasks if task.completed]
        if status != "all":
            raise TaskError(f"未知状态：{status}")
        return tasks

    def mark_done(self, task_id: str) -> Task:
        tasks = self.repository.load()
        index = self._find_index(tasks, task_id)
        task = tasks[index]
        task.completed = True
        self.repository.save(tasks)
        return task

    def delete(self, task_id: str) -> Task:
        tasks = self.repository.load()
        index = self._find_index(tasks, task_id)
        deleted = tasks.pop(index)
        self.repository.save(tasks)
        return deleted


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="本地 JSON 任务管理器",
    )
    parser.add_argument(
        "--data",
        type=Path,
        default=Path.home() / ".python-notes-tasks.json",
        help="JSON 数据文件路径",
    )

    commands = parser.add_subparsers(
        dest="command",
        required=True,
    )

    add_parser = commands.add_parser("add", help="添加任务")
    add_parser.add_argument("title", help="任务标题")

    list_parser = commands.add_parser("list", help="列出任务")
    list_parser.add_argument(
        "--status",
        choices=["all", "pending", "completed"],
        default="all",
    )

    done_parser = commands.add_parser("done", help="完成任务")
    done_parser.add_argument("task_id", help="任务 ID")

    delete_parser = commands.add_parser(
        "delete",
        help="删除任务",
    )
    delete_parser.add_argument("task_id", help="任务 ID")

    return parser


def display_tasks(tasks: Sequence[Task]) -> None:
    if not tasks:
        print("暂无任务")
        return

    for task in tasks:
        mark = "x" if task.completed else " "
        print(f"[{mark}] {task.id[:8]}  {task.title}")


def main(argv: Sequence[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    service = TaskService(JsonTaskRepository(args.data))

    try:
        match args.command:
            case "add":
                task = service.add(args.title)
                print(f"已添加：{task.id[:8]} {task.title}")
            case "list":
                display_tasks(
                    service.list_tasks(args.status)
                )
            case "done":
                task = service.mark_done(args.task_id)
                print(f"已完成：{task.title}")
            case "delete":
                task = service.delete(args.task_id)
                print(f"已删除：{task.title}")
            case _:
                parser.error("未知命令")
    except TaskError as error:
        print(f"错误：{error}", file=sys.stderr)
        return 2

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

### 运行

```bash
python3 task_cli.py --data tasks.json add "学习生成器"
python3 task_cli.py --data tasks.json list
python3 task_cli.py --data tasks.json list --status pending
python3 task_cli.py --data tasks.json done <任务ID>
python3 task_cli.py --data tasks.json delete <任务ID>
```

`done` / `delete` 支持完整 ID 或唯一的短前缀。若前缀同时匹配多个任务，程序会拒绝操作，避免误改数据。

### 测试

保存为 `test_task_cli.py`：

```python
from collections.abc import Sequence
from copy import deepcopy
from pathlib import Path

import pytest

from task_cli import (
    DataFileError,
    JsonTaskRepository,
    Task,
    TaskError,
    TaskNotFoundError,
    TaskService,
    main,
)


class InMemoryTaskRepository:
    def __init__(self) -> None:
        self.tasks: list[Task] = []

    def load(self) -> list[Task]:
        return deepcopy(self.tasks)

    def save(self, tasks: Sequence[Task]) -> None:
        self.tasks = deepcopy(list(tasks))


@pytest.fixture
def service() -> TaskService:
    return TaskService(InMemoryTaskRepository())


def test_add_and_reload_task(
    service: TaskService,
) -> None:
    created = service.add("  学习 pytest  ")
    loaded = service.list_tasks()

    assert created.title == "学习 pytest"
    assert loaded == [created]


def test_rejects_blank_title(
    service: TaskService,
) -> None:
    with pytest.raises(TaskError, match="不能为空"):
        service.add("   ")


def test_marks_task_done(
    service: TaskService,
) -> None:
    created = service.add("写测试")
    completed = service.mark_done(created.id[:8])

    assert completed.completed is True
    assert service.list_tasks("pending") == []
    assert service.list_tasks("completed") == [completed]


def test_missing_task_raises(
    service: TaskService,
) -> None:
    with pytest.raises(TaskNotFoundError):
        service.mark_done("missing")


def test_rejects_ambiguous_id_prefix() -> None:
    repository = InMemoryTaskRepository()
    repository.save(
        [
            Task(id="abc-one", title="第一项"),
            Task(id="abc-two", title="第二项"),
        ]
    )
    service = TaskService(repository)

    with pytest.raises(TaskError, match="不唯一"):
        service.mark_done("abc")


def test_deletes_task(
    service: TaskService,
) -> None:
    created = service.add("待删除")
    deleted = service.delete(created.id[:8])

    assert deleted == created
    assert service.list_tasks() == []


def test_json_repository_round_trip(
    tmp_path: Path,
) -> None:
    repository = JsonTaskRepository(tmp_path / "tasks.json")
    task = Task("持久化")

    repository.save([task])

    assert repository.load() == [task]


def test_json_repository_rejects_wrong_field_type(
    tmp_path: Path,
) -> None:
    path = tmp_path / "tasks.json"
    path.write_text(
        """
        [{
          "id": "abc",
          "title": "错误数据",
          "completed": "false",
          "created_at": "2026-07-29T00:00:00+00:00"
        }]
        """,
        encoding="utf-8",
    )
    repository = JsonTaskRepository(path)

    with pytest.raises(DataFileError, match="字段类型"):
        repository.load()


def test_main_lists_empty_data(
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
) -> None:
    exit_code = main(
        [
            "--data",
            str(tmp_path / "tasks.json"),
            "list",
        ]
    )

    captured = capsys.readouterr()
    assert exit_code == 0
    assert captured.out == "暂无任务\n"
    assert captured.err == ""


def test_main_reports_business_error(
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
) -> None:
    exit_code = main(
        [
            "--data",
            str(tmp_path / "tasks.json"),
            "add",
            " ",
        ]
    )

    captured = capsys.readouterr()
    assert exit_code == 2
    assert captured.out == ""
    assert "不能为空" in captured.err
```

运行：

```bash
python -m pytest -q
```

### 继续重构

单文件稳定后，可以拆成：

```text
src/task_app/
├── __init__.py
├── __main__.py
├── cli.py         # build_parser、display_tasks、main
├── errors.py      # 自定义异常
├── models.py      # Task
├── repository.py  # JsonTaskRepository
└── service.py     # TaskService
```

对应的 `pyproject.toml`：

```toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "task-app"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = []

[project.optional-dependencies]
test = ["pytest>=8"]

[project.scripts]
task = "task_app.cli:main"

[tool.setuptools.packages.find]
where = ["src"]
```

把各类移动到对应模块并修正导入后，验证完整交付路径：

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e ".[test]"
task --help
python -m pytest -q
```

进一步练习：

1. 支持任务优先级、标签和截止时间。
2. 支持按标题和标签搜索。
3. 增加 `edit` 和 `clear-completed` 命令。
4. 使用 SQLite 替代 JSON。
5. 增加 CSV 导入导出。
6. 使用文件锁处理多进程同时写入。
7. 构建 wheel，并在全新虚拟环境中做安装后端到端测试。
8. 添加日志、覆盖率和 CI。

---

## 常见陷阱与排查

### 高频陷阱总表

| 陷阱 | 错误理解或写法 | 正确心智模型 |
| :--- | :--- | :--- |
| 赋值 | `b = a` 会复制列表 | 两个名称绑定同一对象 |
| 参数传递 | Python 是简单“引用传递” | 形参绑定到调用方传入的对象；可变对象可被原地修改 |
| 可变默认值 | `items=[]` 每次调用新建 | 默认表达式在函数定义执行时求值，该函数后续调用共享 |
| `is` | 用 `is` 比较字符串内容 | `==` 比较值，`is` 比较身份 |
| 浮点数 | `0.1 + 0.2` 必然精确等于 `0.3` | 二进制浮点是近似值，使用 `isclose()` 或 `Decimal` |
| 真值 | `and` / `or` 一定返回布尔值 | 它们返回某个操作数 |
| 除法 | `//` 只是去掉小数 | 它向负无穷取整 |
| 元组 | `(1)` 是单元素元组 | 单元素元组是 `(1,)` |
| 字符串 | 字符串方法原地修改 | `str` 不可变，方法通常返回新字符串 |
| 排序 | `result = items.sort()` 得到列表 | `sort()` 原地改并返回 `None`；`sorted()` 返回新列表 |
| 列表重复 | `[[0] * 3] * 3` 创建独立行 | 内部行被重复引用 |
| 字典顺序 | 字典会按键自动排序 | 字典保留插入顺序，不代表排序 |
| 集合顺序 | 可以依赖 set 的显示顺序 | 集合顺序不可作为接口契约 |
| 深拷贝 | 所有内部资源都会完全独立 | `deepcopy()` 有边界，类还能自定义复制行为 |
| 闭包 | 创建函数时自动复制循环变量 | 自由变量通常在调用时查找 |
| 异常 | `except: pass` 能让程序稳定 | 它会隐藏错误，甚至吞掉用户中断 |
| `finally` | 适合返回最终值 | `return` 可能覆盖原返回或吞掉异常 |
| `assert` | 可做用户输入和权限校验 | 优化模式可移除断言，业务校验显式抛异常 |
| 生成器 | 可以像列表一样重复消费 | 生成器通常是单次、惰性迭代器 |
| 导入 | 每次 `import` 都重新执行模块 | 普通导入会复用 `sys.modules` 缓存 |
| 类型提示 | 运行时自动拒绝错误类型 | 默认主要供静态工具和阅读 |
| `Optional` | 参数可省略 | 它表示值可为 `None` |
| `cast()` | 会执行类型转换 | 只影响静态检查，不验证运行时对象 |
| 线程 | GIL 能保证共享数据安全 | 复合操作仍有竞态，需要锁或队列 |
| 线程 | Python 线程绝对不能并行 | 结论依实现、构建和扩展而异；默认 CPython 更适合并发 I/O |
| 异步 | 写上 `async` 就自动并发 | 需要任务调度；阻塞函数仍会卡住事件循环 |
| 多进程 | 与线程一样直接共享对象 | 默认独立内存，需要序列化或进程通信 |
| 文件 | 先 `exists()` 再 `open()` 就安全 | 两步之间可能变化，应处理实际操作异常 |
| JSON | 能保存所有 Python 对象 | 只支持有限基础类型 |
| pickle | 是安全的通用交换格式 | 不可信 pickle 可执行恶意代码 |
| SQL | f-string 拼查询最方便 | 用户数据必须参数化 |
| 随机数 | `random` 可生成安全令牌 | 安全凭据使用 `secrets` |

### 阅读 Traceback

示例：

```text
Traceback (most recent call last):
  File "app.py", line 12, in <module>
    main()
  File "app.py", line 8, in main
    value = int(raw)
ValueError: invalid literal for int() with base 10: 'abc'
```

阅读方式：

1. 最后一行给出异常类型和消息。
2. 从最下面一层调用位置开始定位直接失败语句。
3. 沿调用栈向上理解输入从哪里传入。
4. 找到最早偏离预期的数据，而不只是包住最后一行。

### 常见排查命令

```bash
python3 --version
python3 -c "import sys; print(sys.executable)"
python3 -m pip --version
python3 -m pip show package_name
python3 -m compileall src
python3 -m unittest
python3 -m pytest -q
python3 -m pdb app.py
```

遇到 `ModuleNotFoundError` 时依次检查：

1. 当前解释器是否正确。
2. 依赖是否安装在这个解释器对应的环境。
3. 导入名是否等于发行包名。
4. 当前项目是否已安装，或是否应使用 `python -m package.module`。
5. 是否存在文件名遮蔽标准库，例如自己创建了 `json.py`、`typing.py`。

---

## Python 与 JavaScript 易混点

| 主题 | Python | JavaScript |
| :--- | :--- | :--- |
| 代码块 | 缩进 | 花括号 |
| 变量声明 | 直接绑定 `name = value` | `let` / `const` / `var` |
| 空值 | `None` | `null` / `undefined` |
| 布尔字面量 | `True` / `False` | `true` / `false` |
| 严格相等 | 通常使用 `==`；身份用 `is` | 通常使用 `===` |
| 逻辑运算 | `and` / `or` / `not` | `&&` / `||` / `!` |
| 数组式容器 | `list` | `Array` |
| 对象式映射 | `dict` | `Object` / `Map` |
| 键访问 | `mapping["key"]` | `object.key` / `object["key"]` |
| 长度 | `len(value)` | `value.length` |
| 添加元素 | `items.append(value)` | `items.push(value)` |
| 删除末尾 | `items.pop()` | `items.pop()` |
| 切片 | `items[start:stop]` | `items.slice(start, end)` |
| 函数 | `def`，无花括号 | `function` / 箭头函数 |
| 匿名函数 | `lambda` 只能一个表达式 | 箭头函数可包含代码块 |
| 类实例参数 | 显式 `self` | 隐式 `this` |
| 异步入口 | `asyncio` 事件循环 | 宿主事件循环 + Promise |
| 包管理 | 虚拟环境 + `pip` / 项目工具 | Node + npm / pnpm / yarn |

尤其注意：

```python
# Python 空字典
empty_mapping = {}

# Python 空集合
empty_set = set()
```

```python
# Python 的 and / or
value = user_input or "default"
```

虽然 Python 和 JavaScript 的短路运算都会返回操作数，但两者的真值规则和对象模型并不完全相同，不要直接照搬边界判断。

---

## 速查表

### 常用内置函数

| 函数 | 作用 |
| :--- | :--- |
| `print()` | 输出 |
| `input()` | 读取一行字符串 |
| `len()` | 长度 |
| `type()` | 直接类型 |
| `isinstance()` | 按继承关系判断类型 |
| `int()`、`float()`、`str()`、`bool()` | 类型转换 |
| `list()`、`tuple()`、`dict()`、`set()` | 创建容器 |
| `range()` | 整数序列 |
| `enumerate()` | 同时产生索引和值 |
| `zip()` | 并行组合多个可迭代对象 |
| `sorted()` | 返回排序后的新列表 |
| `reversed()` | 反向迭代 |
| `sum()` | 求和 |
| `min()`、`max()` | 最小值、最大值 |
| `any()`、`all()` | 任一为真、全部为真 |
| `iter()`、`next()` | 迭代器协议 |
| `open()` | 打开文件 |
| `help()` | 查看帮助 |
| `dir()` | 查看属性名称 |
| `repr()` | 开发者表示 |

### 容器选择

| 需求 | 优先选择 |
| :--- | :--- |
| 有序、可修改、允许重复 | `list` |
| 有序、结构固定 | `tuple` |
| 键值映射 | `dict` |
| 去重、快速成员判断、集合运算 | `set` |
| 不可变集合 | `frozenset` |
| 两端频繁进出 | `collections.deque` |
| 计数 | `collections.Counter` |
| 自动默认值分组 | `collections.defaultdict` |
| 优先队列 / Top K | `heapq` |

### 文件模式

| 模式 | 不存在 | 已存在 | 指针位置 |
| :--- | :--- | :--- | :--- |
| `r` | 报错 | 读取 | 开头 |
| `w` | 创建 | 清空 | 开头 |
| `a` | 创建 | 保留 | 末尾 |
| `x` | 创建 | 报错 | 开头 |
| `r+` | 报错 | 不清空，可读写 | 开头 |
| `b` 后缀 | — | 二进制数据 | — |

### 格式化

```python
name = "Alice"
number = 1234.5678

f"{name}"          # Alice
f"{number:.2f}"    # 1234.57
f"{number:,.2f}"   # 1,234.57
f"{0.875:.1%}"     # 87.5%
f"{42:08d}"        # 00000042
f"{255:#x}"        # 0xff
f"{name!r}"        # 'Alice'
f"{name=}"         # name='Alice'
```

### 常见魔术方法

| 方法 | 触发方式 |
| :--- | :--- |
| `__init__` | 实例初始化 |
| `__repr__` | `repr(obj)`、交互式显示 |
| `__str__` | `str(obj)`、`print(obj)` |
| `__len__` | `len(obj)` |
| `__iter__` | `iter(obj)`、`for` |
| `__next__` | `next(iterator)` |
| `__contains__` | `item in obj` |
| `__getitem__` | `obj[key]` |
| `__setitem__` | `obj[key] = value` |
| `__call__` | `obj(...)` |
| `__enter__` / `__exit__` | `with obj` |
| `__eq__` | `left == right` |
| `__lt__` | `left < right` |
| `__hash__` | `hash(obj)`、字典键、集合元素 |
| `__add__` | `left + right` |

---

## 渐进练习

### 入门

1. **温度转换器**
   - 输入摄氏温度。
   - 输出华氏温度，保留两位小数。
   - 非法输入时允许重试。

2. **成绩等级**
   - 输入 `0` 到 `100` 的分数。
   - 输出 A / B / C / D 等级。
   - 拒绝范围外数值。

3. **猜数字**
   - 使用 `random.randint()` 生成答案。
   - 告知猜大或猜小。
   - 统计尝试次数。

### 容器与函数

4. **词频统计**
   - 清理大小写和常见标点。
   - 使用 `Counter` 统计。
   - 按次数倒序输出前 10 项。

5. **学生成绩册**
   - 字典保存姓名和多次成绩。
   - 实现添加、删除、平均分、排名函数。
   - 把输入输出与计算函数分开。

6. **矩阵转置**
   - 先用嵌套循环实现。
   - 再用 `zip(*matrix)` 实现。
   - 处理空矩阵和行长度不同的情况。

### 文件与对象

7. **JSON 通讯录**
   - 数据类表示联系人。
   - 支持增删改查。
   - 保存时使用临时文件替换。
   - 文件损坏时给出清晰错误。

8. **CSV 账单汇总**
   - 读取日期、类别、金额。
   - 使用 `Decimal` 计算。
   - 按月份和类别汇总。
   - 输出新的 CSV 报告。

9. **日志分析器**
   - 逐行读取大日志。
   - 正则提取时间、级别、消息。
   - 统计错误类型并显示最近 10 条。

### 工程与测试

10. **可安装的 Todo CLI**
    - 使用 `src/` 布局。
    - `pyproject.toml` 注册入口。
    - 服务层使用协议抽象存储。
    - 为核心业务、JSON 存储和 CLI 编写测试。

11. **SQLite 书签管理器**
    - 使用参数化 SQL。
    - 支持标签和搜索。
    - 用临时数据库做集成测试。
    - 为重复 URL 设计约束和错误。

12. **配置检查器**
    - 读取 TOML 和环境变量。
    - 用数据类表示最终配置。
    - 输出所有错误，而不是遇到第一个就退出。

### 并发与进阶

13. **并发文件哈希**
    - 遍历目录中的文件。
    - 用线程池计算 SHA-256。
    - 捕获单个文件失败，不中断全部结果。
    - 比较串行与并发耗时。

14. **异步任务队列**
    - 使用 `asyncio.Queue`。
    - 多个消费者处理任务。
    - 用 `Semaphore` 限制并发。
    - 支持超时、取消和优雅关闭。

15. **插件式转换器**
    - 用 `Protocol` 定义转换接口。
    - 用 `__init_subclass__()` 注册插件。
    - CLI 按名称选择插件。
    - 为未知插件和重复名称编写测试。

### 练习时的验收标准

每个项目都尝试回答：

- 输入边界在哪里？
- 核心逻辑能否脱离终端独立测试？
- 哪些错误应该恢复，哪些应该失败退出？
- 文件、连接和锁是否总能释放？
- 类型提示是否准确表达接口？
- 是否存在共享可变状态？
- 是否记录了足够信息，但没有泄漏秘密？
- README 能否让另一个人从零运行？

---

## 学习建议

1. **先运行，再修改**：改变参数和边界，观察输出与异常。
2. **主动预测结果**：运行前写下自己认为的输出。
3. **保留小实验**：为作用域、复制、异步等难点建立最小示例。
4. **阅读 Traceback**：不要只看“报错了”，要理解调用链。
5. **查官方文档**：先查对象、参数、返回值和版本说明。
6. **写测试**：每修复一个错误，补一个能复现它的测试。
7. **按项目复习**：语法只有进入真实数据流和错误路径后才会牢固。
8. **重视边界**：编码、时区、浮点、空输入、超时、权限往往比主流程更难。
9. **先清晰后聪明**：简单、明确、可测试的代码优先。
10. **先测量再优化**：不要牺牲正确性换取未经验证的性能。

掌握 Python 的关键不是记住所有 API，而是建立几个稳定的心智模型：

- 名称绑定到对象，赋值不等于复制。
- 可变性决定共享状态的风险。
- 协议让 `for`、`with`、运算符和方法绑定保持统一。
- 异常用于表达无法沿当前路径继续的情况。
- 类型提示描述接口，但不改变动态运行本质。
- 并发模型必须匹配任务类型和依赖能力。
- 工程质量来自清晰边界、自动检查、测试和可观察性。
