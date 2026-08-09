
# Changelog

# 更新日志

This document records all important changes to the project.

本文档记录项目的所有重要变更。

## [1.1.1] - 2026-07-21

### 🐛 Bug Fixes

### 🐛 问题修复

- 🔧 Fixed the icon display error (icons swapped) for the import/export backup buttons on the settings page
- 🔧 修正设置页面中导入/导出备份按钮的图标显示错误（图标互换）

### 🛠️ Technical Improvements

### 🛠️ 技术改进

- 📦 CI now includes GitHub Actions workflow write permissions configuration
- 📦 CI 新增 GitHub Actions 工作流写入权限配置

---

## [1.1.0] - 2026-07-13

### ✨ New Features

### ✨ 新增功能

- 👥 Teacher-course filtering: select a specific teacher in Settings → Schedule Management and the calendar shows only that teacher's courses
- 👥 教师课程筛选：在设置 → 排课管理中选择特定教师后，日历只显示该教师的课程
- 🔍 Two filter modes: "All Teachers" and a single teacher; the filter state is saved automatically
- 🔍 支持「所有教师」和单个教师两种筛选模式，筛选状态自动保存

### 🛠️ Technical Improvements

### 🛠️ 技术改进

- ♿ The teacher filter moved from the toolbar to Schedule Management in Settings for a cleaner interface
- ♿ 教师筛选器从工具栏移至设置页排课管理，界面更简洁
- 🌐 Full internationalization: all hardcoded Chinese in the schedule management page and course editor replaced with i18n calls
- 🌐 全面国际化：排课管理页面和课程编辑器中所有硬编码中文替换为 i18n 调用
- 🧹 Type safety improvements: removed `any` casts, StorageService gained full type signatures
- 🧹 类型安全改进：移除 `any` 类型转换、StorageService 添加完整类型签名
- 🔒 Removed unused `onDisplaySettingsChange` prop; Import now validates data
- 🔒 移除无用 `onDisplaySettingsChange` prop，Import 添加数据校验
- 📦 CI now builds Windows NSIS installers
- 📦 CI 新增 Windows NSIS 安装包构建

---

## [1.0.0] - 2026-06-17

### ✨ New Features

### ✨ 新增功能

- 📚 Academic schedule management
- 📚 教务排课功能
  - Teacher management: add/remove teachers, each with a dedicated color
  - 教师管理：支持添加/删除教师，每位教师可设置专属颜色
  - Course management: add/remove courses
  - 课程管理：支持添加/删除课程
  - Structured scheduling: daily events became structured "Teacher + Course + Notes" entries
  - 结构化排课：每天的事件改为「教师 + 课程 + 备注」结构化条目
  - Color labels: calendar cells show color-coded course tags in the teacher's color
  - 彩色标签：月历格内用教师专属颜色显示彩色课程标签
  - Schedule config persistence (Electron filesystem / browser localStorage)
  - 排课配置数据持久化（Electron 文件系统 / 浏览器 localStorage）
- 📦 Export/import now includes schedule config; version bumped to v3
- 📦 导出/导入包含排课配置，版本升级至 v3
- 🌐 New schedule-related i18n entries for Chinese and English
- 🌐 新增排课相关 i18n 中英文词条

### 🛠️ Technical Improvements

### 🛠️ 技术改进

- `DayData.events` type changed from `DayEvent[]` to `ScheduleEntry[]`
- `DayData.events` 类型从 `DayEvent[]` 改为 `ScheduleEntry[]`
- New `Teacher`, `Course`, `ScheduleEntry`, `ScheduleConfig` types
- 新增 `Teacher`、`Course`、`ScheduleEntry`、`ScheduleConfig` 类型
- Electron main process gained `schedule_config.json` file management and IPC channels
- Electron 主进程新增 `schedule_config.json` 文件管理和 IPC 通道
- New "Schedule Management" tab in Settings
- 设置页面新增「排课管理」标签页
- DayEditor rebuilt from free-text editing into a structured teacher/course selector
- DayEditor 从自由文本编辑改造为结构化的教师/课程选择器
- DayCell schedule rendering changed to color label style
- DayCell 排课渲染改为彩色标签样式

