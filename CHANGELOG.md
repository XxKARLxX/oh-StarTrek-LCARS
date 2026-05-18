# 更新日志

## v1.1.2 (2026-05-16)

### Fixed

- 变形场手柄偏移从 -40px 调整为 -60px，避免与查询面板折叠按钮重叠

## v1.1.1 (2026-05-15)

### 新增
- 设置项 i18n 国际化（英文 label/description，中文自动切换）
- README_EN 英文文档

### 修复
- 调试模式 label 去掉 emoji，修复黑名单匹配
- 黑名单 Debug Mode 大写 M 修正
- SCHEMA 改为 buildSchema()，修复中文模式下设置项仍显示英文

## v1.1.0 (2026-05-15)

### 新功能
- **变形场（Morphic Field）**：拖拽手柄展宽编辑区，侧边栏与 post 区同时收缩，编辑区居中膨胀
  - 手柄悬停时指示线渐显，两侧同时显示
  - 拖拽时指示线加粗、橙色渐变、蓝色外发光
  - 双击手柄重置原始宽度
  - 宽度值自动持久化，重启后保持
  - 宽屏模式自动禁用
- **功能命名星际迷航设定化**
  - PADD → 📱 个人终端 | PADD ► 设置面板钉选 ◄
  - 编辑区宽度 → ✨ 变形场 | Morphic Field ► 编辑区域宽度调整 ◄

### 优化
- 多面板独立原始 Grid 值（data-lcarsOrigGrid），双面板宽度各自正确
- 拖拽 RAF 节流（dragRAF + dragDirty），减少冗余计算
- 拖拽时用 dragOrig 直接计算，不调 readOrigGrid
- CSS will-change + content-visibility: auto + contain: layout style 优化 reflow
- post 列最小宽度 = go-btns × 1.5，保留 sidetools 空间

### 修复
- P1-05：initEditorWidth 先于 loadWidthData，修复持久化时序回归
- P1-06：sidetool-switch 解耦循环依赖，改注入回调
- R01：dragApplyWidth 判空防护，防止 editor 全部消失时崩溃
- R04：ResizeObserver 回调去掉重复的 forEach 删 dataset
- N02：window blur 强制结束拖拽，防止状态残留
- 删除未调用的 updateHandles() 死代码

## v1.0.1 (2026-04-25)

### 修复
- **PADD 开关响应**：修复 PADD 开关切换后侧边栏图标和设置面板+号按钮未及时更新，改用 `syncSettings` 模式监听状态变化（参考 oh-StarTrek）
- **默认值初始化**：首次加载插件时自动初始化 `paddEnabled = true`，确保插件设置面板显示开关为开启状态
- **日志清理**：非调试模式下移除冗余日志，仅保留必要的加载/卸载/状态变化日志

### 技术要点
- 使用 `subscribe(orca.state.plugins, syncSettings)` 监听插件设置变化，而非解析 ops 数组
- `syncSettings()` 函数通过对比新旧值检测变化，触发对应的启用/禁用逻辑

## v1.0.0 (2026-04-25)

### 新功能
- **PADD 设置钉选**：星际迷航风格的个人访问显示设备，将虎鲸笔记设置面板中的开关钉选到编辑器侧边栏，一键切换
- **图标选择器**：钉选时可从 1000+ Tabler Icons 中自选图标，支持搜索过滤
- **样式一致**：模拟虎鲸笔记原生 `.orca-icon-picker` 的布局和交互风格
- **Tooltip 支持**：使用虎鲸原生 `orca.components.Tooltip` 组件，风格与其他工具栏按钮一致
- **调试模式**：插件自身提供调试开关，开启后在控制台打印每次开关切换的详细日志
- **PADD 开关**：插件设置面板提供「PADD | 设置面板钉选」开关，可一键启用/禁用 PADD 功能，关闭后侧边栏钉选图标自动隐藏
- **黑名单机制**：自动过滤不可钉选的设置类型（下拉框、输入框等），支持自定义黑名单规则
- **插件设置跨插件支持**：可钉选其他插件的布尔类型设置，如 oh-StarTrek、tana-tag-color 等
- **数据持久化**：钉选配置通过 Orca 插件数据存储，重启后保持不变

### 技术要点
- 使用 Valtio proxy 直接读写设置状态，不依赖 React hooks（避免 #310 无限重渲染）
- MutationObserver 监听设置面板 DOM 变化，自动注入钉选按钮
- `orca.components.Popup` 定位图标选择器，挂载到 overlay 内部避免 z-index 遮挡
- 自动检测设置值类型（boolean / number），正确切换 1/0 和 true/false