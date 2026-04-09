---
id: supabase-layering
title: Supabase 在前端项目里的可分离分层实践
summary: 通过 repository/service 让数据层可替换、可测试。
tags: Supabase, Architecture
publishedAt: 2026-04-05
---
把数据库查询直接写在页面里会让功能迭代越来越难。

我采用了三层结构：基础设施负责连接、repository 负责读写、service 负责业务规则。

这样当项目需要独立后端服务时，只需要替换 repository 实现，页面逻辑几乎不动。
