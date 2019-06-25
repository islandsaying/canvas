## 需求
1. 手机上可看
2. 手机上可用
3. 多种颜色的画笔
4. 保存

## 解决
1. 设置meta(viewport),适配移动端
- 自动调整尺寸-不适合移动端
- 鼠标事件不适用于移动端,使用touch事件
- 根据当前设备来切换相应的事件,判断非触屏设备与触屏设备的区别(根据             'ontouchstart' in document.body === true/false)
    或者(根据document.body.ontouchstart === undefined/null)
 - 移动端获取坐标的区别
 2. 
 - 样式的改变是通过classList.add/classList.remove 
 - 多种颜色实现是通过color.onclick改变strokeStyle的颜色值