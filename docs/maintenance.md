# 日常维护指南

## 发表杂谈：只新增一个文件

复制 templates/post.md 到 _posts/2026-10-20-example.md，修改标题、介绍、日期和正文。文件名日期与正文日期一致。Markdown 支持标题、段落、列表和图片。文章自动显示在首页和杂谈列表，不需要额外登记。图片放 assets/images/posts/<文章名>/，引用 /assets/images/posts/<文章名>/图片名.jpg。未来日期文章按 Jekyll 默认行为到日期后下次构建才会出现；草稿放 _drafts/。

## 新增小游戏或小工具：一个目录和一张介绍卡

1. 把完整文件夹放到 apps/<英文短名>/，入口命名 index.html。图片、脚本等保持在文件夹内，引用使用相对路径。
2. 复制 templates/project.md 到 _projects/<英文短名>.md。
3. 填 title、description、date、link；kind 填 game（小游戏）或 tool（工具）。link 例如 /apps/example/。
4. 给作品入口加入返回网站的链接。栏目卡片自动生成，不要逐页修改菜单。

涉及 API 密钥、服务器或打包流程的项目，应先让 Codex 检查兼容性。不要把密钥写进网页。

## 生活记录：一处数据，多处展示

- _data/books.json：title、author、date、cover、review。封面沿用 /liferecords/bookcovers/ 或放 assets/images/books/。
- _data/movies.json：title、english、director、date、url；可选 review。
- _data/games.json：id、name、platform、duration（小时）、date；可选 engName、url。

日期统一 YYYY-MM-DD。首页最近记录、年度筛选、生涯全成就使用同一份数据，新增年份不需要新页面。游戏数据迁移保留生涯表中更精确的小数时长，并补入年度表后续五条记录。

购买清单仍维护 liferecords/Lifenotes/Gamelist/data.js，它是购买行为，与全成就记录分开。游戏和阅读专题各自保留原有数据与交互。

## 栏目与旧链接

顶部导航来自 _data/navigation.json。网站当前栏目：首页、生活记录、小游戏、小工具、杂谈。生活记录包含游戏、阅读、电影以及专题。原随记页转到生活记录；数字拼图在小游戏页；作品目录在阅读专题。

旧年度页面和生涯全成就 URL 都保留跳转。旧年度游戏页默认转到全记录，可通过 /records/games/?year=2026 筛选。不要直接删除别人可能收藏的 URL。

## 检查与发布

运行 node scripts/check-source.cjs。安装 Ruby/Bundler 后运行 bundle install、bundle exec jekyll build、node scripts/check-links.cjs。GitHub PR 自动执行相同构建和链接检查。

让 Codex 在分支提交改动、创建 PR。确认预览和检查后再合并，沿用仓库原有 GitHub Pages 发布。不要用浏览器直接打开源 HTML 判断 Jekyll 页面是否正常，应先构建。