### 🧹 Cleanup

### 🧹 清理

- Removed unused files: `mimo.exe`, `setup.sh`, `metadata.json`
- 移除无用文件：`mimo.exe`、`setup.sh`、`metadata.json`
- Removed 51LA analytics tracking code
- 移除 51LA 统计追踪代码
- Unified version naming and metadata cleanup
- 统一版本命名和元数据清理

---

## [0.2.0-beta] - 2025-12-04

### ✨ New Features

### ✨ 新增功能

- ☁️ WebDAV cloud sync
- ☁️ WebDAV 云同步功能
  - Connect to WebDAV servers for data sync
  - 支持连接 WebDAV 服务器进行数据同步
  - Cloud backup management (create, restore, delete)
  - 云端备份管理（创建、恢复、删除）
  - Sync conflict detection and resolution
  - 同步冲突检测与解决
  - Real-time operation log display
  - 操作日志实时显示
- ⚙️ New "Cloud Sync" configuration tab in Settings
- ⚙️ 设置中新增「云同步」配置 Tab
  - WebDAV server address, path, account and password configuration
  - WebDAV 服务器地址、路径、账号密码配置
  - Connection test feature
  - 连接测试功能
- 🔄 Manual update check
- 🔄 手动检查更新功能
  - New "Check for Updates" button in the About dialog
  - 关于弹窗中新增「检查更新」按钮
  - Compare current version with the latest version
  - 支持查看当前版本与最新版本对比
  - One-click jump to the release page for download
  - 一键跳转软件发布页下载

### 🌍 Internationalization

### 🌍 国际化

- Window button tooltips now multilingual (About, Settings, Minimize, Maximize, Close)
- 窗口按钮 tooltip 多语言支持（关于、设置、最小化、最大化、关闭）

### 🛠️ Technical Improvements

### 🛠️ 技术改进

- Comprehensive performance optimization
- 全面性能优化
  - `React.memo` optimizes component rendering (DayCell, CalendarHeader, DayEditor, etc.)
  - 使用 `React.memo` 优化组件渲染（DayCell、CalendarHeader、DayEditor 等）
  - `useCallback` and `useMemo` reduce unnecessary re-renders
  - 使用 `useCallback` 和 `useMemo` 减少不必要的重新渲染
  - Improved event handler stability
  - 优化事件处理函数的稳定性

### 🐛 Bug Fixes

### 🐛 问题修复

- Fixed lunar date/festival text overflow in calendar cells
- 修复日历单元格农历/节日文字溢出问题
- Fixed preview popup not closing when clicking the background
- 修复预览弹窗点击背景无法关闭的问题
- Fixed empty sticker arrays still rendering the container
- 修复空贴纸数组仍渲染容器的问题
- Fixed editor text box height being unbounded
- 修复编辑器文本框高度无限制的问题
- Fixed long text in the diary editor not wrapping
- 修复日记编辑器中长文本内容无法自动换行显示的问题
- Fixed the cloud sync button jumping without any prompt when sync is not configured
- 修复未配置云同步时点击云同步按钮无提示直接跳转的问题

---

## [0.1.6-beta] - 2025-11-29

### 🛠️ Technical Improvements

### 🛠️ 技术改进

- Performance optimization.
- 性能优化。

---

## [0.1.5-beta] - 2025-11-28

### ✨ New Features

### ✨ 新增功能

