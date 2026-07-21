<div align="center">

# 馃搮 Calendar

<p align="center">
  <img src="logo.png" alt="Calendar Logo" width="120" height="120">
</p>

**A cross-platform desktop calendar & scheduling app**

[![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)]()
[![License](https://img.shields.io/badge/license-CC--BY--NC--4.0-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()

[馃摜 Download](#-installation) 鈥?[鉁?Features](#-features) 鈥?[馃殌 Usage](#-usage) 鈥?[馃洜锔?Development](#-development) 鈥?[馃摑 Changelog](CHANGELOG.md)

</div>

---

## 馃摉 Introduction

Calendar is a cross-platform desktop calendar & scheduling application built with Electron and React. It provides a clean, intuitive interface for daily notes, mood tracking, and class schedule management.

> **馃懁 Modifier**: [Akiro](https://github.com/sglwsjxh) 路 Feature enhancements and maintenance

---

## 鉁?Features

- **馃幆 Clean Design** 鈥?Minimalist interface focused on content
- **馃摎 Schedule Management** 鈥?Teacher management (name + color), course management, structured entries
- **馃帹 Color Labels** 鈥?Color-coded course tags by teacher in calendar cells
- **馃懃 Teacher Filter** 鈥?Filter calendar by teacher in settings
- **馃幁 Mood Stickers** 鈥?Rich emoji to record daily moods
- **馃搳 Monthly View** 鈥?Clear monthly layout for a full overview
- **馃攼 Privacy Protection** 鈥?PIN code and TOTP authentication
- **馃捑 Local Storage** 鈥?Fully local, privacy secured
- **馃實 Multi-language** 鈥?Simplified Chinese & English
- **馃摝 Data Import/Export** 鈥?Full data migration including schedule config

---

## 馃洜锔?Tech Stack

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

## 馃摜 Installation

**Latest version: v1.1.1** — [Download from GitHub Releases](https://github.com/AkiroMusic/Calendar/releases/tag/v1.1.1)

| Platform | File | Description |
|----------|------|-------------|
| 馃獰 **Windows** | `.exe` (NSIS Installer) | Custom install path supported |
| 馃獰 **Windows** | `.exe` (Portable) | No installation needed, run directly |
| 馃崕 **macOS** | `.dmg` | For Intel & Apple Silicon |
| 馃崕 **macOS** | `.zip` | Portable Mac app |

---

## 馃摉 Usage

### Schedule Management

1. Click the settings icon 鈿欙笍 in the top right
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
- Format: **Teacher 路 Course**

### Mood Stickers

Select mood stickers at the bottom of the date editor. Multiple stickers can be added.

### Monthly Plan

Record monthly goals at the top of the calendar. Supports up to 3 plan entries.

### Advanced Features

| Feature | How to Use |
|---------|------------|
| **馃摝 Backup & Restore** | Settings 鈫?Export/Import Backup 鈥?exports full data including schedule config |
| **馃攳 Search** | `Ctrl+F` (Windows/Linux) or `鈱楩` (macOS) 鈥?full-text search across all entries |
| **馃實 Switch Language** | Settings 鈫?Language section 鈥?switches immediately |
| **馃敀 Security** | PIN code + TOTP authenticator 鈥?app startup verification |

---

## 馃殌 Development

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

## 馃摑 Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full release history.

---

## 馃搫 License

This project is licensed under [CC-BY-NC-4.0](LICENSE).

| | |
|-|-|
| 鉁?**You may** | Share and adapt |
| 馃摑 **Attribution** | Must credit Akiro |
| 馃毇 **NonCommercial** | Not for commercial purposes |

---

<div align="center">

**If this project helps you, please give it a 猸?Star!**

漏 2026 Akiro 路 Modifier

</div>
