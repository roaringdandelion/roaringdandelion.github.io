# 网站维护约定

先读 docs/maintenance.md。以降低所有者维护成本为优先，不引入必须登录的后台或新的部署平台。

- 杂谈：新增 _posts/YYYY-MM-DD-slug.md；不要手工修改首页或杂谈索引。
- 小游戏/工具：资源放 apps/<slug>/，新增 _projects/<slug>.md，kind 为 game 或 tool。首页和栏目自动发现。
- 项目 HTML 不要加 Jekyll front matter，避免 Liquid 解释游戏代码。只在作品入口放一个返回网站的普通链接，保留资源相对路径。
- GameLife 使用 _data/games.json。BookLife 和 MovieLife 按所有者要求保留原 HTML（liferecords/booklife.html、movielife.html）的设计、配色、排版与内容；未经明确要求不得重构、改版或套用共享样式。栏目卡片和首页活动直接链接原页面，/records/books/ 与 /records/movies/ 仅作跳转。books.json、movies.json 是首页记录的摘要数据，后续明确要求新增内容时与原页面同步，不能只改摘要。
- 游戏购买清单暂沿用 liferecords/Lifenotes/Gamelist/data.js；原游戏收藏及阅读专题保留独立页面，通过 _projects 中 kind: note 在杂谈页统一收录。生活记录入口使用 GameLife、BookLife、MovieLife 三张卡片，宽屏三列、窄屏一列，不使用两列。
- 不捏造内容、日期、评价，不改写原短评。游戏时长在原两表不同时保留生涯表小数精度。
- 共享外观改 assets/css/site.css，共享导航改 _data/navigation.json。
- 保留旧 URL 的跳转；移动内容时检查图片和脚本路径。
- 先运行 node scripts/check-source.cjs，再构建 Jekyll，运行 node scripts/check-links.cjs。没有 Ruby 时明确报告构建未执行，让 PR CI 验证。
- 改动提交到独立分支并创建 PR；除非所有者明确要求上线，不合并。
