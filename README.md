anujs是react的迷你版，由去哪儿前端大神司徒正美推出，完全兼容react语法，并兼容低版本ie浏览器。详见https://github.com/RubyLouvre/anu

这个是anujs的手脚架，可快速创建anujs项目，以下是用法：
1. npm i -g anu-cli
  安装命令行工具
  
2. anu project_name --ie
  使用anu命令创建项目，project_name是你的项目名称，--ie选项表示支持低版本ie浏览器（ie8及以下），省略--e选项表示项目不兼容低版本ie
  
3. cd project_name
  命令行切换到上面创建的项目目录

4. npm i
  安装依赖包

5. npm start
  运行项目，打开浏览器输入http://localhost:3000或http://localhost:8080
