# UML

## 介绍

UML - Unified Modeling Language - 统一建模语言，软件工程（不仅是编程）中的任何设计都可以用它来表述，包含：

- 用例图
- **类图**
- 对象图
- 顺序图
- 协作图
- 状态图
- 活动图
- 组件图
- 配置图

描述面向对象，重点介绍类图。画图工具：

- https://www.processon.com/
- office visio

## 类图

根据上一节的 demo 画图演示

## 几种关系

- **泛化**
- 实现
- **关联**
- 聚合
- 组合
- 依赖

（画图演示）

## demo

将之前的一个示例代码换成 UML 类图

```js
class People {
    constructor(name) {
        this.name = name
    }
    saySomething() {

    }
}
class A extends People {
    constructor(name) {
        super(name)
    }
    saySomething() {
        alert('I am A')
    }
}
class B extends People {
    constructor(name) {
        super(name)
    }
    saySomething() {
        alert('I am B')
    }
}
```

UML 图的学习刚刚开始，以后每讲到一个重要的设计模式，都会画它的 UML 图，并写代码。