- 🖱️ Right-click diary preview: right-click a day to open a "preview window" styled like the Settings window
- 🖱️ 右键预览日记：在某一天上右键弹出"预览窗口"，样式与"设置"窗口一致
- 🪟 Multi-preview support: multiple date preview cards displayed side by side in the same overlay
- 🪟 多预览支持：同一遮罩层中并排展示多个日期的预览卡片，便于同时查看
- 🧭 Centered display with larger size: preview centered, default width increased to 700px
- 🧭 居中显示与大尺寸：预览窗口居中显示，默认宽度增至 700px，适配更大内容
- 📜 Full multi-line display: each record shown as multi-line text with vertical scrolling
- 📜 完整多行展示：每条记录完整显示为多行文本，支持纵向滚动
- 🚫 Horizontal scroll disabled: long lines wrap automatically, avoiding horizontal scrollbars
- 🚫 禁用横向滚动：长行自动换行，避免出现横向滚动条
- 🗓️ Lunar display optimization: editor subtitle shows the full lunar date (year/month/day), e.g. "乙巳年十月初九"
- 🗓️ 农历显示优化：编辑器副标题展示完整农历年月日（干支年+月+日），如"乙巳年十月初九"

### 🌍 Internationalization

### 🌍 国际化

- Entry count copy localized: `entriesCount` (e.g. "共{count}条记录")
- 记录计数文案本地化：`entriesCount`（如"共{count}条记录"）
- Search copy localized: title, placeholder, empty state, no results, result count
- 搜索功能文案本地化：标题、占位文本、空状态、无结果、结果计数
- Settings tab labels localized: `常规设置`, `安全与隐私`
- 设置页标签本地化：`常规设置`、`安全与隐私`
- Startup password protection fully localized: toggle, verification methods, hints, error messages, TOTP verification flow
- 启动密码保护区域全面本地化：开关、验证方式、提示与错误信息、TOTP 验证流程

### 🛠️ Technical Improvements

### 🛠️ 技术改进

- Version info read dynamically: Settings and About windows now read the version from config
- 版本信息动态读取：设置窗口与关于窗口的版本号改为读取配置
  - Electron environment via `app:getVersion`
  - Electron 环境通过 `app:getVersion` 获取应用版本
  - Web environment falls back to reading the `version` from package.json
  - Web 环境回退读取 `package.json` 的 `version`
- Preview overlay event interception: calendar cells under the overlay are disabled
- 预览遮罩层事件拦截：遮罩出现后禁用底层日历格子的交互
- Preview card visual polish: unified shadows and rounded corners, matching the Settings window
- 预览卡片视觉优化：统一阴影与圆角，视觉与"设置"窗口一致

### 🐛 Bug Fixes

### 🐛 Bug 修复

- Fixed i18n function type issues so `t()` is type-safe with new keys
- 修复国际化函数类型问题，保证 `t()` 在新键值下类型安全
- Fixed the bottom area still being clickable when the overlay appears
- 修复遮罩层出现时底部仍可点击的问题

---

## [0.1.4-beta] - 2025-11-27

### 🐛 Bug Fixes

### 🐛 Bug 修复

- Fixed: when a single day has more than 3 records, the page stretched and part of the UI overflowed the window, only visible after enlarging the window. Records now display dynamically; when records exceed the visible area, a count of how many records are hidden is shown in the top-right of the cell.
- 修复：单格日记超过3条以上的记录时，页面会自动被拉伸，导致一部分UI超出软件窗口，只有放大窗口才能看见。现在可以动态的展示可容下的记录，当有超出可视区域的记录时，会在格子右上部分显示具体有几条记录。

---

## [0.1.3-beta] - 2025-11-26

### ✨ New Features

### ✨ 新增功能

- 🔍 Diary search: full-text search across all diary content
- 🔍 日记搜索功能：支持全文搜索所有日记内容
- ⌨️ Keyboard shortcuts: Cmd+F on macOS, Ctrl+F on Windows/Linux
- ⌨️ 快捷键支持：macOS 使用 Cmd+F，Windows/Linux 使用 Ctrl+F
- 💡 Smart highlighting: search keywords highlighted in yellow
- 💡 智能高亮：搜索结果中关键词黄色高亮显示
- 📍 Precise navigation: click a search result to jump to the matching month and date
- 📍 精准定位：点击搜索结果自动跳转到对应月份和日期
- ✨ Visual feedback: the selected date cell flashes a blue border twice
- ✨ 视觉反馈：选中的日期单元格蓝色边框闪动两次

