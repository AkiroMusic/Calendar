<div align="center">

# 📅 Calendar

<p align="center">
  <img src="logo.png" alt="Calendar Logo" width="120" height="120">
</p>

**A cross-platform desktop calendar & scheduling app**

**一款跨平台桌面日历与排课应用**

[![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)]()
[![License](https://img.shields.io/badge/license-CC--BY--NC--4.0-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()

[📥 Download](#-installation) • [✨ Features](#-features) • [🚀 Usage](#-usage) • [🛠️ Development](#-development) • [📝 Changelog](CHANGELOG.md)

</div>

---

## 📖 Introduction

## 📖 简介

Calendar is a cross-platform desktop calendar & scheduling application built with Electron and React. It provides a clean, intuitive interface for daily notes, mood tracking, and class schedule management.

Calendar 是一款基于 Electron 和 React 构建的跨平台桌面日历与排课应用。它提供简洁直观的界面，支持日记记录、心情追踪和课程排课管理。

> **👤 Modifier**: [Akiro](https://github.com/sglwsjxh) · Feature enhancements and maintenance

> **👤 维护者**：[Akiro](https://github.com/sglwsjxh) · 功能增强与日常维护

---

## ✨ Features

## ✨ 功能特性

- **🎯 Clean Design** — Minimalist interface focused on content
- **🎯 简洁设计** — 极简界面，专注于内容本身
- **📚 Schedule Management** — Teacher management (name + color), course management, structured entries
- **📚 排课管理** — 教师管理（姓名 + 颜色）、课程管理、结构化条目
- **🎨 Color Labels** — Color-coded course tags by teacher in calendar cells
- **🎨 彩色标签** — 日历格内按教师颜色显示彩色课程标签
- **👥 Teacher Filter** — Filter calendar by teacher in settings
- **👥 教师筛选** — 在设置中按教师筛选日历
- **🎭 Mood Stickers** — Rich emoji to record daily moods
- **🎭 心情贴纸** — 丰富的表情符号记录每日心情
- **📊 Monthly View** — Clear monthly layout for a full overview
- **📊 月历视图** — 清晰的月度布局，一览全局
- **🔐 Privacy Protection** — PIN code and TOTP authentication
- **🔐 隐私保护** — PIN 码与 TOTP 双重认证
- **💾 Local Storage** — Fully local, privacy secured
- **💾 本地存储** — 完全本地化，隐私安全
- **🌍 Multi-language** — Simplified Chinese & English
- **🌍 多语言支持** — 简体中文与英文
- **📦 Data Import/Export** — Full data migration including schedule config
- **📦 数据导入/导出** — 完整数据迁移，包含排课配置

---

## 🛠️ Tech Stack

## 🛠️ 技术栈

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Framework |
| **TypeScript** | 5.8.2 | Type Safety |
| **Electron** | 39.2.3 | Desktop Framework |
| **Vite** | 6.4.1 | Build Tool |
| **Tailwind CSS** | 4.1.8 | Styling |
| **date-fns** | 4.1.0 | Date Handling |
| **lunar-javascript** | 1.7.7 | Lunar Calendar |
| **Lucide React** | 0.554.0 | Icon Library |

| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | 19.2.0 | UI 框架 |
| **TypeScript** | 5.8.2 | 类型安全 |
| **Electron** | 39.2.3 | 桌面框架 |
| **Vite** | 6.4.1 | 构建工具 |
| **Tailwind CSS** | 4.1.8 | 样式 |
| **date-fns** | 4.1.0 | 日期处理 |
| **lunar-javascript** | 1.7.7 | 农历 |
| **Lucide React** | 0.554.0 | 图标库 |

---

## 📥 Installation

## 📥 安装

**Latest version: v1.1.1** — [Download from GitHub Releases](https://github.com/AkiroMusic/Calendar/releases/tag/v1.1.1)

**最新版本：v1.1.1** — [从 GitHub Releases 下载](https://github.com/AkiroMusic/Calendar/releases/tag/v1.1.1)

| Platform | File | Description |
|----------|------|-------------|
| 🪟 **Windows** | `.exe` (NSIS Installer) | Custom install path supported |
| 🪟 **Windows** | `.exe` (Portable) | No installation needed, run directly |
| 🍎 **macOS** | `.dmg` | For Intel & Apple Silicon |
| 🍎 **macOS** | `.zip` | Portable Mac app |

| 平台 | 文件 | 说明 |
|------|------|------|
| 🪟 **Windows** | `.exe`（NSIS 安装包） | 支持自定义安装路径 |
| 🪟 **Windows** | `.exe`（便携版） | 免安装，直接运行 |
| 🍎 **macOS** | `.dmg` | 支持 Intel 与 Apple Silicon |
| 🍎 **macOS** | `.zip` | Mac 便携应用 |

---

## 📖 Usage

## 📖 使用指南

### Schedule Management

### 排课管理

1. Click the settings icon ⚙️ in the top right
1. 点击右上角的设置图标 ⚙️
2. Switch to the **Schedule Settings** tab
2. 切换到「排课设置」标签页
3. **Add Teacher**: Enter name, select color, click add
3. **添加教师**：输入姓名、选择颜色、点击添加
4. **Add Course**: Enter course name, click add
4. **添加课程**：输入课程名称、点击添加
5. Select a teacher to filter the calendar (optional)
5. 选择教师以筛选日历（可选）

### Record Schedule Entries

### 记录排课条目

1. Click any date cell
1. 点击任意日期单元格
2. Select teacher and course in the editor popup
2. 在编辑器弹窗中选择教师和课程
3. Optionally fill in notes
3. 可选填写备注
4. Click **Add Schedule Entry** for multiple entries
4. 如需多条记录，点击「添加排课条目」
5. Click **Save Changes** to complete
5. 点击「保存更改」完成

### View Schedule

### 查看排课

- Calendar cells display color-coded course labels
- 日历单元格显示彩色课程标签
- Colors match the teacher color settings
- 颜色与教师颜色设置一致
- Format: **Teacher · Course**
- 格式：**教师 · 课程**

### Mood Stickers

### 心情贴纸

Select mood stickers at the bottom of the date editor. Multiple stickers can be added.

在日期编辑器底部选择心情贴纸，可添加多个。

### Monthly Plan

### 月度计划

Record monthly goals at the top of the calendar. Supports up to 3 plan entries.

在日历顶部记录月度目标，最多支持 3 条计划。

### Advanced Features

### 高级功能

| Feature | How to Use |
|---------|------------|
| **📦 Backup & Restore** | Settings → Export/Import Backup — exports full data including schedule config |
| **🔍 Search** | `Ctrl+F` (Windows/Linux) or `⌘F` (macOS) — full-text search across all entries |
| **🌍 Switch Language** | Settings → Language section — switches immediately |
| **🔒 Security** | PIN code + TOTP authenticator — app startup verification |

| 功能 | 使用方法 |
|------|----------|
| **📦 备份与恢复** | 设置 → 导出/导入备份 — 导出包含排课配置在内的完整数据 |
| **🔍 搜索** | `Ctrl+F`（Windows/Linux）或 `⌘F`（macOS）— 全条目全文搜索 |
| **🌍 切换语言** | 设置 → 语言选项 — 立即生效 |
| **🔒 安全** | PIN 码 + TOTP 验证器 — 应用启动验证 |

---

## 🚀 Development

## 🚀 开发

### Requirements

### 环境要求

- **Node.js**: 18.x or higher
- **Node.js**：18.x 或更高版本
- **npm**: Bundled with Node.js
- **npm**：随 Node.js 一同安装

### Setup

### 安装依赖

```bash
npm install
```

### Development Mode

### 开发模式

```bash
npm run dev
```

Starts the Vite dev server and auto-launches Electron with HMR support.

启动 Vite 开发服务器并自动启动 Electron，支持 HMR 热更新。

### Build

### 构建

```bash
# All platforms
npm run electron:build

# macOS
npm run electron:build:mac

# Windows
npm run electron:build:win

# Linux
npm run electron:build:linux
```

Output goes to the `release/` directory.

构建产物输出到 `release/` 目录。

### Data Storage

### 数据存储

| Data | File | Description |
|------|------|-------------|
| Calendar Data | `calendar_data.json` | All schedule entries and stickers |
| Monthly Plans | `calendar_plans.json` | Monthly goal plans |
| Schedule Config | `schedule_config.json` | Teacher and course lists |

| 数据 | 文件 | 说明 |
|------|------|------|
| 日历数据 | `calendar_data.json` | 所有排课条目和贴纸 |
| 月度计划 | `calendar_plans.json` | 月度目标计划 |
| 排课配置 | `schedule_config.json` | 教师与课程列表 |

**Storage locations:**

**存储位置：**

- **Windows**: `%APPDATA%\Calendar\`
- **Windows**：`%APPDATA%\Calendar\`
- **macOS**: `~/Library/Application Support/Calendar/`
- **macOS**：`~/Library/Application Support/Calendar/`
- **Linux**: `~/.config/Calendar/`
- **Linux**：`~/.config/Calendar/`

---

## 📝 Changelog

## 📝 更新日志

See [CHANGELOG.md](CHANGELOG.md) for the full release history.

完整的发布历史请查看 [CHANGELOG.md](CHANGELOG.md)。

---

## 📄 License

## 📄 许可证

This project is licensed under [CC-BY-NC-4.0](LICENSE).

本项目基于 [CC-BY-NC-4.0](LICENSE) 许可证发布。

| | |
|-|-|
| ✅ **You may** | Share and adapt |
| 📝 **Attribution** | Must credit Akiro |
| 🚫 **NonCommercial** | Not for commercial purposes |

| | |
|-|-|
| ✅ **允许** | 共享与改编 |
| 📝 **署名** | 必须注明 Akiro |
| 🚫 **非商业** | 禁止用于商业用途 |

---

<div align="center">

**If this project helps you, please give it a ⭐ Star!**

**如果这个项目对你有帮助，请给它一个 ⭐ Star！**

© 2026 Akiro · Modifier

</div>
