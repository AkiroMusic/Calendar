<div align="center">

[简体中文](README.md) | **English**

# 📅 Calendar

<p align="center">
  <img src="logo.png" alt="Calendar Logo" width="120" height="120">
</p>

**A simple and elegant calendar & scheduling app with class scheduling support**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-CC--BY--NC--4.0-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()

[📥 Download](#-installation) • [✨ Usage](#-usage) • [🚀 Development](#-development-guide) • [📝 Changelog](CHANGELOG.md)

</div>

---

## 📖 Introduction

Calendar is a cross-platform desktop calendar & scheduling application with a modern design philosophy, providing users with a simple and intuitive experience for daily recording and class schedule management.

### ✨ Key Features

> **👤 Modifier**: [Akiro](https://github.com/sglwsjxh) · Feature enhancements and maintenance based on the original project

- **🎯 Clean Design** - Minimalist interface focused on content
- **📚 Schedule Management** - Teacher management (name + color), course management, structured schedule entries
- **🎨 Color Labels** - Calendar cells display color-coded course labels using teacher-assigned colors
- **🎭 Mood Stickers** - Rich emoji collection to record daily moods
- **📊 Monthly View** - Clear monthly calendar layout for overview
- **🔐 Privacy Protection** - PIN code and TOTP authentication support
- **💾 Local Storage** - Fully local data storage for privacy protection
- **🌍 Multi-language** - Supports Simplified Chinese and English
- **📦 Data Import/Export** - Complete data migration including schedule configuration

## 🛠️ Tech Stack

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

## 📥 Installation

### Latest Version: v1.0.0

Download the installer for your system:

| Platform | File Type | Description |
|----------|-----------|-------------|
| 🪟 **Windows** | `.exe` (NSIS Installer) | Custom installation path supported |
| 🪟 **Windows** | `.exe` (Portable) | No installation needed |
| 🍎 **macOS** | `.dmg` | For Apple Silicon (M1/M2/M3) |
| 🐧 **Linux** | `.AppImage` | Universal Linux format |
| 🐧 **Linux** | `.deb` | Debian/Ubuntu systems |

## 📖 Usage

### Basic Operations

#### 1️⃣ Schedule Management
1. Click settings icon ⚙️ in top right
2. Switch to "Schedule Settings" tab
3. **Add Teacher**: Enter name, select color, click add
4. **Add Course**: Enter course name, click add
5. After adding teachers and courses, you can record schedule entries in the date editor

#### 2️⃣ Record Schedule Entries
1. Click any date cell
2. In the editor popup, select teacher and course
3. Optionally fill in notes
4. Click "Add Schedule Entry" for multiple entries
5. Click "Save Changes" to complete

#### 3️⃣ View Schedule
- Calendar cells display color-coded course labels
- Colors match teacher settings
- Format: "Teacher · Course"

#### 4️⃣ Add Mood Stickers
- Select mood stickers at the bottom of date editor
- Multiple stickers can be added

#### 5️⃣ Monthly Plan
- Record monthly goals at the top of calendar
- Supports 3 independent plan entries

### Advanced Features

#### 📦 Data Backup & Restore

**Export Backup:**
1. Click settings icon ⚙️
2. Select "Export Backup"
3. Choose save location, filename: `schedule_backup_YYYY-MM-DD.json`

**Import Backup:**
1. Click settings icon ⚙️
2. Select "Import Backup"
3. Select previously exported JSON file
4. Data will be fully restored (including schedule config)

#### 🔍 Search
- Shortcut: `Ctrl+F` (Windows/Linux) or `⌘F` (macOS)
- Full-text search across all schedule notes and entries

#### 🌍 Switch Language
1. Click settings icon ⚙️
2. Select from "Language" section
3. Language switches immediately

#### 🔒 Security
- PIN code and TOTP authenticator support
- App startup authentication

## 🚀 Development Guide

### Requirements

- **Node.js**: 18.x or higher
- **npm**: Bundled with Node.js

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

This starts Vite dev server and auto-launches Electron with HMR support.

### Build

```bash
# Build for all platforms
npm run electron:build

# macOS
npm run electron:build:mac

# Windows
npm run electron:build:win

# Linux
npm run electron:build:linux
```

Build output goes to `release/` directory.

### Data Storage

| Data | File | Description |
|------|------|-------------|
| Calendar Data | `calendar_data.json` | All schedule entries and stickers |
| Monthly Plans | `calendar_plans.json` | Monthly goal plans |
| Schedule Config | `schedule_config.json` | Teacher and course lists |

Storage locations:
- **Windows**: `%APPDATA%\Calendar\`
- **macOS**: `~/Library/Application Support/Calendar/`
- **Linux**: `~/.config/Calendar/`

## 📄 License

This project is licensed under [CC-BY-NC-4.0](LICENSE).

**You may:**
- ✅ Share - Copy and redistribute
- ✅ Adapt - Remix, transform, and build upon

**Conditions:**
- 📝 Attribution - Must give appropriate credit (Akiro)
- 🚫 NonCommercial - Not for commercial purposes

---

<div align="center">

**If this project helps you, please give it a ⭐ Star!**

© 2026 Akiro · Modifier

</div>