### 🛠️ Technical Implementation

### 🛠️ 技术实现

- Real-time search filtering with fuzzy matching
- 实时搜索过滤，支持模糊匹配
- Search results sorted by date in descending order
- 搜索结果按日期降序排列
- Shows context preview of matched text
- 显示匹配文本的上下文预览
- Pulse animation to enhance user experience
- 脉冲动画效果增强用户体验

---

## [0.1.2-beta] - 2025-11-26

### ✨ New Features

### ✨ 新增功能

- 🎉 Region-aware holidays: support for national statutory and traditional holidays
- 🎉 地区自适应节假日：支持各国法定节假日和传统节日显示
- 🔐 Security authentication: PIN code and TOTP authenticator dual authentication
- 🔐 安全认证系统：支持 PIN 码和 TOTP 验证器双重认证
- 📱 Authenticator integration: supports Google/Microsoft Authenticator and similar apps
- 📱 验证器集成：支持 Google/Microsoft Authenticator 等应用
- 🔄 Flexible authentication: PIN and authenticator can be configured and used together
- 🔄 灵活认证：PIN 码和验证器可同时配置和使用
- 🎯 Smart memory: automatically remembers the last used authentication method
- 🎯 智能记忆：自动记住上次使用的认证方式
- 🚪 Exit option: exit button provided on the authentication screen
- 🚪 退出选项：在认证界面提供退出应用按钮

### 🛠️ Technical Implementation

### 🛠️ 技术实现

- Integrated otpauth library to implement the TOTP algorithm
- 集成 otpauth 库实现 TOTP 算法
- Used the qrcode library to generate authenticator QR codes
- 使用 qrcode 库生成验证器 QR 码
- Enhanced localStorage security settings storage
- 增强 localStorage 安全设置存储
- Improved authentication modal user experience
- 改进认证模态框的用户体验

---

## [0.1.1-beta] - 2025-11-26

### 🐛 Bug Fixes

### 🐛 Bug 修复

- Fixed inaccurate lunar date display; now uses the lunar-javascript library for precise calculation
- 修复农历日期显示不准确的问题，现使用 lunar-javascript 库进行精确计算

---

## [0.1.0-beta] - 2025-01-22

### ✨ New Features

### ✨ 新增功能

- 📅 Monthly calendar view
- 📅 月历视图展示
- 📝 Multi-line text diary/todo records
- 📝 多行文本日记/待办记录
- 🎨 Mood sticker system (20+ emoji)
- 🎨 心情贴纸系统（20+ 表情）
- 📊 Monthly plan feature (up to 3 plans)
- 📊 月度计划功能（3条计划）
- 💾 Local data storage
- 💾 本地数据存储
- 📦 Data import/export
- 📦 数据导入/导出功能
- 🌍 Multi-language support (Simplified Chinese, Traditional Chinese, English, Japanese, Korean, Russian)
- 🌍 多语言支持（简中、繁中、英、日、韩、俄）
- 🔄 Automatic update detection
- 🔄 自动更新检测
- 🖥️ Cross-platform support (Windows, macOS, Linux)
- 🖥️ 跨平台支持（Windows、macOS、Linux）
- ⚙️ Custom title bar
- ⚙️ 自定义标题栏
- 🎯 Quick emoji selection
- 🎯 表情符号快速选择

### 🛠️ Technical Implementation

### 🛠️ 技术实现

- React 19.2.0
- TypeScript 5.8.2
- Electron 39.2.3
- Vite 6.2.0
- Tailwind CSS

---
