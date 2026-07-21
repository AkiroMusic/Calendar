<div align="center">

# 📅 Calendar

<p align="center">
  <img src="logo.png" alt="Calendar Logo" width="120" height="120">
</p>

**A cross-platform desktop calendar & scheduling app**

[![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)]()
[![License](https://img.shields.io/badge/license-CC--BY--NC--4.0-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()

[📥 Download](#-installation) • [✨ Features](#-features) • [🚀 Usage](#-usage) • [🛠️ Development](#-development) • [📝 Changelog](CHANGELOG.md)

</div>

---

## 📖 Introduction

Calendar is a cross-platform desktop calendar & scheduling application built with Electron and React. It provides a clean, intuitive interface for daily notes, mood tracking, and class schedule management.

> **👤 Modifier**: [Akiro](https://github.com/sglwsjxh) · Feature enhancements and maintenance

---

## ✨ Features

- **🎯 Clean Design** — Minimalist interface focused on content
- **📚 Schedule Management** — Teacher management (name + color), course management, structured entries
- **🎨 Color Labels** — Color-coded course tags by teacher in calendar cells
- **👥 Teacher Filter** — Filter calendar by teacher in settings
- **🎭 Mood Stickers** — Rich emoji to record daily moods
- **📊 Monthly View** — Clear monthly layout for a full overview
- **🔐 Privacy Protection** — PIN code and TOTP authentication
- **💾 Local Storage** — Fully local, privacy secured
- **🌍 Multi-language** — Simplified Chinese & English
- **📦 Data Import/Export** — Full data migration including schedule config

---

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

---

## 📥 Installation

**Latest version: v1.1.1** — [Download from GitHub Releases](https://github.com/AkiroMusic/Calendar/releases/tag/v1.1.1)

| Platform | File | Description |
|----------|------|-------------|
| 🪟 **Windows** | `.exe` (NSIS Installer) | Custom install path supported |
| 🪟 **Windows** | `.exe` (Portable) | No installation needed, run directly |
| 🍎 **macOS** | `.dmg` | For Intel & Apple Silicon |
| 🍎 **macOS** | `.zip` | Portable Mac app |

---

## 📖 Usage

### Schedule Management

1. Click the settings icon ⚙️ in the top right
2. Switch to the **Schedule Settings** tab
3. **Add Teacher**: Enter name, select color, click add
4. **Add Course**: Enter course name, click add
5. Select a teacher to filter the calendar (optional)

### Record Schedule Entries

1. Click any date cell
2. Select teacher and course in the editor popup
3. Optionally fill in notes
4. Click **Add Schedule Entry** for multiple entries
5. Click **Save Changes** to complete

### View Schedule

- Calendar cells display color-coded course labels
- Colors match the teacher color settings
- Format: **Teacher · Course**

### Mood Stickers

Select mood stickers at the bottom of the date editor. Multiple stickers can be added.

### Monthly Plan

Record monthly goals at the top of the calendar. Supports up to 3 plan entries.

### Advanced Features

| Feature | How to Use |
|---------|------------|
| **📦 Backup & Restore** | Settings → Export/Import Backup — exports full data including schedule config |
| **🔍 Search** | `Ctrl+F` (Windows/Linux) or `⌘F` (macOS) — full-text search across all entries |
| **🌍 Switch Language** | Settings → Language section — switches immediately |
| **🔒 Security** | PIN code + TOTP authenticator — app startup verification |

---

## 🚀 Development

### Requirements

- **Node.js**: 18.x or higher
- **npm**: Bundled with Node.js

### Setup

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

Starts the Vite dev server and auto-launches Electron with HMR support.

### Build

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

### Data Storage

| Data | File | Description |
|------|------|-------------|
| Calendar Data | `calendar_data.json` | All schedule entries and stickers |
| Monthly Plans | `calendar_plans.json` | Monthly goal plans |
| Schedule Config | `schedule_config.json` | Teacher and course lists |

**Storage locations:**
- **Windows**: `%APPDATA%\Calendar\`
- **macOS**: `~/Library/Application Support/Calendar/`
- **Linux**: `~/.config/Calendar/`

---

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full release history.

---

## 📄 License

This project is licensed under [CC-BY-NC-4.0](LICENSE).

| | |
|-|-|
| ✅ **You may** | Share and adapt |
| 📝 **Attribution** | Must credit Akiro |
| 🚫 **NonCommercial** | Not for commercial purposes |

---

<div align="center">

**If this project helps you, please give it a ⭐ Star!**

© 2026 Akiro · Modifier

</div>
