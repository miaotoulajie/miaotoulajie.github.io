---
id: message-board
title: Supabase Message Board
summary: 实现可用的留言板，支持发布与时间排序展示。
stack: Supabase, Vue Composition API
role: Full-stack (lightweight)
result: 形成最小互动闭环并支持后续防刷能力扩展。
---
留言板采用轻量全栈实现，前端页面负责展示和交互，数据层通过 service 与 repository 统一管理。

当前版本支持输入校验、提交反馈、加载状态和基本的提交限频，减少异常输入和刷屏风险。

后续可以继续扩展为敏感词配置中心、审核状态管理和管理员回复能力。
