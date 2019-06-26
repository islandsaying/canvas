## 需求
1. 手机上可看
2. 手机上可用
3. 多种颜色的画笔
4. 保存

## 解决
1. 画画的实现:用线链接鼠标移动前后的亮点,将lastPoint赋值给newPoint
2. 监听用户是否在画画:painting = false/true
3. 监听用户是否在使用橡皮擦:eraseerEnable = false/true
4. 判断用户在使用pc/移动端(非触屏/触屏),根据touch事件来判断:
    - document.body.ontouchstart === null(移动端)/undefined(pc)
    - 也可以使用'ontouchstart' in document.body === true(移动端)/false(pc)
5. 移动端的适配:设置meta(viewport)
7. 移动端多点触控导致坐标获取的差别:x.touch[0].clientX
8. 各种功能和状态的切换使用js增删属性实现:x.classList.add/remove('active)
