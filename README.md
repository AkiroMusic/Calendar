<div align="center">

**简体中文** | [English](README_EN.md)

# 📅 Calendar - 日历日程

<p align="center">
  <img src="logo.png" alt="Calendar Logo" width="120" height="120">
</p>

**一款简洁优雅的日历日程应用，支持排课管理和每日记录**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-CC--BY--NC--4.0-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()

[📥 下载应用](#-下载安装) • [✨ 使用方法](#-使用方法) • [🚀 开发指南](#-开发指南) • [📝 更新日志](CHANGELOG.md)

</div>

---

## 📖 软件介绍

Calendar 是一款跨平台的桌面日历日程应用，采用现代化设计理念，为用户提供简洁直观的记录与排课管理体验。

### ✨ 核心特色

> **👤 二次开发 / Modifier**: [Akiro](https://github.com/sglwsjxh) · 在原有项目基础上进行功能增强与维护

- **🎯 简洁设计** - 极简界面，专注于内容本身
- **📚 排课管理** - 支持教师管理（姓名+颜色标识）、课程管理，结构化录入课程安排
- **🎨 彩色标签** - 日历格内用教师专属颜色显示彩色课程标签，一目了然
- **🎭 心情贴纸** - 丰富的表情符号，记录每日心情
- **📊 月度视图** - 清晰的月历布局，一览全月安排
- **🔒 隐私保护** - 支持 PIN 码和 TOTP 验证保护
- **💾 本地存储** - 数据完全本地化，保护隐私安全
- **🌍 多语言支持** - 支持简体中文、English
- **📦 数据导入导出** - 完整数据迁移，包含排课配置

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | 19.2.0 | UI 框架 |
| **TypeScript** | 5.8.2 | 类型安全 |
| **Electron** | 39.2.3 | 桌面应用框架 |
| **Vite** | 6.4.1 | 构建工具 |
| **Tailwind CSS** | 4.1.8 | 样式框架 |
| **date-fns** | 4.1.0 | 日期处理 |
| **lunar-javascript** | 1.7.7 | 农历日期计算 |
| **Lucide React** | 0.554.0 | 图标库 |

## 📥 下载安装

### 最新版本：v1.0.0

下载适合你系统的安装包：

| 平台 | 文件类型 | 说明 |
|------|----------|------|
| 🪟 **Windows** | `.exe` (NSIS 安装器) | 支持自定义安装路径 |
| 🪟 **Windows** | `.exe` (便携版) | 无需安装，解压即用 |
| 🍎 **macOS** | `.dmg` | 适用于 Apple Silicon (M1/M2/M3) |
| 🐧 **Linux** | `.AppImage` | 通用 Linux 应用格式 |
| 🐧 **Linux** | `.deb` | Debian/Ubuntu 系统 |

## 📖 使用方法

### 基本操作

#### 1️⃣ 排课管理
1. 点击右上角设置图标 ⚙️
2. 切换到「排课管理」标签页
3. **添加教师**：输入姓名，选择颜色，点击添加
4. **添加课程**：输入课程名称，点击添加
5. 教师和课程添加后，即可在日期编辑器中录入课程安排

#### 2️⃣ 录入课程安排
1. 点击任意日期格子
2. 在弹出的编辑器中，选择教师和课程
3. 可选填写备注信息
4. 点击「添加课程记录」可添加多条
5. 点击「保存更改」完成记录

#### 3️⃣ 查看排课
- 日历格内会显示带教师颜色的课程标签
- 颜色与教师设置的颜色一致
- 显示格式：「教师名 · 课程名」

#### 4️⃣ 记录心情贴纸
- 在日期编辑器底部选择心情贴纸
- 支持多个贴纸同时添加

#### 5️⃣ 月度计划
- 在日历顶部区域记录本月目标
- 支持 3 条独立的计划条目

### 高级功能

#### 📦 数据备份与恢复

**导出备份：**
1. 点击右上角设置图标 ⚙️
2. 选择「导出备份」
3. 选择保存位置，文件名格式：`schedule_backup_YYYY-MM-DD.json`

**导入备份：**
1. 点击右上角设置图标 ⚙️
2. 选择「导入备份」
3. 选择之前导出的 JSON 文件
4. 数据将完整恢复（包括排课配置）

#### 🔍 搜索功能
- 快捷键 `Ctrl+F`（Windows/Linux）或 `⌘F`（macOS）
- 支持全文搜索所有课程备注和记录

#### 🌍 切换语言
1. 点击设置图标 ⚙️
2. 在「语言」区域选择
3. 语言会立即切换

#### 🔒 安全保护
- 支持 PIN 码和 TOTP 验证器双重认证
- 应用启动时验证身份

## 🚀 开发指南

### 环境要求

- **Node.js**: 18.x 或更高版本
- **npm**: Node.js 自带的包管理器

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

这将启动 Vite 开发服务器并自动启动 Electron 应用，支持热重载。

### 构建打包

```bash
# 构建所有平台
npm run electron:build

# macOS
npm run electron:build:mac

# Windows
npm run electron:build:win

# Linux
npm run electron:build:linux
```

构建产物输出到 `release/` 目录。

### 数据存储

| 数据 | 文件 | 说明 |
|------|------|------|
| 日历数据 | `calendar_data.json` | 所有课程记录和贴纸 |
| 月度计划 | `calendar_plans.json` | 月度目标计划 |
| 排课配置 | `schedule_config.json` | 教师和课程列表 |

存储位置：
- **Windows**: `%APPDATA%\Calendar\`
- **macOS**: `~/Library/Application Support/Calendar/`
- **Linux**: `~/.config/Calendar/`

## 📝 更新日志

详见 [CHANGELOG.md](CHANGELOG.md)

## 📄 许可证

本项目采用 [CC-BY-NC-4.0](LICENSE) 许可证。

**您可以：**
- ✅ 分享 - 复制和再分发
- ✅ 修改 - 重新混合、转换和基于此构建

**条件：**
- 📝 署名 - 必须给出适当的署名（Akiro）
- 🚫 非商业性使用 - 不得用于商业目的

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star！**

© 2026 Akiro · 二次开发 / Modifier

</div>
