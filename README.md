# 怒吼的蒲公英的网站

GitHub Pages + Jekyll。公共布局统一维护，记录数据与页面分开，杂谈和作品目录自动生成。无需本地安装开发环境即可在 GitHub 修改内容。

## 告诉 Codex 什么

- “把这个小游戏加入网站，文件在……，标题……，介绍……”
- “发表这篇杂谈，标题……，正文……，发布日期……”
- “新增读书记录，书名……，作者……，日期……，短评……”

详见 [维护指南](docs/maintenance.md)。Codex 应先读 [AGENTS.md](AGENTS.md)。

## 本地预览

安装 Ruby 和 Bundler 后执行：

~~~sh
bundle install
bundle exec jekyll serve
~~~

访问 http://127.0.0.1:4000 。发布沿用原来的 GitHub Pages 分支构建方式；无需更换托管平台。PR 工作流检查 Jekyll 构建与站内链接。
