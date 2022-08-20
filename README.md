## 项目结构

分页策略

## Aside 组件实现拖拽

### Drag 原生实现

设置`draggable='true'`可拖拽，设置拖拽事件`ondragstart`、`ondragover`、`ondrop`;

**拖拽事件 DragEvent**
这个接口继承 MouseEvent 和 Event 属性

DragEvent.dataTransfer：在拖放交互期间传输的数据。

- `onDragStart`：当拖动元素时，触发该事件.
- `onDragOver`: 当将元素或文本选择拖动到有效放置目标上时，会触发此事件。---主要是为了阻止默认事件
- `onDrop`：当在有效放置目标上放置元素或选择文本时触发此事件。

实现代码

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Drag Demo</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: white;
      }
    </style>
    <script>
      // 存放拖拽的元素
      let dragElement = null
      function onDragStart(e) {
        // 获取当前拖拽元素
        dragElement = e.currentTarget
      }
      function onDragOver(e) {
        // 默认的当你dragover的时候会阻止你做drop的操作，所以需要取消这个默认
        e.preventDefault()
      }
      function onDrop(e) {
        // 当拖动结束的时候，给拖动div所在的位置下面的div做drop事件
        let dropElement = e.currentTarget
        if (dragElement != null && dragElement != dropElement) {
          let wrapper = document.querySelector('.wrapper')
          // 临时 div 用于存储 box
          let temp = document.createElement('div')
          // 添加 temp 到父元素 wrapper 中
          wrapper.appendChild(temp)
          // 交换
          wrapper.replaceChild(temp, dropElement)
          wrapper.replaceChild(dropElement, dragElement)
          wrapper.replaceChild(dragElement, temp)
        }
      }
    </script>
  </head>
  <body>
    <div class="wrapper" style="display: flex">
      <div
        class="box"
        style="background: green"
        draggable="true"
        ondragstart="onDragStart(event)"
        ondragover="onDragOver(event)"
        ondrop="onDrop(event)"
      >
        box1
      </div>
      <div
        class="box"
        style="background: orange"
        draggable="true"
        ondragstart="onDragStart(event)"
        ondragover="onDragOver(event)"
        ondrop="onDrop(event)"
      >
        box2
      </div>
      <div
        class="box"
        style="background: cyan"
        draggable="true"
        ondragstart="onDragStart(event)"
        ondragover="onDragOver(event)"
        ondrop="onDrop(event)"
      >
        box3
      </div>
    </div>
  </body>
</html>
```
