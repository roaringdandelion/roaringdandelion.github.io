# 网站维护约定

先读 docs/maintenance.md。以降低所有者维护成本为优先，不引入必须登录的后台或新的部署平台。

- 杂谈：新增 _posts/YYYY-MM-DD-slug.md；不要手工修改首页或杂谈索引。
- 小游戏/工具：资源放 apps/<slug>/，新增 _projects/<slug>.md，kind 为 game 或 tool。首页和栏目自动发现。
- 项目 HTML 不要加 Jekyll front matter，避免 Liquid 解释游戏代码。只在作品入口放一个返回网站的普通链接，保留资源相对路径。
- 生活记录：只改 _data/books.json、movies.json、games.json。新增记录不复制年度页面。日期 YYYY-MM-DD。
- 游戏购买清单暂沿用 liferecords/Lifenotes/Gamelist/data.js；原游戏收藏及阅读专题保留独立页面，通过 _projects 中 kind: note 在杂谈页统一收录。生活记录入口使用 GameLife、BookLife、MovieLife 三张卡片，宽屏三列、窄屏一列，不使用两列。
- 不捏造内容、日期、评价，不改写原短评。游戏时长在原两表不同时保留生涯表小数精度。
- 共享外观改 assets/css/site.css，共享导航改 _data/navigation.json。
- 保留旧 URL 的跳转；移动内容时检查图片和脚本路径。
- 先运行 node scripts/check-source.cjs，再构建 Jekyll，运行 node scripts/check-links.cjs。没有 Ruby 时明确报告构建未执行，让 PR CI 验证。
- 改动提交到独立分支并创建 PR；除非所有者明确要求上线，不合并。
