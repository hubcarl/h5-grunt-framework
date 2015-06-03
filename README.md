## Grunt集成前端打包框架


###框架说明

1、支持HTML、CSS、JavaScript 压缩混淆
2、支持CSS、JavaScript 自动引用合并
3、支持模板include和变量引入
4、支持CSS、JavaScript内联
5、更多更能待完善......

###初始化说明

1. 安装[nodejs](http://nodejs.org) -- 下载对应版本并安装
2. 安装[grunt](http://gruntjs.com) -- 命令行下执行: `npm install -g grunt-cli`  (不包含符号` ,下同)
3. 安装依赖库 -- 命令行到项目根目录,执行 `npm install`


###grunt-usemin-fix修改

修改grunt-usemin-fix 插件 fileprocessor.js 方法 FileProcessor.prototype.replaceBlocks, 为block增加属性dir
file.blocks.forEach(function (block) {
   //增加 block.dir = file.dir这一行
   block.dir = file.dir;
   var blockLine = block.raw.join(linefeed);
   result = result.replace(blockLine, this.replaceWith(block));
}, this);


###打包说明

命令行执行 `grunt publish`



