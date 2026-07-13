<div align="center">

English | [绠€浣撲腑鏂嘳(#-chinese-version)

# 馃搮 Calendar - 鏃ュ巻鏃ョ▼

<p align="center">
  <img src="logo.png" alt="Calendar Logo" width="120" height="120">
</p>

**A cross-platform desktop calendar & scheduling app with class scheduling support**

**璺ㄥ钩鍙扮殑妗岄潰鏃ュ巻鏃ョ▼搴旂敤锛屾敮鎸佹帓璇剧鐞嗗拰姣忔棩璁板綍**

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-CC--BY--NC--4.0-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()

[馃摜 Download / 涓嬭浇](#-installation--涓嬭浇瀹夎) 鈥?[鉁?Usage / 浣跨敤](#-usage--浣跨敤鏂规硶) 鈥?[馃殌 Development / 寮€鍙慮(#-development-guide--寮€鍙戞寚鍗? 鈥?[馃摑 Changelog](CHANGELOG.md)

</div>

---

## 馃摉 Introduction / 杞欢浠嬬粛

Calendar is a cross-platform desktop calendar & scheduling application with a modern design philosophy, providing users with simple and intuitive daily recording and class schedule management.

Calendar 鏄竴娆捐法骞冲彴鐨勬闈㈡棩鍘嗘棩绋嬪簲鐢紝閲囩敤鐜颁唬鍖栬璁＄悊蹇碉紝涓虹敤鎴锋彁渚涚畝娲佺洿瑙傜殑璁板綍涓庢帓璇剧鐞嗕綋楠屻€?
> **馃懁 Modifier / 浜屾寮€鍙?*: [Akiro](https://github.com/sglwsjxh)

---

## 鉁?Key Features / 鏍稿績鐗硅壊

| English | 涓枃 |
|---------|------|
| **馃幆 Clean Design** 鈥?Minimalist interface focused on content | **馃幆 绠€娲佽璁?* 鈥?鏋佺畝鐣岄潰锛屼笓娉ㄤ簬鍐呭鏈韩 |
| **馃摎 Schedule Management** 鈥?Teacher management (name + color), course management, structured entries | **馃摎 鎺掕绠＄悊** 鈥?鏀寔鏁欏笀绠＄悊锛堝鍚?棰滆壊鏍囪瘑锛夈€佽绋嬬鐞嗭紝缁撴瀯鍖栧綍鍏ヨ绋嬪畨鎺?|
| **馃帹 Color Labels** 鈥?Color-coded course tags by teacher in calendar cells | **馃帹 褰╄壊鏍囩** 鈥?鏃ュ巻鏍煎唴鐢ㄦ暀甯堜笓灞為鑹叉樉绀哄僵鑹茶绋嬫爣绛撅紝涓€鐩簡鐒?|
| **馃幁 Mood Stickers** 鈥?Rich emoji to record daily moods | **馃幁 蹇冩儏璐寸焊** 鈥?涓板瘜鐨勮〃鎯呯鍙凤紝璁板綍姣忔棩蹇冩儏 |
| **馃懃 Teacher Filter** 鈥?Filter calendar by teacher in settings | **馃懃 鏁欏笀绛涢€?* 鈥?鍦ㄨ缃腑閫夋嫨鏁欏笀锛屾棩鍘嗗彧鏄剧ず璇ユ暀甯堢殑璇剧▼ |
| **馃搳 Monthly View** 鈥?Clear monthly layout for full overview | **馃搳 鏈堝害瑙嗗浘** 鈥?娓呮櫚鐨勬湀鍘嗗竷灞€锛屼竴瑙堝叏鏈堝畨鎺?|
| **馃攼 Privacy Protection** 鈥?PIN code and TOTP authentication | **馃敀 闅愮淇濇姢** 鈥?鏀寔 PIN 鐮佸拰 TOTP 楠岃瘉淇濇姢 |
| **馃捑 Local Storage** 鈥?Fully local, privacy secured | **馃捑 鏈湴瀛樺偍** 鈥?鏁版嵁瀹屽叏鏈湴鍖栵紝淇濇姢闅愮瀹夊叏 |
| **馃實 Multi-language** 鈥?Simplified Chinese & English | **馃實 澶氳瑷€鏀寔** 鈥?鏀寔绠€浣撲腑鏂囥€丒nglish |
| **馃摝 Data Import/Export** 鈥?Full data migration including schedule config | **馃摝 鏁版嵁瀵煎叆瀵煎嚭** 鈥?瀹屾暣鏁版嵁杩佺Щ锛屽寘鍚帓璇鹃厤缃?|

---

## 馃洜锔?Tech Stack / 鎶€鏈爤

| Technology / 鎶€鏈?| Version / 鐗堟湰 | Purpose / 鐢ㄩ€?|
|-------------------|----------------|----------------|
| **React** | 19.2.0 | UI Framework / UI 妗嗘灦 |
| **TypeScript** | 5.8.2 | Type Safety / 绫诲瀷瀹夊叏 |
| **Electron** | 39.2.3 | Desktop Framework / 妗岄潰搴旂敤妗嗘灦 |
| **Vite** | 6.4.1 | Build Tool / 鏋勫缓宸ュ叿 |
| **Tailwind CSS** | 4.1.8 | Styling / 鏍峰紡妗嗘灦 |
| **date-fns** | 4.1.0 | Date Handling / 鏃ユ湡澶勭悊 |
| **lunar-javascript** | 1.7.7 | Lunar Calendar / 鍐滃巻鏃ユ湡璁＄畻 |
| **Lucide React** | 0.554.0 | Icon Library / 鍥炬爣搴?|

---

## 馃摜 Installation / 涓嬭浇瀹夎

### English

**Latest version: v1.1.0** 鈥?[Download from GitHub Releases](https://github.com/AkiroMusic/Calendar/releases/tag/v1.1.0)

| Platform | File | Description |
|----------|------|-------------|
| 馃獰 **Windows** | `.exe` (NSIS Installer) | Custom install path supported |
| 馃獰 **Windows** | `.exe` (Portable) | No installation needed, run directly |
| 馃崕 **macOS** | `.dmg` | For Intel & Apple Silicon |
| 馃崕 **macOS** | `.zip` | Portable Mac app |

### 涓枃

**鏈€鏂扮増鏈細v1.1.0** 鈥?[浠?GitHub Releases 涓嬭浇](https://github.com/AkiroMusic/Calendar/releases/tag/v1.1.0)

| 骞冲彴 | 鏂囦欢绫诲瀷 | 璇存槑 |
|------|----------|------|
| 馃獰 **Windows** | `.exe` (NSIS 瀹夎鍣? | 鏀寔鑷畾涔夊畨瑁呰矾寰?|
| 馃獰 **Windows** | `.exe` (渚挎惡鐗? | 鏃犻渶瀹夎锛岃В鍘嬪嵆鐢?|
| 馃崕 **macOS** | `.dmg` | 閫傜敤浜?Intel 鍜?Apple Silicon |
| 馃崕 **macOS** | `.zip` | Mac 渚挎惡鐗?|

---

## 馃摉 Usage / 浣跨敤鏂规硶

### Basic Operations / 鍩烘湰鎿嶄綔

#### 1锔忊儯 Schedule Management / 鎺掕绠＄悊

**English:**
1. Click settings icon 鈿欙笍 in top right
2. Switch to **Schedule Settings** tab
3. **Add Teacher**: Enter name, select color, click add
4. **Add Course**: Enter course name, click add
5. Select teacher to filter calendar (optional)

**涓枃锛?*
1. 鐐瑰嚮鍙充笂瑙掕缃浘鏍?鈿欙笍
2. 鍒囨崲鍒般€屾帓璇剧鐞嗐€嶆爣绛鹃〉
3. **娣诲姞鏁欏笀**锛氳緭鍏ュ鍚嶏紝閫夋嫨棰滆壊锛岀偣鍑绘坊鍔?4. **娣诲姞璇剧▼**锛氳緭鍏ヨ绋嬪悕绉帮紝鐐瑰嚮娣诲姞
5. 鍙€夋嫨鏁欏笀绛涢€夋棩鍘嗚鍥?
#### 2锔忊儯 Record Schedule / 褰曞叆璇剧▼瀹夋帓

**English:**
1. Click any date cell
2. Select teacher and course in the editor popup
3. Optionally fill in notes
4. Click "Add Schedule Entry" for multiple entries
5. Click "Save Changes"

**涓枃锛?*
1. 鐐瑰嚮浠绘剰鏃ユ湡鏍煎瓙
2. 鍦ㄥ脊鍑虹殑缂栬緫鍣ㄤ腑閫夋嫨鏁欏笀鍜岃绋?3. 鍙€夊～鍐欏娉ㄤ俊鎭?4. 鐐瑰嚮銆屾坊鍔犺绋嬭褰曘€嶅彲娣诲姞澶氭潯
5. 鐐瑰嚮銆屼繚瀛樻洿鏀广€嶅畬鎴愯褰?
#### 3锔忊儯 View Schedule / 鏌ョ湅鎺掕

**English:**
- Color-coded course labels in calendar cells
- Colors match teacher settings
- Format: **Teacher 路 Course**

**涓枃锛?*
- 鏃ュ巻鏍煎唴鏄剧ず甯︽暀甯堥鑹茬殑璇剧▼鏍囩
- 棰滆壊涓庢暀甯堣缃殑棰滆壊涓€鑷?- 鏄剧ず鏍煎紡锛?*鏁欏笀鍚?路 璇剧▼鍚?*

#### 4锔忊儯 Mood Stickers / 蹇冩儏璐寸焊

**English:** Select mood stickers at the bottom of the date editor. Multiple stickers can be added.

**涓枃锛?* 鍦ㄦ棩鏈熺紪杈戝櫒搴曢儴閫夋嫨蹇冩儏璐寸焊锛屾敮鎸佸涓创绾稿悓鏃舵坊鍔犮€?
#### 5锔忊儯 Monthly Plan / 鏈堝害璁″垝

**English:** Record monthly goals at the top of the calendar. Supports 3 plan entries.

**涓枃锛?* 鍦ㄦ棩鍘嗛《閮ㄥ尯鍩熻褰曟湰鏈堢洰鏍囷紝鏀寔 3 鏉＄嫭绔嬬殑璁″垝鏉＄洰銆?
### Advanced Features / 楂樼骇鍔熻兘

| Feature / 鍔熻兘 | English | 涓枃 |
|----------------|---------|------|
| **馃摝 Backup & Restore / 鏁版嵁澶囦唤涓庢仮澶?* | Export/import full data including schedule config via settings | 鍦ㄨ缃腑瀵煎嚭/瀵煎叆瀹屾暣鏁版嵁锛屽惈鎺掕閰嶇疆 |
| **馃攳 Search / 鎼滅储** | `Ctrl+F` (Win/Linux) or `鈱楩` (macOS) | 蹇嵎閿?`Ctrl+F` 鎴?`鈱楩`锛屽叏鏂囨悳绱㈡墍鏈夎褰?|
| **馃實 Switch Language / 鍒囨崲璇█** | Settings 鈫?Language section | 璁剧疆 鈫?璇█鍖哄煙閫夋嫨 |
| **馃敀 Security / 瀹夊叏淇濇姢** | PIN code + TOTP authenticator, startup verification | PIN 鐮佸拰 TOTP 楠岃瘉鍣ㄥ弻閲嶈璇侊紝鍚姩鏃堕獙璇佽韩浠?|

---

## 馃殌 Development Guide / 寮€鍙戞寚鍗?
### Requirements / 鐜瑕佹眰

- **Node.js**: 18.x or higher / 鎴栨洿楂樼増鏈?- **npm**: Bundled with Node.js / Node.js 鑷甫

### Install Dependencies / 瀹夎渚濊禆

```bash
npm install
```

### Development Mode / 寮€鍙戞ā寮?
```bash
npm run dev
```

Starts Vite dev server and auto-launches Electron with HMR support.
鍚姩 Vite 寮€鍙戞湇鍔″櫒骞惰嚜鍔ㄥ惎鍔?Electron 搴旂敤锛屾敮鎸佺儹閲嶈浇銆?
### Build / 鏋勫缓鎵撳寘

```bash
# All platforms / 鎵€鏈夊钩鍙?npm run electron:build

# macOS
npm run electron:build:mac

# Windows
npm run electron:build:win

# Linux
npm run electron:build:linux
```

Output goes to `release/` directory. / 鏋勫缓浜х墿杈撳嚭鍒?`release/` 鐩綍銆?
### Data Storage / 鏁版嵁瀛樺偍

| Data / 鏁版嵁 | File / 鏂囦欢 | English | 涓枃 |
|-------------|-------------|---------|------|
| Calendar Data / 鏃ュ巻鏁版嵁 | `calendar_data.json` | All schedule entries and stickers | 鎵€鏈夎绋嬭褰曞拰璐寸焊 |
| Monthly Plans / 鏈堝害璁″垝 | `calendar_plans.json` | Monthly goal plans | 鏈堝害鐩爣璁″垝 |
| Schedule Config / 鎺掕閰嶇疆 | `schedule_config.json` | Teacher and course lists | 鏁欏笀鍜岃绋嬪垪琛?|

**Storage locations / 瀛樺偍浣嶇疆锛?*
- **Windows**: `%APPDATA%\Calendar\`
- **macOS**: `~/Library/Application Support/Calendar/`
- **Linux**: `~/.config/Calendar/`

---

## 馃摑 Changelog / 鏇存柊鏃ュ織

See [CHANGELOG.md](CHANGELOG.md) for full release history.
瀹屾暣鏇存柊鍘嗗彶璇锋煡鐪?[CHANGELOG.md](CHANGELOG.md)銆?
---

## 馃搫 License / 璁稿彲璇?
This project is licensed under [CC-BY-NC-4.0](LICENSE).

鏈」鐩噰鐢?[CC-BY-NC-4.0](LICENSE) 璁稿彲璇併€?
| | English | 涓枃 |
|-|---------|------|
| 鉁?**You may / 鎮ㄥ彲浠?* | Share and adapt | 鍒嗕韩鍜屼慨鏀?|
| 馃摑 **Attribution / 缃插悕** | Must credit Akiro | 蹇呴』缁欏嚭閫傚綋缃插悕锛圓kiro锛?|
| 馃毇 **NonCommercial / 闈炲晢涓氭€т娇鐢?* | Not for commercial purposes | 涓嶅緱鐢ㄤ簬鍟嗕笟鐩殑 |

---

<div align="center">

**If this project helps you, please give it a 猸?Star!**

**濡傛灉杩欎釜椤圭洰瀵逛綘鏈夊府鍔╋紝璇风粰涓?猸?Star锛?*

漏 2026 Akiro 路 Modifier / 浜屾寮€鍙?
</div>

---

## 馃搶 Chinese Version

濡傛灉鎮ㄥ彧鎯抽槄璇讳腑鏂囷紝璇风洿鎺ヤ粠涓婃柟鐨勫悇涓珷鑺備腑鎵惧埌銆屼腑鏂囥€嶉儴鍒嗗嵆鍙€傛湰 README 閲囩敤鑻变腑鍙岃瀵圭収鏍煎紡锛屾瘡涓€鑺傞兘鍖呭惈鑻辨枃鍜屼腑鏂囧唴瀹广€?